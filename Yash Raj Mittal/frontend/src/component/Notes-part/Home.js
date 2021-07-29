import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from "axios"

export default function Home() {
    const [notes,setNotes] = useState([]);
    const [token,setToken] = useState('');

    const getNotes = async (token)=>{
        const res = await axios.get('notes',{
            headers:{Authorization:token}
        });
        setNotes(res.data);
    }
    const deleteNote = async (id)=>{
        try {
            if(token){
                await axios.delete(`notes/${id}`,{
                    headers:{Authorization:token}
                });
            }
            getNotes(token);
        } catch (error) {
            window.location.href = '/';
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('tokenStore');
        setToken(token);
        if(token){
            getNotes(token);
        }
    },[]);

    return (
        <div className="note-box">
            {
                notes.map(note =>(
                    <div className="card">
                        <div className="{note.title}" key="note._id"><h4>{note.title}</h4></div>
                        <div className="text">
                            {note.content}
                        </div>
                        <div className="date">
                            {format(note.date)}
                        </div>
                        <div className="card-footer">
                            {note.name}
                            <Link to={`editNotes/${note._id}`}>Edit</Link>
                        </div>
                        <button className="close" onClick={()=> deleteNote(note._id)}>X</button>
            </div>
                ))
            }
            
        </div>
    )
}
