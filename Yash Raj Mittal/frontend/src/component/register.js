import axios from 'axios';
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function Register({setIsLogin}) {
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

    const History = useHistory();

    const onRegister = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post('/users/register',{
                username : user.name,
                password : user.password,
                email : user.email
            })
            setUser({name:'',password:'',email:''});
            setErr(res.data.msg);
            return History.push('/');
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    }


    return (
                <div className="Register create-note">
                    <h2>Register</h2>
                    <form onSubmit={onRegister}>
                        <input type = "text" name = "name" id="register-name" placeholder="User Name" value={user.name} onChange={onChangeInput} required/>
                        <input type = "password" name = "password" id="register-password" placeholder="PassWord" value={user.password} onChange={onChangeInput} required/>
                        <input type = "email" name = "email" id="register-email" placeholder="Email" value={user.email} onChange={onChangeInput} required/>
                        <button type="submit">Register</button>
                    </form>
                    <span>Have account.<Link to='/'>Login</Link></span>
                    <h3>{err}</h3>
                </div>
    )
}
