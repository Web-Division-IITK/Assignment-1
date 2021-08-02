import React, { useState } from 'react';
import { Form, Input, Button,Alert } from 'antd';


export default function Forget(props){
    
    const [formLayout, setFormLayout] = useState('horizontal');
      
        const onFormLayoutChange = ({ layout }) => {
          setFormLayout(layout);
        };
    
      
        const formItemLayout =
          formLayout === 'horizontal'
            ? {
                labelCol: {
                  span: 4,
                },
                wrapperCol: {
                  span: 14,
                },
              }
            : null;
            
            const[success,Setsuccess]=useState(false);

            async function onFinish (values) {
                console.log('Received values of form: ', values);

                Setsuccess(true);
              };

            const tailFormItemLayout = {
                wrapperCol: {
                  xs: {
                    span: 24,
                    offset: 0,
                  },
                  sm: {
                    span: 16,
                    offset: 4,
                  },
                },
              };

    return(
        <Form
        {...formItemLayout}
        onValuesChange={onFormLayoutChange}
        >
            <br/><br/>
            <h1 style={{align:"center",marginLeft:110}}><b>Forgot Password</b></h1>
            {success && <Alert message="Password reset Instruction has been sent to your email" type="success" />}
            <br/><br/>

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
                <Input placeholder="Enter your email address" style={{width:300}}/>
            </Form.Item>

           

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" style={{width:300}} onClick={onFinish}>
                Send reset mail
                </Button>
            </Form.Item>

        </Form>
    ); 
}