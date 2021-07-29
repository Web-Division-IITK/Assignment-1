import React, { useEffect } from 'react';
import { useState} from 'react';
import {Collapse,  Skeleton, Spin,Space } from 'antd';
import {EditOutlined, DeleteOutlined, DeleteColumnOutlined } from '@ant-design/icons';
import './deletedNotes.css';
import {useNoteContext} from '../../contexts/NoteContext';

function DeletedNotes(props){
    const { deletedNotes} = useNoteContext();
    const {Panel} = Collapse;
    const [processing, setProcessing] = useState(false);

    
    
    
    useEffect(()=>{
        setProcessing(true);
        //fetch data for panels from mongoDB


        setProcessing(false);
    },[]);
    
    // const noteEditOptions = (idx)=>(
    //     <Space>
    //         {!processing?<EditOutlined
    //             onClick={(event)=>editNote(event,idx)}
    //             />:<Spin />}

    //         {!processing?<DeleteOutlined
    //             onClick={(event)=>deleteNote(event,idx)}
    //             />:<Spin/>}
    //     </Space>
    // );
    const panels = [{header:"note1",text:"This is a text!"},
                    {header:'note2',text:'This is just a sample text!'}];
    if(deletedNotes.length>0){
    var panelsList = deletedNotes.map((panel, index)=>(
        <>
        {(!processing)?<Panel header={panel['title']} key={index}>
            <div>{panel['text']}</div>
        </Panel>:<Skeleton/>}
        
        </>
    ));
    }
    else{
        var panelsList = <h2 style={{textAlign:"center"}}>You dont have any deleted Notes</h2>
    }

   
    return(
        <>
        <h2 style={{textAlign:"center"}}>Deleted Notes</h2>
        <Collapse style={{maxWidth:"600px", margin:"0px auto"}}>
         
          {panelsList}
        </Collapse>
      </>
    );

}
export default DeletedNotes;