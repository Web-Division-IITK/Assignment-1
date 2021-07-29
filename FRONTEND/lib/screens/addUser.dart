import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:noted/services/authservice.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({ Key? key }) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  var name, password,token;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            TextField(
              decoration: InputDecoration(
                labelText: 'Name'
              ),
              onChanged: (val) {
                name=val;
              },
            ),
            TextField(
              decoration: InputDecoration(
                labelText: 'Password'
              ),
              onChanged: (val) {
                name=val;
              },
            ),
            SizedBox(height: 10,),
            RaisedButton(
              child: Text('Add User'),
              color: Colors.green,
              onPressed: (){
                AuthService().addUser(name, password).then((val){
                    Fluttertoast.showToast(msg: val.data['msg'],
                    toastLength: Toast.LENGTH_SHORT,
                    gravity: ToastGravity.BOTTOM,
                    backgroundColor: Colors.green,
                    textColor: Colors.white,
                    fontSize: 20);
                  
                });
              },
            )
          ],
        ),
      ),
    );
  }
}