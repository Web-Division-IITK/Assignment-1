import React from 'react';
import Navbar from './navbar'
import Savenote from './savenote'
import ExistingNotes from './existingNotes'
class homepage extends React.Component {

    notification(){
        if (this.props.notes.length == 0) {
            return (<p id="notification">You have not saved any notes. Save them to see here</p>)
        }
    }

    render() {
        return (

            <div className="App" id='home'>
               <Navbar 
                logout={this.props.logout} active={this.props.active} importImportant={this.props.importImportant} getCookie={this.props.getCookie} important={this.props.important}
               />
                <Savenote importNote={this.props.importNote} getCookie={this.props.getCookie} notes={this.props.notes}/>
                <h2 id="YourNotes">Your Notes</h2>
                {this.notification()}
                <div id="savedNotes">
                    <ExistingNotes notes={this.props.notes} getCookie={this.props.getCookie} importNote={this.props.importNote}
                        importImportant={this.props.importImportant}
                    />
                </div>
            </div>
        )
    }
}
export default homepage