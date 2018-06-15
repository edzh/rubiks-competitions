import React, { Component } from 'react';

class Announcement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.props.key,
      title: this.props.title,
      body: this.props.body,
    }
  }

  render() {
    const { key, title, body } = this.state;
    return (

      <div className="container">
        <div key={key}>
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
      </div>
    );
  }
}

export default Announcement;