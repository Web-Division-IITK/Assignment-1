import React from 'react';

class Notes extends React.Component{

    render(){
        return (
               <div className = 'notes' 
                    onClick={()=>this.props.showNote()}
               >
                   <p className='para'>{this.props.text}</p>
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