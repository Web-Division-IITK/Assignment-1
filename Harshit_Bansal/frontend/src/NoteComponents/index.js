import React, { useEffect } from 'react';
import {Layout, Menu} from 'antd';
import MyNotes from './MyNotes/myNotes';
import {PaperClipOutlined, EditOutlined, InfoCircleOutlined, DeleteColumnOutlined }from '@ant-design/icons';
import {useAuth} from './../contexts/AuthContext'
import {useHistory} from 'react-router-dom';
import NavProfileMenu from "./navProfileMenu";
import {useNoteContext} from './../contexts/NoteContext';
import Editor from './Editor/editor';
import About from "./About/about";
import DeletedNotes from './DeletedNotes/deletedNotes';
import "./index.css";
const {Header, Sider, Content, Footer} = Layout;
function BaseLayout(props){
    const {siderKey, currentPage, setCurrentDisplayPage} = useNoteContext();
    const {currentUser} = useAuth();
    const history = useHistory();
    useEffect(()=>{
      if(currentUser == null){
        history.push(`/login`);
      }
      setCurrentDisplayPage(<MyNotes/>,"1")
      
    },[]);
    
    return(
        <Layout>
    <Header className="header" style={{textAlign:'center'}}>
    

      <div  style={{textAlign:'center'}}>
      
        <h2 style={{color:'white', display:'inline'}} >Note It</h2> 
        <NavProfileMenu/>
      </div>
      
      
    </Header>
    
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          theme="dark"
          openKeys={[siderKey]}
          selectedKeys={[siderKey]}
          style={{ height: '100%', borderRight: 0 }}
        >
          
            <Menu.Item key="1" onClick={()=>setCurrentDisplayPage(<MyNotes/>,"1")} 
            icon={<PaperClipOutlined/>} >My Notes</Menu.Item>

            <Menu.Item key="2" onClick={()=>setCurrentDisplayPage(<Editor/>,"2")}
              icon={<EditOutlined/>} >Editor</Menu.Item>
            <Menu.Item key="3" onClick={()=>setCurrentDisplayPage(<About/>,"3")}
              icon={<InfoCircleOutlined/>}>About</Menu.Item>
            <Menu.Item key="4" onClick={()=>setCurrentDisplayPage(<DeletedNotes/>,"4")}
              icon={<DeleteColumnOutlined/>}>Deleted Notes</Menu.Item>

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
       
        <p><strong>User email:</strong> {currentUser && currentUser.email}</p>
          {currentPage}
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