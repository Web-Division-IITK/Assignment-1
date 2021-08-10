// --no-sound-null-safety
import 'package:flutter/material.dart';
import 'package:noted/ui/splash.dart';
import 'package:noted/ui/test.dart';

import 'authentication/start.dart';
import 'authentication/LoginScreen.dart';
import 'ui/Notes.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Noted',
      debugShowCheckedModeBanner: false,
      home: Splash(),
    );
  }
}
