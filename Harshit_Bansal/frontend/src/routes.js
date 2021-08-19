import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainPage from './Authentication/index.js';
import React from 'react';
import SignInWindow from './Authentication/signIn.js';
import SignUpWindow from './Authentication/signUp.js';
function getPage(){
    return(
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
    );

    
}
export default getPage;