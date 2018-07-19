import React, { Component } from 'react';
import { db } from '../../firebase';
import moment from 'moment';
import Attending from './Attending';

class Event extends Component {
  constructor(props) {
    super(props);

    this.handleAddUser = this.handleAddUser.bind(this);

  }

  handleAddUser() {
    const { id, authUser } = this.props;
    db.onceGetUser(authUser.uid, snap => {
      const { firstName, lastName } = snap.val()
      db.doCreateEventUser(id, authUser.uid, firstName, lastName);
    })
  }

  render() {
    const { key, name, startTime, endTime, date, id } = this.props;

    return (
      <div className="card" key={key}>
        <h5>{name}</h5>
        <p>{startTime} - {endTime}</p>
        <button className="btn" onClick={this.handleAddUser}>Add</button>
        <Attending eventid={id} />
      </div>
    );
  }
}

export default Event;