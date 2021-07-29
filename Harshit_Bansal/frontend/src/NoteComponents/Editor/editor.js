import React, { useEffect } from 'react';
import {useNoteContext} from '../../contexts/NoteContext';
import './editor.css';
import MyNotes from '../MyNotes/myNotes';
import {Input, Button, message, Spin, Space} from 'antd';
function Editor(props){
   
    const {TextArea} = Input;
    const {currentNote, setCurrentDisplayPage, saveNote, onCancelClick} = useNoteContext();
    function handleOnSaveClick(){
        let t = document.getElementById('notetitle').value;
        let desc = document.getElementById('notetext').value;
        if(t == "" || desc == ""){
            message.error("Please fill in all the fields");
            return;
        }
        let note = {title:t, text:desc};
        if(saveNote(note,currentNote?true:false)){
            message.success("Note Saved");
            setCurrentDisplayPage(<MyNotes/>,"1");
        }
        else{
            message.error("File name already exists!");
        }

    }
    return(
        <div style={{textAlign:'center'}}>
            <h2>Editor</h2>
            <Input id = "notetitle" defaultValue={currentNote && currentNote[0].title} placeholder="Note Title"
                style={{maxWidth:"200px",textAlign:"center", marginBottom:"5px"}} maxLength={20} minLength={1}/>
            
            <TextArea id="notetext" minLength = {1} rows={10}  defaultValue={currentNote && currentNote[0].text}
             placeholder="Note description" allowClear={true}/>
            <Space style={{marginTop:'10px'}}>
                <Button style= {{marginRight:"10px"}} type="primary" onClick={onCancelClick}>Cancel</Button>
                <Button style= {{marginRight:"10px"}} type="primary" onClick={()=>handleOnSaveClick()}>Save</Button>

            </Space>
        </div>

    )
}
export default Editor;