import React from "react";
import Navbar from "./components-notes/login/navbar";
import Login from "./components-notes/login/login";
export default function LoginPage(props){
      return(
          <div>
          <Navbar/>
          <Login setUser={props.setUser}/>

          </div>
      )

}