import React, { Component } from 'react';
import { db } from '../../firebase';
import AuthUserContext from '../Auth/AuthUserContext';
import CompetitionManage from './Manage';

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
      register: false,
    };

    this.handleManageChange = this.handleManageChange.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { compid } = this.props.match.params;
    this.competitionRef = db.watchCompetition(compid, snap => {
      snap.val() && Object.keys(snap.val()).forEach(key => {
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
    db.onceGetUser(this.props.authUser.uid, snap => {
      const { firstName, lastName } = snap.val()
      db.doCreateAttendee(compid, this.props.authUser.uid, firstName, lastName);
    })
  }

  render() {

    const {
      address,
      compName,
      date,
      lat, lng,
      uid, compid,
      loading,
      manage,
    } = this.state;

    return (
    loading ? <p>loading...</p> : 
      <div>
        <button className="btn btn-primary" onClick={this.handleManageChange}>{ this.state.manage ? "View" : "Manage" }</button>
        <button className="btn btn-primary" onClick={() => this.handleRegister(compid, this.props.authUser.uid)}>Register</button>
        <CompetitionManage
          compName={compName}
          address={address}
          date={date}
          lat={lat} lng={lng}
          uid={uid} compid={compid}
          manage={manage} 
          authUser={this.props.authUser}
          addToAnnouncements={this.addToAnnouncements}
        />
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <AuthUserContext.Consumer>
    {authUser => !!authUser && <Competition {...props} authUser={authUser} ref={ref} />}
  </AuthUserContext.Consumer>
));