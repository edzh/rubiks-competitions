import React, { Component } from 'react';
import { db, base } from '../../firebase';
import * as routes from '../../constants/routes';

import EventForm from './Form';
import Event from './Event';
import EventDetails from './Details/Details';

import { Route, Link } from 'react-router-dom';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      date: this.props.date,
    };
  }

  componentDidMount() {
    db.watchEvents(this.props.compid, snap => {
      this.setState({ events: snap.val() })
    });
  }

  render() {
    const { events, date } = this.state;
    const { compid, authUser } = this.props;

    return (
      <div className="px-4 py-2">
        <h2>Events:</h2>
        <div className="row ml-0">
          <div className="card p-0 col-4 mb-2">
            {!!events && Object.keys(events).map(key => {
              return (
                <Event
                  { ...events[key] }
                  key={key}
                  id={key}
                  authUser={authUser}
                />
              );
            })}
            <Link to={`${routes.COMPETITIONS}/${compid}/events/create`}>
              <button className="btn btn-block rounded-0 rounded-bottom">Create event</button>
            </Link>
          </div>

          <div className="col-8">
            <div className="card pl-4 pt-2">

              <Route exact path={`${routes.COMPETITIONS}/:compid/events/create`} render={({ match }) => (
                <EventForm 
                  compid={match.params.compid} 
                  date={date} 
                  authUser={authUser} 
                />
              )}/>

              <Route exact path={`${routes.COMPETITIONS}/:compid/events/e/:eventid`} render={({ match }) => (
                <EventDetails 
                  key={match.params.eventid} 
                  compid={match.params.compid} 
                  eventid={match.params.eventid} 
                  authUser={authUser} 
                />
              )}/>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default EventList;
