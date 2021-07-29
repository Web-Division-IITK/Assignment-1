import React from 'react';
import './index.css';
import {Layout} from 'antd';
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
                This Note Taking app is under development.
            </p>
        </Footer>
    </Layout>
    );

}
export default MainPage ;