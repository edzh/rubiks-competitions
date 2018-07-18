import React, { Component } from 'react';

import { db } from '../../firebase';

import SearchLocation from '../SearchLocation';
import PickDate from '../PickDate';
import moment from 'moment';
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CompetitionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.authUser.uid,
      compName: '',
      address: '',
      lat: '',
      lng: '',
      venue: '',
      date: moment().format(),
      details: '',
      organizers: {},
      delegate: '',
      registrationLimit: '',
      registrationFee: '',
      registrationBegin: moment().format(),
      registrationEnd: moment().format(),
      registrationRequirements: '',
    };

    this.onAddressChange = this.onAddressChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { 
      uid, compName, address, lat, lng, date, details, venue, 
      registrationLimit, 
      registrationFee,
      registrationBegin,
      registrationEnd,
      registrationRequirements, 
    } = this.state;

    event.preventDefault();

    db.doCreateCompetition(
      uid, compName, address, lat, lng, date, details, venue, 
      registrationLimit, 
      registrationFee,
      registrationBegin,
      registrationEnd,
      registrationRequirements,
    );

    this.setState({
      compName: '',
      address: '',
      date: '',
    });
  }

  onAddressChange(address, lat, lng) {
    this.setState({ address, lat, lng });
  }

  onDateChange(date, value) {
    this.setState({ [value]: date });
  }

  render() {
    const { 
      compName, 
      address, 
      date, 
      venue, 
      details, 
      registrationLimit, 
      registrationFee, 
      registrationRequirements 
    } = this.state;

    const isInvalid =
      compName === '' ||
      date === '' ||
      address === '';

    return (
      <div>
        <h3>Create Competition</h3>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="form-control"
            value={compName}
            onChange={event => this.setState(byPropKey('compName', event.target.value))}
            placeholder="Competition Name"
          />

          <SearchLocation onAddressChange={this.onAddressChange} />

          <p><strong>Date: </strong></p>
          <PickDate value={"date"} onDateChange={this.onDateChange} />


          <input 
            type="text"
            className="form-control"
            value={venue}
            onChange={event => this.setState(byPropKey('venue', event.target.value))}
            placeholder="Venue"
          />

          <input 
            type="text"
            className="form-control"
            value={details}
            onChange={event => this.setState(byPropKey('details', event.target.value))}
            placeholder="Details"
          />
          <p><strong>Registration Begins: </strong></p>          
          <PickDate value={"registrationBegin"} onDateChange={this.onDateChange} />
          <p><strong>Registration Ends: </strong></p>          
          <PickDate value={"registrationEnd"} onDateChange={this.onDateChange} />
          <textarea 
            type="text"
            className="form-control"
            value={registrationRequirements}
            onChange={event => this.setState(byPropKey('registrationRequirements', event.target.value))}
            rows="3"
            placeholder="Registration Requirements"
          />

          <input 
            type="number"
            className="form-control"
            value={registrationLimit}
            onChange={event => this.setState(byPropKey('registrationLimit', event.target.value))}
            placeholder="Registration Limit"
          />

          <input 
            type="number"
            className="form-control"
            value={registrationFee}
            onChange={event => this.setState(byPropKey('registrationFee', event.target.value))}
            placeholder="Registration Fee"
          />

          <button disabled={isInvalid} type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default CompetitionForm;
