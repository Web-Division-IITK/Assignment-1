import React from 'react';
import {useContext, useState} from "react";
import Editor from '../NoteComponents/Editor/editor';
import MyNotes from '../NoteComponents/MyNotes/myNotes';
const NoteContext = React.createContext();
export function useNoteContext() {
    return useContext(NoteContext);
}
export function NoteContextProvider({children}) {
    var NOTES = [
        {title:"Welcome",text:"Welcome to NoteIt"},
        {title:"Edit Me",text:"Try editing me"},
    ]

    const [Notes, setNotes] = useState(NOTES);
    const [deletedNotes, setDeletedNotes] = useState([])
    const [currentNote, setCurrentNote] = useState(null);
    const [currentPage, setCurrentPage] = useState();
    const [siderKey, setSiderKey] = useState("1");
    
    const [error, setError] = useState(null);
    const value={Notes,
        currentNote,
        deletedNotes,
        currentPage,
        siderKey,
        error,
        setCurrentDisplayPage,
        setChosenNote,
        saveNote,
        editNote,
        deleteNote,
        newNote,
        onCancelClick
        
    }
    function setCurrentDisplayPage(component, key){
        setCurrentPage(component);
        setSiderKey(key);
        
    }
    function setChosenNote(idx){
        setCurrentNote([Notes[idx],idx]);
    }
    function saveNote(note, update){
        var notes = Notes.slice();
    try{
        if(update){
            var duplicate = notes.filter(function(n, idx){
                return (n.title===note.title) && idx != currentNote[1];
            })
            if(duplicate.length>0){
                setError("File name already exists");
                return false;
            }
            notes[currentNote[1]]=note;
        }
        else{
            //check for duplicate file name
            var duplicate = notes.filter(function(n){
                return n.title===note.title;
            })
            if(duplicate.length>0){
                setError("File name already exists");
                return false;
            }
            notes.push(note);
        }
        setNotes(notes);
        setCurrentNote(null);
        return true;  
        
    }catch{
        setError("Error saving file");
        return false;
    }
    }
    function editNote(event,idx){
      
        setCurrentNote([Notes[idx],idx]);
        setCurrentPage(<Editor/>)
        setSiderKey("2")
        
        event.stopPropagation();
      
    }
    function deleteNote(event, idx){
        
        var notes = Notes.slice();
        var delnote = notes[idx]
        notes.splice(idx,1);
        setNotes(notes);
        var dnotes = deletedNotes.slice();
        dnotes.push(delnote);
        setDeletedNotes(dnotes);
        event.stopPropagation();
    }
    function newNote(){
        setCurrentNote(null);
        setCurrentPage(<Editor/>);
        setSiderKey("2");
    }
    function onCancelClick(){
        setCurrentNote(null);
        setCurrentPage(<MyNotes/>);
        setSiderKey("1");
    }
    return (
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    );
}