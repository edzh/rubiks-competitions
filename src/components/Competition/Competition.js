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
      loading: true,
      compid: this.props.match.params.compid,
      address: '',
      compName: '',
      date: '',
      lat: '',
      lng: '',
      uid: '',

      manage: false,

      competitors: [],
    };

    this.handleManageChange = this.handleManageChange.bind(this);
  }

  componentDidMount() {
    const { compid } = this.props.match.params;

    db.watchCompetition(compid).then(snap => {
      this.setState({ data: snap.val() })
    });

    // this.competitionsRef = base.syncState('competitions', {
    //   context: this,
    //   state: 'competitions',
    //   asArray: true,
    //   queries: {
    //     orderByKey:'',
    //     equalTo: this.state.compid,
    //   },
    //   then() {
    //     Object.keys(this.state.competitions[0]).map(key => {
    //       this.setState({ [key]: this.state.competitions[0][key] })
    //     });
    //     this.setState({ loading: false });
    //   }}
    // )
  }

  handleManageChange() {
    this.setState({ manage: !this.state.manage });
  }

  componentWillUnmount() {
    // base.removeBinding(this.competitionsRef);

  }

  handleRegister() {

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

    return (
    !!loading ? <p>loading...</p> :
    <AuthUserContext.Consumer>
      { // Check if competitions state is populated before passing competitions down
        authUser => !loading && authUser ?
        authUser.uid === uid ?
        <div>
          <button className="btn btn-primary" onClick={this.handleManageChange}>{ this.state.manage ? "View" : "Manage" }</button>
          <button className="btn btn-primary" onClick={this.handleRegister}>Register</button>
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
