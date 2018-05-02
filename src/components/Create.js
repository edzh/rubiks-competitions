import React, { Component } from 'react';

class Create extends Component {
  render() {
    return(
      <div className="container">
        <h2>Create Competition</h2>
        <form>
          <div className="form-group row">
            <label htmlFor="comp-name" className="col-sm-2 col-form-label">Competition Name:</label>
            <input type="text" className="form-control col-10" name="comp-name"/>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-sm-2 col-form-label">Address:</label>
            <input type="text" className="form-control col-10" name="address"/>
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-sm-2 col-form-label">City:</label>
            <input type="text" className="form-control col-10" name="city"/>
          </div>
          <div className="form-group row">
            <label htmlFor="state" className="col-sm-2 col-form-label">State:</label>
            <input type="text" className="form-control col-10" name="state"/>
          </div>
          <div className="form-group row">
            <label htmlFor="zipcode" className="col-sm-2 col-form-label">Zipcode:</label>
            <input type="text" className="form-control col-10" name="zipcode"/>
          </div>
          <div className="form-group row">
            <label htmlFor="date" className="col-sm-2 col-form-label">Date:</label>
            <input type="text" className="form-control col-10" name="date"/>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create</button>
        </form>
      </div>
    );
  }
}

export default Create;
