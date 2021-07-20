import logo from './logo.svg';
import inputNote from './inputNote.js';
import importNote from './importNote.js';
import './App.css';
function App() {
  return (
    <div className="App">
      <nav >
        <div className="navContent" id="appName">
          Notes
        </div>
        <div className="navContent" id="important">
          Importants
        </div>
        <div className="navContent search" id="searchBar">
          <input type="text" placeholder="search in your notes" className="search"></input>
        </div>
    </nav>
    {inputNote}
    <h2 id="YourNotes">Your Notes</h2>
  </div>
  );
}

export default App;
