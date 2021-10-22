import React from 'react';
import LoginForm from './Components/LoginForm';
import './App.css';
import NotePage from './Components/NotePage';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={email : localStorage.getItem('email'),
    password : '',
    token : localStorage.getItem('token'),
    isLoggedIn : localStorage.getItem('token')?true:false,
    isRegistered : true,
    error : {check:false,msg:''}
    };
  }

  handleChange(event){
    let nam = event.target.name;
    if(nam==='email'){
      localStorage.setItem('email',event.target.value);
    }
    if(event.target.value){
      this.setState({[nam] : event.target.value,error:{check:false,msg:''}});
    }
  }

  changeRegister(){
    localStorage.setItem('token','');
    this.setState({isRegistered:false,token:''});
  }

  changeLogin(){
    localStorage.setItem('token','');
    this.setState({isLoggedIn:false,token:''});
  }

  async handleRegister() {
    if(!this.state.email||!this.state.password){
      this.setState({error:{check:true,msg:'Incomplete submission'}})
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
      let res = await fetch('/register',req);
      let response = await res.json();
      if(res.status === 200){
        let token = response.token;
        localStorage.setItem('token','Bearer '+token);
        this.setState({token : 'Bearer '+token,isLoggedIn : true,isRegistered:true});
      }else{
        this.setState({error:{check:true,msg:response.msg},isRegistered:true});
      }
    }
    catch(err){
      console.log(err);
      alert(err);
    }
  }

  async handleLogin() {
    if(!this.state.email||!this.state.password){
      this.setState({error:{check:true,msg:'Incomplete submission'}})
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
      let res = await fetch('/login',req);
      console.log(res);
      let response = await res.json();
      if(res.status === 200){
        let token = response.token;
        localStorage.setItem('token','Bearer '+token);
        this.setState({token : 'Bearer '+token,isLoggedIn : true,isRegistered:true});
      }else if(res.status===400){
        this.setState({error:{check:true,msg:response.msg},isRegistered:false});
      }else{
        this.setState({error:{check:true,msg:response.msg}});
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
            err = {this.state.error}
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
