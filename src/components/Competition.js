import React, { Component } from 'react';

import { db, base } from '../firebase';
import AuthUserContext from './AuthUserContext';
import withAuthentication from './withAuthentication';

class Competition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: null,
      loading: true,
      uid: this.props.match.params.uid,
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
    this.ref = base.fetch('competitions', {
      context: this,
      state: 'competitions',
      asArray: true,
      loading: false
    })
  }

  render() {




    return (
    <AuthUserContext.Consumer>
      {authUser => authUser ? 
      <div className="container">
        <h3>{this.state.competitions}</h3>
        <h4>{authUser.uid}</h4>

        <p>asd</p>       
      </div>
      : <p>asd</p>
      }
    </AuthUserContext.Consumer>
        
    );
  }
} 




export default Competition;