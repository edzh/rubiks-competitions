import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ authUser, attendees, requestVolunteer }) =>
  <div>
    {
      attendees && attendees[authUser.uid] && (
      attendees[authUser.uid].title === 'Volunteer'
      ? attendees[authUser.uid].role === 'None'
        ? <p>Please wait for a role to be assigned</p>
        : <p>You are a {attendees[authUser.uid].role}</p>
      : attendees[authUser.uid].title === 'Staff'
        ? <p>You are already a staff member</p>
        : <button className="btn" onClick={requestVolunteer}>Request to Volunteer</button>
      )
    }

  </div>

export default Status;

Status.propTypes = {
  authUser: PropTypes.object,
  attendees: PropTypes.object,
  requestVolunteer: PropTypes.func,
}
