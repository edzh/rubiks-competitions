import React, { Component } from 'react';

class LogIn extends Component {
  render() {
    return(
      <div className="container">
        <h2>Log In</h2>
        <form>
          <div className="form-group row">
            <input type="text" className="form-control" name="email" placeholder="Email" />
          </div>
          <div className="form-group row">
            <input type="text" className="form-control" name="password" placeholder="Password" />
          </div>
          <button className="btn btn-primary">Log In</button>
        </form>
      </div>
    );

  }
}

export default LogIn;
