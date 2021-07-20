
// import app from '../firebase';
// import auth from '../firebase';
var firebase=require('firebase');


function createUser(email,password,confirm_password){

   firebase.auth().createUserWithEmailAndPassword(email,password)
  .then((userCredential) => {
      var user =userCredential.user;
      console.log(user);
      return true;
  })
  .catch((error)=> {
      var errorCode =error.code;
      var errorMessage =error.message;
      console.log(errorCode);
      console.log(errorMessage);

      return false;
  }
  );
}

module.exports=createUser;