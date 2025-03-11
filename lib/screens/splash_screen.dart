import "dart:async";

import "package:flutter/material.dart";
import "package:oneseen/constants/app_fonts.dart";

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    Timer(Duration(seconds: 1), () {
      Navigator.pushNamed(context, "/entry");
    });
  }

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.sizeOf(context).width;

    return Scaffold(
      body: Center(
        child: Column(
          spacing: 5,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image(image: AssetImage("lib/assets/logo.png")),
            Text(
              "OneSeen",
              style: AppFonts.primaryFont(
                textStyle: TextStyle(
                  fontSize: width * 0.05,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
