import React from 'react';
import Navbar from './homepage/navbar'
import {render} from '@testing-library/react'
class important extends React.Component {


    state ={
        importantOptions:null
    }

    notify(){
        if (this.props.important.length === 0) {
            //given this id to just make font color red
            return (<p id="notification" style={{ textAlign: 'center', marginTop: '100px' }}>You have not marked any note as important. Mark them to see here</p>)
        }
    }

    render(){
        return(
            <div id="importantContainer"> 
                <Navbar active={this.props.active} important={this.props.important} logout={this.props.logout}/>
                {this.notify()}
                <div id="important">{
                    this.props.important.map((notes) => {
                        if (notes._id === this.state.importantOptions) {
                            return (
                                <div key={notes._id} id={notes._id} className="Notes" >
                                    <div className="rightCorner">
                                        <div id="options">
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                fetch(`https://yournoteserver.herokuapp.com/savenote/${notes._id}/important`, {
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Content-Type': 'text/plain',
                                                        'authorization': this.props.getCookie("token")
                                                    }

                                                }).then((response) => {
                                                    if (response.status == 200 || response.status == 304) {
                                                        response.json().then((important) => { this.props.importImportant(important); });
                                                    }
                                                    else render(<p>error</p>)
                                                })
                                            }}>remove</button>
                                        </div>
                                        <img src='/download1.png' className="threeDots" onClick={(e) => { e.preventDefault(); this.setState({ importantOptions: null }) }} />
                                    </div>
                                    <div className="noteTitle ">{notes.title}</div>
                                    <div className="noteBody" >{notes.body}</div>
                                </div>)
                        }

                        else {
                            return (<div key={notes._id} id={notes._id} className="Notes">
                                <div className="rightCorner">
                                    <img src='/download1.png' className="threeDots" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ importantOptions: notes._id })
                                    }} />
                                </div>
                                <div className="noteTitle">{notes.title}</div>
                                <div className="noteBody">{notes.body}</div>
                            </div>)
                        }
                    })}</div>
            </div>
            )
    }
}

export default important;