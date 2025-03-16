import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:oneseen/auth/login.dart';
import 'package:oneseen/widgets/bottom_navigation_widget.dart';
import 'package:provider/provider.dart';
import 'package:oneseen/providers/user_provider.dart';

class AuthHandler extends StatefulWidget {
  const AuthHandler({super.key});

  @override
  State<AuthHandler> createState() => _AuthHandlerState();
}

class _AuthHandlerState extends State<AuthHandler> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasData) {
            User? user = snapshot.data;

            Provider.of<UserProvider>(context, listen: false).setUser(
              user?.uid ?? "Anonymous",
              user?.displayName ?? "Anonymous",
            );

            return BottomNavigationWidget();
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            Provider.of<UserProvider>(context, listen: false).setAnonymous();

            return Login();
          }
        },
      ),
    );
  }
}
