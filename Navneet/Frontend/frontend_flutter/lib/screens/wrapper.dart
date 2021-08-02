import 'package:flutter/material.dart';
import 'package:frontend_flutter/screens/auth/authenticate.dart';
import 'package:frontend_flutter/screens/auth/signin.dart';
import 'package:frontend_flutter/screens/home/homepage.dart';

class Wrapper extends StatefulWidget {

  @override
  _WrapperState createState() => _WrapperState();
}

class _WrapperState extends State<Wrapper> {
  @override
  Widget build(BuildContext context) {
    return SignIn();
  }
}