import React from 'react'
import formurlencoded from 'form-urlencoded'
class savenote extends React.Component {
    render(){
        return(
            <div id="savenote">
                    <div className="addNote" id="title">
                        <h2 id="title">Add Title</h2>
                        <textarea id="addTitle" rows="2" columns="5" />
                    </div>
                    <div className="addNote" id="title">
                        <h3 id="Body">Add Note</h3>
                        <textarea id="addNote" rows="12" columns="5" />
                    </div>
                    <button id="saveButton" className="addNote" onClick={(e) => {
                        e.preventDefault();
                        var title = document.getElementById('addTitle').value;
                        var note = document.getElementById('addNote').value;
                        document.getElementById('addTitle').value = '';
                        document.getElementById('addNote').value = '';
                        const reqBody = {
                            title: title,
                            body: note
                        }
                        fetch('https://yournoteserver.herokuapp.com/savenote/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'authorization': this.props.getCookie("token")
                            },
                            body: formurlencoded(reqBody)
                        }).then((inputNote) => {
                            if (inputNote.status === 200||inputNote.status ===304) {
                                return inputNote.json()
                            }
                        }).then((response) => {
                            this.props.importNote(this.props.notes.reverse().concat(response).reverse())
                        }
                        ).catch((error) => {
                            console.log(error);
                        })
                    }} >Save</button>
                </div>
        )
    }
}

export default savenote