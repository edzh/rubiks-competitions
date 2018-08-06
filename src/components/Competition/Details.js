import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import moment from 'moment';

const CompetitionDetails = ({ ...props, splitAddress = props.address.split(', ') }) =>
  <div className="p-2">
    <div className="col-7">
      <h3><span style={{fontWeight: 'normal'}}>{splitAddress[0]}</span></h3>
      <h3><span style={{fontWeight: 'normal'}}>{splitAddress[1]}</span></h3>
      <h3><span style={{fontWeight: 'normal'}}>{splitAddress[2]}, {splitAddress[3]}, {splitAddress[4]}</span></h3>
      <div className="card px-4 py-2">
        <h2>Venue</h2>
        <h3><span style={{fontWeight: 'normal'}}>{props.venue}</span></h3>
        <p>{props.details}</p>

        <h3>Registration Info:</h3>
        <dl className="row">
          <dt className="col-2">Limit</dt>
          <dd className="col-10">{props.registrationLimit}</dd>
          <dt className="col-2">Fee</dt>
          <dd className="col-10">${props.registrationFee}</dd>
          <dt className="col-2">Registration Period</dt>
          <dd className="col-10">{moment(props.registrationBegin).format('LL')} - {moment(props.registrationEnd).format('LL')}</dd>
          <dt className="col-2">Registration Requirements</dt>
          <dd className="col-10">{props.registrationRequirements}</dd>
        </dl>
      </div>
    </div>
  </div>

export default CompetitionDetails;

CompetitionDetails.propTypes = {
  address: PropTypes.string.isRequired,
  venue: PropTypes.string,
  details: PropTypes.string,
  registrationLimit: PropTypes.number,
  registrationRequirements: PropTypes.string,
  registrationFee: PropTypes.number,
  registrationBegin: PropTypes.string.isRequired,
  registrationEnd: PropTypes.string.isRequired,
}
