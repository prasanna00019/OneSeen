import "package:firebase_auth/firebase_auth.dart";
import "package:flutter/material.dart";
import "package:google_sign_in/google_sign_in.dart";

class GoogleProvider extends ChangeNotifier {
  final googleSignIn = GoogleSignIn();
  GoogleSignInAccount? _user;
  GoogleSignInAccount get user => _user!;

  Future<void> login() async {
    final googleUser = await googleSignIn.signIn();
    if (googleUser == null) return;
    _user = googleUser;

    final googleAuth = await googleUser.authentication;
    final googleAuthCredential = GoogleAuthProvider.credential(
      accessToken: googleAuth.accessToken,
      idToken: googleAuth.idToken,
    );
    await FirebaseAuth.instance.signInWithCredential(googleAuthCredential);
    notifyListeners();
  }
}
