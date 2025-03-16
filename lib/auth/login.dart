import "package:flutter/material.dart";
import "package:oneseen/providers/google_provider.dart";
import "package:provider/provider.dart";

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            final provider = Provider.of<GoogleProvider>(
              context,
              listen: false,
            );
            provider.login();
          },
          child: const Text("Login"),
        ),
      ),
    );
  }
}
