import React, { Component, Fragment } from "react"
import {Provider} from "react-redux"
import store from "./store";
import axios from "axios";
import { loaduser } from "./actions/authentication";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import Header from "./components/layouts/header";
import Dashboard from "./components/main/dashboard";
import { HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import PrivateRoute from "./components/folder/PrivateRoute";


export class App extends Component {
componentDidMount(){
  store.dispatch(loaduser());
}

  render() {
    return (
      <Provider store={store}>
        <Router>
      <Fragment>
        <Header />
        <div className="container">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
        </div>
        
      </Fragment>
      </Router>
      </Provider>

    );
  }
}

export default App
