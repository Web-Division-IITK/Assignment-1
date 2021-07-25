import { render } from '@testing-library/react';
import './App.css'
import React from 'react';
import formurlencoded from 'form-urlencoded'
import Cookies from 'universal-cookie';

class savedNotes extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        notes: [],
        accountExists: true,
        loginError: null,
        editableNote: null
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
                this.setState({ notes: null })

            }
            else {
                return results.json()
            }
        }).then((notes) => {
            if (notes) {
                this.setState({ notes: notes.reverse() })
            }
        })
    }
    render() {
        if (this.state.notes != null) return (
            <div className="App">
                <nav >
                    <div className="navContent" id="appName">
                        Notes
                    </div>
                    <div className="navContent" id="important">
                        Importants
                    </div>
                    <img src="/download.png" alt="logout" id="logoutButton" onClick={() => {
                        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                        this.setState({ notes: null })
                    }} />
                </nav>
                <div>
                    <div className="addNote" id="title">
                        <h2 id="title">Add Title</h2>
                        <textarea id="addTitle" rows="2" columns="5" />
                    </div>
                    <div className="addNote" id="title">
                        <h3 id="Body">Add Note</h3>
                        <textarea id="addNote" rows="15" columns="5" />
                    </div>
                    <button id="saveButton" className="addNote" onClick={() => {
                        var title = document.getElementById('addTitle').value;
                        var note = document.getElementById('addNote').value;
                        const reqBody = {
                            title: title,
                            body: note
                        }
                        fetch('http://localhost:3100/savenote/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'authorization': this.getCookie("token")
                            },
                            body: formurlencoded(reqBody)
                        }).then((inputNote) => {
                            if (inputNote.status === 200) {
                                return inputNote.json()
                            }
                        }).then((response) => {
                            this.setState({ notes: this.state.notes.reverse().concat(response).reverse() })
                        }
                        ).catch((error) => {
                            console.log(error);
                        })
                    }} >Save</button>
                </div>
                <h2 id="YourNotes">Your Notes</h2>
                <div id="savedNotes">
                    {
                        this.state.notes.map((notes) => {
                            if (notes._id == this.state.editableNote) {
                                return (

                                    <div key={notes._id} id={notes._id} className="editableNotes" onClick={() => {
                                        // document.getElementById(notes._id).style.backgroundColor = '#dbe9f5';
                                        this.setState({ editableNote: notes._id })
                                    }}>
                                        <div className="noteTitle editable" contentEditable='true' suppressContentEditableWarning={true}>{notes.title}</div>
                                        <div className="noteBody editable" contentEditable='true' suppressContentEditableWarning={true}>{notes.body}</div>
                                        <div id='buttons'>
                                        <button className="deleteButton"
                                            onClick={(e) => {
                                                
                                                fetch(`http://localhost:3100/savenote/${notes._id}`, {
                                                    method: 'DELETE',
                                                    headers: {
                                                        'authorization': this.getCookie("token"),
                                                        'content-type': 'text/plain'
                                                    }
                                                }).then((result) => {
                                                    if (result) {
                                                        document.getElementById(notes._id).style.display = 'none'
                                                    }
                                                })
                                            }}>
                                            Delete</button>
                                        <button className="deleteButton"
                                            onClick={(e) => {
                                                // var _id = e.currentTarget.parentElement.getAttribute('id');
                                                var reqBody ={
                                                    title:document.getElementById(notes._id).firstChild.innerText,
                                                    body:document.getElementById(notes._id).firstChild.nextSibling.innerText
                                                }
                                                console.log(reqBody)
                                                fetch(`http://localhost:3100/savenote/${notes._id}`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'authorization': this.getCookie("token"),
                                                        'content-type': 'application/x-www-form-urlencoded'
                                                    },
                                                    body:formurlencoded(reqBody)
                                                }).then((result) => {
                                                    if(result.status!=200){
                                                        render(<div>error</div>);
                                                    }
                                                    else{ return result.json()}
                                                }).then((result) => {
                                                    this.setState({ notes:result.reverse(),editableNote:null})
                                                }).catch((err) => {console.log(err)})
                                            }}>
                                            Save</button>
                                            </div>
                                    </div>
                                )
                            }
                            else{
                            return (

                                <div key={notes._id} id={notes._id} className="Notes" onClick={() => {
                                    this.setState({ editableNote: notes._id })
                                }}>
                                    <div className="noteTitle">{notes.title}</div>
                                    <div className="noteBody">{notes.body}</div>
                                </div>
                            )
                            }
                        })
                    }
                </div>
            </div>
        )
        else {
            if (this.state.accountExists) {
                return (
                    <div id="loginDiv">
                        <h1>Welcome To YourNote</h1>
                        <p id='invalidCredentials'>{
                            this.state.loginError}</p>
                        <h3>Username</h3>
                        <input type="text" placeholder="enter your username" id="username"></input>
                        <br />
                        <h3>Password</h3>
                        <input type="text" placeholder="enter your password" id="password"></input>
                        <br />
                        <button id="loginButton" onClick={() => {
                            var reqBody = {
                                username: document.getElementById('username').value,
                                password: document.getElementById('password').value,
                            }
                            fetch('http://localhost:3100/users/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: formurlencoded(reqBody)
                            }).then((response) => {
                                if (response.status != 200) {
                                    // this.setState({loginError:response.err})
                                    return response.json()
                                }
                                else {
                                    return response.json()
                                }
                            }).then((response) => {
                                console.log(response.err)
                                if (response.err) {
                                    this.setState({ loginError: response.err })
                                }
                                else {
                                    const cookies = new Cookies()
                                    cookies.set('token', 'Bearer ' + response.token, 'http://localhost:3100/savenote');
                                    fetch('http://localhost:3100/savenote', {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'text/plain',
                                            'authorization': this.getCookie("token")
                                        },

                                    }).then((results) => {
                                        if (results.status != 200) {
                                            console.log(results)
                                            this.setState({ notes: null })

                                        }
                                        else {
                                            return results.json()
                                        }
                                    }).then((notes) => {
                                        this.setState({ notes: notes })
                                    })
                                }
                            }).catch((error) => { console.log(error) });
                        }}>Login</button>
                        <p id="createAccountPara">don't have an account, create one</p>
                        <button id="signupButton" onClick={() => {
                            this.setState({ accountExists: false })
                        }}>SignUp</button>
                    </div>
                )
            }
            else {
                return (
                    <div id="signupForm">
                        <h1> Create a new account</h1>
                        <h3>Username</h3>
                        <input id="username" placeholder="enter your username"></input>
                        <h3>Password</h3>
                        <input id="password" placeholder="enter your password"></input>
                        <h3>First Name</h3>
                        <input id="FirstName" placeholder="enter your First Name"></input>
                        <h3>Last Name</h3>
                        <input id="LastName" placeholder="enter your Last Name"></input>
                        <button id="signupButton" onClick={() => {
                            var reqBody = {
                                username: document.getElementById('username').value,
                                password: document.getElementById('password').value,
                                firstName: document.getElementById('FirstName').value,
                                lastName: document.getElementById('LastName').value
                            }
                            fetch('http://localhost:3100/users', {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                body: formurlencoded(reqBody)
                            }).then((response) => {
                                if (response.status != 200) {
                                    render(response.body.err)
                                }
                                else {
                                    return response.json()
                                }
                            }).then((response) => {
                                this.setState({ accountExists: true })
                                console.log(response)
                            })
                        }}>Sign Up</button>
                    </div>
                )
            }
        }
    }
}

export default savedNotes