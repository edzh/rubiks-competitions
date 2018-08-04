import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { db } from '../../../firebase';
import CompetitionAttendee from './Attendee';

import * as routes from '../../../constants/routes';

class CompetitionAttendingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendees: {},
    }
  }

  componentDidMount() {
    db.watchCompetitionAttendees(this.props.compid, snap => {
      snap.val() && Object.keys(snap.val()).forEach(key => {
        this.setState(prevState => ({
          attendees: {
            ...prevState.attendees,
            [key]: snap.val()[key]
          }
        }))
      });
    })
  }

  render() {

    const { attendees } = this.state;

    return (
      <div className="px-4 py-2">
        <h2>Competitors:</h2>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Events</th>
            </tr>
            {
              Object.keys(attendees).map(key =>
                <tr key={key}>
                  <td>
                    <Link key={key} to={`${routes.PROFILE}/${key}`}>
                      {attendees[key].firstName} {attendees[key].lastName}
                    </Link>
                  </td>
                  <td><CompetitionAttendee attendeeEvents={attendees[key].events} /></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default CompetitionAttendingList;

CompetitionAttendingList.propTypes = {
  compid: PropTypes.string,
};