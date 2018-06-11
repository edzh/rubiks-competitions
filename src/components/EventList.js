import React, { Component } from 'react';
import { base } from '../firebase';

import EventForm from './EventForm';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };

    this.addToEvents = this.addToEvents.bind(this);
  }

  componentDidMount() {
    this.eventsRef = base.syncState('events', {
      context: this,
      state: 'events',
      asArray: true,
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
    const { compid } = this.props;
    const { events } = this.state;

    return (
      <div>
        <h5>Events:</h5>
        {Object.keys(events).map(key => {
          if (events[key].compid === compid) {
            return (
              <div key={key}>
                <h4>{events[key].name}</h4>
              </div>
            );
          }
        })}
        <EventForm compid={compid} addToEvents={this.addToEvents} />

      </div>
    );
  }
}

export default EventList;
