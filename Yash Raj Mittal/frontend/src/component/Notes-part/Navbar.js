import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar({setIsLogin}) {
    const Logout = ()=>{
        localStorage.clear();
        setIsLogin(false);
    }

    return (
            <header>
                <div class="logo"><h1><Link to="/">Hello</Link></h1></div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/createNote">Create Note</Link></li>
                    <li onClick={Logout}><Link to="/">Logout</Link></li>
                </ul>
            </header>
            
    )
}
