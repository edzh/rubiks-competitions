import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';

import EventSelector from './EventSelector';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compid: this.props.compid,
      events: {},
      guests: 0,
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

  onSubmit(event) {
    event.preventDefault();
    const { authUser, compid, firstName, lastName } = this.props;
    const { ...events } = this.state.events;
    db.doCreateAttendee(compid, authUser.uid, firstName, lastName, events, this.state.guests);
    db.doCreateEventUserFromRegistration(compid, authUser.uid, firstName, lastName, events);
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
    const { events, guests } = this.state;

    return (
      <div className="card px-4 py-4">

        <form onSubmit={this.onSubmit}>
          <EventSelector events={events} toggleEvent={this.toggleEvent} />

          <input
            type="number"
            value={parseInt(guests, 10)}
            onChange={ event => this.setState(byPropKey('guests', event.target.value))}
            className="form-control my-2"
            placeholder="Guests"
          />

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;

RegisterForm.propTypes = {
  compid: PropTypes.string,
};
