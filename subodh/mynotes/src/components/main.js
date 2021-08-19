import '../App.css'
import React from 'react';
import Login from './login'
import Signup from './signup'
import Homepage from './homepage/main'
import ImportantNotes from './importantNotes'
class mainComponent extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        notes: null,
        important: [],
        accountExists: true,
        active: 'home'
    }


    getCookie(c_name) {
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


    componentDidMount() {
        fetch('https://yournoteserver.herokuapp.com/savenote', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain',
                'authorization': this.getCookie("token")
            },

        }).then(async (results) => {
            if (results.status !== 200 && results.status !== 304) {
                this.setState({ notes: null })

            }
            else {
                const notes =await results.json();
                if (notes) {
                    this.setState({ notes: notes.reverse() });
                }
            }
        }).catch(err => {this.setState({ notes:null })});
    }


    render() {
        if (this.state.active == "important" && this.state.important != null && this.state.notes != null) return (
            <div className="App">
                <ImportantNotes
                    active={(e, active) => {
                    e.preventDefault();
                    this.setState({ active: active })
                    }}
                    logout={()=>{this.setState({notes:null})}}
                    importImportant={(important) => { this.setState({ important: important ,options:null}) }}
                    important={this.state.important}
                    getCookie={this.getCookie}    
                />
            </div >
        )
        else if (this.state.notes != null && this.state.active == 'home') return (
            <Homepage notes={this.state.notes}
                active={(e, active) => {
                    e.preventDefault();
                    this.setState({ active: active })
                }}
                important={this.state.important}
                importImportant={(important) => { this.setState({ important: important }) }}
                logout={() => { this.setState({ notes: null }) }}
                importNote={(response) => { this.setState({ notes: response }) }}
                getCookie={this.getCookie}
            />
        )
        else {
            if (this.state.accountExists) {
                return (
                    <Login importNote={(response) => { this.setState({ notes: response }) }}
                        navigateToSignup={(e) => {
                            e.preventDefault();
                            this.setState({ accountExists: false })
                        }}
                        getCookie={this.getCookie}
                    />
                )
            }
            else {
                return (<Signup accountExists={()=>{this.setState({ accountExists:true})}} />)

            }
        }
    }
}

export default mainComponent