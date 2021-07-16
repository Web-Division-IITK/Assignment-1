import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import getPage from './routes.js';
import MainPage from './Authentication/index.js';
import SignInWindow from './Authentication/signIn.js';
import SignUpWindow from './Authentication/signUp.js';
ReactDOM.render(
  <React.StrictMode>
            <Router>
        <Switch>
            <Route exact path='/'>
                <MainPage display={<SignInWindow/>}/>
            </Route>
            <Route exact path='/signUp'>
                <MainPage display={<SignUpWindow/>}/>
            </Route>
            
            <Route path='/'>
                ERROR 404 
                Page not found
            </Route>
        </Switch>
        
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
