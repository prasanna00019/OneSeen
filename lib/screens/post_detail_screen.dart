import 'package:flutter/material.dart';
import 'package:hugeicons/hugeicons.dart';
import 'package:oneseen/constants/app_colors.dart';
import 'package:oneseen/constants/app_fonts.dart';
import 'package:oneseen/models/post_model.dart';

class PostDetailScreen extends StatelessWidget {
  final Post post;
  final String Function(DateTime) timeAgo;

  const PostDetailScreen({Key? key, required this.post, required this.timeAgo})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    var screenWidth = MediaQuery.of(context).size.width;
    var screenHeight = MediaQuery.of(context).size.height;

    return SafeArea(
      child: Scaffold(
        backgroundColor: AppColors.white,
        body: Padding(
          padding: EdgeInsets.all(screenWidth * 0.04),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    IconButton(
                      icon: HugeIcon(
                        icon: HugeIcons.strokeRoundedArrowLeft01,
                        color: AppColors.black,
                      ),
                      onPressed: () => Navigator.pop(context),
                    ),
                    IconButton(
                      icon: HugeIcon(
                        icon: HugeIcons.strokeRoundedMoreVertical,
                        color: AppColors.black,
                      ),
                      onPressed: () {},
                    ),
                  ],
                ),
                SizedBox(height: screenHeight * 0.02),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
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
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "@${post.user}",
                            overflow: TextOverflow.ellipsis,
                            style: AppFonts.primaryFont(
                              textStyle: TextStyle(
                                fontWeight: FontWeight.w600,
                                fontSize: screenWidth * 0.04,
                              ),
                            ),
                          ),
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
                    ),
                  ],
                ),
                SizedBox(height: screenHeight * 0.02),
                Text(
                  post.title,
                  style: AppFonts.primaryFont(
                    textStyle: TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: screenWidth * 0.05,
                    ),
                  ),
                ),
                SizedBox(height: screenHeight * 0.02),
                Text(
                  post.description,
                  style: AppFonts.primaryFont(
                    textStyle: TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: screenWidth * 0.04,
                    ),
                  ),
                ),
                if (post.media.isNotEmpty)
                  SizedBox(height: screenHeight * 0.02),
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
                SizedBox(height: screenHeight * 0.02),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Row(
                      children: [
                        HugeIcon(
                          icon: HugeIcons.strokeRoundedArrowUp01,
                          color: AppColors.black,
                        ),
                        SizedBox(width: screenWidth * 0.01),
                        Text(post.upvotes.toString()),
                      ],
                    ),
                    Row(
                      children: [
                        HugeIcon(
                          icon: HugeIcons.strokeRoundedArrowDown01,
                          color: AppColors.black,
                        ),
                        SizedBox(width: screenWidth * 0.01),
                        Text(post.downvotes.toString()),
                      ],
                    ),
                    Row(
                      children: [
                        HugeIcon(
                          icon: HugeIcons.strokeRoundedComment02,
                          color: AppColors.black,
                        ),
                        SizedBox(width: screenWidth * 0.01),
                        Text(post.comments.length.toString()),
                      ],
                    ),
                    HugeIcon(
                      icon: HugeIcons.strokeRoundedShare08,
                      color: AppColors.black,
                    ),
                  ],
                ),
                SizedBox(height: screenHeight * 0.02),
                TextField(
                  style: AppFonts.primaryFont(),
                  decoration: InputDecoration(
                    hintText: 'Add a comment...',
                    hintStyle: AppFonts.primaryFont(),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(50),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: AppColors.primaryColor),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    suffixIcon: IconButton(
                      icon: HugeIcon(
                        icon: HugeIcons.strokeRoundedSent,
                        color: AppColors.black,
                      ),
                      onPressed: () {},
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
