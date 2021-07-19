import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:notes/start.dart';

class HomePage extends StatefulWidget {

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

    final FirebaseAuth _auth=FirebaseAuth.instance;
    FirebaseUser user;
    bool isLoggedin=false;

    checkAuthentication() async{

      _auth.onAuthStateChanged.listen((user)  {
        if(user==null)
        {
          Navigator.push(context,MaterialPageRoute(builder: (context)=> Start()));
        }
      });
    }

    getUser() async
    {
      FirebaseUser firebaseUser=await _auth.currentUser();
      await firebaseUser?.reload();
      firebaseUser=await _auth.currentUser();

      if(firebaseUser!=null)
      {
        setState(() {
          this.user=firebaseUser;
          this.isLoggedin=true;
        });
      }
    }

    signout() async
    {
      _auth.signOut();
    }

    @override
    void initState() {
      super.initState();
      this.checkAuthentication();
      this.getUser();
    }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: !isLoggedin?Center(child: CircularProgressIndicator(backgroundColor: Colors.black,),):
        
        Column(
          children: <Widget>[
            Container(
              height: 400,
              child: Image(image: AssetImage('assets/images/a.jpg'),
              fit: BoxFit.contain,)
            ),
            SizedBox(height: 20,),
            Center(
              
              child: Container(
                child: Text("Hello ${user.displayName} you are logged in as ${user.email}",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                ),),
              ),
            ),
            SizedBox(height: 20,),
            RaisedButton(
              padding: EdgeInsets.fromLTRB(70, 10, 70, 10),
                      onPressed: signout,
                      child: Text('SIGN OUT',
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
    );
  }
}