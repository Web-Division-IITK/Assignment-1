import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:noted/authentication/start.dart';


class Splash extends StatefulWidget {
  @override
  _SplashState createState() => _SplashState();
}

class _SplashState extends State<Splash> {
  late Timer _timer;
  int _start = 1;

  void startTimer() {
    Timer(Duration(milliseconds: 750), () {
     Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => Start()));
    });
    // const oneSec = const Duration(seconds: 1);
    // _timer = new Timer.periodic(
    //   oneSec,
    //   (Timer timer) {
    //     if (_start == 0) {
    //       setState(() {
    //         timer.cancel();
    //       });
    //       Navigator.pushReplacement(context,MaterialPageRoute(builder: (context)=>Start()));
    //     } else {
    //       setState(() {
    //         _start--;
    //       });
    //     }
    //   },
    // );
  }

  @override
  void initState(){
    super.initState();
    startTimer();
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xe1f5fe).withOpacity(1.0),
      body: Center(
        
        child: Image.asset('assets/images/splash.png')),
      
    );
  }
}

class Init {
  Init._();
  static final instance = Init._();

  Future initialize() async {
    // This is where you can initialize the resources needed by your app while
    // the splash screen is displayed.  Remove the following example because
    // delaying the user experience is a bad design practice!
    await Future.delayed(Duration(seconds: 3));
  }
}

