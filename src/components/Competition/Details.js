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
    const { compid, address } = this.props;

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
      address,
      registrationLimit, 
      registrationFee,
      registrationBegin,
      registrationEnd,
      registrationRequirements 
    } = this.props;
    const splitAddress = address.split(', ');

    return (
      <div className="p-2">
        <div className="col-7">
          <h3><span style={{fontWeight: 'normal'}}>{splitAddress[0]}</span></h3>
          <h3><span style={{fontWeight: 'normal'}}>{splitAddress[1]}</span></h3>
          <h3><span style={{fontWeight: 'normal'}}>{splitAddress[2]}, {splitAddress[3]}, {splitAddress[4]}</span></h3>
          <div className="card px-4 py-2">
            <h2>Venue</h2>
            <h3><span style={{fontWeight: 'normal'}}>{venue}</span></h3>
            <p>{details}</p>

            <h3>Registration Info:</h3>
            <dl className="row">
              <dt className="col-2">Limit</dt>
              <dd className="col-10">{registrationLimit}</dd>
              <dt className="col-2">Fee</dt>
              <dd className="col-10">${registrationFee}</dd>
              <dt className="col-2">Registration Period</dt>
              <dd className="col-10">{moment(registrationBegin).format('LL')} - {moment(registrationEnd).format('LL')}</dd>
              <dt className="col-2">Registration Requirements</dt>
              <dd className="col-10">{registrationRequirements}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default CompetitionDetails;