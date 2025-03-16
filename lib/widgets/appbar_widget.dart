import 'package:flutter/material.dart';
import 'package:oneseen/constants/app_colors.dart';

class AppBarWidget extends StatelessWidget implements PreferredSizeWidget {
  final Widget title;
  final List<Widget>? actions;
  final double height;
  final bool? centerTitle;

  const AppBarWidget({
    super.key,
    required this.title,
    this.actions,
    this.height = kToolbarHeight,
    this.centerTitle = false,
  });

  @override
  Widget build(BuildContext context) {
    return PreferredSize(
      preferredSize: Size.fromHeight(height),
      child: AppBar(
        surfaceTintColor: AppColors.white,
        centerTitle: centerTitle!,
        automaticallyImplyLeading: false,
        title: title,
        backgroundColor: AppColors.white,
        actions: actions,
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(height);
}
