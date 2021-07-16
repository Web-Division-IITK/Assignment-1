var admin = require("firebase-admin");

var serviceAccount = require("./noteit-7b9bc-firebase-adminsdk-b9agy-662e93e97a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
function createNewUser(email, password, nickname){
    
    admin
  .auth()
  .createUser({
    email: email,
    emailVerified: false,
    phoneNumber: null,
    password: password,
    displayName: nickname,
    photoURL: null,
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
    return true;
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
    return false;
  });
}
module.exports = {createNewUser, admin} ;

