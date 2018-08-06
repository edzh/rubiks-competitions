import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import AuthUserContext from '../Auth/AuthUserContext';
import CompetitionNavbar from './Navbar';
import CompetitionManage from './Manage';

import moment from 'moment';

const allowed = ['Round 1', 'Combined Final']

class Competition extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { compid } = this.props;
    this.competitionRef = db.watchCompetition(compid, snap => {
      snap.val() && Object.keys(snap.val()).forEach(key => {
        this.setState({ [key]: snap.val()[key] })
      });
      this.setState({ loading: false });
    });

  }

  handleRegister(compid, uid) {
    db.onceGetUser(this.props.authUser.uid, snap => {
      const { firstName, lastName } = snap.val()
      db.doCreateAttendee(compid, this.props.authUser.uid, firstName, lastName);
    })
  }

  render() {
    const { loading, compName, date, ...props } = this.state;
    const { compid } = this.props;
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
    {authUser => !!authUser && <Competition {...props} compid={props.match.params.compid} authUser={authUser} ref={ref} />}
  </AuthUserContext.Consumer>
));

Competition.propTypes = {
  authUser: PropTypes.object.isRequired,
  compid: PropTypes.string.isRequired,
};
