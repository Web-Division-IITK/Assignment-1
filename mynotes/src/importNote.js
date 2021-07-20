   import { render } from '@testing-library/react';
   import './App.css'
const data= fetch('http://localhost:3100/savenote',{
    method: 'GET',
    headers: {'Content-Type': 'text/plain'},
})
var savedNotes
 data.then((results)=>{
    return results.json()}).then((notes)=>{
        if(notes.length%2){
        for(var i=notes.length-1; i>=0; i-=2){
            render(
                <div className="notePair">
                <div key={notes[i]._id} className="Notes">
                    <h3 className="noteTitle">{notes[i]._title}</h3>
                    <p className="notenoteBody">{notes[i].body}</p>
                </div>
                <div key={notes[i-1]._id} className="Notes">
                    <h3 className="noteTitle">{notes[i-1].title}</h3>
                    <p className="noteBody">{notes[i-1].body}</p>
                </div>
                </div>
                )
        
        }}
        else {
        for(var i=notes.length-2; i>=1; i-=2){
            render(
                <div className="notePair">
                <div key={notes[i+1]._id} className="Notes">
                    <h3 className="noteTitle">{notes[i+1].title}</h3>
                    <p className="notenoteBody">{notes[i+1].body}</p>
                </div>
                <div key={notes[i]._id} className="Notes">
                    <h3 className="noteTitle">{notes[i].title}</h3>
                    <p className="noteBody">{notes[i].body}</p>
                </div>
                </div>
            )
        }
        render(
            <div key={notes[0]._id} className="Notes">
                    <h3 className="noteTitle">{notes[0].title}</h3>
                    <p className="notenoteBody">{notes[0].body}</p>
                </div>
        )
    }
})
export default savedNotes;