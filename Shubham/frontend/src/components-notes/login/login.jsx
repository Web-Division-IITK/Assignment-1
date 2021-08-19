import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
//import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
//import axios from "axios";
export default function Login(props) {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log(event.target);
  };
  const login = (event) => {
    const { email, password } = user;
    event.preventDefault();
    if (email && password.length >= 6) {
      fetch("https://note-keeper100.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res:", res);
          if (res.message === "User login successfully") {
            props.setUser(true);
            history.push("/");
          } else {
            console.log(res.message);
            alert(res.message);
          }
        });
    } else {
      console.log(email);
      alert("Invalid Email & Password");
    }
  };
  return (
    <div className="container mt-5">
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={login}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={user.password}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-padding"></div>
      <div className="footer">
        <p>
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by The Programmer
        </p>
      </div>
    </div>
  );
}
