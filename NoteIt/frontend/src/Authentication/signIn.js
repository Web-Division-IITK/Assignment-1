import { useState, setState } from 'react';
import { React } from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Input, Checkbox, Layout} from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import './index.css'
const {Header, Sider, Footer} = Layout;

function SignInWindow(props){

    const onFinish = (values)=>{
        console.log("Form Values received: ",values);

        fetch('http://localhost:5000/verify',
              {
                method:'GET',
                headers:new Headers({
                  email:values['email'],
                  password:values['password']
                })
              }
        ).then(res=>res.text())
        .then(res=>{
          
          console.log(res);
          if(res==='yes'){
            alert('Logged in!');
          }
          else{
            alert('Wrong credentials');
          }
        });
    };
    return(
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {/* <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item> */}
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />}placeholder="Email" />
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
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log In
        </Button>
        Or <Link  to="/signUp">register now!</Link>
      </Form.Item>
    </Form>
  );

    
    
}
export default SignInWindow;