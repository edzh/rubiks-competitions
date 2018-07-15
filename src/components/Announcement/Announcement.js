import React, { Component } from 'react';

class Announcement extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(event) {
    event.preventDefault();
    this.props.handleDelete(this.props.id);
  }

  render() {
    const { title, body, manage } = this.props;
    return (

      <div className="card">
        <div>
          <h4>{title}</h4>
          <hr/>
          <p>{body}</p>
        </div>
        { manage && <button onClick={this.onDelete} className="btn btn-danger">Delete</button> }
      </div>
    );
  }
}

export default Announcement;
