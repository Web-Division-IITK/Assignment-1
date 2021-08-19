import "../styles.css";
import React from "react";
//import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
//import { useHistory } from "react-router";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="navbar-header">
          <p className="navbar-brand">Note Keeper</p>
        </div>
        <ul className="navbar-nav mb-3 mb-rg-0 margin">
          <li className="nav-item" id="home">
            <a className="nav-link active" aria-current="page" href="/login">
              Login
            </a>
          </li>

          <li className="nav-item" id="about">
            <a className="nav-link active" aria-current="page" href="/register">
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
