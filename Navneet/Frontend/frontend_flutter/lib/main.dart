import 'package:flutter/material.dart';
import 'screens/decider.dart';

void main() {
  runApp(NoteApp());
}

class NoteApp extends StatefulWidget {
  @override
  _NoteAppState createState() => _NoteAppState();
}

class _NoteAppState extends State<NoteApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Notekeeper",
      debugShowCheckedModeBanner: false,
      home: Decider(),
    );
  }
}
