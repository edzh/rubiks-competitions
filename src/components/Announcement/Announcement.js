import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    const { title, body, date } = this.props;
    return (

      <div className="card p-4 mt-4">
        <div className="row mx-0">
          <h4>{title}</h4>
          <button onClick={this.onDelete} className="btn btn-danger ml-auto mr-2">Delete</button>
        </div>
        <hr/>
        <p>{body}</p>
        <p className="ml-auto">{moment(date).fromNow()}</p>
      </div>
    );
  }
}

export default Announcement;

Announcement.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  date: PropTypes.string,
};