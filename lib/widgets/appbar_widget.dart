import 'package:flutter/material.dart';
import 'package:oneseen/constants/app_colors.dart';
import 'package:oneseen/constants/app_fonts.dart';

class AppBarWidget extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final List<Widget>? actions;
  final double height;

  const AppBarWidget({
    Key? key,
    required this.title,
    this.actions,
    this.height = kToolbarHeight,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PreferredSize(
      preferredSize: Size.fromHeight(height),
      child: AppBar(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(bottom: Radius.circular(15)),
        ),
        automaticallyImplyLeading: false,
        title: Text(
          title,
          style: AppFonts.primaryFont(
            textStyle: TextStyle(
              color: AppColors.white,
              fontWeight: FontWeight.w500,
              // fontSize: 26.0,
            ),
          ),
        ),
        backgroundColor: AppColors.primaryColor,
        actions: actions,
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(height);
}
