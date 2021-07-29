import React from 'react';
import { Button } from 'antd';
import NoteCollapse  from './noteCollapse';
import './myNotes.css';
import  Editor from './../Editor/editor';
import {useNoteContext} from './../../contexts/NoteContext';
function MyNotes(props){
    const { newNote} = useNoteContext();
    return(
        <React.Fragment>
        <h3
            style={{textAlign:'center'}}
            >My Notes</h3>
        <Button type="primary" onClick={()=>newNote()} style={{float:'left'}}>New Note</Button>
        <br/>
        <br/>
        <NoteCollapse 
            style={{marginTop: '10px', marginLeft:'auto'
                ,marginRight:'auto'}}
        />

        </React.Fragment>

    );
}
export default MyNotes;