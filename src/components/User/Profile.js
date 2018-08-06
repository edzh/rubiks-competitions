import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../firebase';
import AuthUserContext from '../Auth/AuthUserContext';

class RegisteredCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: {},
      loading: true,
    }
  }

  componentDidMount() {
    db.onceGetCompetitionsByUser(this.props.uid, snap => {
      this.setState(prevState => ({
        competitions: {
          ...prevState.competitions,
          [snap.key]: snap.val()
        }
      }));
    })
  }

  // componentWillUnmount() {
  //   db.detach;
  // }

  render() {
    return (
      <div>
      <h2>Registered Competitions</h2>
      <table>
        <tbody>
          {!!this.state.competitions && Object.keys(this.state.competitions).map(key =>
            <tr key={key}>
              <td>{this.state.competitions[key].compName}</td>
            </tr>
          )}

        </tbody>
      </table>
      </div>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      loading: true,

    }
  }

  componentDidMount() {
    db.onceGetUserInfo(this.props.match.params.uid, snap => {
      Object.keys(snap.val()).forEach(key => {
        this.setState({ [key]: snap.val()[key] })
      });
      this.setState({ loading: false });
    })
  }

  render() {

    const { firstName, lastName, email, loading } = this.state;

    return (
      loading ? <p>loading...</p> :
      <div>
        <h2>{firstName} {lastName}</h2>
        <h4>{email}</h4>
        <RegisteredCompetitions authUser={this.props.authUser} uid={this.props.match.params.uid} />

      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <AuthUserContext.Consumer>
    {authUser => !!authUser && <Profile {...props} authUser={authUser} ref={ref} />}
  </AuthUserContext.Consumer>
));

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired
    })
  }),
  authUser: PropTypes.object,
}

RegisteredCompetitions.propTypes = {
  uid: PropTypes.string,
}
