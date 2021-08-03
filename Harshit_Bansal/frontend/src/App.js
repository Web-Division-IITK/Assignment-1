import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import MainPage from './Authentication/index.js';
import SignInWindow from './Authentication/signIn.js';
import SignUpWindow from './Authentication/signUp.js';
import MyNotes from './NoteComponents/MyNotes/myNotes';
import BaseLayout from './NoteComponents/index';
import { useAuth} from './contexts/AuthContext';
import ForgotPassword from './Authentication/forgotPassword';
import Editor from './NoteComponents/Editor/editor';
import About from './NoteComponents/About/about';
import DeletedNotes from './NoteComponents/DeletedNotes/deletedNotes';
import { useEffect, useState } from 'react';
import axios from 'axios'
import {Spin} from 'antd';
function App() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function startServer(){
           await axios.get('http://localhost:5000/server/')
        .then(res => res.data)
        .then(data => console.log(data))
        }
        setLoading(true)
        startServer()
        setLoading(false)
        return async()=>{await axios.get('http://localhost:5000/server/close').then(res => res.data).then(data => console.log(data))}
    }, [])
  const {currentUser} = useAuth();
  return (loading?<Spin/>:
            <Router basename={process.env.PUBLIC_URL}>
        <Switch>
        
            <Route exact path='/'>
              {currentUser?  <BaseLayout page={<MyNotes/>}/> : <Redirect to='/login'/>}
            </Route>

           <Route exact path='/editor/:id'>
              {currentUser?  <BaseLayout page={<Editor/>}/> : <Redirect to='/login'/>}
           </Route>
           <Route exact path='/about'>
              {currentUser?  <BaseLayout page={<About/>}/> : <Redirect to='/login'/>}
           </Route>
          
           <Route exact path='/deleted-notes'>
              {currentUser?  <BaseLayout page={<DeletedNotes/>}/> : <Redirect to='/login'/>}
           </Route>

            <Route  exact path='/login'>
                <MainPage display={<SignInWindow/>}/>
            </Route>
            <Route exact path='/signUp'>
                <MainPage display={<SignUpWindow/>}/>
            </Route>
            <Route path='/forgot-password'>
                <MainPage display={<ForgotPassword/>}/>
            </Route>
            <Route path='/'>
                ERROR 404 
                Page not found
            </Route>
        </Switch>
        
    </Router>
    
  );
}

export default App;
