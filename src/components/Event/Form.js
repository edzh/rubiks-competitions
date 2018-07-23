import React, { Component } from 'react';
import { db } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compid: this.props.compid,
      name: '',
      round: '',
      startTime: '',
      endTime: '',
      date: this.props.date,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { name, round, startTime, endTime, date } = this.state;

    event.preventDefault();
    db.doCreateEvent(this.props.compid, name, round, startTime, endTime, date);
    this.setState({
      name: '',
      startTime: '',
      endTime: '',
    });
  }

  render() {
    const { name, startTime, endTime } = this.state;

    const isInvalid =
      name === '' ||
      startTime === '' ||
      endTime === '';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <select className="form-control" onChange={event => this.setState(byPropKey('name', event.target.value))}>
            <option value="">---</option>
            <option value="Rubik's Cube">Rubik's Cube</option>
            <option value="4x4x4 Cube">4x4x4 Cube</option>
            <option value="5x5x5 Cube">5x5x5 Cube</option>
            <option value="6x6x6 Cube">6x6x6 Cube</option>
            <option value="7x7x7 Cube">7x7x7 Cube</option>
            <option value="3x3x3 Blindfolded">3x3x3 Blindfolded</option>
            <option value="3x3x3 Fewest Moves">3x3x3 Fewest Moves</option>
            <option value="3x3x3 One Handed">3x3x3 One Handed</option>
            <option value="3x3x3 With Feet">3x3x3 With Feet</option>
            <option value="Megaminx">Megaminx</option>
            <option value="Pyraminx">Pyraminx</option>
            <option value="Rubik's Clock">Rubik's Clock</option>
            <option value="Square-1">Square-1</option>
            <option value="4x4x4 Blindfolded">4x4x4 Blindfolded</option>
            <option value="5x5x5 Blindfolded">5x5x5 Blindfolded</option>
            <option value="3x3x3 Multi-Blind">3x3x3 Multi-Blind</option>
          </select>
          <select className="form-control" onChange={event => this.setState(byPropKey('round', event.target.value))}>
            <option value="">---</option>
            <option value="Round 1">Round 1</option>
            <option value="Round 2">Round 2</option>
            <option value="Final">Final</option>
            <option value="Combined Final">Combined Final</option>
          </select>
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
          <button disabled={isInvalid} className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default EventForm;
