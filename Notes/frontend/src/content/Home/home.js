import React,{useState} from 'react';
import { Drawer, List, Avatar, Divider, Col, Row,Button,Modal,Input,Form,} from 'antd';
import {DeleteOutlined,StarOutlined,StarFilled,StarTwoTone} from '@ant-design/icons';
import './home.css';
import {useNoteContext} from '../../context/NoteContext';

function Home(props) {
    
    const [visible,Setvisible]=useState();
    const [note,Setnote]=useState();
    // const [notes,Setnotes]=useState([ {title:'Note1' ,description :"This is note 1"},{title:'Note2' ,description: 'This is note2'}]);
    const {notes,create_note,delete_note,toggleFavourites,openEditor}=useNoteContext();
    const [modal2Visible,Setmodal2Visible]=useState(false);
    const [formLayout, setFormLayout] = useState('horizontal');
    

      function showDrawer (note) {
        
        Setnote(note);
        Setvisible(true);
      };

      function onClose () {
        Setvisible(false);
      };

      function onFinish(values) {
          create_note(values);
      }

      function setModal2Visible(modal2Visible) {
        Setmodal2Visible(modal2Visible);
      }

      function deleteNote(idx){
        console.log(idx);
        delete_note(idx);
      }

    
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

    return (
        <div>
        <div style={{textAlign:'center'}}><b style={{fontSize:40}}>Notebooks</b></div> <br/><br/>
        <h3 style={{color:"black"}}><u style={{color:"black"}}>My Notebooks</u></h3>

        <Button type="primary" onClick={() => setModal2Visible(true)} block>
         Add new Notebook
        </Button>

        <Modal
          title="Create new notebook"
          centered
          visible={modal2Visible}
          onOk={() => setModal2Visible(false)}
          onCancel={() => setModal2Visible(false)}
        >
          
          <Form
            {...formItemLayout}
            name="create"
            onFinish={onFinish}
            scrollToFirstError
          >
        
            <Form.Item name="name" label="Name">
              <Input placeholder="Add notebook name" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input placeholder="Add small description of notebook" />
            </Form.Item>

            <Form.Item {...tailFormItemLayout} >
              <Button type="primary" htmlType="submit">Create</Button>
            </Form.Item>

          </Form>

        </Modal>
        
        <br/><br/>
        <List
          dataSource={notes}
          bordered
          renderItem={(item,idx) => (
            <List.Item
              key={item.id}
              actions={[
                <a onClick={() =>showDrawer(item)} key={`a-${item.id}`}>
                  View notebook details
                </a>,
                <a onClick={()=>toggleFavourites(idx)}>
                  {notes[idx].favourites?<StarFilled />:<StarOutlined/>}
                </a>,
                <a onClick={()=>deleteNote(idx) }>
                <DeleteOutlined />
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                }
                title={<a onClick={()=> openEditor(idx)}>{item.title}</a>}
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

export default Home;