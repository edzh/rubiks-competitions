import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';
// import { db } from '../../../firebase';

// import * as routes from '../../../constants/routes';
import * as events from '../../../constants/events';

const eventStyleTrue = {backgroundColor: 'black', height: '48px', width: '48px', color: 'white'}
const eventStyleFalse = {backgroundColor: 'white', height: '48px', width: '48px'}

const CompetitionAttendee = ({ attendeeEvents }) =>
  <div className="row">
    {
      Object.keys(events.default).map(key =>
        <div key={key} className="mx-2 border rounded" style={attendeeEvents[key] ? eventStyleTrue : eventStyleFalse }>
          <p className="small">{events.default[key]}</p>
        </div>
      )
    }
  </div>

export default CompetitionAttendee;

CompetitionAttendee.propTypes = {
  attendeeEvents: PropTypes.object.isRequired,
};
