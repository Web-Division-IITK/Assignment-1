import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:noted/authentication/start.dart';
import 'package:url_launcher/url_launcher.dart';
class ProfilePage extends StatefulWidget {
  const ProfilePage({ Key? key }) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  late FirebaseUser user;
  String name ="";
  bool isLoggedin = false;

  @override
  void initState() {
    super.initState();
    this.checkAuthentication();
    this.getUser();
    this.setState(() {
      
    });
  }

   getUser() async {
    FirebaseUser firebaseUser = await _auth.currentUser();
    await firebaseUser.reload();
    firebaseUser = await _auth.currentUser();

    if (firebaseUser != null) {
      setState(() {
        this.user = firebaseUser;
        this.isLoggedin = true;
      
      });
      print("UID"+firebaseUser.uid);
      try{await Firestore.instance
          .collection("users")
          .document(firebaseUser.uid)
          .get()
          .then((DocumentSnapshot snapshot) {
            if(snapshot.exists)
        print("NAME" + snapshot.data["name"]);
        else
        showError("User not found");
        setState(() {
           name = snapshot.data["name"];
        });
       
        
      });
      // ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      //   content: Text(name.toString()),
      // ));
    } catch (e) {
      showError(e.toString());
    }
    }
  }

  _launchURL() async {
    const url = 'https://www.instagram.com/sahil.void/';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  checkAuthentication() async {
    _auth.onAuthStateChanged.listen((user) {
      if (user == null) {
        Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => Start()));
      }
    });
  }

  signOut() async {
    try{
    _auth.signOut();
    }catch(e){
      showError('Could not Sign Out. Please Try Again.');
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
      appBar: AppBar(
        backgroundColor: Color(0xFF417BFB),
        title: Text('My Profile',
          style: TextStyle(fontSize: 25.0, fontWeight: FontWeight.bold))
      ),
      body: Container(
        color: Color(0xFFD9F0FC),
        child: Column(
          children:<Widget>[
            Padding(
              padding: EdgeInsets.all(15.0),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(
                    color: Colors.blue,
                    width: 3.0,
                    
                  ),
                                   
                 borderRadius: BorderRadius.circular(10)
                ),
                child: Card(
                  
                  color: Color(0xFFF5F7FB),
                 child: new Column(
                  children: <Widget>[
                    new Image.asset('assets/images/NOTED.png'),
                    new Padding(
                        padding: new EdgeInsets.all(5.0),
                        child: new Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            new Padding(
                              padding: new EdgeInsets.all(7.0),
                              child: new Icon(Icons.person)
                            ),
                            new Padding(
                              padding: new EdgeInsets.all(7.0),
                              child: new Text(
                                "Welcome $name",
                                
                                style: new TextStyle(fontSize: 25.0),
                              ),
                            ),
                            
                          ],
                        ))
                  ],
                ),
                        ),
              ),
            ),
          SizedBox(
              height: 10.0,
            ),
          Padding(
            padding: EdgeInsets.all(5.0),
            child: Card(
              color: Color(0xFFF5F7FB),
              child:  Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                Center(child: Padding(padding: EdgeInsets.all(10.0),
                child: Text('You have crafted 0 notes',style: TextStyle(fontSize: 20),)))
              ],)),
          ),
            SizedBox(
              height: 40.0,
            ),
            Center(
                child: Column(
                children: [
                Center(
                    child:ElevatedButton(onPressed: () { signOut(); },
                    style: ElevatedButton.styleFrom(
                      primary: Color(0xFF417BFB),
                      
                      textStyle:
                          TextStyle(fontSize: 30, fontWeight: FontWeight.bold)), 
                    child: Padding(
                      padding: EdgeInsets.all(10.0),
                      child: Text('Sign Out',style: TextStyle(fontSize: 30),)),
                    )
                ),
              ],
            )),
            SizedBox(height: 50.0),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [GestureDetector(
                onTap: () => {
                    _launchURL()
                },
                child: Text(
                  "Developed by Sahil",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w400, color: Color(0xFF417BFB)),
                ),
              ),
              ]
            ),
          ],
        ),
      ),
    );
  }
}