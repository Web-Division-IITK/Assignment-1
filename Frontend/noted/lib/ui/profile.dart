import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:noted/authentication/start.dart';
import 'package:simple_fontellico_progress_dialog/simple_fontico_loading.dart';
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

  late SimpleFontelicoProgressDialog _dialog;

  showSuccess(String successmessage) {
    AwesomeDialog(
        context: context,
        animType: AnimType.LEFTSLIDE,
        headerAnimationLoop: false,
        dialogType: DialogType.SUCCES,
        showCloseIcon: true,
        title: 'Succes',
        desc: successmessage,
        btnOkColor: Color(0xFF0029E2),
        btnOkOnPress: () {
          debugPrint('OnClcik');
        },
        btnOkIcon: Icons.check_circle,
        onDissmissCallback: (type) {
          debugPrint('Dialog Dissmiss from callback $type');
        })
      ..show();
  }

  void _showDialog(BuildContext context, SimpleFontelicoProgressDialogType type,
      String text) async {
    _dialog = SimpleFontelicoProgressDialog(
        context: context, barrierDimisable: false);

    if (type == SimpleFontelicoProgressDialogType.custom) {
      _dialog.show(
          message: text,
          type: type,
          width: 150.0,
          height: 75.0,
          loadingIndicator: Text(
            'C',
            style: TextStyle(fontSize: 24.0),
          ));
    } else {
      _dialog.show(
          message: text,
          type: type,
          horizontal: true,
          width: 150.0,
          height: 75.0,
          hideText: true,
          indicatorColor: Colors.red);
    }
  }

  _launchURL() async {
    const url = 'https://www.instagram.com/sahil.void/';
    if (await canLaunch(url)) {
      try{
         _showDialog(
            context, SimpleFontelicoProgressDialogType.hurricane, 'Hurricane');
      await launch(url);
      _dialog.hide();
      }
      catch(e)
      {
        showError(e.toString());
      }
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
      AwesomeDialog(
                        context: context,
                        dialogType: DialogType.WARNING,
                        headerAnimationLoop: false,
                        animType: AnimType.TOPSLIDE,
                        showCloseIcon: true,
                        closeIcon: Icon(Icons.close_fullscreen_outlined),
                        title: 'Warning',
                        btnOkColor: Color(0xFF0029E2),
                        btnCancelColor: Color(0xFF353B57),
                        desc:'Are you sure you want to sign out?',
                        btnCancelOnPress: () {},
                        onDissmissCallback: (type) {
                          debugPrint('Dialog Dissmiss from callback $type');
                        },
                        btnOkOnPress: () async{
                           try{   _auth.signOut();
                           }catch(e){
                            showError(e.toString());
                             }
                        }
                        ).show();
                  }
    catch(e)
    {
        showError(e.toString());
    }
  }
  showError(String errormessage) {
    AwesomeDialog(
        context: context,
        dialogType: DialogType.ERROR,
        animType: AnimType.RIGHSLIDE,
        headerAnimationLoop: true,
        title: 'Error',
        desc: errormessage,
        btnOkOnPress: () {},
        btnOkIcon: Icons.cancel,
        btnOkColor: Colors.red)
      ..show();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFF0029E2),
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
                      primary: Color(0xFF0029E2),
                      
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
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w400, color: Color(0xFF0029E2)),
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