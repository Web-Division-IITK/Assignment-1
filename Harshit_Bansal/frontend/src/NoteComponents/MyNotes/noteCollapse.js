import React, { useEffect } from 'react';
import { useState} from 'react';
import {Collapse,  Skeleton, Spin,Space } from 'antd';
import {EditOutlined, DeleteOutlined, DeleteColumnOutlined } from '@ant-design/icons';
import './myNotes.css';
import {useNoteContext} from '../../contexts/NoteContext';
import Editor from '../Editor/editor'
function NoteCollapse(props){
    const {Notes,editNote, deleteNote} = useNoteContext();
    const {Panel} = Collapse;
    const [processing, setProcessing] = useState(false);

    
    
    
    useEffect(()=>{
        setProcessing(true);
        //fetch data for panels from mongoDB


        setProcessing(false);
    },[]);
    
    const noteEditOptions = (idx)=>(
        <Space size='large'>
            {!processing?<EditOutlined
                onClick={(event)=>editNote(event,idx)}
                />:<Spin />}

            {!processing?<DeleteOutlined
                onClick={(event)=>deleteNote(event,idx)}
                />:<Spin/>}
        </Space>
    );
    if(Notes.length>0){
    var panelsList = Notes.map((panel, index)=>(
        <>
        {(!processing)?<Panel header={panel['title']} key={index} extra={noteEditOptions(index)}>
            <div>{panel['text']}</div>
        </Panel>:<Skeleton/>}
        
        </>
    ));
    }
    else{
        var panelsList = <h2 style={{textAlign:"center"}}>Make new note to get started!</h2>
    }

   
    return(
        <>
        <Collapse style={{maxWidth:"600px", margin:"0px auto"}}>
         
          {panelsList}
        </Collapse>
      </>
    );

}
export default NoteCollapse;