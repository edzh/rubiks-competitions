import React, { Component } from 'react';
import { db } from '../../../firebase';
import AttendeeList from './Attending';
import VolunteerList from './Volunteers';
import StaffList from './Staff';
import Status from './VolunteerStatus';

class EventDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      event: {},
      attendees: {}
    }

    this.requestVolunteer = this.requestVolunteer.bind(this);
  }

  componentDidMount() {
    const { eventid } = this.props;
    db.onceGetEvent(eventid, snap => {
      this.setState({ event: snap.val() })
    })
    db.watchEventUsers(eventid, snap => {
      this.setState({ attendees: snap.val() })
      console.log(this.state);
    })
  }

  requestVolunteer() {
    const { eventid, authUser } = this.props;
    db.changeEventUserTitle(eventid, authUser.uid, 'Volunteer');
  }

  render() {
    const { event, attendees } = this.state;
    const { authUser, eventid } = this.props;

    return (
      <div>
        <h4>{event.type} <span style={{ fontWeight: 'normal' }}>{event.round}</span></h4>
        <p>{event.startTime} - {event.endTime}</p>
        <Status authUser={authUser} attendees={attendees} requestVolunteer={this.requestVolunteer} />
        <div className="row">
          <VolunteerList attendees={attendees} eventid={eventid}/>
          <StaffList attendees={attendees} eventid={eventid}/>
        </div>

        <AttendeeList attendees={attendees} />
      </div>
    );
  }
}

export default EventDetails;