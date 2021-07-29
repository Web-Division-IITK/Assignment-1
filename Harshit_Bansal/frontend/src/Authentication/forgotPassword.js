import { useState} from 'react';
import { React } from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Input, Alert, Spin} from 'antd'
import {  MailOutlined } from '@ant-design/icons';
import './index.css'
import {useAuth} from './../contexts/AuthContext';


 function ForgotPassword(props){
  const {currentUser, resetPassword} = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
    async function onFinish(values){
        setLoading(true);

        try{
          
          await resetPassword(values['email']);
          setError('');
          setMessage('Check your email for the password reset link.');
        }
        catch{
          setError("Failed to send email!");
        }
        setLoading(false);

    };
    return(
      <div style={{minWidth:"300px"}}>
      <h2 style={{textAlign:'center', marginBottom:'60'}}>Reset Password</h2>
      {error &&<Alert type='error' message={error}/>}
      {message && <Alert type='success' message={message}/>}
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
    
     

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" disabled={loading}>
          {loading?<Spin/>:<>Send Email</>}
        </Button>
        <Link  to="/login" style={{fontSize:"15px"}}>Log in</Link>
      </Form.Item>
    </Form>
    </div>
  );

    
    
}
export default ForgotPassword;