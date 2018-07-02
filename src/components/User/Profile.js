import React, { Component } from 'react';
import { db } from '../../firebase';
import AuthUserContext from '../Auth/AuthUserContext';

class RegisteredCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: {}
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

  componentWillUnmount() {
    db.detach;
  }

  render() {
    return (
      <div>
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
  }

  render() {

    const { uid } = this.props.match.params;

    return (
      <div>
        <RegisteredCompetitions uid={uid} />
      </div>
    );
  }
}

export default Profile;
