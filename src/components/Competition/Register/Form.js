import React, { Component } from 'react';
import { db } from '../../../firebase';

import EventSelector from './EventSelector';



class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compid: this.props.compid,
      events: {},
      guests: '',
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
  }

  componentDidMount() {
    const { compid } = this.state;
    db.onceGetCompetitionEvents(compid, snap => {
      snap.val() && Object.keys(snap.val()).forEach(key => {
        this.setState(prevState => ({ events: {
          ...prevState.events,
          [snap.val()[key].name]: false }
        }))
      })
    })
  }

  onSubmit(compid, uid) {
    const { firstName, lastName } = this.state;
    db.doCreateAttendee(compid, this.props.authUser.uid, firstName, lastName);
  }

  toggleEvent(event) {
    this.setState(prevState => ({
      events: {
        ...prevState.events,
        [event]: !this.state.events[event]
      }
    }));
  }

  render() {
    const { guests, events } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <EventSelector events={events} toggleEvent={this.toggleEvent} />

          <input
            type="number"
            className="form-control"
            placeholder="Guests"
          />

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
