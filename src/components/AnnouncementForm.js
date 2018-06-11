import React, { Component } from 'react';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class AnnouncementForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compid: this.props.compid,
      uid: this.props.authUser.uid,
      title: '',
      body: '',
      date: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addToAnnouncements(this.state);
    this.setState({
      title: '',
      body: '',
    });
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
