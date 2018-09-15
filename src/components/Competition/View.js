import React from 'react';
import PropTypes from 'prop-types';
import CompetitionViewNavbar from './ViewNavbar';

const CompetitionView = ({ ...props }) => 
  <div>
    <CompetitionViewNavbar compid={props.compid} />
  </div>

export default CompetitionView;

CompetitionView.propTypes = {
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  venue: PropTypes.string,
  details: PropTypes.string,
  registrationLimit: PropTypes.number,
  registrationRequirements: PropTypes.string,
  registrationFee: PropTypes.number,
  registrationBegin: PropTypes.string.isRequired,
  registrationEnd: PropTypes.string.isRequired,
}
