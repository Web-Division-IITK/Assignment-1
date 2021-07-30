import React from 'react';
import LoginForm from './Components/LoginForm';
import './App.css';
import NotePage from './Components/NotePage';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={email : '',
    password : '',
    isLoggedIn : false,
    isRegistered : true,
    token : ''
    };
  }

  handleChange(event){
    let nam = event.target.name;
    if(event.target.value){
      this.setState({[nam] : event.target.value});
    }
  }

  changeRegister(){
    this.setState({isRegistered:false});
  }

  changeLogin(){
    this.setState({isLoggedIn:false});
  }

  async handleRegister() {
    if(!this.state.email||!this.state.password){
      alert('Incomplete submission');
      return;
    }
    try{
      let req = {
        method : 'POST',
        headers : {
          'authorization' : '', 
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          email : this.state.email,
          password : this.state.password
        })
      };
      let res = await fetch('http://localhost:5000/register',req);
      let response = await res.json();
      if(res.status === 200){
        let token = response.token;
        this.setState({token : 'Bearer '+token,isLoggedIn : true,isRegistered:true});
      }else{
        alert(response.msg);
        this.setState({isRegistered:true});
      }
    }
    catch(err){
      console.log(err);
      alert(err);
    }
  }

  async handleLogin() {
    if(!this.state.email||!this.state.password){
      alert('Incomplete submission');
      return;
    }
    try{
      let req = {
        method : 'POST',
        headers : { 
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          email : this.state.email,
          password : this.state.password
        })
      };
      let res = await fetch('http://localhost:5000/login',req);
      let response = await res.json();
      if(res.status === 200){
        let token = response.token;
        this.setState({token : 'Bearer '+token,isLoggedIn : true,isRegistered:true});
      }else{
        alert(response.msg);
        this.setState({isRegistered:false});
      }
    }
    catch(err){
      console.log(err);
      alert(err);
    }
  }

  render(){

    if(!this.state.isLoggedIn){
      return(
        <div className = 'loginForm'>
          <h1 className='heading'> NoteIT</h1>
            <h2 className = 'heading2'>{this.state.isRegistered?'Login':'Register'}</h2>
            <LoginForm  isRegistered = {this.state.isRegistered}
            onChange = {(event)=>this.handleChange(event) }
            onRegister = {()=>this.handleRegister()}
            onLogin = {()=>this.handleLogin()}
            />
        </div>
      )
    }
    else{
      return(
        <NotePage email = {this.state.email}
        token = {this.state.token}
        changeLogin = {()=>this.changeLogin()}
        changeRegister = {()=>this.changeRegister()}
        />
      )
    }
    
  }
}


export default App;
