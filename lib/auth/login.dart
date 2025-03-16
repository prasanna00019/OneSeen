import "package:flutter/material.dart";
import "package:hugeicons/hugeicons.dart";
import "package:oneseen/constants/app_colors.dart";
import "package:oneseen/constants/app_fonts.dart";
import "package:oneseen/constants/app_paths.dart";
import "package:oneseen/providers/auth_provider.dart";
import "package:oneseen/widgets/appbar_widget.dart";
import "package:provider/provider.dart";
import 'package:badges/badges.dart' as custom_badge;

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController _email = TextEditingController();
  TextEditingController _password = TextEditingController();
  bool _isLoading = false;
  bool isPasswordVisible = false;

  void _loginWithEmailPassword() async {
    setState(() {
      _isLoading = true;
    });

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    await authProvider.loginWithEmailPassword(
      context,
      _email.text,
      _password.text,
    );

    setState(() {
      _isLoading = false;
    });
  }

  void _loginWithGoogle() async {
    setState(() {
      _isLoading = true;
    });

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    await authProvider.loginWithGoogle(context);

    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.sizeOf(context).width;
    return Scaffold(
      backgroundColor: AppColors.white,
      appBar: AppBarWidget(
        title: Image(image: AssetImage(Paths.logo), width: 70, height: 70),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Login",
              style: AppFonts.primaryFont(
                textStyle: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: width * 0.1,
                ),
              ),
            ),
            Text(
              "Share your thoughts anonymously.",
              style: AppFonts.primaryFont(),
            ),
            const SizedBox(height: 50),
            TextField(
              controller: _email,
              style: AppFonts.primaryFont(),
              decoration: InputDecoration(
                hintText: 'you@anonymous.com',
                hintStyle: AppFonts.primaryFont(),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(50),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: AppColors.primaryColor),
                  borderRadius: BorderRadius.circular(50),
                ),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _password,
              obscureText: !isPasswordVisible,
              textInputAction: TextInputAction.go,
              style: AppFonts.primaryFont(),
              decoration: InputDecoration(
                hintText: '********************************',
                hintStyle: AppFonts.primaryFont(),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(50),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: AppColors.primaryColor),
                  borderRadius: BorderRadius.circular(50),
                ),
                suffixIcon: IconButton(
                  icon: HugeIcon(
                    icon:
                        isPasswordVisible
                            ? HugeIcons.strokeRoundedViewOff
                            : HugeIcons.strokeRoundedView,
                    color: AppColors.black,
                  ),
                  onPressed: () {
                    setState(() {
                      isPasswordVisible = !isPasswordVisible;
                    });
                  },
                ),
              ),
            ),
            const SizedBox(height: 30),
            GestureDetector(
              onTap: _loginWithEmailPassword,
              child: Container(
                padding: EdgeInsets.all(15),
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  color: AppColors.primaryColor,
                ),
                child: Center(
                  child:
                      _isLoading
                          ? CircularProgressIndicator(color: AppColors.white)
                          : Text(
                            "Continue",
                            style: AppFonts.primaryFont(
                              textStyle: TextStyle(
                                color: AppColors.white,
                                fontSize: width * 0.04,
                              ),
                            ),
                          ),
                ),
              ),
            ),
            const SizedBox(height: 30),
            Row(
              spacing: 5,
              children: [
                Expanded(
                  child: Container(
                    width: double.infinity,
                    height: 2,
                    color: AppColors.grey.withValues(alpha: 0.2),
                  ),
                ),
                Text("Or", style: AppFonts.primaryFont()),
                Expanded(
                  child: Container(
                    width: double.infinity,
                    height: 2,
                    color: AppColors.grey.withValues(alpha: 0.2),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 30),
            GestureDetector(
              onTap: _loginWithGoogle,
              child: Container(
                padding: EdgeInsets.all(15),
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  color: AppColors.white,
                  border: Border.all(color: AppColors.primaryColor),
                ),
                child: Row(
                  spacing: 5,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    HugeIcon(
                      icon: HugeIcons.strokeRoundedGoogle,
                      color: AppColors.primaryColor,
                    ),
                    Text(
                      "Continue with Google",
                      style: AppFonts.primaryFont(
                        textStyle: TextStyle(
                          color: AppColors.primaryColor,
                          fontSize: width * 0.038,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 10),
            GestureDetector(
              onTap: () {
                // Handle anonymous browsing
              },
              child: Container(
                padding: EdgeInsets.all(15),
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(50),
                  color: AppColors.white,
                  border: Border.all(color: AppColors.primaryColor),
                ),
                child: Row(
                  spacing: 5,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    HugeIcon(
                      icon: HugeIcons.strokeRoundedAnonymous,
                      color: AppColors.primaryColor,
                    ),
                    custom_badge.Badge(
                      badgeStyle: custom_badge.BadgeStyle(
                        badgeColor: AppColors.gold,
                      ),
                      badgeAnimation: custom_badge.BadgeAnimation.fade(
                        loopAnimation: true,
                        animationDuration: Duration(seconds: 1),
                      ),
                      child: Text(
                        "Browse Anonymously",
                        style: AppFonts.primaryFont(
                          textStyle: TextStyle(
                            color: AppColors.primaryColor,
                            fontSize: width * 0.038,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 30),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Don't have an account?", style: AppFonts.primaryFont()),
                SizedBox(width: 10),
                GestureDetector(
                  onTap: () {
                    // Navigate to the registration screen
                  },
                  child: Text(
                    "Sign Up",
                    style: AppFonts.primaryFont(
                      textStyle: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
