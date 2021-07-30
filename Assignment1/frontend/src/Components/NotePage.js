import React from 'react';
import Notes from './Notes';
import InputField from './InputField';

class NotePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email : this.props.email,
            token : this.props.token,
            data : [],
            index:-1,
            inputPage : false,
            heading : '',
            text :'',
        };
    }

    async componentDidMount(){
        if(!this.state.inputPage){
            try{
                let req = {
                  method : 'POST',
                  headers : {
                    'authorization' : this.state.token, 
                    'Content-Type': 'application/json',
                  },
                  body : JSON.stringify({
                    email : this.state.email,
                  })
                };
                let res = await fetch('http://localhost:5000/view',req);
                let response = await res.json();
                // console.log(response.data);
                if(res.status === 200){
                  this.setState({data:response.data}); //Have a look here
                }else if(res.status===400){ //User not registered
                    alert(response.msg);
                    this.props.changeRegister();
                }else{
                    alert(response.msg);
                    this.props.changeLogin();
                }
              }
              catch(err){
                console.log(err);
                alert(err);
              }
        }
    }

    showNote(i){
      if(i===-1)
      {
        this.setState({inputPage:true,heading :'',text:'',index:i});
      }else{
        this.setState({inputPage:true,heading:this.state.data[i].heading,text:this.state.data[i].text,index:i});
      }
    }

    handleChange(event){
      let nam=event.target.name;
      let val = event.target.value?event.target.value:'';
      this.setState({[nam]:val});
    }

    async addNote(i){
      if(!this.state.heading || !this.state.text){
        alert("Incomplete Submission");
        return;
      }
      else{
        try{
          let req = {
            method : 'POST',
            headers : {
              'authorization' : this.state.token, 
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              email : this.state.email,
              data : {heading:this.state.heading, text:this.state.text},
              index : i
            })
          };
          let res = await fetch('http://localhost:5000/addNotes',req);
          let response = await res.json();
          // console.log(response.data);
          if(res.status === 200){
            this.setState({data:response.data,inputPage:false,index:-1,heading:'',text:''}); //Have a look here
          }else if(res.status===400){ //User not registered
              alert(response.msg);
              this.props.changeRegister();
          }else{
              alert(response.msg);
              this.props.changeLogin();
          }
        }
        catch(err){
          console.log(err);
          alert(err);
        } 
      }
    }

    
    async deleteNote(i){
        try{
          let req = {
            method : 'POST',
            headers : {
              'authorization' : this.state.token, 
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({
              email : this.state.email,
              index : i
            })
          };
          let res = await fetch('http://localhost:5000/delete',req);
          let response = await res.json();
          // console.log(response.data);
          if(res.status === 200){
            this.setState({data:response.data,inputPage:false,index:-1,heading:'',text:''}); //Have a look here
          }else if(res.status===400){ //User not registered
              alert(response.msg);
              this.props.changeRegister();
          }else{
              alert(response.msg);
              this.props.changeLogin();
          }
        }
        catch(err){
          console.log(err);
          alert(err);
        }
    }

    render(){

        if(!this.state.inputPage){
          let data;
          if(this.state.data){
            data = this.state.data.map((item,index)=>{return <Notes text={item.heading} key={index.toString()} showNote= {()=>this.showNote(index)} deleteNote= {()=>this.deleteNote(index)}  />});
          }
          return (
              <div className = 'notePage'>
                  {data}
                  <button className='Add'
                    type='button'
                    onClick={()=>this.showNote(-1)}
                    >Add Note
                    </button>
              </div>
          )
        }
        else{
          return(
            <div className = 'noteInput'>
                <textarea className='noteHeading' type = 'text'
                  name = 'heading'
                  placeholder = 'Heading'
                  onChange  = {(event)=>this.handleChange(event)}
                  value = {this.state.heading}
                />
                <textarea className='noteText'  type = 'text'
                  name = 'text'
                  placeholder = 'Enter your text here...'
                  onChange  = {(event)=>this.handleChange(event)}
                  value = {this.state.text}
                />
              <button className='save'
                type = 'button'
                onClick = {()=>{this.addNote(this.state.index)}}
              >Save</button>
            </div>
          )
        }
    }
}

export default NotePage;