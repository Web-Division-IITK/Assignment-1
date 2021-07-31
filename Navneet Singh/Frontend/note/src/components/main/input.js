import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addNotes } from '../../actions/notes';

export class Input extends Component {

    state = {
        title: '',
        description: '',
    }

    static propTypes = {
        addNotes: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({ [e.target.title]: e.target.value });
    }
    onAdd = (e) => {
        e.preventDefault();
        const {title,description} =this.state;
        const note ={title,description};
        this.props.addNotes(note);
        this.setState({ 
            title: '',
            description: '',
        })
        console.log("Note added");
    }
    render() {
        const { title, description } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Note</h2>
                <form onSubmit={this.onAdd}>
                    <div class="form-group row">
                        <label for="colFormLabel" class="col-sm-2 col-form-label">Title</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="colFormLabel" onChange={this.onChange} placeholder="Note Title" ></input>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Description</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control form-control-lg" id="colFormLabelLg" onChange={this.onChange} placeholder="Note Description" ></input>
                        </div>
                    </div>
                    < div className="form-group text-center" >
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </div >
                </form>
            </div>
        )
    }
}

export default connect(null ,{addNotes})(Input);


