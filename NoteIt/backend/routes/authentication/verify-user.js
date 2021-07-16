const dummyUsers = {
    Harshit:"harshit",
    Parush:"parush"
};
var {_, admin} = require("./create-new-user");
function authenticate(email, password){

    admin.auth().getUserByEmail(email)
  .then((userCredential) => {
    // Signed in
    var _password = userCredential.password;
    if (_password === password)
    return true;
    // ...
   
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    return false;
  });

}
module.exports= authenticate;