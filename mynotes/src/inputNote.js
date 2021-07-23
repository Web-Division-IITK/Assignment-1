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
    <button id="saveButton" className="addNote" onClick={saveNote} >Save</button>
    </div>
)
function saveNote(){
    var title=document.getElementById('addTitle').value;
    var note=document.getElementById('addNote').value;
const reqBody={
    title: title,
    body:note
}
    fetch('http://localhost:3100/savenote/',{
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': getCookie("token")},
        body:formurlencoded(reqBody)
    }).then((inputNote) => {console.log(inputNote);}).catch((error)=>{
        console.log(error);
    })
}
function getCookie(c_name) {
    console.log(c_name);
    var c_arr = document.cookie.split(';');
    var jwtToken
    c_arr.forEach((val) => {
        if (c_name == val.split('=')[0]) {
            var token = val.split('=')[1];
            jwtToken = token
        }
    })
    return decodeURI(jwtToken);
}
export default addNotes;