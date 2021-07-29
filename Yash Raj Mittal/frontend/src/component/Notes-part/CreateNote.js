import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function CreateNote() {
    const [note,setNote] = useState({
        title: '',
        content: '',
        date: ''
    });

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setNote({...note,[name]:value});
    }
    const History = useHistory();

    const createNote = async e =>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if(token){
                const {title,content,date} = note;
                const newNote = {title,content,date};
                await axios.post('/notes',newNote,{
                    headers:{Authorization: token}
                });
                return History.push('/');
            }
            
        } catch (err) {
            window.location.href = '/';
        }
    }

    return (
        <div>
                <div className="create-note">
                <h2>Create Notes</h2>
                <form onSubmit={createNote}>
                    <div className="row">
                        <label htmlFor="create-title">Title</label>
                        <input type="text" name="title" id="create-title" value={note.title} required onChange={onChangeInput}/>
                    </div>
                    <div className="row">
                        <label htmlFor="create-content">Content</label>
                        <textarea type="text" name="content" id="create-content" value={note.content} required onChange={onChangeInput}/>
                    </div>
                    <div className="row">
                        <label htmlFor="create-date">Date</label>
                        <input type="date" name="date" id="create-date" value={note.date} required onChange={onChangeInput}/>
                    </div>
                    <button type="submit">Save</button>
                </form>
                </div>
        </div>
    )
}
