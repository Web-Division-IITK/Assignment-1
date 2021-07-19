const data= fetch('http://localhost:3100/savenote',{
    method: 'GET',
    headers: {'Content-Type': 'text/plain'}
})
var savedNotes=(<div>i am subodh</div>)
 data.then((results)=>{
        savedNotes=(<div><p>${results}</p></div>)
})
export default savedNotes;