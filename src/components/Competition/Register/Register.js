import React, { Component } from 'react';
import RegisterForm from './Form';
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
      <div>
        <RegisterForm {...props} />
      </div>
    );
  }
}

export default CompetitionRegister;