import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function EditNote({match}) {
    const [note,setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    });

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setNote({...note,[name]:value});
    }
    const History = useHistory();

    useEffect(()=>{
        const getNote = async ()=>{
            const token = localStorage.getItem('tokenStore');
            if(match.params.id){
                const res = await axios.get(`/notes/${match.params.id}`,{
                    headers:{Authorization: token}
                });
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id
                })
                console.log(res);
            }
        }
        getNote();
    },[match.params.id])

    const editNote = async e =>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if(token){
                const {title,content,date,id} = note;
                const newNote = {title,content,date};
                await axios.put(`/notes/${id}`,newNote,{
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
                <div className="edit-note">
                <h2>Edit Notes</h2>
                <form onSubmit={editNote}>
                    <div className="row">
                        <label htmlFor="edit-title">Title</label>
                        <input type="text" name="title" id="edit-title" value={note.title} required onChange={onChangeInput}/>
                    </div>
                    <div className="row">
                        <label htmlFor="edit-content">Content</label>
                        <textarea type="text" name="content" id="edit-content" value={note.content} required onChange={onChangeInput}/>
                    </div>
                    <div className="row">
                        <label htmlFor="edit-date">Date:{note.date}</label>
                        <input type="date" name="date" id="edit-date" value={note.date} onChange={onChangeInput}/>
                    </div>
                    <button type="submit">Save</button>
                </form>
                </div>
        </div>
    )
}
