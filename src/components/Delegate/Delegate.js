import React, { Component } from 'react';
import { db } from '../../firebase';
class Delegate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: {}
    }

    this.approveCompetition = this.approveCompetition.bind(this);
  }

  componentDidMount() {
    db.onceGetReadyCompetitions(snap => {
      this.setState({ competitions: snap.val() })
    });
  }

  approveCompetition(compid) {
    db.doApproveCompetition(compid);
  }

  render() {
    const { competitions } = this.state;

    return (
      <table className="table">
        <tr>
          <th>Competition Name</th>
          <th>Approve</th>
        </tr>
        { 
          Object.keys(competitions).map(key => 
          <tr>
            <td key={key}>
              {competitions[key].compName}
            </td>
            <td><button onClick={() => this.approveCompetition(key)} className="btn btn-primary">Approve</button></td>
          </tr>
          )
        }
        
      </table>
    );
  }
}

export default Delegate;