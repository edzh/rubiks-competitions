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
    const { key, name, round, startTime, endTime, date, id } = this.props;

    return (
      <div className="border p-0 m-0 row col-4" key={key}>
        <div className="px-2">
          <h5 className="mb-0">{name} <span style={{fontWeight: 'normal'}}>{round}</span></h5>
          <p className="mb-0">{startTime} - {endTime}</p>
        </div>    
        <button className="btn col-3 mx-auto my-auto h-25" onClick={this.handleAddUser}>Add</button>
        <button className="btn col-3 mx-auto my-auto h-25" onClick={this.handleAddUser}>Add</button>
      </div>
    );
  }
}

export default Event;
