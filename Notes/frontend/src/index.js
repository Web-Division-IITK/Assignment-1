import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import MainLayout from './authentication/index.js';
import SignIn from './authentication/SignIn/SignIn.js';
import SignUp from './authentication/SignUp/SignUp.js';
import Dashboard from'./content/Dashboard';
import Forget from './authentication/ForgetPassword/forget';
import Home from './content/Home/home';
import Delete from './content/DeleteNote/delete';
import {NoteContextProvider} from './context/NoteContext';
import NavigationHandler from './content/NavigationHandler';

ReactDOM.render(
  <NoteContextProvider>
  <AuthProvider>
  <Router>
  <Switch>
    <Route exact path='/'>
      <Redirect to="/login" />
    </Route> 

    <Route path ="/login" children={ <MainLayout item={<SignIn />} />} />
    <Route path='/signup' children={<MainLayout item={<SignUp />}/>} />
    <Route path="/forget" children={<MainLayout item={<Forget />}/>} />
    <Route path="/dashboard" children={<Dashboard body={<NavigationHandler />} />} />
  </Switch>
</Router>
</AuthProvider>
</NoteContextProvider>

,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
