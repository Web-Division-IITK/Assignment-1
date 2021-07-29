import React from 'react';
import { Layout,Grid } from 'antd';
// import SignIn from './SignIn.js';
// import SignUp from './SignUp.js';
import {AuthProvider} from '../context/AuthContext';
import '../index.css'
const { Header, Content, Footer } = Layout;

export default function MainLayout(props) {
    return (
        
        <Layout >
            <Header>
                <h1 style={{
                    color:"white",
                    textAlign:'center',
                }}><b>NOTE</b></h1>
            </Header>
            <div style={{width:400,
            marginLeft:'auto',
            marginRight:'auto',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'}}>
                    
            <Content className="site-layout-content">  
                {props.item}
            </Content>
               

            </div>
            <Footer style={{
                textAlign:'center'
            }}>
                Note Taking Site
            </Footer>
        </Layout>
        
    );
}
