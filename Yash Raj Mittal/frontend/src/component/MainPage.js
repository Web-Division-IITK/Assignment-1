import React from 'react'
import Login from './login'
import Register from './register'
import {BrowserRouter as Router,Route} from 'react-router-dom'


export default function Notes({setIsLogin}) {
    return (
        <Router>
            <div className="notes-page">
                <section>
                    <Route path ='/' exact>
                        <Login setIsLogin={setIsLogin} />
                    </Route>
                    <Route path ='/register' component = {Register} exact />
                </section>
            </div>
        </Router>
    )
}
