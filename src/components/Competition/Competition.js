import React, { Component } from 'react';
import { db, base } from '../../firebase';
import AuthUserContext from '../Auth/AuthUserContext';
import AnnouncementList from '../Announcement/List';
import EventList from '../Event/List';
import CompetitionManage from './Manage';
import GMap from '../GMap';

import moment from 'moment';

class Competition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compid: this.props.match.params.compid,
      address: '',
      compName: '',
      date: '',
      lat: '',
      lng: '',
      loading: true,
      manage: false,
    };

    this.handleManageChange = this.handleManageChange.bind(this);
  }

  componentDidMount() {
    const { compid } = this.props.match.params;
    this.competitionRef = db.watchCompetition(compid, snap => {
      Object.keys(snap.val()).forEach(key => {
        this.setState({ [key]: snap.val()[key] })
      });
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    db.detach;
  }

  handleManageChange() {
    this.setState({ manage: !this.state.manage });
  }

  handleRegister(compid, uid) {
    db.doCreateAttendee(compid, uid);
  }

  render() {

    const {
      address,
      compName,
      date,
      lat,
      lng,
      uid,
      compid,
      loading,
      manage,
    } = this.state;

    // db.onceGetAttending(uid, snap => {
    //   console.log(snap.val());
    // })

    return (
    !!loading ? <p>loading...</p> :
    <AuthUserContext.Consumer>
      { // Check if competitions state is populated before passing competitions down
        authUser => !loading && authUser ?
        authUser.uid === uid ?
        <div>
          <button className="btn btn-primary" onClick={this.handleManageChange}>{ this.state.manage ? "View" : "Manage" }</button>
          <button className="btn btn-primary" onClick={() => this.handleRegister(compid, authUser.uid)}>Register</button>
          <CompetitionManage
            address={address}
            compName={compName}
            date={date}
            lat={lat}
            lng={lng}
            uid={uid}
            compid={compid}
            addToAnnouncements={this.addToAnnouncements}
            authUser={authUser}
            manage={manage} />
        </div>
        : <p>Register</p>
      : <p>Please login to register for competition</p>
      }
    </AuthUserContext.Consumer>

    );
  }
}




export default Competition;
