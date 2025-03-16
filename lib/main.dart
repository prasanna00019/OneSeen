import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:oneseen/auth/auth_handler.dart';
import 'package:oneseen/auth/login.dart';
import 'package:oneseen/constants/app_paths.dart';
import 'package:oneseen/firebase_options.dart';
import 'package:oneseen/providers/google_provider.dart';
import 'package:oneseen/screens/splash_screen.dart';
import 'package:oneseen/widgets/bottom_navigation_widget.dart';
import 'package:provider/provider.dart';
import 'package:oneseen/providers/user_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
        ChangeNotifierProvider(create: (_) => GoogleProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: Paths.splash,
      routes: {
        Paths.splash: (context) => SplashScreen(),
        Paths.entry: (context) => BottomNavigationWidget(),
        Paths.authHandler: (context) => AuthHandler(),
        Paths.login: (context) => Login(),
      },
    );
  }
}
