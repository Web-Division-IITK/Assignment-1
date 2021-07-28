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
        important: [],
        accountExists: true,
        loginError: null,
        signupError: null,
        options: null,
        importantOptions: null,
        editableNote: null,
        active: 'home'
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
    important() {
        if (this.state.important.length === 0) {
            return (<p id="invalidCredentials" style={{ textAlign: 'center', marginTop: '100px' }}>You have not marked any note as important. Mark them to see here</p>)
        }
    }
    notification() {

        if (this.state.notes.length == 0) {
            return (<p id="notification">You have not saved any notes. Save them to see here</p>)
        }
    }
    componentDidMount() {
        fetch('http://3.142.94.241:3100/savenote', {
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
                return results.json().then((notes) => {
                    if (notes) {
                        this.setState({ notes: notes.reverse() })
                    }
                })
            }
        })}
        render() {
            if (this.state.active == "important" && this.state.important != null && this.state.notes != null) return (
                <div className="App">
                    <nav >
                        <div className="navContent" id="appName" onClick={(e) => {e.preventDefault(); this.setState({ active: 'home' }) }}>
                            Notes
                        </div>
                        <div className="navContent" id="importantNav" onClick={(e) => {e.preventDefault(); this.setState({ active: 'important' }) }}>
                            Importants
                        </div>
                        <img src="/download.png" alt="logout" id="logoutButton" onClick={(e) => {e.preventDefault();
                            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                            this.setState({ notes: null })
                        }} />
                    </nav>
                    {this.important()}
                    <div id="important">{
                        this.state.important.map((notes) => {
                            if (notes._id === this.state.importantOptions) {
                                return (
                                    <div key={notes._id} id={notes._id} className="Notes" >
                                        <div className="rightCorner">
                                            <div id="options">
                                                <button onClick={(e) => {e.preventDefault();
                                                    fetch(`http://3.142.94.241:3100/savenote/${notes._id}/important`, {
                                                        method: 'DELETE',
                                                        headers: {
                                                            'Content-Type': 'text/plain',
                                                            'authorization': this.getCookie("token")
                                                        }

                                                    }).then((response) => {
                                                        if (response.status == 200 || response.status == 304) {
                                                            response.json().then((important) => { this.setState({ important: important }) })
                                                        }
                                                        else render(<p>error</p>)
                                                    })
                                                }}>remove</button>
                                            </div>
                                            <img src='/download1.png' className="threeDots" onClick={(e) => {e.preventDefault(); this.setState({ importantOptions: null }) }} />
                                        </div>
                                        <div className="noteTitle ">{notes.title}</div>
                                        <div className="noteBody" >{notes.body}</div>
                                    </div>)
                            }

                            else {
                                return (<div key={notes._id} id={notes._id} className="Notes">
                                    <div className="rightCorner">
                                        <img src='/download1.png' className="threeDots" onClick={(e) => {e.preventDefault();
                                            this.setState({ importantOptions: notes._id })
                                        }} />
                                    </div>
                                    <div className="noteTitle">{notes.title}</div>
                                    <div className="noteBody">{notes.body}</div>
                                </div>)
                            }
                        })}</div>
                </div >
            )
            else if (this.state.notes != null && this.state.active == 'home') return (
                <div className="App" >
                    <nav >
                        <div className="navContent" id="appName" onClick={(e) => {e.preventDefault(); this.setState({ active: 'home' }) }}>
                            Notes
                        </div>
                        <div className="navContent" id="importantNav" onClick={(e) => {e.preventDefault();
                            this.setState({ active: 'important', options: null, editableNote: null })
                            if (this.state.important.length === 0) {
                                fetch(`http://3.142.94.241:3100/savenote/important/`, {
                                    method: 'GET',
                                    headers: {
                                        'content-type': 'text/plain',
                                        'authorization': this.getCookie("token")
                                    }
                                }).then((response) => {
                                    if (response.status != 200 && response.status != 304) {
                                        console.log('Error')
                                        return { err: "error" }
                                    }
                                    else {
                                        return response.json()
                                    }
                                }).then((importants) => {
                                    this.setState({ important: importants })
                                }).catch(() => { this.setState({ active: 'home' }) })
                            }
                        }}>
                            Importants
                        </div>
                        <img src="/download.png" alt="logout" id="logoutButton" onClick={(e) => {e.preventDefault();
                            document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
                            this.setState({ notes: null })
                        }} />
                    </nav>
                    <div onClick={(e) => {e.preventDefault(); this.setState({ editableNote: null }) }}>
                        <div className="addNote" id="title">
                            <h2 id="title">Add Title</h2>
                            <textarea id="addTitle" rows="2" columns="5" />
                        </div>
                        <div className="addNote" id="title">
                            <h3 id="Body">Add Note</h3>
                            <textarea id="addNote" rows="15" columns="5" />
                        </div>
                        <button id="saveButton" className="addNote" onClick={(e) => {e.preventDefault();
                            var title = document.getElementById('addTitle').value;
                            var note = document.getElementById('addNote').value;
                            document.getElementById('addTitle').value = '';
                            document.getElementById('addNote').value = '';
                            const reqBody = {
                                title: title,
                                body: note
                            }
                            fetch('http://3.142.94.241:3100/savenote/', {
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
                    {this.notification()}
                    <div id="savedNotes">
                        {
                            this.state.notes.map((notes) => {
                                if (notes._id == this.state.editableNote) {
                                    return (

                                        <div key={notes._id} id={notes._id} className="editableNotes" >
                                            <div className="noteTitle editable" contentEditable='true' suppressContentEditableWarning={true}>{notes.title}</div>
                                            <div className="noteBody editable" contentEditable='true' suppressContentEditableWarning={true}>{notes.body}</div>

                                            <div id='buttons'>
                                                <button className="deleteButton"
                                                    onClick={(e) => {
                                                        // var _id = e.currentTarget.parentElement.getAttribute('id');
                                                        var reqBody = {
                                                            title: document.getElementById(notes._id).firstChild.innerText,
                                                            body: document.getElementById(notes._id).firstChild.nextSibling.innerText
                                                        }
                                                        console.log(reqBody)
                                                        fetch(`http://3.142.94.241:3100/savenote/${notes._id}`, {
                                                            method: 'PUT',
                                                            headers: {
                                                                'authorization': this.getCookie("token"),
                                                                'content-type': 'application/x-www-form-urlencoded'
                                                            },
                                                            body: formurlencoded(reqBody)
                                                        }).then((result) => {
                                                            if (result.status != 200) {
                                                                render(<div>error</div>);
                                                            }
                                                            else { return result.json() }
                                                        }).then((result) => {
                                                            this.setState({ notes: result.reverse(), editableNote: null })
                                                        }).catch((err) => { console.log(err) })
                                                    }}>
                                                    Save</button>
                                            </div>
                                        </div>
                                    )
                                }
                                else if (this.state.options == notes._id) {
                                    return (
                                        <div key={notes._id} id={notes._id} className="Notes" >
                                            <div className="rightCorner">
                                                <div id="options">
                                                    <button onClick={(e) => {
                                                        this.setState({ editableNote: null, options: null })
                                                        fetch(`http://3.142.94.241:3100/savenote/${notes._id}`, {
                                                            method: 'DELETE',
                                                            headers: {
                                                                'authorization': this.getCookie("token"),
                                                                'content-type': 'text/plain'
                                                            }
                                                        }).then((result) => {
                                                            if (result.status !== 200) {
                                                                result.json().then((err) => { console.log(err) })
                                                            }
                                                            else {
                                                                result.json().then((result) => { this.setState({ notes: result }) })

                                                            }
                                                        })
                                                    }}>delete</button>
                                                    <button onClick={(e) => {e.preventDefault(); this.setState({ editableNote: notes._id, options: null }) }}>edit</button>
                                                    <button onClick={(e) => {e.preventDefault();
                                                        fetch(`http://3.142.94.241:3100/savenote/${notes._id}/important`, {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'text/plain',
                                                                'authorization': this.getCookie("token")
                                                            },

                                                        }).then((response) => { if (response.status == 200 || response.status == 304) { response.json().then((response) => { this.setState({ important: response, options: null }) }) } })
                                                    }}>important</button>
                                                </div>
                                                <img src='/download1.png' className="threeDots" onClick={(e) => {e.preventDefault();
                                                    this.setState({ options: null })
                                                }}></img>
                                            </div>
                                            <div className="noteTitle ">{notes.title}</div>
                                            <div className="noteBody" >{notes.body}</div>
                                        </div>
                                    )
                                }
                                else {
                                    return (

                                        <div key={notes._id} id={notes._id} className="Notes">
                                            <div className="rightCorner">
                                                <img src='/download1.png' className="threeDots" onClick={(e) => {e.preventDefault();
                                                    this.setState({ options: notes._id })
                                                }}></img>
                                            </div>
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
                            <form>
                                <h1>Welcome To YourNote</h1>
                                <p id='invalidCredentials'>{
                                    this.state.loginError}</p>
                                <h3>Username</h3>
                                <input type="text" placeholder="enter your username" id="username"></input>
                                <br />
                                <h3>Password</h3>
                                <input type="password" placeholder="enter your password" id="password"></input>
                                <br />
                                <button id="loginButton" onClick={(e) => {e.preventDefault();
                                    var reqBody = {
                                        username: document.getElementById('username').value,
                                        password: document.getElementById('password').value,
                                    }
                                    fetch('http://3.142.94.241:3100/users/login', {
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
                                            cookies.set('token', 'Bearer ' + response.token, 'http://3.142.94.241:3100/savenote');
                                            fetch('http://3.142.94.241:3100/savenote', {
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

                                <button id="signupButton" onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ accountExists: false })
                                }}>SignUp</button>
                            </form>
                        </div>
                    )
                }
                else {
                    return (
                        <div id="signupForm">
                            <form>
                                <h1> Create a new account</h1>
                                <p id="invalidCredentials">{this.state.signupError}</p>
                                <h3>Username</h3>
                                <input type="text" id="username" placeholder="enter your username"></input>
                                <h3>Password</h3>
                                <input type="password" id="password" placeholder="enter your password"></input>
                                <h3>First Name</h3>
                                <input type="text" id="FirstName" placeholder="enter your First Name"></input>
                                <h3>Last Name</h3>
                                <input type="text" id="LastName" placeholder="enter your Last Name"></input>
                                <br/>
                                <button id="signupButton" onClick={(event) => {
                                    event.preventDefault();
                                    var reqBody = {
                                        username: document.getElementById('username').value,
                                        password: document.getElementById('password').value,
                                        firstName: document.getElementById('FirstName').value,
                                        lastName: document.getElementById('LastName').value
                                    }
                                    fetch('http://3.142.94.241:3100/users', {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        body: formurlencoded(reqBody)
                                    }).then((response) => {
                                        if (response.status != 200) {
                                            response.json().then((err) => {
                                                this.setState({ signupError: err.err })
                                                console.log(err)
                                            })
                                        }
                                        else {
                                            return response.json()
                                        }
                                    }).then((response) => {
                                        if (response) {
                                            this.setState({ accountExists: true })
                                            console.log(response)
                                        }
                                    })
                                }}>Sign Up</button>
                            </form>
                        </div>
                    )
                }
            }
        }
    }

    export default savedNotes