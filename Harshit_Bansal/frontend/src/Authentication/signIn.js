import { useState } from 'react';
import { React } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Button, Form, Input, Checkbox, Alert, Spin} from 'antd'
import {  LockOutlined, MailOutlined } from '@ant-design/icons';
import './index.css'
import {useAuth} from './../contexts/AuthContext';


 function SignInWindow(props){
  const {currentUser, login} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    async function onFinish(values){
        setLoading(true);
        console.log("Form Values received: ",values);
        
      
        try{
          
          await login(values['email'],values['password']);
          setError('');
          history.push('/');
        }
        catch{
          setError("Invalid Username or Password");
        }
        setLoading(false);

    };
    return(
      <div style={{minWidth:"300px"}}>
      <h2 style={{textAlign:'center', marginBottom:'60'}}>Log In</h2>
      {error &&<Alert type='error' message={error}/>}
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
    
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
          minLength="6"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="/forgot-password" style={{float:"right"}}>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={loading}>
          {loading?<Spin/>:<>Log In</>}
        </Button>
        Or <Link  to="/signUp">register now!</Link>
      </Form.Item>
    </Form>
    </div>
  );

    
    
}
export default SignInWindow;