import formurlencoded from 'form-urlencoded'
const addNotes=(
    <div>
    <div className="addNote" id="title">
    <h2 id="title">Add Title</h2>
        <textarea id="addTitle" rows="2" columns="5"/>
    </div>    
    <div className="addNote" id="title">
    <h3 id="Body">Add Note</h3>
        <textarea id="addNote" rows="15" columns="5"/>
    </div>
    <button id="saveButton" className="addNote" >Save</button>
    </div>
)
setTimeout(() =>{
    
    document.getElementById('saveButton').addEventListener('click',saveNote)
},50)
function saveNote(){
    var title=document.getElementById('addTitle').value;
    // console.log(title)
    var note=document.getElementById('addNote').value;
const reqBody={
    title: title,
    body:note
}
    fetch('http://localhost:3100/savenote/',{
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body:formurlencoded(reqBody)
    }).then((inputNote) => {console.log(inputNote);}).catch((error)=>{
        console.log(error);
    })
}
export default addNotes;