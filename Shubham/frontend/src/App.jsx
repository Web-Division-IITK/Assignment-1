import React,{ useState } from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import {Switch ,Route} from"react-router-dom";
import RegisterPage from"./RegisterPage";
import LoginPage from "./LoginPage";
import NotePage from "./components-notes/NotePage";
export default function App(){
    const [user,setUser]=useState(false);
    return(
       <div>
       <Router>
       <div>
       <Switch>
       <Route exact path="/login">
       {user?<NotePage setUser={setUser}/>:<LoginPage setUser={setUser} />}
       </Route>
        <Route exact path="/register">
       <RegisterPage/>
       </Route>
       <Route exact path="/">
       {user?<NotePage setUser={setUser}/>:<LoginPage setUser={setUser} />}
       </Route>
      
       </Switch>
       </div>
       </Router>
       </div>
    );
}