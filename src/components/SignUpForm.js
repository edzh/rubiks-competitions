import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth } from '../firebase';

import * as routes from '../constants/routes';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const isInvalid =
  passwordOne !== password Two ||
  passwordOne === '' ||
  email === '' ||
  username === '';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
    } = this.state;

    auth.doCreateUseerWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
      });
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    return(
        <form onSubmit={this.onSubmit}>
          <input
            value={firstName}
            onChange={event => this.setState(byPropKey('firstName', event.target.value))}
            type="text"
            className="form-control"
            placeholder="First Name"
          />
          <input
            value={lastName}
            onChange={event => this.setState(byPropKey('lastName', event.target.value))}
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            className="form-control"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="text"
            className="form-control"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="text"
            className="form-control"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit" className="btn btn-primary">Sign Up</button>

          { error && <p>{error.message}</p> }
        </form>
    );

  }
}

export default SignUpForm;
