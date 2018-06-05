import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; 

import { db } from '../firebase';
import withAuthorization from './withAuthorization';

import * as routes from '../constants/routes';

import SearchLocation from './SearchLocation';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      organizer: this.props.authUser,
      compName: '',
      address: '',
      lat: '',
      lng: '',
      date: '',
    };

    this.onAddressChange = this.onAddressChange.bind(this);
  }

  onSubmit = (event) => {
    const { organizer, compName, address, lat, lng, date, } = this.state;

    db.doCreateCompetition(organizer, compName, address, lat, lng, date);
    this.props.history.push(routes.COMPETITIONS);
    event.preventDefault();
  }

  onAddressChange(address, lat, lng) {
    this.setState({ address, lat, lng });
  }  

  render() {
    const { compName, address, date, } = this.state;

    const isInvalid =
      compName === '' ||
      address === '';

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
            value={date}
            onChange={event => this.setState(byPropKey('date', event.target.value))}
            placeholder="Date"
          />
          <SearchLocation onAddressChange={this.onAddressChange} />
          
          <button disabled={isInvalid} type="submit" className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withRouter(CreateForm));
