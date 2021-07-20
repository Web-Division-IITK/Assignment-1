import React, { useEffect } from 'react';
import { useState} from 'react';
import {Collapse,  Skeleton, Spin,Space } from 'antd';
import {EditOutlined, DeleteOutlined, DeleteColumnOutlined } from '@ant-design/icons';
import './myNotes.css';


function NoteCollapse(props){
    const {Panel} = Collapse;
    const [processing, setProcessing] = useState(false);

    function editNote(event,dx){
        setProcessing(true);
        //call backend to edit note for that user
        setProcessing(false);
        event.stopPropagation();
    }
    function deleteNote(event,idx){
        setProcessing(true);
        //call backend to delete note for that user
        setProcessing(false);
        event.stopPropagation();
    }
    useEffect(()=>{
        setProcessing(true);
        //fetch data for panels from mongoDB


        setProcessing(false);
    },[]);
    
    const noteEditOptions = (idx)=>(
        <Space>
            {!processing?<EditOutlined
                onClick={(event)=>editNote(event,idx)}
                />:<Spin />}

            {!processing?<DeleteOutlined
                onClick={(event)=>deleteNote(event,idx)}
                />:<Spin/>}
        </Space>
    );
    const panels = [{header:"note1",text:"This is a text!"},
                    {header:'note2',text:'This is just a sample text!'}];

    var panelsList = panels.map((panel, index)=>(
        <>
        {(!processing)?<Panel header={panel['header']} key={index} extra={noteEditOptions(index)}>
            <div>{panel['text']}</div>
        </Panel>:<Skeleton/>}
        
        </>
    ));

   
    return(
        <>
        <Collapse style={{maxWidth:"600px", margin:"0px auto"}}>
          
          {panelsList}
        </Collapse>
      </>
    );

}
export default NoteCollapse;