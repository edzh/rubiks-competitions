import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from '../firebase';

import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history}/>
  </div>

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

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db.doCreateUser(authUser.uid, firstName, lastName, email)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error',error));
        });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstName === '' ||
      lastName === '';

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
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit" className="btn btn-primary">Sign Up</button>

          { error && <p>{error.message}</p> }
        </form>
    );

  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
