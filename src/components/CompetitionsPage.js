import React, { Component } from 'react';

import { db } from '../firebase';
import AuthUserContext from './AuthUserContext';
import withAuthorization from './withAuthorization';

const CompetitionsTable = ({ competitions, authUser }) =>
  <table className="table">
    <tbody>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Date</th>
      </tr>

      {Object.keys(competitions).map(key =>
        <tr key={key}>
          <td>{competitions[key].compName}</td>
          <td>{competitions[key].address}</td>
          <td>{competitions[key].date}</td>
          {authUser.uid === competitions[key].organizer ? <td>Manage</td> : <td>View</td>}
        </tr>
      )}
    </tbody>
  </table>



class CompetitionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: this.props.authUser,
      competitions: null,
      loading: true,
    };
  }

  componentDidMount() {
    db.onceGetCompetitions().then(snapshot =>
      this.setState(() => ({competitions: snapshot.val(), loading: false }))
    );
  }

  render() {
    const { competitions, loading, authUser } = this.state;
    
    return (
      <div>
        <h2>Competitions</h2>
        { loading && <p>loading...</p> }
        { !!competitions && <CompetitionsTable authUser={authUser} competitions={competitions} /> }
      </div>
    );
  }

}

const CompetitionsPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <CompetitionsList authUser={authUser} />
        
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => authUser;

export default withAuthorization(authCondition)(CompetitionsPage);
