
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:noted/ui/Notes.dart';

class SignUp extends StatefulWidget {

  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {

  CollectionReference users=Firestore.instance.collection('users');

  final FirebaseAuth _auth= FirebaseAuth.instance;
  final GlobalKey<FormState> _formKey=GlobalKey<FormState>();
  late String _email,_password,_name;

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

    signUp() async
    {
      if(_formKey.currentState!.validate())
      {
        _formKey.currentState!.save();
        try{
          FirebaseUser user=await _auth.createUserWithEmailAndPassword(email:_email,password:_password);
          await users.add({'name':_name, 'email':_email, 'password':_password}).then((value)=>print('User Added to Firestore'));
          if(user!=null)
          {
            UserUpdateInfo updateUser=UserUpdateInfo();
            updateUser.displayName=_name;
            user.updateProfile(updateUser);

          }
        }
          catch(e)
          {
            showError(e.toString());
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
                image: AssetImage("assets/images/girls/img_7.jpeg"),
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
                            if (input!.isEmpty) return 'Enter Name';
                            return null;
                          },
                          decoration: InputDecoration(
                              labelText: 'Name',
                              prefixIcon: Icon(Icons.person)),
                          onSaved: (input) => _name = input!),
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
                      onPressed: signUp,
                      child: Text('SIGN UP',
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
           
          ],
        ),
      ),
    ));
  }

}