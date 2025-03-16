import "dart:async";
import "package:flutter/material.dart";
import "package:oneseen/constants/app_colors.dart";
import "package:oneseen/constants/app_paths.dart";

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(Duration(seconds: 1), () {
      Navigator.pushNamed(context, Paths.authHandler);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.white,
      body: Center(
        child: Column(
          spacing: 5,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image(image: AssetImage(Paths.logo), width: 100, height: 100),
          ],
        ),
      ),
    );
  }
}
