import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';
import moment from 'moment'

import RegisterForm from './Form';


class RegisterDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registrationBegin: '',
      registrationEnd: '',
      registrationFee: '',
      registrationLimit: '',
      registrationRequirements: ''
    }
  }

  componentDidMount() {
    db.onceGetCompetition(this.props.compid, snap => {
      snap.val() && Object.keys(this.state).forEach(key => {
        this.setState(prevState => ({
          ...prevState,
          [key]: snap.val()[key]
        }));
      })
    });
  }

  render() {
    const {
      registrationBegin,
      registrationEnd,
      registrationFee,
      registrationLimit,
      registrationRequirements
    } = this.state;

    return (
      <div className="card px-4 py-2">
        <dl className="row">
          <dt className="col-3">Competitor Limit</dt>
          <dd className="col-9">{registrationLimit}</dd>
          <dt className="col-3">Fee</dt>
          <dd className="col-9">${registrationFee}</dd>
          <dt className="col-3">Period</dt>
          <dd className="col-9">{moment(registrationBegin).format('LL')} - {moment(registrationEnd).format('LL')}</dd>
          <dt className="col-3">Requirements:</dt>
          <dd className="col-9">{registrationRequirements}</dd>
        </dl>
      </div>
    );
  }
}

export default RegisterDetails;

RegisterDetails.propTypes = {
  compid: PropTypes.string,
};