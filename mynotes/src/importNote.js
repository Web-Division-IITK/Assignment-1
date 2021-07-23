import { render } from '@testing-library/react';
import './App.css'
import React from 'react';
import formurlencoded from 'form-urlencoded'
import App from './App';
import inputNote from './inputNote';
import LoginForm from './loginForm';
//    import react from 'react'
class savedNotes extends React.Component {
    constructor(props) {
        super(props);
        
    }
    state = {
        notes:[]
    }
    getCookie(c_name) {
        console.log(c_name);
        var c_arr = document.cookie.split(';');
        var jwtToken
        console.log(c_arr)
        c_arr.forEach((val) => {
            if (c_name == val.split('=')[0]) {
                var token = val.split('=')[1];
                jwtToken = token
            }
        })
        return decodeURI(jwtToken);
    }
    componentDidMount() {
     fetch('http://localhost:3100/savenote', {
    method: 'GET',
    headers: {
        'Content-Type': 'text/plain',
        'authorization': this.getCookie("token")
    },
    
}).then((results) => {
    if (results.status != 200) {
        console.log(results)
        this.setState({notes:null})
        
    }
    else{
        return results.json()
    }
    }).then((notes) => {
        this.setState({notes:notes})
    })
    }
    render(){
        if(this.state.notes!=null)return(
            <div className="App">
            <nav >
              <div className="navContent" id="appName">
                Notes
              </div>
              <div className="navContent" id="important">
                Importants
              </div>
              <div className="navContent search" id="searchBar">
                <input type="text" placeholder="search in your notes" className="search"></input>
              </div>
            </nav>
            {inputNote}
            <h2 id="YourNotes">Your Notes</h2>
        <div id="savedNotes">
        {
        this.state.notes.map((notes)=>(
           
            <div key={notes._id} className="Notes">
                <div className="noteTitle">{notes.title}</div>
                <div className="noteBody">{notes.body}</div>
            </div>
        ))
    }
    </div>
    </div>
    )
    else {
        return(
            <LoginForm/>
        )
    }
}
}

export default savedNotes