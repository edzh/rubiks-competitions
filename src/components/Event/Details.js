import React, { Component } from 'react';
import { db } from '../../firebase';
import EventAttendingList from './Attending';

class EventDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      event: {},
      eventAttendeeList: {}
    }

    this.handleAddUser = this.handleAddUser.bind(this);
  }

  componentDidMount() {
    const { eventid } = this.props;
    db.onceGetEvent(eventid, snap => {
      this.setState({ event: snap.val() })
    })
    db.onceGetEventUsers(eventid, snap => {
      this.setState({ eventAttendeeList: snap.val() })
    })
  }

  handleAddUser() {
    const { eventid, authUser } = this.props;
    db.onceGetUser(authUser.uid, snap => {
      const { firstName, lastName } = snap.val()
      db.doCreateEventUser(eventid, authUser.uid, firstName, lastName);
    })
  }

  render() {
    const { event, eventAttendeeList } = this.state;
  
    return (
      <div>
        <h4>{event.name} <span style={{ fontWeight: 'normal' }}>{event.round}</span></h4>
        <p>{event.startTime} - {event.endTime}</p>
        <button onClick={() => this.handleAddUser()}>Register</button>
        <EventAttendingList eventid={this.props.eventid} />
      </div>
    );
  }
}

export default EventDetails;
        // {eventAttendeeList && Object.keys(eventAttendeeList).map(key => {
        //   return (
        //     <p>{eventAttendeeList[key].firstName}</p>
        //   );
        // })}