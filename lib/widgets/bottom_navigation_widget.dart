import "package:flutter/material.dart";
import "package:hugeicons/hugeicons.dart";
import "package:oneseen/constants/app_colors.dart";
import "package:oneseen/constants/app_fonts.dart";
import "package:oneseen/screens/home_screen.dart";
import "package:oneseen/screens/message_screen.dart";
import "package:oneseen/screens/post_screen.dart";
import "package:oneseen/screens/search_screen.dart";
import "package:oneseen/screens/user_screen.dart";

class BottomNavigationWidget extends StatefulWidget {
  const BottomNavigationWidget({super.key});

  @override
  State<BottomNavigationWidget> createState() => _BottomNavigationWidgetState();
}

class _BottomNavigationWidgetState extends State<BottomNavigationWidget> {
  int currentPageIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: NavigationBar(
        backgroundColor: AppColors.white,
        onDestinationSelected: (int index) {
          setState(() {
            currentPageIndex = index;
          });
        },
        labelBehavior: NavigationDestinationLabelBehavior.alwaysHide,
        elevation: 1,
        indicatorColor: AppColors.primaryColor,
        selectedIndex: currentPageIndex,
        labelTextStyle: WidgetStateProperty.all(
          AppFonts.primaryFont(
            textStyle: TextStyle(fontSize: 14.0, fontWeight: FontWeight.w500),
          ),
        ),
        destinations: <Widget>[
          NavigationDestination(
            selectedIcon: HugeIcon(
              icon: HugeIcons.strokeRoundedActivity01,
              color: AppColors.white,
            ),
            icon: HugeIcon(
              icon: HugeIcons.strokeRoundedActivity01,
              color: AppColors.black,
            ),
            label: 'Home',
          ),
          NavigationDestination(
            selectedIcon: HugeIcon(
              icon: HugeIcons.strokeRoundedMessage01,
              color: AppColors.white,
            ),
            icon: HugeIcon(
              icon: HugeIcons.strokeRoundedMessage01,
              color: AppColors.black,
            ),
            label: 'Messages',
          ),
          NavigationDestination(
            selectedIcon: HugeIcon(
              icon: HugeIcons.strokeRoundedAdd01,
              color: AppColors.white,
            ),
            icon: HugeIcon(
              icon: HugeIcons.strokeRoundedAdd01,
              color: AppColors.black,
            ),
            label: 'Post',
          ),
          NavigationDestination(
            selectedIcon: HugeIcon(
              icon: HugeIcons.strokeRoundedSearch01,
              color: AppColors.white,
            ),
            icon: HugeIcon(
              icon: HugeIcons.strokeRoundedSearch01,
              color: AppColors.black,
            ),
            label: 'Search',
          ),
          NavigationDestination(
            selectedIcon: HugeIcon(
              icon: HugeIcons.strokeRoundedUser,
              color: AppColors.white,
            ),
            icon: HugeIcon(
              icon: HugeIcons.strokeRoundedUser,
              color: AppColors.black,
            ),
            label: 'Profile ',
          ),
        ],
      ),
      body:
          <Widget>[
            /// Home screen
            HomeScreen(),

            /// Message screen
            MessageScreen(),

            /// Post screen
            PostScreen(),

            //Search screen
            SearchScreen(),

            //User screen
            UserScreen(),
          ][currentPageIndex],
    );
  }
}
