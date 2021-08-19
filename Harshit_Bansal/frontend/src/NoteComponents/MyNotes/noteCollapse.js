import React, { useEffect } from 'react';
import { useState} from 'react';
import {Collapse,  Skeleton, Spin,Space, Popconfirm } from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import './myNotes.css';
import {useAuth} from '../../contexts/AuthContext';
import {useNoteContext} from '../../contexts/NoteContext';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
function NoteCollapse(props){
    const history = useHistory();
    const {currentUser} = useAuth();
    const {Notes,editNote} = useNoteContext();
    const {Panel} = Collapse;
    const [processing, setProcessing] = useState(false);
    const [notesList, setNotesList] = useState([]);
    var arr= []
    for(var i=0;i<Notes.length;i++){
        arr.push(false)
    }
    const [visible, setVisible] = useState(arr);
    useEffect(()=>{
        setProcessing(true);
        async function loadNotes(){
            await axios.get('http://localhost:5000/server/get-notes/'+currentUser.uid)
            .then(res=> res.data.notes)
            .then(noteData=>{setNotesList(noteData)})
            .catch(err=>console.log(err))
        }
        loadNotes();
        setProcessing(false);
    },[])
    async function deleteNote(idx){
        setProcessing(true);
        await axios.get(`http://localhost:5000/server/delete/${currentUser.uid}/${idx}`)
        .then(res=>res.data.notes)
        .then(notesData=>setNotesList(notesData))
        setProcessing(false);
    }
    const noteEditOptions = (idx)=>(
        <Space size='large'>
            <EditOutlined
                onClick={(event)=>{history.push('/editor/'+idx);editNote(event,idx)}}
                />
            <Popconfirm
                title="Are you sure to delete this note?"
                visible = {visible[idx]}

                onConfirm={(event)=>{ 
                    event.stopPropagation();
                    setProcessing(true);
                    deleteNote(idx); 
                    var visarr = visible.slice()
                    visarr[idx] = !visarr[idx]
                    setVisible(visarr)
                    setProcessing(false)}}
                okButtonProps={{loading: processing}}
                onCancel={(event)=>{
                    event.stopPropagation();
                    var visarr = visible.slice()
                    visarr[idx] = !visarr[idx]
                    setVisible(visarr)}}
                >
            <DeleteOutlined
           
                onClick={(event)=>{
                    event.stopPropagation(); 
                    var visarr = visible.slice()
                    visarr[idx] = !visarr[idx]
                    setVisible(visarr)}}
                />
                </Popconfirm>
        </Space>
    );
    if(notesList.length>0){
    var panelsList = notesList.map((panel, index)=>(
        <>
        {(!processing)?<Panel header={panel['title']} key={index} extra={noteEditOptions(index)}>
            <div>{panel['text']}</div>
        </Panel>:<Skeleton/>}
        
        </>
    ));
    }
    else{
        var panelsList = <h2 style={{textAlign:"center"}}>Make new note to get started!</h2>; 
    }

   
    return(
        processing?<Spin/>:
        <>
        <Collapse style={{maxWidth:"600px", margin:"0px auto"}}>
         
          {panelsList}
        </Collapse>
      </>
    );

}
export default NoteCollapse;