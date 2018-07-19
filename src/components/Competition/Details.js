import React, { Component } from 'react';
import { db } from '../../firebase';
import moment from 'moment';
class CompetitionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

  }

  componentDidMount() {
    const { compid } = this.props;

    this.competitionRef = db.watchCompetition(compid, snap => {
      snap.val() && Object.keys(snap.val()).forEach(key => {
        this.setState({ [key]: snap.val()[key] })
      });
      this.setState({ loading: false });
    });
  }

  render() {
    const {      
      uid,
      loading,
      details, 
      venue, 
      registrationLimit, 
      registrationFee,
      registrationBegin,
      registrationEnd,
      registrationRequirements 
    } = this.props;

    return (
      <div>
        <dl className="row">
          <dt className="col-3">Details</dt>
          <dd className="col-9">{details}</dd>
          <dt className="col-3">Venue</dt>
          <dd className="col-9">{venue}</dd>
          <dt className="col-3">Registration Limit</dt>
          <dd className="col-9">{registrationLimit}</dd>
          <dt className="col-3">Registration Begin</dt>
          <dd className="col-9">{moment(registrationBegin).format('LL')}</dd>
          <dt className="col-3">Registration End</dt>
          <dd className="col-9">{moment(registrationEnd).format('LL')}</dd>
          <dt className="col-3">Registration Fee</dt>
          <dd className="col-9">${registrationFee}</dd>
          <dt className="col-3">Registration Requirements</dt>
          <dd className="col-9">{registrationRequirements}</dd>
        </dl>
      </div>
    );
  }
}

export default CompetitionDetails;