import React, { Component } from "react"
import axios from "axios";
import AddNote from "./components/getter";

class App extends Component {
  state = {
    todoList: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/notes/');
      const todoList = await res.json();
      this.setState({
        todoList
      });
    } catch (e) {
      console.log(e);
  }
  }


  //Responsible for saving the task
  handleSubmit = item => {
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
      return;  
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
  };

  createItem = () => {
    const item = {title: "", description: ""};
  };

  renderItems = () => {
    const newItems = this.state.todoList;
    return newItems.map(item => (
      <li 
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span 
          title={item.description}
          >
            {item.title}
          </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">Note Keeper</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={this.createItem} className="btn btn-success">Add Note</button>
            </div>
            <ul className="list-group list-group-flush">
              {this.renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {this.state.modal ? (
        <AddNote
          onSave={this.handleSubmit}
        />
      ): null}
    </main>
    )
  }
}

export default App;