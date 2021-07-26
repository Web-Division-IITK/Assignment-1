import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Form, Input, Button ,Checkbox,Alert,Spin} from 'antd';
import { UserOutlined, LockOutlined ,LoadingOutlined} from '@ant-design/icons';
import {Auth} from '../../context/AuthContext';
import './SignIn.css';

function SignIn(props){

  const {login} =Auth();
  const [Error,setError]=useState('');
  const history=useHistory();
  // const antIcon = <LoadingOutlined style={{ fontSize: 24,color:"white" }} spin />;
  const [spin,Setspin]=useState(false);

  async function onFinish (values) {
    console.log('Received values of form: ', values);

    try{
      console.log(values['username'],values['password']);
      await login(values['username'],values['password']);
      setError('');
      Setspin(true);
      history.push("/dashboard");
    }
    catch{
      console.log("hello");
      setError("Invalid username or password");
    }

  };

  return(
    <div style={{maxwidth :500,position:'relative'}}>
    <h1 style={{
      marginLeft:'auto',
      marginBottom:'auto',
      fontSize:30,
    }} ><b>LOGIN PAGE</b></h1>
    {Error && <Alert message={Error} type="error" />}
    <br/>
<Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {/*  */}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
        </Form.Item>
        &emsp;&emsp;&emsp;
        <a className="login-form-forgot" href="/forget">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">  
        {/* <Spin indicator={antIcon}/> */}
  
          Log in
        </Button>&emsp;
        Or <a href="/signup">register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
}

export default SignIn;