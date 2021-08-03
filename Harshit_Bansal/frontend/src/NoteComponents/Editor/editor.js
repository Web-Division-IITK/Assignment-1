import React, { useEffect } from 'react';
import {useNoteContext} from '../../contexts/NoteContext';
import './editor.css';
import {Input, Button, message, Spin, Space} from 'antd';
import {useHistory, useParams} from 'react-router-dom'

function Editor(props){
    
    const {id} = useParams()
    const {TextArea} = Input;
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const {currentNote, saveNote, onCancelClick} = useNoteContext();
    function handleOnSaveClick(){
        setLoading(true);
        let t = document.getElementById('notetitle').value;
        let desc = document.getElementById('notetext').value;
        if(t === "" || desc === ""){
            message.error("Please fill in all the fields");
            return;
        }
        let note = {title:t, text:desc};
        console.log("from editor", note)
        if(saveNote(note, id)){
            setTimeout(()=>{
                setLoading(false);
                message.success("Note Saved");
                history.push("/");
            },500)
            
        }
        else{
            message.error("Error saving file! Check for duplicate file name.");
        }
        setLoading(false);
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
                <Button style= {{marginRight:"10px"}} type="primary" onClick={()=>handleOnSaveClick()} disabled={loading}>{loading?<Spin/>:<p>Save</p>}</Button>

            </Space>
        </div>

    )
}
export default Editor;