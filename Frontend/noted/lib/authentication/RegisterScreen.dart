import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:noted/ui/Notes.dart';
import 'package:simple_fontellico_progress_dialog/simple_fontico_loading.dart';

class Regsiter extends StatefulWidget {
  Regsiter({Key? key}) : super(key: key);

  @override
  _RegsiterState createState() => _RegsiterState();
}

class _RegsiterState extends State<Regsiter> {
  CollectionReference users=Firestore.instance.collection('users');
  final FirebaseAuth _auth= FirebaseAuth.instance;
  final _formKey=GlobalKey<FormState>();
  late FirebaseUser firebaseUser;
  late String _email,_password,_password1,_name;
  bool _passwordVisible=false,_passwordVisible1=false;
  final TextEditingController _pass = TextEditingController();


  checkAuthentication() async
  {
    _auth.onAuthStateChanged.listen((user)
    async {
      if (user!=null)
      {
        
        Navigator.pushReplacement(context, MaterialPageRoute(builder: (context)=>NotesScreen()));
      }
    }
    );
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
    void initState()
    {
      super.initState();
      this.checkAuthentication();
      _passwordVisible=false;
      _passwordVisible1=false;
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
  


  signUp() async
    {
      if(_formKey.currentState!.validate())
      {
        _formKey.currentState!.save();
        try{
           _showDialog(
            context, SimpleFontelicoProgressDialogType.hurricane, 'Hurricane');
          FirebaseUser user=await _auth.createUserWithEmailAndPassword(email:_email,password:_password);
          _dialog.hide();
          
          try{
             _showDialog(context, SimpleFontelicoProgressDialogType.hurricane,
              'Hurricane');
            await users.document(user.uid).setData({
            'id': user.uid,
            'name': _name,
            'email': _email,
            'password': _password
          }).then((value) => print("Registered"));
          
          
          _dialog.hide();
           Navigator.pushReplacement(
              context, MaterialPageRoute(builder: (context) => NotesScreen()));
          showSuccess('Account created');
          }
          catch(e){
            print("abcdef"+e.toString());
            showError(e.toString());
          }
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
                      height:MediaQuery.of(context).size.height,
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
                                  height: 50,
                                ),
                                TextFormField(
                                  onSaved: (input) => _email = input!,
                                   validator: (input) {
                                      if (input!.isEmpty) return 'Enter Email';
                                      if (!input.contains('@') ||!input.contains('.'))
                                        return 'Invalid Email';
                                      return null;
                                    },
                                    
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
                                  onSaved: (input) => _name = input!,
                                  validator: (input) {
                                      if (input!.length ==0)
                                        return 'Provide your name';
                                      return null;
                                    },
                                  
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
                                  controller: _pass,
                                  onSaved: (input) => _password = input!,
                                  validator: (input) {
                                      if (input!.length < 6)
                                        return 'Provide Minimum 6 Character';
                                      return null;
                                    },
                                  obscureText: !_passwordVisible,
                                  
                                    decoration: InputDecoration(
                                      suffixIcon: IconButton(
                                          icon: Icon(
                                            // Based on passwordVisible state choose the icon
                                            _passwordVisible
                                            ? Icons.visibility
                                            : Icons.visibility_off,
                                            color: Theme.of(context).primaryColorDark,
                                            ),
                                          onPressed: () {
                                            // Update the state i.e. toogle the state of passwordVisible variable
                                            setState(() {
                                                _passwordVisible = !_passwordVisible;
                                            });
                                          },),
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
                               
                                SizedBox(height: 40),
                                TextFormField(
                                  onSaved: (input) => _password1 = input!,
                                  validator: (input) {
                                      if(_pass.text!=(input)||input!.isEmpty)
                                        return 'Passwords do Not Match';
                                      return null;
                                    },
                                    obscureText: !_passwordVisible1,
                                    decoration: InputDecoration(
                                        suffixIcon: IconButton(
                                          icon: Icon(
                                            // Based on passwordVisible state choose the icon
                                            _passwordVisible1
                                                ? Icons.visibility
                                                : Icons.visibility_off,
                                            color: Theme.of(context)
                                                .primaryColorDark,
                                          ),
                                          onPressed: () {
                                            // Update the state i.e. toogle the state of passwordVisible variable
                                            setState(() {
                                              _passwordVisible1 =
                                                  !_passwordVisible1;

                                            });
                                          },
                                        ),
                                        border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(8.0),
                                            borderSide: BorderSide.none),
                                        filled: true,
                                        fillColor: Color(0xFFD9F0FC),
                                        hintText: "Confirm Password",
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
