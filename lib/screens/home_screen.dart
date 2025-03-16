import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:hugeicons/hugeicons.dart';
import 'package:oneseen/constants/app_colors.dart';
import 'package:oneseen/constants/app_fonts.dart';
import 'package:oneseen/constants/app_paths.dart';
import 'package:oneseen/models/post_model.dart';
import 'package:oneseen/providers/auth_provider.dart';
import 'package:oneseen/widgets/appbar_widget.dart';
import 'package:oneseen/widgets/post_widget.dart';
import 'package:http/http.dart' as http;
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:provider/provider.dart';
import 'package:oneseen/providers/user_provider.dart';

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
  final ScrollController _scrollController = ScrollController();
  bool _isContainerVisible = true;

  @override
  void initState() {
    super.initState();
    futurePosts = fetchPosts();
    initializeSocket();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 2),
    )..repeat();

    _scrollController.addListener(() {
      if (_scrollController.position.userScrollDirection ==
          ScrollDirection.reverse) {
        if (_isContainerVisible) {
          setState(() {
            _isContainerVisible = false;
          });
        }
      } else if (_scrollController.position.userScrollDirection ==
          ScrollDirection.forward) {
        if (!_isContainerVisible) {
          setState(() {
            _isContainerVisible = true;
          });
        }
      }
    });
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

    socket.on('disconnect', (_) {});
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
    final userProvider = Provider.of<UserProvider>(context);

    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: AppBarWidget(
        title: Image(image: AssetImage(Paths.logo), width: 70, height: 70),
        actions: [
          IconButton(
            onPressed: () {
              final authProvider = Provider.of<AuthProvider>(
                context,
                listen: false,
              );
              authProvider.logout(context);
            },
            icon: Icon(Icons.logout),
          ),
        ],
      ),
      body: FutureBuilder<List<Post>>(
        future: futurePosts,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: Image(
                image: AssetImage(Paths.logo),
                width: 100,
                height: 100,
              ),
            );
          } else if (snapshot.hasError) {
            return Center(child: Text('Failed to load posts'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No posts available'));
          } else {
            return Column(
              children: [
                AnimatedContainer(
                  duration: Duration(milliseconds: 1000),
                  height: _isContainerVisible ? null : 0,
                  padding: EdgeInsets.all(20),
                  margin: EdgeInsets.all(10),
                  // width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: AppColors.grey.withValues(alpha: 0.2),
                  ),
                  child: Column(
                    spacing: 5,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "@${userProvider.userId}",
                        style: AppFonts.primaryFont(
                          textStyle: TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: screenWidth * 0.035,
                          ),
                        ),
                      ),
                      Text(
                        'Share your thoughts with the world',
                        style: TextStyle(
                          fontSize: screenWidth * 0.03,
                          color: AppColors.grey.withValues(alpha: 0.75),
                        ),
                      ),
                      SizedBox(height: 8),
                      Row(
                        spacing: 10,
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          HugeIcon(
                            icon: HugeIcons.strokeRoundedImageAdd01,
                            color: AppColors.primaryColor,
                          ),
                          HugeIcon(
                            icon: HugeIcons.strokeRoundedMic01,
                            color: AppColors.primaryColor,
                          ),
                          HugeIcon(
                            icon: HugeIcons.strokeRoundedTextAlignJustifyLeft,
                            color: AppColors.primaryColor,
                          ),
                          HugeIcon(
                            icon: HugeIcons.strokeRoundedLocation01,
                            color: AppColors.primaryColor,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: ListView.builder(
                    controller: _scrollController,
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
                        isAuthenticated:
                            Provider.of<UserProvider>(context).isAuthenticated,
                        socket: socket,
                        userId: Provider.of<UserProvider>(context).userId,
                      );
                    },
                  ),
                ),
              ],
            );
          }
        },
      ),
    );
  }
}
