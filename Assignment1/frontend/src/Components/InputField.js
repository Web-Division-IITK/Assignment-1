import React from 'react';

class InputField extends React.Component{
    render(){
        return (
               <input className='inputField' type = {this.props.type}
               placeholder = {this.props.placeholder}
               name = {this.props.name}
               onChange = {(event)=>this.props.onChange(event)}
               value = {this.props.value}
               /> 
        )
    }
}

export default InputField;