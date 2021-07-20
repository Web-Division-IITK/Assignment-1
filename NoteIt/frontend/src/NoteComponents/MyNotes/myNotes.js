import React from 'react';
import { Button } from 'antd';
import NoteCollapse  from './noteCollapse';
import './myNotes.css';
function MyNotes(props){

    return(
        <React.Fragment>
        <h3
            style={{textAlign:'center'}}
            >My Notes</h3>
        <Button type="primary" onClick={null} style={{float:'left'}}>New Note</Button>
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