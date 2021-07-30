import 'package:flutter/material.dart';

class SignIn extends StatefulWidget {

  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.teal[200],
      appBar: AppBar(
        title: Text("Sign In to Note Keeper",) ,
        backgroundColor: Colors.blue,
        elevation: 0.0,
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 20,horizontal: 50),
        child: RaisedButton(
          child: Text("Sign in using email"),
          onPressed: () async{

          },
        ),
      ),
    );
  }
}