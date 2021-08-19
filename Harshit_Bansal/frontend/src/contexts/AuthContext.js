import React, { useEffect } from "react";
import {useContext} from "react";
import {auth} from "./firebase";
import axios from 'axios';
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const value = {
        currentUser,
        signUp, login, logout, resetPassword
    };
    function signUp(email, password, nickname){
        return auth.createUserWithEmailAndPassword(email, password)
        .then((result)=>{
            setLoading(true);
            result.user.updateProfile({
                displayName: nickname
            })
            async function initilializeDatabase(){
                await axios.get(`http://localhost:5000/server/create-user/${result.user.uid}`)
                .then((res)=>console.log(res.data))
            }
            initilializeDatabase()
           
            setLoading(false);
        })
    }
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }
    function logout(){
        return auth.signOut();
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }
    useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(function(user) {
        setCurrentUser(user);
        setLoading(false);
    })
    
    return unSubscribe;
    },[])
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

}