import React, { Component } from 'react';
import moment from 'moment';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { key, name, startTime, endTime, date } = this.props;

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
