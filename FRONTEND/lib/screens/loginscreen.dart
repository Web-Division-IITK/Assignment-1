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
      body: Column(
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
            child: Text('Authenticate'),
            color: Colors.blue,
            onPressed: (){
              AuthService().login(name, password).then((val){
                if(val.data['success']){
                  token=val.data['token'];
                  Fluttertoast.showToast(msg: 'Authenticated',
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.BOTTOM,
                  backgroundColor: Colors.green,
                  textColor: Colors.white,
                  fontSize: 20);
                }
              });
            },
          )
        ],
      ),
    );
  }
}