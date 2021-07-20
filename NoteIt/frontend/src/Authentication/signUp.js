import './index.css';
import { Form, Input, Checkbox, Button, Alert, Spin } from 'antd';
import React from 'react';
import { useState } from 'react';
import {useHistory, Link} from 'react-router-dom'
import {useAuth} from './../contexts/AuthContext';


function SignUpWindow(props){
  const {signUp} = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
      };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 16,
            offset: 8,
            },
        },
    };
    async function onFinish(values){
        console.log('Received values of form: ', values);
        setLoading(true);
      //   fetch("http://localhost:5000/create-user",{
      //     method:"GET",
      //     headers: new Headers({
      //       email:values['email'],
      //       password:values['password'],
      //       nickname:values['nickname']
      //     })
      //   }
      //   ).then(res=>res.text())
      //   .then(res=>{
      //     if(res===true)
      //       alert("Account created successfully");
        
      //   else{
      //     alert("Error in creating account. Either account on this email already exists or email is not valid.")
      //   }
      //  } );

      try{
        await signUp(values['email'], values['password'], values['nickname']);
        setError(null);
        history.push('/');
      }
      catch{
        setError("Error creating account");
      }
      setLoading(false);
    }
    const comp = (
      <div style={{minWidth:"500px"}}>
      <h2 style={{textAlign:'center', marginBottom:'60'}}>
        Sign Up
      </h2>
      {error &&<Alert type="error" message={error} style={{textAlign:"center"}}/>}
        <Form
      {...formItemLayout}
      
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
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
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 6,
            message: 'The password should be at least 6 characters long!',
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
          {
            min: 6,
            message: 'Password must be at least 6 characters long!',
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={loading}>
         {loading?<Spin/>: <>Register</>}
        </Button>
      </Form.Item>
      <Form.Item>
        <p>Already have an account? <Link to='/login'>Log In</Link></p>
      </Form.Item>
    </Form>
    </div>
    );
    return comp;
}
export default SignUpWindow;