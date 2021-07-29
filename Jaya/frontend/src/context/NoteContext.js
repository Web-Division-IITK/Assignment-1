import React,{useState,useContext} from 'react';
import Delete from '../content/DeleteNote/delete.js';
import Edit from '../content/EditNote/edit.js';
import Home from '../content/Home/home';
import Favourite from '../content/Favourite_Note/favourite';

const NoteContext=React.createContext();

export function useNoteContext(){
    return useContext(NoteContext);
}

export function NoteContextProvider({children}) {

    const[notes,Setnotes]=useState([ {title:'Note1' ,description :"This is note 1",favourites:false},{title:'Note2' ,description: 'This is note2',favourites:false}]);
    const [deletedNotes,SetdeletedNotes]=useState([]);
    const[key,Setkey]=useState("1");
    const[currentPage,SetcurrentPage]=useState(<Home />);
    const[favouriteNotes,SetfavouriteNotes]=useState([]);
    const [selectedNote,SetselectedNote]=useState(null);

    function create_note(values){
        let notes_copy=notes.slice();
        const note={title:values['name'],description:values['description'],favourites:false};
        var duplicate=notes.filter((n)=>note.title===n.title);
        if(duplicate.length>=1) return false;
        else{
            notes_copy.push(note);
            Setnotes(notes_copy);
            return true;
        }
    }

    function delete_note(idx){
        let deleteNotes_copy=deletedNotes.slice();
        const deletedNote=notes[idx];
        deleteNotes_copy.push(deletedNote);
        SetdeletedNotes(deleteNotes_copy);

        let notes_copy=notes.slice();
        notes_copy.splice(idx,1);
        Setnotes(notes_copy);
        return;
    }

    function set_key(id){
        Setkey(id);
        if(id==='1') SetcurrentPage(<Home />);
        if(id==='2') SetcurrentPage(<Edit />);
        if(id==='3') SetcurrentPage(<Favourite />);
        if(id==='4') SetcurrentPage(<Delete />);

    }

    function restore(note,idx){
        let notes_copy=notes.slice();
        notes_copy.push(note);
        Setnotes(notes_copy);

        let deletedNotes_copy=deletedNotes.slice();
        deletedNotes_copy.splice(idx,1);
        SetdeletedNotes(deletedNotes_copy);
    }

    function favourite_note(note){
        let favouriteNotes_copy=favouriteNotes.slice();
        favouriteNotes_copy.push(note);
        SetfavouriteNotes(favouriteNotes_copy);
    }

    function delete_favourite_node(note){
        let len=favouriteNotes.length;
        for(let i=0;i<len;i++){
            if(favouriteNotes[i].title===note.title) {
                let favouriteNotes_copy=favouriteNotes.slice();
                favouriteNotes_copy.splice(i,1);
                SetfavouriteNotes(favouriteNotes_copy);
                break;
            }
        }
    }

    function toggleFavourites(idx){
        let notes_copy=notes.slice();
        notes_copy[idx].favourites= !(notes_copy[idx].favourites);
        Setnotes(notes_copy);
    }

    function openEditor(idx){
        set_key('2');
        SetselectedNote([notes[idx],idx]);
    }

    function update(note){
        let duplicate=notes.filter((n)=>n.title===note.title);
        if(duplicate.length===1) {
            if(note.title===selectedNote[0].title) {
               let notes_copy=notes.slice();
                notes_copy[selectedNote[1]]=note;
                Setnotes(notes_copy);
                SetselectedNote(null);
                return true;
            }
            else return false;
        }
        else{
            let notes_copy=notes.slice();
            notes_copy[selectedNote[1]] =note;
            Setnotes(notes_copy);
            SetselectedNote(null);
            return true;
        }
    }

    function cancelEdit(){
        set_key('1');
        SetselectedNote(null);
    }

    const value={
        deletedNotes,
        notes,
        key,
        currentPage,
        selectedNote,
        delete_note,
        create_note,
        set_key,
        restore,
        favourite_note,
        delete_favourite_node,
        toggleFavourites,
        openEditor,
        update,
        cancelEdit,
    }

    return (
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    );
}
