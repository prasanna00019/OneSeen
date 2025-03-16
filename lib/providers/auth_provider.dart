import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:provider/provider.dart';
import 'package:oneseen/providers/user_provider.dart';

class AuthProvider extends ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  User? _user;

  User? get user => _user;

  AuthProvider() {
    _auth.authStateChanges().listen((User? user) {
      _user = user;
      notifyListeners();
    });
  }

  Future<void> loginWithGoogle(BuildContext context) async {
    try {
      final googleUser = await _googleSignIn.signIn();
      if (googleUser == null) return;

      final googleAuth = await googleUser.authentication;
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      await _auth.signInWithCredential(credential);
      _setUserData(context);
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> loginWithEmailPassword(
    BuildContext context,
    String email,
    String password,
  ) async {
    try {
      await _auth.signInWithEmailAndPassword(email: email, password: password);
      _setUserData(context);
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> registerWithEmailPassword(
    BuildContext context,
    String email,
    String password,
  ) async {
    try {
      await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      _setUserData(context);
    } catch (e) {
      print(e.toString());
    }
  }

  Future<void> logout(BuildContext context) async {
    try {
      await _googleSignIn.signOut();
      await _auth.signOut();
      Provider.of<UserProvider>(context, listen: false).setAnonymous();
    } catch (e) {
      print(e.toString());
    }
  }

  void _setUserData(BuildContext context) {
    final user = _auth.currentUser;
    if (user != null) {
      Provider.of<UserProvider>(
        context,
        listen: false,
      ).setUser(user.uid, user.displayName ?? user.email ?? "Anonymous");
    }
  }
}
