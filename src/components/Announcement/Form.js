import React, { Component } from 'react';
import { db } from '../../firebase';

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
      date: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { uid, compid, title, body, date } = this.state;
    event.preventDefault();
    db.doCreateAnnouncement(uid, compid, title, body, date);
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
      <div>
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
            className="form-control"
            rows="3"
            placeholder="Body"
          />
          <button disabled={isInvalid} className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AnnouncementForm;
