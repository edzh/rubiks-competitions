import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import moment from 'moment';
import Attending from './Attending';
import * as routes from '../../constants/routes';

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
  handleDelete(eventid) {
    db.deleteEvent(eventid);
    console.log(eventid);
  }

  render() {
    const { compid, key, name, round, startTime, endTime, date, id } = this.props;

    return (
      <div>

      <div className="border p-0 m-0 row" key={key}>
        <div className="col-7">
          <h5 className="mb-0">{name} <span style={{fontWeight: 'normal'}}>{round}</span></h5>
          <p className="mb-0">{startTime} - {endTime}</p>
        </div>
        <Link className="btn btn-primary col-2 mx-auto my-auto h-25" to={`${routes.COMPETITIONS}/${compid}/events/${id}`}>
          View
        </Link>
        <button className="btn btn-danger col-2 mx-auto my-auto h-25" onClick={() => this.handleDelete(id)}>Delete</button>
      </div>
      </div>
    );
  }
}

export default Event;
