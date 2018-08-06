import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { compid, type, round, startTime, endTime, eventid } = this.props;

    return (
      <div>

      <div className="border-bottom p-0 m-0 row" key={eventid}>
        <div className="col-7">
          <h5 className="mb-0">{type} <span style={{fontWeight: 'normal'}}>{round}</span></h5>
          <p className="mb-0">{startTime} - {endTime}</p>
        </div>
        <Link className="btn btn-primary col-2 mx-auto my-auto h-25" to={`${routes.COMPETITIONS}/${compid}/events/e/${eventid}`}>
          View
        </Link>
        <button className="btn btn-danger col-2 mx-auto my-auto h-25" onClick={() => this.handleDelete(eventid)}>Delete</button>
      </div>
      </div>
    );
  }
}

export default Event;

Event.propTypes = {
  compid: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  eventid: PropTypes.string.isRequired,
  type: PropTypes.string,
  round: PropTypes.string,
}
