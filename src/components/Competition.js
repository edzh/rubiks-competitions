import React, { Component } from 'react';

import { db, base } from '../firebase';
import AuthUserContext from './AuthUserContext';
import withAuthentication from './withAuthentication';

const CompetitionPage = () => 
  <div>
    
  </div>

class Competition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: null,
      loading: true,
      compid: this.props.match.params.compid,
    }
  }

  componentDidMount() {
    // db.onceGetCompetitions().then(snapshot => 
    //   this.setState({
    //     competitions: snapshot.val(),
    //     loading: false,
    //   }),
    // );
    this.ref = base.syncState('competitions', {
      context: this,
      state: 'competitions',
      asArray: true,
    })
  }

  render() {

    const { competitions, compid, loading } = this.state;

    return (
    <AuthUserContext.Consumer>
      {authUser => !!competitions && authUser ?
        authUser.uid === competitions[compid].organizer ? 
          <div className="container">
            <h3>{competitions[compid].compName}</h3>
            <p>{competitions[compid].address}</p>
            <p>{competitions[compid].city}</p>
            <p>{competitions[compid].state}</p>
            <p>{competitions[compid].zipcode}</p>
            <p>{competitions[compid].date}</p>
          </div>
        : <p>Register</p>
      : <p>Please login to register for competition</p>
      }
    </AuthUserContext.Consumer>
        
    );
  }
} 




export default Competition;