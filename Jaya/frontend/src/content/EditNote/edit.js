import React,{useState} from 'react'
import {Input,Button,message} from 'antd';
import {useNoteContext} from '../../context/NoteContext';



export default function Edit(props) {

    const { TextArea } = Input;
    const {selectedNote,set_key,update,cancelEdit}=useNoteContext();
    let success;
    function saveEdit(){
        let head=(document.getElementById('notetitle').value);
        let desc=(document.getElementById('notetext').value);
        let fav=selectedNote[0].favourites;


        let note={title:head,description:desc,favourites:fav};
        success=update(note);
        if(success){
            message.success('Note Saved');
            set_key('1');
        }
        else message.error('Note already exist')
    }

    

    console.log(selectedNote);
    return (
        <div style={{textAlign:'center'}}>
            <h2>Editor</h2>
            <Input id = "notetitle"  defaultValue={selectedNote && selectedNote[0].title}
                style={{maxWidth:"200px",textAlign:"center", marginBottom:"5px"}} maxLength={20} minLength={1} />
            <TextArea id="notetext" defaultValue={selectedNote && selectedNote[0].description} minLength = {1} rows={10}  allowClear={true} />
            <br/>
            <br/>
            <Button type='primary' style={{float:'right'}} onClick={()=> cancelEdit()}>Cancel</Button>
            <Button type='primary' style={{float:'right'}} onClick={()=> saveEdit()}>Save</Button>
        </div>
    )
}
