import React from 'react';
import { Menu, Dropdown , message} from 'antd';
import { DownOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {useAuth} from "./../contexts/AuthContext";
import {useHistory, Link} from 'react-router-dom';

import './index.css';
function NavProfileMenu(props){
    const {currentUser, logout}  = useAuth();
    
    
    
    const history = useHistory();
    async function logoutUser() {
        
        try{
            await logout();
            history.push('/login');

        }catch{
            message.error('Error occured while logging out!');
        }
     
     
    }

var menu = (
  <Menu>
    <Menu.Item disabled>
      <Link target="_blank" rel="noopener noreferrer" to="/profile">
        Profile
      </Link>
    </Menu.Item>
    <Menu.Item icon={<SettingOutlined />} disabled>
      <a target="_blank" rel="noopener noreferrer" href="">
        Settings
      </a>
    </Menu.Item>
    <Menu.Item danger onClick={()=>logoutUser()}>Log out</Menu.Item>
  </Menu>
);

return(
  <Dropdown overlay={menu} icon={<UserOutlined/>} >
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:'white', float:'right'}}>
       <DownOutlined />
       Welcome {currentUser && currentUser.username}
    </a>
  </Dropdown>
);
}
export default NavProfileMenu;