import 'package:flutter/material.dart';
import 'package:oneseen/screens/splash_screen.dart';
import 'package:oneseen/widgets/bottom_navigation_widget.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => SplashScreen(),
        '/entry': (context) => BottomNavigationWidget(),
      },
    );
  }
}
