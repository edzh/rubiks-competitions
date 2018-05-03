import React, { Component } from 'react';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compName: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.addToCompetitions(this.state);
    event.preventDefault();
  }

  render() {
    return(
      <div>
        <h2>Create Competition</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="compName" className="col-sm-2 col-form-label">Competition Name:</label>
            <input
              type="text" className="form-control col-10" name="compName"
              value={this.state.compName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-sm-2 col-form-label">Address:</label>
            <input
              type="text" className="form-control col-10" name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-sm-2 col-form-label">City:</label>
            <input
              type="text" className="form-control col-10" name="city"
              value={this.state.city}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group row">
            <label htmlFor="state" className="col-sm-2 col-form-label">State:</label>
            <input
              type="text" className="form-control col-10" name="state"
              value={this.state.state}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group row">
            <label htmlFor="zipcode" className="col-sm-2 col-form-label">Zipcode:</label>
            <input type="text" className="form-control col-10" name="zipcode"
              value={this.state.zipcode}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group row">
            <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
            <input
              type="text" className="form-control col-10" name="date"
              value={this.state.date}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create</button>
        </form>
      </div>
    );
  }
}

export default Create;
