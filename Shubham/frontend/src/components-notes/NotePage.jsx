import React, { useState } from "react";
import "./styles.css";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
function NotePage(props) {
  var info = {};
  const [notes, setNotes] = useState([]);
  function addNote(note) {
    info = { note, action: "add" };
    console.log(info, note);
    fetch("https://note-keeper100.herokuapp.com/notes", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setNotes(res);
      });
  }

  function deleteNote(note) {
    info = { note, action: "delete" };
    fetch("https://note-keeper100.herokuapp.com/notes", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setNotes(res);
      });
  }

  return (
    <div>
      <Header setUser={props.setUser} />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default NotePage;
