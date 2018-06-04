import React, { Component } from 'react';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compid: this.props.compid,
      name: '',
      startTime: '',
      endTime: '',
      date: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addToEvents(this.state);
    this.setState({
      name: '',
      startTime: '',
      endTime: '',
    });
  }

  render() {
    const { name, startTime, endTime, date } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={name}
            onChange={event => this.setState(byPropKey('name', event.target.value))} 
            type="text"
            className="form-control"
          />
          <input
            value={startTime}
            onChange={event => this.setState(byPropKey('startTime', event.target.value))} 
            type="time"
            className="form-control"
          />
          <input
            value={endTime}
            onChange={event => this.setState(byPropKey('endTime', event.target.value))} 
            type="time"
            className="form-control"
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default EventForm;