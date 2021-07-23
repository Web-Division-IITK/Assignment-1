import logo from './logo.svg';
import inputNote from './inputNote.js';
import ImportNotes from './importNote.js';
import { render, screen } from '@testing-library/react';
import './App.css';
import React from 'react';
console.log(ImportNotes)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    }
  }
  render() {
    if (this.state.authenticated) {
      return (
        // <div className="App">
        //   <nav >
        //     <div className="navContent" id="appName">
        //       Notes
        //     </div>
        //     <div className="navContent" id="important">
        //       Importants
        //     </div>
        //     <div className="navContent search" id="searchBar">
        //       <input type="text" placeholder="search in your notes" className="search"></input>
        //     </div>
        //   </nav>
        //   {inputNote}
        //   <h2 id="YourNotes">Your Notes</h2>
          <ImportNotes/>
      )
    }
    else {
      return (<div></div>)
    }
  }
}

export default App;
