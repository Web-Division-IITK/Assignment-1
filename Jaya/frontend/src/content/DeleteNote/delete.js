import React,{useState} from 'react';
import { Drawer, List, Avatar, } from 'antd';
import {UndoOutlined} from '@ant-design/icons';
import {useNoteContext} from '../../context/NoteContext';

export default function Delete(props) {
    
    const {deletedNotes,restore}=useNoteContext();
    const [note,Setnote]=useState();
    const [visible,Setvisible]=useState();
    function showDrawer(note){
        Setnote(note);
        Setvisible(true);
    }

    function onClose () {
        Setvisible(false);
      };

      function Restore(note,idx){
            restore(note,idx);
      }
    
    return (
        <div>
            <div style={{textAlign:'center'}}><b style={{fontSize:40}}>Deleted Notes</b></div> <br/><br/>
            <h3 style={{color:"black"}}><u style={{color:"black"}}>My deleted notes</u></h3>

            <List
                dataSource={deletedNotes}
                bordered
                renderItem={(item,idx) => (
                <List.Item
                key={item.id}
                actions={[
                    <a onClick={() =>showDrawer(item)} key={`a-${item.id}`}>
                    View notebook details
                    </a>,
                    <a onClick={() => Restore(item,idx)}>
                        <UndoOutlined />
                    </a>,
                ]}
                >
                <List.Item.Meta
                    avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    }
                    title={item.title}
                    description={item.description}
                />
                </List.Item>  
                )}
            />

            <Drawer
                        width={640}
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        >
                        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                            <h1>Notebook Details</h1>
                        </p>
                        <p className="site-description-item-profile-p"><h2>Information</h2></p>
                        <h3>Title :{note!=null && note.title} </h3>
                        <h3>Description :{note !=null && note.description}</h3>
            </Drawer>
        </div>
    )
}
