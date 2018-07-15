import React, { Component } from 'react';
import { db, base } from '../../firebase';

import EventForm from './Form';
import Event from './Event';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      date: this.props.date,
    };
  }

  componentDidMount() {
    db.watchEvents(this.props.compid, snap => {
      this.setState({ events: snap.val() })
    });
  }

  componentWillUnmount() {
    db.detach;
  }

  render() {
    const { events, date } = this.state;
    const { compid, manage, authUser } = this.props;

    return (
      <div>
        <h4>Events:</h4>
        {!!events && Object.keys(events).map(key => {
          return (
            <Event
              key={key}
              id={key}
              name={events[key].name}
              startTime={events[key].startTime}
              endTime={events[key].endTime}
              date={events[key].date}
              authUser={authUser}
            />
          );
        })}
        {manage && <EventForm compid={compid} date={date} />}

      </div>
    );
  }
}

export default EventList;
