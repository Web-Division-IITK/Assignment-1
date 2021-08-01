import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signin } from '../../actions/authentication';


export class Signin extends Component {
    state = {
        username : '',
        password: '',
    };
    static propTypes={
        signin: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
      }

    onSubmit=e =>{
        e.preventDefault();
        this.props.signin(this.state.username, this.state.password);
    }

    onChange=e=>{
        this.setState({ [e.target.name]: e.target.value});
    };

    render() {
      if(this.props.isAuthenticated){
        return <Redirect to="/" />;
      }
        const { username, password}= this.state;
        return (
            <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Sign In</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.onChange}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
            <p>
              First time? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
        )
    }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps,{signin})(Signin);
