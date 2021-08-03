import React from "react";

function Note(props) {
  var note={title:props.title,content:props.content};
  function handleClick() {
    props.onDelete(note);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
