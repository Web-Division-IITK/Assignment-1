import React from 'react';
import formurlencoded from 'form-urlencoded'
import {render} from '@testing-library/react';
class existingNotes extends React.Component {
    state = {
        options: null,
        editableNote: null
    }

    render() {
        return (
            this.props.notes.map((note) => {
                if (note._id === this.state.editableNote) {
                    return (<EditableNotes key={note._id} note={note} getCookie={this.props.getCookie} importNote={this.props.importNote} editSuccess={()=>{this.setState({editableNote:null})}}/>)
                }
                else if (this.state.options === note._id) {
                    return (<NotesWithOptions key={note._id} note={note}  getCookie={this.props.getCookie} importNote={this.props.importNote}
                        edit={(e,noteId)=>{e.preventDefault(); this.setState({ editableNote: noteId, options: null }) }}
                        importImportant={this.props.importImportant}
                        options={(e,noteId)=>{e.preventDefault(); this.setState({options: noteId})}}
                    />)
                }
                else {
                    return (
                        <Note note={note} 
                            key={note._id}
                            options={(e,noteId)=>{e.preventDefault(); this.setState({options: noteId})}}
                            getCookie={this.props.getCookie}
                        />
                    )
                }
            })
        )
    }
}

class EditableNotes extends React.Component {
    render() {
        return (

            <div key={this.props.note._id} id={this.props.note._id} className="editableNotes" >
                <div className="noteTitle editable" contentEditable='true' suppressContentEditableWarning={true}>{this.props.note.title}</div>
                <div className="noteBody editable" contentEditable='true' suppressContentEditableWarning={true}>{this.props.note.body}</div>

                <div id='buttons'>
                    <button className="deleteButton" id="editButton"
                        onClick={(e) => {
                            // var _id = e.currentTarget.parentElement.getAttribute('id');
                            var reqBody = {
                                title: document.getElementById(this.props.note._id).firstChild.innerText,
                                body: document.getElementById(this.props.note._id).firstChild.nextSibling.innerText
                            }
                            fetch(`https://yournoteserver.herokuapp.com/savenote/${this.props.note._id}`, {
                                method: 'PUT',
                                headers: {
                                    'authorization': this.props.getCookie("token"),
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                body: formurlencoded(reqBody)
                            }).then((result) => {
                                if (result.status !== 200) {
                                    render(<div>error</div>);
                                }
                                else { return result.json() }
                            }).then((result) => {
                                this.props.editSuccess()
                                this.props.importNote(result.reverse())
                            }).catch((err) => { console.log(err) })
                        }}>
                        Save</button>
                </div>
            </div>
        )
    }
}

class NotesWithOptions extends React.Component {
    render() {
        return (
            <div key={this.props.note._id} id={this.props.note._id} className="Notes" onClick={(e)=>{this.props.options(e,null)}}>
                <div className="rightCorner">
                    <div id="options">
                        <button onClick={(e) => {
                            this.setState({ editableNote: null, options: null })
                            fetch(`https://yournoteserver.herokuapp.com/savenote/${this.props.note._id}`, {
                                method: 'DELETE',
                                headers: {
                                    'authorization': this.props.getCookie("token"),
                                    'content-type': 'text/plain'
                                }
                            }).then((result) => {
                                if (result.status !== 200) {
                                    result.json().then((err) => { console.log(err) })
                                }
                                else {
                                    result.json().then((result) => { this.props.importNote(result.reverse()) })
                                }
                            })
                        }}>delete</button>
                        <button onClick={(e) => { this.props.edit(e,this.props.note._id)}}>edit</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            fetch(`https://yournoteserver.herokuapp.com/savenote/${this.props.note._id}/important`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'text/plain',
                                    'authorization': this.props.getCookie("token")
                                },

                            }).then((response) => { if (response.status === 200 || response.status === 304) {
                                this.setState({options: null})
                                response.json().then((response) => { this.props.importImportant(response) }) } })
                        }}>important</button>
                    </div>
                    <img src='/download1.png' className="threeDots" onClick={(e) => {
                        e.preventDefault();
                        this.setState({ options: null })
                    }}></img>
                </div>
                <div className="noteTitle ">{this.props.note.title}</div>
                <div className="noteBody" >{this.props.note.body}</div>
            </div>
        )
    }
}
class Note extends React.Component {
    render() {
        return (
            <div key={this.props.note._id} id={this.props.note._id} className="Notes" >
                <div className="rightCorner">
                    <img src='/download1.png' className="threeDots" onClick={(e) => {
                        this.props.options(e,this.props.note._id)
                    }}></img>
                </div>
                <div className="noteTitle">{this.props.note.title}</div>
                <div className="noteBody">{this.props.note.body}</div>
            </div>
        )
    }
}

export default existingNotes