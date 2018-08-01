import React, { Component } from 'react';
import { db } from '../../../firebase';
import AttendeeList from './Attending';
import VolunteerList from './Volunteers';
import StaffList from './Staff';

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
    this.setState(prevState => ({ 
      attendees: {
        [authUser.uid]: {
          title: 'Volunteer' }}}))
  }

  render() {
    const { event, attendees } = this.state;
    const { authUser, eventid } = this.props;

    return (
      <div>
        <h4>{event.type} <span style={{ fontWeight: 'normal' }}>{event.round}</span></h4>
        <p>{event.startTime} - {event.endTime}</p>
        { 
          !!attendees && attendees[authUser.uid] &&
          attendees[authUser.uid].title === 'Volunteer'
            ? attendees[authUser.uid].role === 'None'
              ? <p>Please wait for a role to be assigned</p> 
              : <p>You are a {attendees[authUser.uid].role}</p>
            : <button className="btn" onClick={this.requestVolunteer}>Request to Volunteer</button>
        } 

        <AttendeeList attendees={attendees} />
        <VolunteerList attendees={attendees} eventid={eventid}/>
        <StaffList attendees={attendees} eventid={eventid}/>
      </div>
    );
  }
}

export default EventDetails;