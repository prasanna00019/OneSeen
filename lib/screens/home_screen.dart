import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:hugeicons/hugeicons.dart';
import 'package:oneseen/constants/app_colors.dart';
import 'package:oneseen/models/post_model.dart';
import 'package:oneseen/widgets/appbar_widget.dart';
import 'package:oneseen/widgets/post_widget.dart';
import 'package:http/http.dart' as http;
import 'package:socket_io_client/socket_io_client.dart' as IO;

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Future<List<Post>> futurePosts;
  late IO.Socket socket;
  List<Post> posts = [];

  @override
  void initState() {
    super.initState();
    futurePosts = fetchPosts();
    initializeSocket();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    )..repeat();
  }

  void initializeSocket() {
    socket = IO.io('https://oneseen.onrender.com', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.connect();

    socket.on('connect', (_) {
      print('Connected to socket server');
    });

    socket.on('upvoted', (data) {
      Post updatedPost = Post.fromJson(data);
      setState(() {
        posts =
            posts
                .map((post) => post.id == updatedPost.id ? updatedPost : post)
                .toList();
      });
    });

    socket.on('disappearPost', (postId) {
      setState(() {
        posts = posts.where((post) => post.id != postId).toList();
      });
    });

    socket.on('downvote', (data) {
      Post updatedPost = Post.fromJson(data);
      setState(() {
        posts =
            posts
                .map((post) => post.id == updatedPost.id ? updatedPost : post)
                .toList();
      });
    });

    socket.on('postUpdated', (data) {
      Post updatedPost = Post.fromJson(data);
      setState(() {
        posts =
            posts
                .map((post) => post.id == updatedPost.id ? updatedPost : post)
                .toList();
      });
    });

    socket.on('newPost', (data) {
      Post newPost = Post.fromJson(data);
      setState(() {
        posts.insert(0, newPost);
      });
    });

    socket.on('postDeleted', (postId) {
      setState(() {
        posts = posts.where((post) => post.id != postId).toList();
      });
    });

    socket.on('EditImage', (data) {
      Post updatedPost = Post.fromJson(data);
      setState(() {
        posts =
            posts
                .map((post) => post.id == updatedPost.id ? updatedPost : post)
                .toList();
      });
    });

    socket.on('disconnect', (_) {
      print('Disconnected from socket server');
    });
  }

  Future<List<Post>> fetchPosts() async {
    final response = await http.get(
      Uri.parse('https://oneseen.onrender.com/api/posts/get-posts'),
    );

    if (response.statusCode == 200) {
      List<dynamic> jsonResponse = jsonDecode(response.body);
      List<Post> posts =
          jsonResponse.map((post) => Post.fromJson(post)).toList();
      posts.sort((a, b) => b.createdAt.compareTo(a.createdAt));
      setState(() {
        this.posts = posts;
      });
      return posts;
    } else {
      throw Exception('Failed to load posts');
    }
  }

  String timeAgo(DateTime date) {
    Duration diff = DateTime.now().difference(date);
    if (diff.inDays > 0) {
      return '${diff.inDays} D';
    } else if (diff.inHours > 0) {
      return '${diff.inHours} Hr';
    } else if (diff.inMinutes > 0) {
      return '${diff.inMinutes} M';
    } else {
      return '${diff.inSeconds} S';
    }
  }

  @override
  void dispose() {
    socket.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var screenWidth = MediaQuery.of(context).size.width;
    var screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: AppBarWidget(
        title: "OneSeen",
        actions: [
          IconButton(
            icon: HugeIcon(
              icon: HugeIcons.strokeRoundedNotification03,
              color: AppColors.white,
            ),
            onPressed: () {},
          ),
        ],
      ),
      body: FutureBuilder<List<Post>>(
        future: futurePosts,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: RotationTransition(
                filterQuality: FilterQuality.high,
                turns: _controller,
                child: Image(image: AssetImage("lib/assets/logo.png")),
              ),
            );
          } else if (snapshot.hasError) {
            return Center(child: Text('Failed to load posts'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No posts available'));
          } else {
            return ListView.builder(
              padding: EdgeInsets.only(bottom: 15, top: 15),
              physics: BouncingScrollPhysics(),
              itemCount: posts.length,
              itemBuilder: (context, index) {
                Post post = posts[index];
                return PostWidget(
                  post: post,
                  screenWidth: screenWidth,
                  screenHeight: screenHeight,
                  timeAgo: timeAgo,
                );
              },
            );
          }
        },
      ),
    );
  }
}
