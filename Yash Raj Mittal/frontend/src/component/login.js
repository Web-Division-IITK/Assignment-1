import axios from 'axios';
import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Login({setIsLogin}) {
    const [user , setUser] = useState({
        "name" : "",
        "password": "",
        "email": ""
    });
    const [err , setErr] = useState('');

    const onChangeInput = e =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value});
        setErr('');
    }


    const onLogin = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post('/users/login',{
                username : user.name,
                password : user.password
            })
            setUser({name:'',password:'',email:''});
            localStorage.setItem('tokenStore',res.data.token);
            setIsLogin(true);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    }

    return (
                <div className="Login create-note">
                    <h2>Login</h2>
                    <form onSubmit={onLogin}>
                        <input type = "text" name = "name" id="login-name" placeholder="User Name" value={user.name} onChange={onChangeInput} required/>
                        <input type = "password" name = "password" id="login-password" placeholder="PassWord" value={user.password} onChange={onChangeInput} required/>
                        <button type="submit">Login</button>
                    </form>
                    <span>Don't Have account.<Link to='/register'>Register</Link></span>
                    <h3>{err}</h3>
                </div>
    )
}
