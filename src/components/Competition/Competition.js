import React, { Component } from 'react';
import { db } from '../../firebase';
import AuthUserContext from '../Auth/AuthUserContext';
import CompetitionNavbar from './Navbar';
import CompetitionManage from './Manage';
import * as routes from '../../constants/routes';
import { Route, Link } from 'react-router-dom';

import moment from 'moment';

const allowed = ['Round 1', 'Combined Final']

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
      register: false,
      details: '',
      venue: '',
      registrationLimit: '',
      registrationFee: '',
      registrationBegin: '',
      registrationEnd: '',
      registrationRequirements: '',
    };
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

  handleRegister(compid, uid) {
    db.onceGetUser(this.props.authUser.uid, snap => {
      const { firstName, lastName } = snap.val()
      db.doCreateAttendee(compid, this.props.authUser.uid, firstName, lastName);
    })
  }

  render() {
    const { loading, compid, compName, date, ...props } = this.state;
    return (
    loading ? <p>loading...</p> :
      <div>
        <div className="row mx-0 my-2">
          <h1 className="">{compName}</h1>
          <h2 className="mt-2 ml-auto" style={{fontWeight: 'normal'}}>{moment(date).format('LL')}</h2>
        </div>

        <CompetitionNavbar compid={compid} />
        <CompetitionManage {...props} date={date} authUser={this.props.authUser} />
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <AuthUserContext.Consumer>
    {authUser => !!authUser && <Competition {...props} authUser={authUser} ref={ref} />}
  </AuthUserContext.Consumer>
));
