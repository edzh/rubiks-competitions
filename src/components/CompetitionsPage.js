import React, { Component } from 'react';

import { db } from '../firebase';

const CompetitionsList = ({ competitions }) =>
  <table className="table">
    <tbody>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Date</th>
      </tr>

      {Object.keys(competitions).map(key =>
        <tr key={key}>
          <td>{competitions[key].compName}</td>
          <td>{competitions[key].address}</td>
          <td>{competitions[key].date}</td>
        </tr>
      )}
    </tbody>
  </table>

class CompetitionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: null,
    };
  }

  componentDidMount() {
    db.onceGetCompetitions().then(snapshot =>
      this.setState(() => ({competitions: snapshot.val() }))
    );
  }

  render() {
    const { competitions } = this.state;

    return(
      <div>
        <h2>Competitions</h2>
        { !!competitions && <CompetitionsList competitions={competitions} /> }
      </div>
    );
  }
}

export default CompetitionsPage;
