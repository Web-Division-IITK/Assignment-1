import React from 'react';
import formurlencoded from 'form-urlencoded';


class signup extends React.Component {


    state = {
        signupError: null,
    }

    signup(event, callback) {

    }

    render() {

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
                    <input type="text" id="FirstName" placeholder="optional"></input>
                    <h3>Last Name</h3>
                    <input type="text" id="LastName" placeholder="optional"></input>
                    <br />
                    <button id="signupButton" onClick={(e) => {
                        e.preventDefault();
                        var reqBody = {
                            username: document.getElementById('username').value,
                            password: document.getElementById('password').value,
                            firstName: document.getElementById('FirstName').value,
                            lastName: document.getElementById('LastName').value
                        }
                        fetch('https://yournoteserver.herokuapp.com/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            body: formurlencoded(reqBody)
                        }).then((response) => {
                            if (response.status != 200) {
                                response.json().then((err) => {
                                    this.setState({ signupError: err.err })
                                })
                            }
                            else {
                                return response.json()
                            }
                        }).then((response) => {
                            if (response) {
                                this.props.accountExists()
                            }
                        })
                    }}>Sign Up</button>
                </form>
            </div>

        )
    }
}

export default signup