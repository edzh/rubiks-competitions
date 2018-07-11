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
    db.watchCompetitionAttendees(this.props.compid, snap => {
      snap.val() && Object.keys(snap.val()).forEach(key => {
        console.log(snap.val());
        this.setState(prevState => ({
          attendees: {
            ...prevState.attendees,
            [key]: {
              firstName: snap.val()[key].firstName,
              lastName: snap.val()[key].lastName,
            }          
          }
        }))
      });
    })
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