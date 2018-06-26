import React, { Component } from 'react';
import moment from 'moment';

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.id,
      name: this.props.name,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      date: this.props.date,

    }
  }

  render() {
    const { key, name, startTime, endTime, date } = this.state;

    return (
      <div key={key}>
        <h4>{name}</h4>
        <p>{startTime} - {endTime}</p>
        <p>{moment(date).format('LL')}</p>
      </div>
    );
  }
}

export default Event;
