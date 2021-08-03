import React from 'react';
import formurlencoded from 'form-urlencoded'
import Cookies from 'universal-cookie';
class login extends React.Component {

    constructor(props) {
        super(props);
    }

    state={
        error:null
    }

    login(){
        
    }

    render() {
        return (
            <div id="loginDiv">
                <form>
                    <h1>Welcome To YourNote</h1>
                    <p id='invalidCredentials'>{
                        this.state.error}</p>
                    <h3>Username</h3>
                    <input type="text" placeholder="enter your username" id="username"></input>
                    <br />
                    <h3>Password</h3>
                    <input type="password" placeholder="enter your password" id="password"></input>
                    <br />
                    <button id="loginButton" onClick={(e) => {
                        e.preventDefault();
                        var reqBody = {
                            username: document.getElementById('username').value,
                            password: document.getElementById('password').value,
                        }
                        fetch('https://yournoteserver.herokuapp.com/users/login', {
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
                            if (response.err) {
                                this.setState({error: response.err})
                            }
                            else {
                                const cookies = new Cookies()
                                cookies.set('token', 'Bearer ' + response.token, 'https://yournoteserver.herokuapp.com/savenote');
                                fetch('https://yournoteserver.herokuapp.com/savenote', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'text/plain',
                                        'authorization': this.props.getCookie("token")
                                    },

                                }).then((results) => {
                                    if (results.status != 200) {
                                        this.props.importNote(null)

                                    }
                                    else {
                                        return results.json()
                                    }
                                }).then((notes) => {
                                    this.props.importNote(notes)
                                })
                            }
                        })

                    }}>Login</button>
                    <p id="createAccountPara">don't have an account, <a href="/" onClick={(e) => {
                        this.props.navigateToSignup(e)
                    }}>create one</a></p>
                </form>
            </div>
        )
    }

}

export default login