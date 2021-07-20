import React, { useEffect } from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import MyNotes from './MyNotes/myNotes';
import {PaperClipOutlined,  } from '@ant-design/icons';
import {useAuth} from './../contexts/AuthContext'
import {useHistory} from 'react-router-dom';
import NavProfileMenu from "./navProfileMenu";

const {Header, Sider, Content, Footer} = Layout;
function BaseLayout(props){

    const {currentUser, logout} = useAuth();
    const history = useHistory();
    useEffect(()=>{
      if(currentUser == null){
        history.push(`/login`);
      }
      
    },[]);
    
    return(
        <Layout>
    <Header className="header">
    

 
      <h2 style={{color:'white',textAlign:'center'}} >Note It</h2>
      
    </Header>
    
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={"1"}
          style={{ height: '100%', borderRight: 0 }}
        >
          
            <Menu.Item key="1" >My Notes</Menu.Item>
            <Menu.Item key="2" >Editor</Menu.Item>
            <Menu.Item key="3">About</Menu.Item>
            <Menu.Item key="4">Deleted Notes</Menu.Item>

        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 600,

          }}
        >
       <NavProfileMenu/>
        <p><strong>User email:</strong> {currentUser && currentUser.email}</p>
          <MyNotes/>
        </Content>
      </Layout>
    </Layout>
    <Footer style={{fontSize:"30px", color:"red", textAlign:"center"}}>
      This is under development!
    </Footer>
  </Layout>

    );
}
export default BaseLayout;