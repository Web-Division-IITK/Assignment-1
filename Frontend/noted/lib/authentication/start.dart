import 'package:flutter/material.dart';
import 'package:flutter_signin_button/button_view.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:noted/authentication/SignUp.dart';
import 'package:noted/authentication/login.dart';

class Start extends StatefulWidget {

  @override
  _StartState createState() => _StartState();
}

class _StartState extends State<Start> {

  navigateToLogin() async
  {
    Navigator.push(context, MaterialPageRoute(builder: (context)=> Login()));
  }
  navigateToSignUp() async
  {
    Navigator.push(context, MaterialPageRoute(builder: (context)=> SignUp()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            children: <Widget>[
              Container(
                child: Image(image: AssetImage("assets/images/girls/img_1.jpeg"),fit:BoxFit.contain),
                
              ),
              SizedBox(height: 5,),
              RichText( 
                text:TextSpan(text: 'Welcome to ',style: TextStyle(fontSize: 25.0,fontWeight: FontWeight.bold,
                color: Colors.black),
                
                children: <TextSpan>[
                  TextSpan(
                    text: ' Date-IITK',style:TextStyle(fontSize: 30.0,color: Colors.orange,
                    fontWeight: FontWeight.bold),
                  ),
                ]
      
                ),
                
                  ),
                  SizedBox(height: 5,),
      
                  Text('❤️ Love is underrated',style: TextStyle(color: Colors.red,fontSize: 20.0),),
      
                  SizedBox(height: 15,),
      
                  Row(mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                    RaisedButton(
                      padding: EdgeInsets.only(left: 30,right: 30),
                      onPressed: navigateToLogin,
                      child: Text('Login',style: TextStyle(color: Colors.white,fontSize: 20.0),     
                          ),
      
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)
                      ),color: Colors.orange,
                      ),
                      SizedBox(width: 20.0,),
                      RaisedButton(
                      padding: EdgeInsets.only(left: 30,right: 30),
                      onPressed: navigateToSignUp,
                      child: Text('Register',style: TextStyle(color: Colors.white,fontSize: 20.0),     
                          ),
      
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)
                      ),color: Colors.orange,
                      ),
      
                      
      
      
                    
                  ],),
                  SizedBox(height: 10,),
      
                      SignInButton( 
                        Buttons.Google,
                        onPressed: (){},
                        text: 'Sign up with Google',
                        )
            ],
          )
      
        ),
      ),
    );
  }
}