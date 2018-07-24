import React, { Component } from 'react';
import { db, base } from '../../firebase';

import EventForm from './Form';
import Event from './Event';
import EventDetails from './Details';

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
                  name={events[key].name}
                  round={events[key].round}
                  startTime={events[key].startTime}
                  endTime={events[key].endTime}
                  date={events[key].date}
                  authUser={authUser}
                />
              );
            })}
            
          </div>
          <div className="col-8">
          {manage && <EventForm compid={compid} date={date} />}
          
          </div>
        </div>

      </div>
    );
  }
}

export default EventList;
