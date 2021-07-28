import ImportNotes from './importNote.js';
import { render, screen } from '@testing-library/react';
import './App.css';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      return (
          <ImportNotes/>
      )
  }
}

export default App;
