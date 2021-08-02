import React from 'react'
import Header from './Notes-part/Navbar'
import Home from './Notes-part/Home'
import CreateNotes from './Notes-part/CreateNote'
import EditNotes from './Notes-part/EditNote'
import {BrowserRouter as Router,Route} from 'react-router-dom'


export default function Notes({setIsLogin}) {
    return (
        <Router>
            <div className="notes-page">
                <Header setIsLogin={setIsLogin}/>
                <section>
                    <Route path ='/' component = {Home} exact />
                    <Route path ='/createNote' component = {CreateNotes} exact />
                    <Route path ='/editNotes/:id' component = {EditNotes} exact />
                </section>
            </div>
        </Router>
    )
}
