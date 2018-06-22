import React, { Component } from 'react';

class Announcement extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(event) {
    event.preventDefault;
    this.props.handleDelete(this.props.id);
  }

  render() {
    const { title, body } = this.props;
    return (

      <div className="container">
        <div>
          <h4>{title}</h4>
          <p>{body}</p>
        </div>
        { this.props.manage && <button onClick={this.onDelete} className="btn btn-danger">Delete</button> }
      </div>
    );
  }
}

export default Announcement;
