import React, { Component } from 'react';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class CreateAnnouncement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.authUser,
      title: '',
      body: '',
    };
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
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text"
          onChange={event => this.setState(byPropKey('title', this.event.value))} />
        <input type="textarea"
          onChange={event => this.setState(byPropKey('body', this.event.value))} />
      </form>
    );
  }
}

const Announcement = ({ announcement }) =>
  <div>

    <CreateAnnouncement authUser={this.props.authUser} />
  </div>

export default Announcement;
