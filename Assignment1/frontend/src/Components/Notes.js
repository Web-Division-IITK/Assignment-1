import React from 'react';

class Notes extends React.Component{

    render(){
        return (
               <div className = 'notes' 
               >
                   <p className='para' onClick={()=>this.props.showNote()}>{this.props.text}</p>
                   <button className='edit'
                    type='button'
                    onClick = {()=>this.props.showNote()}
                   >Edit</button>
                   <button className='delete'
                    type='button'
                    onClick = {()=>this.props.deleteNote()}
                   >Delete</button>
               </div> 
        )
    }
}

export default Notes;