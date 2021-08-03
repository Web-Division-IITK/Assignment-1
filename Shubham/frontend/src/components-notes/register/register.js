import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
//import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
export default function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    event.preventDefault();
    var { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log(event.target);
  }
  const register = (event) => {
    event.preventDefault();
    const { email, password } = user;
    if (email && password.length >= 6) {
      console.log("submit");
      fetch("https://note-keeper100.herokuapp.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.message === "This Email-id is already registered") {
            alert(res.message);
          } else {
            alert(res.message);
            history.push("/login");
          }
        });
    } else {
      if (email && password.length < 6) {
        if (password.length === 0) {
          alert("Invalid Password");
        } else {
          alert("Password length is too short");
        }
      } else {
        alert("Invalid Email");
      }
    }
  };
  return (
    <div className="container mt-5">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={register}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                    value={user.email}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Register
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
