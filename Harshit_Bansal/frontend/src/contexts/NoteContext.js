import React, { useEffect } from 'react';
import {useContext, useState} from "react";
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const NoteContext = React.createContext();
export function useNoteContext() {
    return useContext(NoteContext);
}
export function NoteContextProvider({children}) {
    
    const {currentUser} = useAuth();
    const [Notes, setNotes] = useState([]);
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
        setCurrentDisplayPage,
        setChosenNote,
        saveNote,
        editNote,
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
    async function saveNote(note, index){
        var notes = Notes.slice();
        console.log(note)
    try{
        if(index !=='new'){
            console.log("update")
            var i = parseInt(index, 10);
            var duplicate = notes.filter(function(n, idx){
                return (n.title===note.title) && idx !== i;
            })
            console.log(duplicate)
            if(duplicate.length>0){
                setError("File name already exists");
                return false;
            }
            console.log('request sent');
            await axios.post(`http://localhost:5000/server/update-note/${currentUser.uid}/${index}`
            ,JSON.stringify(note), {
                headers:{"Content-Type": "application/json"},
                
            }).then(res=>res.data.notes)
            .then(notesData=>setNotes(notesData))
         

            notes[currentNote[1]]=note;
        }
        else{
            //check for duplicate file name
            duplicate = notes.filter(function(n){
                return n.title===note.title;
            })
            if(duplicate.length>0){
           
                return false;
            }
            console.log(note);
            await axios.post(`http://localhost:5000/server/add-note/${currentUser.uid}`
            , JSON.stringify(note),{
                headers:{"Content-Type": "application/json"}
            }).then(res=>res.data.notes)
            .then(notesData=>setNotes(notesData))
          
           
        }
        setCurrentNote(null);
        return true;  
        
    }catch{
        setError("Error saving file");
        return false;
    }
    }
    function editNote(event,idx){
      
        setCurrentNote([Notes[idx],idx]);
        setSiderKey("2")
        
        event.stopPropagation();
      
    }
   
    function newNote(){
        setCurrentNote(null);
        
        setSiderKey("2");
    }
    function onCancelClick(){
        setCurrentNote(null);
        
        setSiderKey("1");
    }
    return (
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    );
}