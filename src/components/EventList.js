import React, { Component } from 'react';
import { base } from '../firebase';

import EventForm from './EventForm';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
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

    return (
      <EventForm compid={compid} />
    );
  }
}

export default EventList;