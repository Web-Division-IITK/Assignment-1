import React ,{useState} from 'react';
import {Form, Button, Select, Input,Alert,Checkbox} from 'antd';
 import {Auth} from '../context/AuthContext';
 import {useHistory} from 'react-router-dom';
const {Option } = Select;

function SignUp(props){

  const {signup}= Auth();
  const [Error,setError] =useState('');
  const[Loading,setLoading]=useState(false);
  const history=useHistory();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  async function onFinish  (values) {
      
    if(values['password']!==values['confirm']){
      return setError('Password do not match');
     }


     try{ 
         setError('');
         
         await signup(values['email'],values['password']);
         setLoading(true);
         history.push('/dashboard');
         
  } catch {
    setError('Failed to create a account');
  }
  setLoading(false);
}

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

    return(

    <div>
    <br/><br/>
    <h1 style={{
      marginLeft:140,
      marginBottom:'auto',
      fontSize:30,
    }} ><b>SIGNUP PAGE</b></h1>
    <br/><br/>
    <Form
    {...formItemLayout}
    
    name="register"
    onFinish={onFinish}
    
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
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form.Item>

      <Form.Item
      {...tailFormItemLayout}
      name="Already"
      >Have an account: 
      <a href="/" >Click here to LogIn</a>
      </Form.Item>
  </Form>
  </div>


    );
}
export default SignUp;

