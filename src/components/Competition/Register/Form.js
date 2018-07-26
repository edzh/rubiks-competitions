import React, { Component } from 'react';
import { db } from '../../../firebase';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cube2: false,
      cube3: false,
      cube4: false,
      cube5: false,
      cube6: false,
      cube7: false,
      blind: false,
      fm: false,
      oh: false,
      feet: false,
      megaminx: false,
      pyraminx: false,
      clock: false,
      sq1: false,
      blind4: false,
      blind5: false,
      mblind: false,
      guests: '',
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
  }

  onSubmit(compid, uid) {
    const { firstName, lastName } = this.state;
    db.doCreateAttendee(compid, this.props.authUser.uid, firstName, lastName);
  }

  toggleEvent(event) {
    console.log(this.state[event]);
    this.setState({ [event]: !this.state[event] })
  }

  render() {
    const { guests, ...events } = this.state

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="mx-0 row">
            {Object.keys(events).map(key => 
              <div 
                className="mx-2 border rounded bg-light" 
                onClick={() => this.toggleEvent(key)} 
                style={{ width: '64px', height: '64px' }}
              >{key}</div>
            )}
          </div>

          <input 
            type="number" 
            className="form-control" 
            placeholder="Guests" 
          />

          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;