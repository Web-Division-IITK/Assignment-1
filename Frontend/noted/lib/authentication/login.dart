import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:noted/ui/Notes.dart';
import 'package:noted/authentication/test1.dart';
import 'package:cloud_firestore/cloud_firestore.dart';


class Login extends StatefulWidget {

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {

  final FirebaseAuth _auth=FirebaseAuth.instance;
  final GlobalKey<FormState> _formKey=GlobalKey<FormState>();
  
  late String _email,_password;

  checkAuthentication() async
  {
    _auth.onAuthStateChanged.listen((user)
    {
      if (user!=null)
      {
        Navigator.push(context, MaterialPageRoute(builder: (context)=>NotesScreen()));
      }
    }
    );
  }
  
  @override
    void initState()
    {
      super.initState();
      this.checkAuthentication();
    }
  login() async {
    
    if(_formKey.currentState!.validate())
    {
      _formKey.currentState!.save();
      try{
          await _auth.signInWithEmailAndPassword(email: _email, password: _password);
          
          navigateToHome();
      }
      catch(e){
        showError(e.toString());
        print(e);
    }
  }
  }
showError(String errormessage) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('ERROR'),
            content: Text(errormessage),
            actions: <Widget>[
              FlatButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  child: Text('OK'))
            ],
          );
        });
  }

navigateToSignUp() async
{
  Navigator.push(context, MaterialPageRoute(builder: (context) => Regsiter()));
}

navigateToHome() async
{
  Navigator.push(context, MaterialPageRoute(builder: (context) => NotesScreen()));
}



@override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Container(
        child: Column(
          
          children: <Widget>[
            Container(
              height: 400,
              child: Image(
                image: AssetImage("assets/images/girls/img_4.jpeg"),
                fit: BoxFit.contain,
              ),
            ),
            Container(
              child: Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    Container(
                      child: TextFormField(
                          validator: (input) {
                            if (input!.isEmpty) return 'Enter Email';
                            if(!input.contains('@')||!input.contains('.')) return 'Invalid Email';
                            return null;
                          },
                          decoration: InputDecoration(
                              labelText: 'Email',
                              prefixIcon: Icon(Icons.email)),
                          onSaved: (input) => _email = input!),
                    ),
                    Container(
                      child: TextFormField(
                          validator: (input) {
                            if (input!.length < 6)
                              return 'Provide Minimum 6 Character';
                            return null;
                          },
                          decoration: InputDecoration(
                            labelText: 'Password',
                            prefixIcon: Icon(Icons.lock),
                          ),
                          obscureText: true,
                          onSaved: (input) => _password = input!),
                    ),
                    SizedBox(height: 20),
                    RaisedButton(
                      padding: EdgeInsets.fromLTRB(70, 10, 70, 10),
                      onPressed: login,
                      child: Text('LOGIN',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 20.0,
                              fontWeight: FontWeight.bold)),
                      color: Colors.orange,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0),
                      ),
                    )
                  ],
                ),
              ),
            ),

            SizedBox(
              height: 20,
            ),

            GestureDetector(
              child: Text('Create an account'),
              onTap: navigateToSignUp,
            )
           
          ],
        ),
      ),
    ));
  }
}