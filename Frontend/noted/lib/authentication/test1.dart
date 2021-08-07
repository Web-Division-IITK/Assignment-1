import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:noted/ui/Notes.dart';

class Regsiter extends StatefulWidget {
  Regsiter({Key? key}) : super(key: key);

  @override
  _RegsiterState createState() => _RegsiterState();
}

class _RegsiterState extends State<Regsiter> {
  CollectionReference users=Firestore.instance.collection('users');
  final FirebaseAuth _auth= FirebaseAuth.instance;
  final _formKey=GlobalKey<FormState>();
  late String _email,_password,_password1,_name;

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height,
            maxWidth: MediaQuery.of(context).size.width,
          ),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFF0042D1), Color(0xFF417BFB)],
              begin: Alignment.topLeft,
              end: Alignment.centerRight,
            ),
          ),
          child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 2,
                  child: Padding(
                      padding: const EdgeInsets.symmetric(
                          vertical: 36.0, horizontal: 24.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Register",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 46.0,
                                fontWeight: FontWeight.w800),
                          ),
                          SizedBox(
                            height: 10.0,
                          ),
                          Text(
                            "Note-Keeping made easy",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 24.0,
                                fontWeight: FontWeight.w300),
                          )
                        ],
                      )),
                ),
                Expanded(
                  flex: 5,
                  
                  child: SingleChildScrollView(
                    child: Container(
                      width: double.infinity,
                      height:MediaQuery.of(context).size.height-250,
                      decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(30),
                            topRight: Radius.circular(30),
                          )),
                      child: Padding(
                          padding: const EdgeInsets.all(24.0),
                          child: Form(
                            key: _formKey,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                SizedBox(
                                  height: 70,
                                ),
                                TextFormField(
                                   validator: (input) {
                                      if (input!.isEmpty) return 'Enter Email';
                                      if (!input.contains('@') ||!input.contains('.'))
                                        return 'Invalid Email';
                                      return null;
                                    },
                                    onSaved: (input) => _email = input!,
                                    keyboardType: TextInputType.emailAddress,
                                    decoration: InputDecoration(
                                        border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(8.0),
                                            borderSide: BorderSide.none),
                                        filled: true,
                                        fillColor: Color(0xFFD9F0FC),
                                        hintText: "E-mail",
                                        prefixIcon: Icon(
                                          Icons.email,
                                          color: Color(0xFF417BFB),
                                        ))),
                                SizedBox(height: 40),
                                TextFormField(
                                  onSaved: (input) => _email = input!,
                                    decoration: InputDecoration(
                                        border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(8.0),
                                            borderSide: BorderSide.none),
                                        filled: true,
                                        fillColor: Color(0xFFD9F0FC),
                                        hintText: "Name",
                                        prefixIcon: Icon(
                                          Icons.person,
                                          color: Color(0xFF417BFB),
                                        ))),
                                SizedBox(height: 40),
                                TextFormField(
                                  obscureText: true,
                                  onSaved: (input) => _password = input!,
                                    decoration: InputDecoration(
                                        border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(8.0),
                                            borderSide: BorderSide.none),
                                        filled: true,
                                        fillColor: Color(0xFFD9F0FC),
                                        hintText: "Password",
                                        prefixIcon: Icon(
                                          Icons.password,
                                          color: Color(0xFF417BFB),
                                        ))),
                               
                                SizedBox(height: 70),
                                SizedBox(
                                  width: double.infinity,
                                  height: 50,
                                  child: ElevatedButton(
                                      onPressed: () {signUp();},
                                      style: ButtonStyle(
                                          shape: MaterialStateProperty.all<
                                                  RoundedRectangleBorder>(
                                              RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(18.0),
                                                  side: BorderSide(
                                                      color: Color(0xFF0042D1))))),
                                      child: Text(
                                        "REGSITER",
                                        style: TextStyle(
                                            fontSize: 25,
                                            fontWeight: FontWeight.w600),
                                      )),
                                )
                              ],
                            ),
                          )),
                    ),
                  ),
                ),
              ]),
        ),
      ),
    );
  }
}
