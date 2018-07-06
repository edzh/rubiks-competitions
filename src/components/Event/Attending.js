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
      <div>
      <h2>attending:</h2>
      {
        Object.keys(attendees).map(key => 
          <div key={key} className="row">
            <Link to={`${routes.PROFILE}/${key}`}>
              <p>{attendees[key].firstName} {attendees[key].lastName}</p>
            </Link>
            <p>{attendees[key].role}</p>
          </div>
        )
      }
      </div>
    );
  }
}

export default EventAttendingList;