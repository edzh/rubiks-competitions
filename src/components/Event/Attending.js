import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

import * as routes from '../../constants/routes';
import EventRole from './Role';

class EventAttendingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendees: {},
    }

  }

  componentDidMount() {
    db.watchEventUsers(this.props.eventid, snap => {
      !!snap.val() && Object.keys(snap.val()).forEach(key => {
        this.setState(prevState => ({
          attendees: {
            ...prevState.attendees,
            [key]: {
              firstName: snap.val()[key].firstName,
              lastName: snap.val()[key].lastName,
              role: snap.val()[key].role
            }          
          }
        }))
      });
    })
  }



  render() {

    const { attendees } = this.state;

    return (
      <table className="table">
        <tbody>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col"></th>
        </tr>

        {
          Object.keys(attendees).map(key => 
            <tr key={key}>
              <td>
                <Link to={`${routes.PROFILE}/${key}`}>
                {attendees[key].firstName} {attendees[key].lastName}
                </Link>
              </td>
              <td>{attendees[key].role}</td>
              <td>
                <EventRole role={attendees[key].role} eventid={this.props.eventid} uid={key} />
              </td>
            </tr> 
          )
        }
        </tbody>
      </table>
    );
  }
}

export default EventAttendingList;