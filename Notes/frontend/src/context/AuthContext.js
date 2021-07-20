import React, {useContext,useState,useEffect } from 'react'
import { auth } from '../firebase.js';

const AuthContext=React.createContext();

export function Auth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [CurrentUser,setCurrentUser]=useState();
    

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
        
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
        //  .catch((error) => {
        //      var errorCode = error.code;
        //      var errorMessage= error.message;
        //      if(errorCode=== 'auth/wrong-password') {
        //          alert('Wrong Password');
        //      }
        //      else {
        //          alert(errorMessage);
        //      }
        //      console.log(error);
        //  });

        //  return;
    }
 
    useEffect(()=>{
       const unsubscribe= auth.onAuthStateChanged(user =>{
            setCurrentUser(user);
            
        })
        
        return unsubscribe;
    }, [])
   

    const value={
        CurrentUser,
        signup,
        login
    };

    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}
