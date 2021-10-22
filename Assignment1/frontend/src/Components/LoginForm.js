import React from 'react';
import InputField from './InputField';

class LoginForm extends React.Component{
    
      render(){
          return(
            <div >
              <InputField type = 'email'
              placeholder = 'Email'
              name = 'email'
              onChange = {(event)=>this.props.onChange(event)}
              />
              <InputField type = 'password'
              placeholder = 'Password'
              name = 'password'
              onChange = {(event)=>this.props.onChange(event)}
              />
              <p className='error'>{this.props.err.check?'* '+this.props.err.msg:''}</p>
              <div className = 'button'>
                <button className='loginButton' type = 'button'
                  onClick = {()=>this.props.onLogin()}
                >Login
                  </button>
                <button className='registerButton' type = 'button'
                  onClick = {()=>this.props.onRegister()}
                >Register
                  </button>
              </div>
            </div>
          )
      }
}

export default LoginForm;