import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../firebase';

import moment from 'moment';
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class AnnouncementForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.authUser.uid,
      compid: this.props.compid,
      title: '',
      body: '',
      date: moment().format(),
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { authUser, compid } = this.props;
    const { title, body, date } = this.state;
    event.preventDefault();
    db.doCreateAnnouncement(authUser.uid, compid, title, body, date);
    this.setState({
      title: '',
      body: '',
    })
  }

  render() {
    const { title, body } = this.state;

    const isInvalid =
      title === '' ||
      body === ''

    return (
      <div className="card p-4 mt-2">
        <h5>New Announcement</h5>
        <form onSubmit={this.onSubmit}>
          <input
            value={title}
            onChange={event => this.setState(byPropKey('title', event.target.value))}
            type="text"
            className="form-control"
            placeholder="Title"
          />
          <textarea
            value={body}
            onChange={event => this.setState(byPropKey('body', event.target.value))}
            className="form-control my-2"
            rows="3"
            placeholder="Body"
          />
          <button className="" disabled={isInvalid} className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AnnouncementForm;

AnnouncementForm.propTypes = {
  authUser: PropTypes.object,
  title: PropTypes.string,
  body: PropTypes.string,
  compid: PropTypes.string,
  date: PropTypes.string,
};