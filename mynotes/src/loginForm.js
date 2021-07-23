import React from "react";
import {render} from 'react'
import formurlencoded from 'form-urlencoded';
import Cookies from 'universal-cookie';
class loginForm extends React.Component {
    constructor(props) {
        super(props);
    }
    state={
        accountExists:true
    }
    login() {
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
                render(<p>error</p>)
            }
            else {
                return response.json()
            }
        }).then((response) => {
            console.log(response)
            const cookies = new Cookies()
            cookies.set('token', 'Bearer ' + response.token, 'http://localhost:3100/savenote')
        }).catch((error) => { console.log(error) });
    }
    signUp(){
        var reqBody={
        username:document.getElementById('username').value,
        password:document.getElementById('password').value,
        firstName:document.getElementById('FirstName').value,
        lastName:document.getElementById('LastName').value
    }
        fetch('http://localhost:3100/users',{
            method: 'POST',
            headers:{
                'content-type': 'application/x-www-form-urlencoded'
            },
            body:formurlencoded(reqBody)
        }).then((response) => {
            if(response.status != 200){
                render(response.body.err)
            }
            else {
                return response.json()
            }
        }).then((response) => {console.log(response)})
    }
    render() {
        if(this.state.accountExists){
            return(
                <div id="loginDiv">
                 <h1>Welcome To YourNote</h1>
                 <h3>Username</h3>
                 <input type="text" placeholder="enter your username" id="username"></input>
                 <br />
                 <h3>Password</h3>
                <input type="text" placeholder="enter your password" id="password"></input>
                 <br />
                 <button id="loginButton" onClick={this.login}>Login</button>
                 <p id="createAccountPara">don't have an account, create one</p>
                 <button id="signupButton" onClick={()=>{
                     this.setState({accountExists:false})
                 }}>SignUp</button>
             </div>
            )
        }
        else{
            return(
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
                    <button id="signupButton" onClick={this.signUp}>Sign Up</button>
                </div>
            )
        }
    }
}

export default loginForm