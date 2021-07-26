import React from 'react';
import {useNoteContext} from '../context/NoteContext';

export default function NavigationHandler(props) {

    const {currentPage}=useNoteContext();
    
    return (
       <>
       {currentPage}
       </>
    )
}
