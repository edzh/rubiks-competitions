import React, { Component } from 'react';
import { db, base } from '../../firebase';
import * as routes from '../../constants/routes';

import EventForm from './Form';
import Event from './Event';
import EventDetails from './Details';

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
    const { compid, manage, authUser } = this.props;

    return (
      <div>
        <h2 className="m-3">Events:</h2>
        <div className="row ml-2">
          <div className="card p-0 col-4 mb-2">
            {!!events && Object.keys(events).map(key => {
              return (
                <Event
                  key={key}
                  id={key}
                  compid={compid}
                  name={events[key].name}
                  round={events[key].round}
                  startTime={events[key].startTime}
                  endTime={events[key].endTime}
                  date={events[key].date}
                  authUser={authUser}
                />
              );
            })}
            <Link to={`${routes.COMPETITIONS}/${compid}/events/create`}>
              <button className="btn btn-block rounded-0 rounded-bottom">Create event</button>
            </Link>
          </div>
          <div className="col-8">
            <div className="card p-4">
              <Route exact path={`${routes.COMPETITIONS}/:compid/events/create`} render={({ match }) => (
                <EventForm compid={match.params.compid} date={date} />
              )}/>
              <Route exact path={`${routes.COMPETITIONS}/:compid/events/:eventid`} render={({ match }) => (
                <EventDetails compid={match.params.eventid} />
              )}/>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default EventList;
