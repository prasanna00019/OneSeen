import 'package:flutter/material.dart';

class UserProvider with ChangeNotifier {
  String _userId = "Anonymous";
  String _userName = "Anonymous";
  bool _isAuthenticated = false;

  String get userId => _userId;
  String get userName => _userName;
  bool get isAuthenticated => _isAuthenticated;

  void setUser(String userId, String userName) {
    _userId = userId;
    _userName = userName;
    _isAuthenticated = true;
    notifyListeners();
  }

  void setAnonymous() {
    _userId = "Anonymous";
    _userName = "Anonymous";
    _isAuthenticated = false;
    notifyListeners();
  }

  void handleLogin(String userId, String userName) {
    setUser(userId, userName);
  }
}
