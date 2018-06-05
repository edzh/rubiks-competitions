import React, { Component } from 'react';
import { base } from '../firebase';
import AuthUserContext from './AuthUserContext';
import AnnouncementList from './AnnouncementList';
import EventList from './EventList';
import GMap from './GMap';

const CompetitionManagePage = ({ competitions, compid, authUser, addToAnnouncements }) =>
  <div className="container">
    <h2>{competitions[compid].compName}</h2>
    <br/>
    <p>{competitions[compid].address}</p>
    <p>{competitions[compid].date}</p>
    <AnnouncementList authUser={authUser} compid={compid} />
    <hr/>
    <EventList compid={compid} />
    <hr/>
    <GMap lat={competitions[compid].lat} lng={competitions[compid].lng} />
  </div>

class Competition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: null,
      loading: true,
      compid: this.props.match.params.compid,
    };
  }

  componentDidMount() {
    this.competitionsRef = base.syncState('competitions', {
      context: this,
      state: 'competitions',
      asArray: true,
      then() {
        this.setState({ loading: false })
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.competitionsRef);

  }

  render() {

    const { competitions, compid, loading } = this.state;

    return (
    !!loading ? <p>loading...</p> :
    <AuthUserContext.Consumer>
      { // Check if competitions state is populated before passing competitions down
        authUser => !!competitions && authUser ?
        authUser.uid === competitions[compid].organizer ?
          <CompetitionManagePage
            competitions={competitions}
            compid={compid}
            addToAnnouncements={this.addToAnnouncements}
            authUser={authUser} />
        : <p>Register</p>
      : <p>Please login to register for competition</p>
      }
    </AuthUserContext.Consumer>

    );
  }
}




export default Competition;
