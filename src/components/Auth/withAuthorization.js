import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = (authCondition) => (WrappedComponent) => {
  class WithAuthorization extends Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LOG_IN);
        }
      });
    }

    render() {
      return (
      <AuthUserContext.Consumer>
        {authUser => authUser ? <WrappedComponent authUser={authUser.uid} /> : null}
      </AuthUserContext.Consumer>

      )
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;