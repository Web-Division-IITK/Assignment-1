import 'package:firebase_auth/firebase_auth.dart';
import './../models/user.dart';

class AuthServices{
  final FirebaseAuth _auth = FirebaseAuth.instance;
   

  Stream<User> get user {
    return _auth.onAuthStateChanged.map((FirebaseUser user)=>_userFromFirebaseuser(user))
  }

}