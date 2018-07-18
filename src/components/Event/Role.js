import React, { Component } from 'react';
import { db } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class EventRole extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { eventid, uid } = this.props
    event.preventDefault();
    db.changeEventUserRole(eventid, uid, this.state.role, snap => {
      console.log('asd')
    });
  }

  render() {

    const isInvalid = this.state.role === '' || this.state.role === this.props.role;

    return (
      <form onSubmit={this.onSubmit} className="row">
        <select className="form-control col-3" onChange={event => this.setState(byPropKey('role', event.target.value))} id="role-select">
          <option value="">---</option>
          <option value="Staff">Staff</option>
          <option value="Volunteer">Volunteer</option>
          <option value="None">None</option>
        </select>
        <button type="submit" disabled={isInvalid} className="btn btn-primary">&#10003;</button>
      </form>
    );
  }
}

export default EventRole;