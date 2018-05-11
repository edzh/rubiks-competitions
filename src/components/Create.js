import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 

import { db } from '../firebase';
import withAuthorization from './withAuthorization';

import * as routes from '../constants/routes';

const INITIAL_STATE = {
  compName: '',
  address: '',
  city: '',
  state: '',
  zipcode: '',
  date: '',
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      organizer: this.props.authUser,
      ...INITIAL_STATE 
    };

  }

  onSubmit = (event) => {
    const { organizer, compName, address, city, state, zipcode, date, } = this.state;

    db.doCreateCompetition(organizer, compName, address, city, state, zipcode, date);
    this.props.history.push(routes.COMPETITIONS);
    event.preventDefault();
  }

  render() {
    const { compName, address, city, state, zipcode, date, } = this.state;

    const isInvalid =
      compName === '' ||
      address === '' ||
      city === '' ||
      state === '' ||
      zipcode === '';

    return (
      <div>
        <h2>Create Competition</h2>

        <form onSubmit={this.onSubmit}>
          <input
            type="text" 
            className="form-control"
            value={compName}
            onChange={event => this.setState(byPropKey('compName', event.target.value))}
            placeholder="Competition Name"
          />
          <input
            type="text" 
            className="form-control"
            value={address}
            onChange={event => this.setState(byPropKey('address', event.target.value))}
            placeholder="Address"
          />
          <input
            type="text" 
            className="form-control"
            value={city}
            onChange={event => this.setState(byPropKey('city', event.target.value))}
            placeholder="City"
          />
          <input
            type="text" 
            className="form-control"
            value={state}
            onChange={event => this.setState(byPropKey('state', event.target.value))}
            placeholder="State"
          />
          <input type="text" 
          className="form-control"
            value={zipcode}
            onChange={event => this.setState(byPropKey('zipcode', event.target.value))}
            placeholder="Zipcode"
          />
          <input
            type="text" 
            className="form-control"
            value={date}
            onChange={event => this.setState(byPropKey('date', event.target.value))}
            placeholder="Date"
          />

          <button disabled={isInvalid} type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withRouter(CreateForm));
