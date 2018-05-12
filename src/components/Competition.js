import React, { Component } from 'react';

import { db, base } from '../firebase';
import AuthUserContext from './AuthUserContext';
import withAuthentication from './withAuthentication';
import Announcement from './Announcement';

const CompetitionManagePage = ({ competitions, compid }) =>
  <div className="container">
    <h3>{competitions[compid].compName}</h3>
    <br/>
    <p>{competitions[compid].address}</p>
    <p>{competitions[compid].city}, {competitions[compid].state}, {competitions[compid].zipcode}</p>
    <p>{competitions[compid].date}</p>
    <Announcement />
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

    this.announcementsRef = base.syncState('announcements', {
      context: this,
      state: 'announcements',
      asArray: true,
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.competitionsRef);
    base.removeBinding(this.announcementsRef);
  }

  addToAnnouncements(announcement) {
    const announcements = this.state.announcements.concat(announcement);
    this.setState({
      announcements: announcements,
    });
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
            addToAnnouncements={this.addToAnnouncements} />
        : <p>Register</p>
      : <p>Please login to register for competition</p>
      }
    </AuthUserContext.Consumer>

    );
  }
}




export default Competition;
