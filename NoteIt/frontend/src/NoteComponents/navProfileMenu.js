import React from 'react';
import { Menu, Dropdown , message} from 'antd';
import { DownOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {useAuth} from "./../contexts/AuthContext";
import {useHistory, Link} from 'react-router-dom';
import { useState } from 'react';
import './index.css';
function NavProfileMenu(props){
    const {currentUser, logout}  = useAuth();
    
    const [loading, setLoading] = useState(false);
    
    const history = useHistory();
    async function logoutUser() {
        setLoading(true);
        try{
            await logout();
            history.push('/login');

        }catch{
            message.error('Error occured while logging out!');
        }
        setLoading(false);
     
    }

const menu = (
  <Menu>
    <Menu.Item>
      <Link target="_blank" rel="noopener noreferrer" to="/profile" disabled>
        Profile
      </Link>
    </Menu.Item>
    <Menu.Item icon={<SettingOutlined />} disabled>
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Settings
      </a>
    </Menu.Item>
    <Menu.Item danger onClick={()=>logoutUser()}>Log out</Menu.Item>
  </Menu>
);

return(
  <Dropdown overlay={menu} icon={<UserOutlined/>}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:'Darkblue'}}>
       <DownOutlined />
       Welcome {currentUser && currentUser.displayName}
    </a>
  </Dropdown>
);
}
export default NavProfileMenu;