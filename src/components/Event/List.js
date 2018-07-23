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

  render() {
    const { events, date } = this.state;
    const { compid, manage, authUser } = this.props;

    return (
      <div className="px-4 py-2">
        <h2>Events:</h2>
        {!!events && Object.keys(events).map(key => {
          return (
            <Event
              key={key}
              id={key}
              name={events[key].name}
              round={events[key].round}
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
