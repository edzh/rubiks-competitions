import React, { Component } from 'react';
import { base } from '../../firebase';

import EventForm from './Form';
import Event from './Event';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      date: this.props.date,
    };

    this.addToEvents = this.addToEvents.bind(this);
  }

  componentDidMount() {
    this.eventsRef = base.syncState('events', {
      context: this,
      state: 'events',
      asArray: true,
      queries: {
        orderByChild: 'compid',
        equalTo: this.props.compid
      }
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.eventsRef);
  }

  addToEvents(event) {
    const events = this.state.events.concat(event);
    this.setState({ events });
  }

  render() {
    const { events, date } = this.state;
    const { compid } = this.props;

    return (
      <div>
        <h5>Events:</h5>
        {Object.keys(events).map(key => {
          return (
            <Event
              key={key}
              name={events[key].name}
              startTime={events[key].startTime}
              endTime={events[key].endTime}
              date={events[key].date}
            />
          );
        })}
        {this.props.manage && <EventForm compid={compid} date={date} addToEvents={this.addToEvents} />}

      </div>
    );
  }
}

export default EventList;
