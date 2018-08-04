import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
// import moment from 'moment';
// import Attending from './Details/Attending';
import * as routes from '../../constants/routes';

class Event extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }


  handleDelete(eventid) {
    db.deleteEvent(eventid);
  }

  render() {
    const { compid, type, round, startTime, endTime, id } = this.props;

    return (
      <div>

      <div className="border-bottom p-0 m-0 row" key={id}>
        <div className="col-7">
          <h5 className="mb-0">{type} <span style={{fontWeight: 'normal'}}>{round}</span></h5>
          <p className="mb-0">{startTime} - {endTime}</p>
        </div>
        <Link className="btn btn-primary col-2 mx-auto my-auto h-25" to={`${routes.COMPETITIONS}/${compid}/events/e/${id}`}>
          View
        </Link>
        <button className="btn btn-danger col-2 mx-auto my-auto h-25" onClick={() => this.handleDelete(id)}>Delete</button>
      </div>
      </div>
    );
  }
}

export default Event;
