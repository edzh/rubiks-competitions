import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

import * as routes from '../../constants/routes';

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
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Role</th>
        </tr>

        {
          Object.keys(attendees).map(key => 
            <tr key={key}>
              <td>{attendees[key].firstName}</td>
              <td>{attendees[key].lastName}</td>
              <td>{attendees[key].role}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    );
  }
}

export default EventAttendingList;