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
    console.log(id, authUser.uid);
  }

  render() {
    const { key, name, startTime, endTime, date, id } = this.props;

    return (
      <div key={key}>
        <h4>{name}</h4>
        <p>{startTime} - {endTime}</p>
        <p>{moment(date).format('LL')}</p>
        <button className="btn" onClick={this.handleAddUser}>Add</button>
        <Attending eventid={id} />
      </div>
    );
  }
}

export default Event;
