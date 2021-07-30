import React from 'react'
import { Layout, Menu, Breadcrumb ,Avatar,Dropdown} from 'antd';
import { UserOutlined, LaptopOutlined, FormOutlined ,DownOutlined,DeleteOutlined,StarOutlined} from '@ant-design/icons';
import './dashboard.css';
import {Auth} from '../context/AuthContext';
import Home from './Home/home';
import Delete from './DeleteNote/delete';
import {useNoteContext} from '../context/NoteContext';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default function Dashboard (props) {

    const {CurrentUser}=Auth();
    const {set_key,key,selectedNote} =useNoteContext();
    const menu = (
      <Menu>

        <Menu.Item key="0">
          <a href="">Help</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/login" style={{color:"red"}}>LogOut</a>
        </Menu.Item>
        
      </Menu>
    );

    function AllNotes(key_id){
          console.log(key_id);
          set_key(key_id);
    }

    return (
            <Layout>
                <Header className="header">
                <div className="logo" />
                  <Menu theme="dark" mode="horizontal" >
                      {/* <Menu.Item key="1">Home</Menu.Item>
                       <Menu.Item key="2" >nav 2</Menu.Item>
                      <Menu.Item key="3">nav 3</Menu.Item>  */}
                      
                      {/* <Menu.Item key="4" style={{marginLeft:1000}}><Avatar style={{ backgroundColor: '#87d068',color:'white'}} icon={<UserOutlined />} >Welcome</Avatar></Menu.Item> */}
                      <h2><b style={{color:"white"}}>Note It</b></h2>
                      <Avatar style={{ backgroundColor: '#87d068'}} icon={<UserOutlined />} style={{marginTop:15,marginLeft:1120}}>Welcome</Avatar>
                      <Dropdown overlay={menu} trigger={['click']} >
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()} >
                          {CurrentUser && CurrentUser.email} <DownOutlined />
                        </a>
                      </Dropdown>
                  </Menu>
                </Header>

            <Layout>
                <Sider width={200} className="site-layout-background" >
                  <Menu
                    mode="inline"
                    openKeys={key}
                    selectedKeys={key}
                    style={{ height: '100%', borderRight: 0 }}
                  >
                  <Menu.Item key="1" icon={<LaptopOutlined />} onClick={()=>AllNotes("1")}>All notes</Menu.Item>
                  <Menu.Item key="2" icon={<FormOutlined />} onClick={()=>AllNotes("2")} disabled={selectedNote === null}>Edit Notes</Menu.Item>
                  <Menu.Item key="3" icon={<StarOutlined />} onClick={()=>AllNotes("3")}>Favourites</Menu.Item>
                  <Menu.Item key="4" icon={<DeleteOutlined />} onClick={()=>AllNotes("4")}>Deleted Notes</Menu.Item>

              </Menu>
            </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
         {props.body}
        </Content>
      </Layout>
    </Layout>
  </Layout>
       
    );
}
