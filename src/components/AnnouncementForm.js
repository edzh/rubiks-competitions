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

    return (
      <form onSubmit={this.onSubmit}>
        <input 
          value={title} 
          onChange={event => this.setState(byPropKey('title', event.target.value))}
          type="text"
          className="form-control"
        />
        <input 
          value={body} 
          onChange={event => this.setState(byPropKey('body', event.target.value))}
          type="textarea"
          className="form-control"
        />
        <button className="btn">Submit</button>
      </form>
    );
  }
}

export default AnnouncementForm;
