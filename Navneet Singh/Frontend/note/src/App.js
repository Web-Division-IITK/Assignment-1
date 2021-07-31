import React, { Component, Fragment } from "react"
import {Provider} from "react-redux"
import store from "./store";
import axios from "axios";
import Header from "./components/layouts/header";
import Dashboard from "./components/main/dashboard";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Fragment>
        <Header />
        <div className="container">
        <Dashboard />
        </div>
        
      </Fragment>
      </Provider>

    )
  }
}

export default App
