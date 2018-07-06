import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

import * as routes from '../../constants/routes';

class CompetitionAttendingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendees: {},
    }
  }

  componentDidMount() {
    db.onceGetUsersByCompetition(this.props.compid, snap => {
      // console.log(snap.key);
      // console.log(this.state.attendees);
      this.setState(prevState => ({
        attendees: {
          ...prevState.attendees,
          [snap.key]: {
            firstName: snap.val().firstName,
            lastName: snap.val().lastName,
          }          
        }
      }))
    })
    // db.test(this.props.compid);
  }

  render() {

    const { attendees } = this.state;

    return (
      <div>
      <h2>attending:</h2>
      {
        Object.keys(attendees).map(key => 
          <Link key={key} to={`${routes.PROFILE}/${key}`}>
            <p>{attendees[key].firstName} {attendees[key].lastName}</p>
          </Link>
        )
      }
      </div>
    );
  }
}

export default CompetitionAttendingList;