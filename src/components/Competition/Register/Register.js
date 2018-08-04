import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RegisterForm from './Form';
import RegisterDetails from './Details';
import { db } from '../../../firebase';

class CompetitionRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
    }

  }

  componentDidMount() {
    db.onceGetUser(this.props.authUser.uid, snap => {
      const { firstName, lastName } = snap.val();
      this.setState({ firstName, lastName })
    })
  }

  render() {
    const {...props} = this.state;

    return (
      <div className="row m-2">
        <div className="col-7">
          <h2>Registration Information</h2>
          <RegisterDetails compid={this.props.compid} />
        </div>
        <div className="col-5">
          <h2>Select Events</h2>
          <RegisterForm {...props} authUser={this.props.authUser} compid={this.props.compid} />
        </div>
      </div>
    );
  }
}

export default CompetitionRegister;
CompetitionRegister.propTypes = {
  authUser: PropTypes.object,
  compid: PropTypes.string,
};