import React, { Component } from 'react';
import { db } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compid: this.props.compid,
      name: '',
      startTime: '',
      endTime: '',
      date: this.props.date,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { name, startTime, endTime, date } = this.state;

    event.preventDefault();
    db.doCreateEvent(this.props.compid, name, startTime, endTime, date);
    this.setState({
      name: '',
      startTime: '',
      endTime: '',
    });
  }

  render() {
    const { name, startTime, endTime, date } = this.state;

    const isInvalid =
      name === '' ||
      startTime === '' ||
      endTime === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={name}
            onChange={event => this.setState(byPropKey('name', event.target.value))}
            type="text"
            className="form-control"
          />
          <input
            value={startTime}
            onChange={event => this.setState(byPropKey('startTime', event.target.value))}
            type="time"
            className="form-control"
          />
          <input
            value={endTime}
            onChange={event => this.setState(byPropKey('endTime', event.target.value))}
            type="time"
            className="form-control"
          />
          <button disabled={isInvalid} className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default EventForm;
