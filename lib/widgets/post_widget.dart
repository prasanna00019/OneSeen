import 'package:flutter/material.dart';
import 'package:hugeicons/hugeicons.dart';
import 'package:oneseen/constants/app_colors.dart';
import 'package:oneseen/constants/app_fonts.dart';
import 'package:oneseen/models/post_model.dart';
import 'package:oneseen/screens/post_detail_screen.dart';
import 'package:animations/animations.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class PostWidget extends StatelessWidget {
  final Post post;
  final double screenWidth;
  final double screenHeight;
  final String Function(DateTime) timeAgo;
  final IO.Socket socket;
  final String userId;
  final bool isAuthenticated;

  const PostWidget({
    Key? key,
    required this.post,
    required this.screenWidth,
    required this.screenHeight,
    required this.timeAgo,
    required this.socket,
    required this.userId,
    required this.isAuthenticated,
  }) : super(key: key);

  Future<void> handleVote(String postId, String type) async {
    if (!isAuthenticated) {
      // Show a toast or any other notification to the user
      print('Please login to vote');
      return;
    }

    final endpoint = type == 'upvote' ? 'upvote' : 'downvote';
    final url = Uri.parse(
      'https://oneseen.onrender.com/api/posts/$endpoint/$postId',
    );

    try {
      final response = await http.put(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'userId': userId}),
      );

      if (response.statusCode == 200) {
        final updatedPost = Post.fromJson(jsonDecode(response.body)['post']);
        // Update the post in the state (this should be done in the parent widget)
        // For example, you can use a callback to update the post list in the parent widget
        // updatePost(updatedPost);

        // Emit the socket event
        socket.emit(endpoint == 'upvote' ? 'upvoted' : 'downvote', updatedPost);
      } else {
        print('Failed to vote: ${response.statusCode}');
      }
    } catch (error) {
      print('Error: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return OpenContainer(
      closedElevation: 0,
      openElevation: 0,
      transitionType: ContainerTransitionType.fade,
      transitionDuration: Duration(milliseconds: 200),
      openBuilder:
          (context, _) => PostDetailScreen(post: post, timeAgo: timeAgo),
      closedBuilder:
          (context, openContainer) => GestureDetector(
            onTap: openContainer,
            child: Container(
              padding: EdgeInsets.all(10),
              decoration: BoxDecoration(
                border: Border(bottom: BorderSide(color: Colors.grey.shade400)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ClipOval(
                        child: Image(
                          fit: BoxFit.cover,
                          width: screenWidth * 0.08,
                          height: screenWidth * 0.08,
                          image: NetworkImage(
                            "https://picsum.photos/seed/${Uri.encodeComponent(post.id)}/200/300",
                          ),
                        ),
                      ),
                      SizedBox(width: screenWidth * 0.02),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Text(
                                "@${post.user.substring(0, 9)}",
                                style: AppFonts.primaryFont(
                                  textStyle: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: screenWidth * 0.035,
                                  ),
                                ),
                              ),
                              SizedBox(width: 5),
                              Text(
                                timeAgo(post.createdAt),
                                style: AppFonts.primaryFont(
                                  textStyle: TextStyle(
                                    fontWeight: FontWeight.w400,
                                    fontSize: screenWidth * 0.03,
                                    color: Colors.grey,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: screenHeight * 0.008),
                          SizedBox(
                            width: screenWidth * 0.85,
                            child: Text(
                              post.title,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: AppFonts.primaryFont(
                                textStyle: TextStyle(
                                  fontWeight: FontWeight.w600,
                                  fontSize: screenWidth * 0.035,
                                ),
                              ),
                            ),
                          ),
                          SizedBox(height: screenHeight * 0.005),
                          SizedBox(
                            width: screenWidth * 0.85,
                            child: Text(
                              post.description,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: AppFonts.primaryFont(
                                textStyle: TextStyle(
                                  fontWeight: FontWeight.w500,
                                  fontSize: screenWidth * 0.035,
                                ),
                              ),
                            ),
                          ),
                          SizedBox(height: screenHeight * 0.005),
                        ],
                      ),
                    ],
                  ),
                  if (post.media.isNotEmpty)
                    SizedBox(height: screenHeight * 0.015),
                  if (post.media.isNotEmpty)
                    ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: Image.network(
                        post.media,
                        width: double.infinity,
                        height: screenHeight * 0.25,
                        fit: BoxFit.cover,
                      ),
                    ),
                  SizedBox(height: screenHeight * 0.015),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      InkWell(
                        onTap: () => handleVote(post.id, 'upvote'),
                        child: Row(
                          children: [
                            HugeIcon(
                              icon: HugeIcons.strokeRoundedArrowUp01,
                              color: AppColors.black,
                            ),
                            SizedBox(width: 4),
                            Text(post.upvotes.toString()),
                          ],
                        ),
                      ),
                      InkWell(
                        onTap: () => handleVote(post.id, 'downvote'),
                        child: Row(
                          children: [
                            HugeIcon(
                              icon: HugeIcons.strokeRoundedArrowDown01,
                              color: AppColors.black,
                            ),
                            SizedBox(width: 4),
                            Text(post.downvotes.toString()),
                          ],
                        ),
                      ),
                      Row(
                        children: [
                          HugeIcon(
                            icon: HugeIcons.strokeRoundedComment02,
                            color: AppColors.black,
                          ),
                          SizedBox(width: 4),
                          Text(post.comments.length.toString()),
                        ],
                      ),
                      HugeIcon(
                        icon: HugeIcons.strokeRoundedShare08,
                        color: AppColors.black,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
    );
  }
}
