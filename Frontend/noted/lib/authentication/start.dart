import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:noted/authentication/LoginScreen.dart';
import 'package:noted/authentication/RegisterScreen.dart';
import 'package:noted/ui/Notes.dart';
import 'package:simple_fontellico_progress_dialog/simple_fontico_loading.dart';

class Start extends StatefulWidget {
  Start({Key? key}) : super(key: key);

  @override
  _StartState createState() => _StartState();
}

class _StartState extends State<Start> {
  final myController = TextEditingController();
  final GoogleSignIn _googleSignIn = GoogleSignIn();  
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  late String _email = "", _password;
  CollectionReference users = Firestore.instance.collection('users');

  checkAuthentication() async {
    _auth.onAuthStateChanged.listen((user) {
      if (user != null) {
        Navigator.pushReplacement(
            context, MaterialPageRoute(builder: (context) => NotesScreen()));
      }
    });
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

  @override
  void initState() {
    super.initState();
    this.checkAuthentication();
    setState(() {});
  }

  navigateToSignUp() async {
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => Regsiter()));
  }

  navigateToHome() async {
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => NotesScreen()));
  }

  signInwithGoogle() async {
    try {
      _showDialog(
          context, SimpleFontelicoProgressDialogType.hurricane, 'Hurricane');
      final GoogleSignInAccount? googleSignInAccount =
          await _googleSignIn.signIn();
      final GoogleSignInAuthentication googleSignInAuthentication =
          await googleSignInAccount!.authentication;
      final AuthCredential credential = GoogleAuthProvider.getCredential(
        accessToken: googleSignInAuthentication.accessToken,
        idToken: googleSignInAuthentication.idToken,
      );
      FirebaseUser user=await _auth.signInWithCredential(credential);
      _dialog.hide();

      try {
        _showDialog(
            context, SimpleFontelicoProgressDialogType.hurricane, 'Hurricane');
        await users.document(user.uid).setData({
          'id': user.uid,
          'name': user.displayName,
          'email': user.email,
          'password': "Null"
        }).then((value) => print("Registered"));
        _dialog.hide();
        navigateToHome();
      } catch (e) {
         _dialog.hide();
        showError(e.toString());
      }
    } catch (e) {
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
      body: SingleChildScrollView(
        child: Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height,
            maxWidth: MediaQuery.of(context).size.width,
          ),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFF0029E2), Color(0xFF417BFB)],
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
                            "Welcome",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 46.0,
                                fontWeight: FontWeight.w800),
                          ),
                          SizedBox(
                            height: 10.0,
                          ),
                          Text(
                            "Noted - Simple Note Keeping App",
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 20.0,
                                fontWeight: FontWeight.w300),
                          )
                        ],
                      )),
                ),
                Expanded(
                  flex: 5,
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(30),
                          topRight: Radius.circular(30),
                        )),
                    child: SingleChildScrollView(
                      child: Padding(
                          padding: const EdgeInsets.all(24.0),
                          child: Form(
                            key: _formKey,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                    
                                SizedBox(height: 20.0),
                             SizedBox(
                               height: 100,
                               child: Image.asset('assets/images/start.png')),
                               SizedBox(
                              height: 40,
                            ),
                                SizedBox(
                                    width: MediaQuery.of(context).size.width,
                                    height: 50,
                                    child: ElevatedButton(
                                   onPressed: () {
                                     Navigator.push(
                                         context,
                                         MaterialPageRoute(
                                             builder: (context) =>
                                                 Test()));
                                   },
                                   style: ButtonStyle(
                                       backgroundColor:
                                           MaterialStateProperty.all(
                                               Color(0xFF0029E2)),
                                       shape: MaterialStateProperty.all<
                                               RoundedRectangleBorder>(
                                           RoundedRectangleBorder(
                                               borderRadius:
                                                   BorderRadius.circular(18.0),
                                               side: BorderSide(
                                                   color:
                                                       Color(0xFF0029E2))))),
                                   child: Text(
                                     "LOGIN",
                                     style: TextStyle(
                                         fontSize: 25,
                                         fontWeight: FontWeight.w600),
                                   )),
                                  ),
                                SizedBox(height: 30,),
                                SizedBox(
                                width: MediaQuery.of(context).size.width,
                                height: 50,
                                child: ElevatedButton(
                                    onPressed: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) => Regsiter()));
                                    },
                                    style: ButtonStyle(
                                        backgroundColor:
                                            MaterialStateProperty.all(
                                                Color(0xFF0029E2)),
                                        shape: MaterialStateProperty.all<
                                                RoundedRectangleBorder>(
                                            RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(18.0),
                                                side: BorderSide(
                                                    color: Color(0xFF0029E2))))),
                                    child: Text(
                                      "REGISTER",
                                      style: TextStyle(
                                          fontSize: 25,
                                          fontWeight: FontWeight.w600),
                                    )),
                              ),
                              SizedBox(height:30),
                              SizedBox(
                              width: MediaQuery.of(context).size.width,
                              height: 50,
                              child: ElevatedButton(
                                  onPressed: () {
                                   signInwithGoogle();
                                  },
                                  style: ButtonStyle(
                                      backgroundColor: MaterialStateProperty.all(
                                          Color(0xFF0029E2)),
                                      shape: MaterialStateProperty.all<
                                              RoundedRectangleBorder>(
                                          RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(18.0),
                                              side: BorderSide(
                                                  color: Color(0xFF0029E2))))),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children:[
                                      IconButton(
                                      icon:Image.asset('assets/images/google.png'),
                                       onPressed: () {signInwithGoogle();},),
                                      Text(
                                      "Sign up with Google",
                                      style: TextStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.w600),
                                    ),
                                    
                                    ]
                                  )),
                                  
                            ),
                             SizedBox(
                              height: 15,
                            ),
                            Row(
                            children: <Widget>[
                                Expanded(
                                    child: Divider(color: Colors.black,)
                                ),       
                    
                                Text("OR"),        
                    
                                Expanded(
                                    child: Divider(
                                color: Colors.black,
                              )
                                ),
                            ]
                        ),
                        SizedBox(
                              height: 30,
                            ),
                            SizedBox(
                              width: MediaQuery.of(context).size.width,
                              height: 50,
                              child: ElevatedButton(
                                  onPressed: () {
                                    AwesomeDialog(
                                        context: context,
                                        dialogType: DialogType.WARNING,
                                        headerAnimationLoop: false,
                                        animType: AnimType.TOPSLIDE,
                                        showCloseIcon: true,
                                        closeIcon: Icon(
                                            Icons.close_fullscreen_outlined),
                                        title: 'Warning',
                                        btnOkColor: Color(0xFF0029E2),
                                        btnCancelColor: Color(0xFF353B57),
                                        desc:
                                            'Are you sure you want to quit the app?',
                                        btnCancelOnPress: () {},
                                        onDissmissCallback: (type) {
                                          debugPrint(
                                              'Dialog Dissmiss from callback $type');
                                        },
                                        btnOkOnPress: () async {
                                          try {
                                          SystemNavigator.pop();                                         
                                          } catch (e) {
                                            print(e);
                                            showError(e.toString());
                                          }
                                        })
                                      ..show();
                                    
                                  },
                                  style: ButtonStyle(
                                      backgroundColor: MaterialStateProperty.all(
                                          Color(0xFF0029E2)),
                                      shape: MaterialStateProperty.all<
                                              RoundedRectangleBorder>(
                                          RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(18.0),
                                              side: BorderSide(
                                                  color: Color(0xFF0029E2))))),
                                  child: Text(
                                    "QUIT",
                                    style: TextStyle(
                                        fontSize: 25,
                                        fontWeight: FontWeight.w600),
                                  )),
                            ),
                              ],
                            ),
                          ),
                          ),
                    ),
                  ),
                ),
              ],
              ),
        ),
      ),
    );
  }
}
