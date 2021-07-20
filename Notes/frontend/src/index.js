import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import MainLayout from './authentication/index.js';
import SignIn from './authentication/SignIn.js';
import SignUp from './authentication/SignUp.js';
import Dashboard from'./authentication/Dashboard';


ReactDOM.render(
 <Router>
  <Switch>
    <Route exact path='/'>
      <Redirect to="/login" />
     
      </Route> 
    <Route path ="/login" children={ <MainLayout item={<SignIn />} />} />
    <Route path='/signup' children={<MainLayout item={<SignUp />}/>} />
    <Route path="/dashboard" children={<Dashboard />} />
    <Route path ='/home'>
      <h1>
        Welcome to My World
      </h1>
    </Route>
  </Switch>
</Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
