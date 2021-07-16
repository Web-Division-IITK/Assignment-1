import React from 'react';
import './index.css';
import {Layout} from 'antd';
import SignInWindow from './signIn.js';
import SignUpWindow from './signUp.js';
const {Header, Footer} = Layout;

function MainPage(props){
    return(
        <Layout>
        <Header>
            <h1
                style={{textAlign:'center', backgroundColor:'#FFFFFF'}}
            >
                NOTE IT
            </h1>
        </Header>
        <Layout 
            style={{ 
                    marginLeft:'auto',
                    marginRight:'auto',
                    marginTop:150,
                    marginBottom:100}}
            >
            {props.display}
        </Layout>
        <Footer>
            <p
                style={{textAlign:'center', color:'red'}}
            >
                Note Taking App developed by ME :)
            </p>
        </Footer>
    </Layout>
    );

}
export default MainPage ;