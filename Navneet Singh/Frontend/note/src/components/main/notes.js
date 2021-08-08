import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNotes, deleteNotes } from '../../actions/notes';

export class Notes extends Component {

    static propTypes = {
       notes: PropTypes.array.isRequired,
       getNotes: PropTypes.func.isRequired,
       deleteNotes: PropTypes.func.isRequired,
    };
    componentDidMount() {
        this.props.getNotes();
    }
    render() {
        return (
            <Fragment>
               <h3>Notes</h3>
               <table class="table table-striped">
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </thead>
                    <tbody>
                        {this.props.notes.map(note=>(
                            <tr key={note.id}>
                                <td>{note.id}</td>
                                <td>{note.title}</td>
                                <td>{note.description}</td>
                                <td><button onClick={this.props.deleteNotes.bind(this, note.id)} className="btn btn-warning btn-sm">{" "} Delete</button></td>
                             </tr>
                        )) }
                    </tbody>
               </table>
            </Fragment>
        )
    }
}

const mapStateToProps= state => ({
    notes: state.notes.notes
});

export default connect(mapStateToProps, {getNotes,deleteNotes})(Notes);
