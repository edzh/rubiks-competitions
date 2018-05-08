import React, { Component } from 'react';

class CompetitionsPage extends Component {
  render() {
    return(
      <div>
        <h2>Competitions</h2>
        <table className="table">
          <tbody>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
            </tr>

            {this.props.competitions
              .map((competition, index) => {
                return(
                  <tr key={index} competition={competition}>
                    <td>{competition.compName}</td>
                    <td>{competition.address}</td>
                    <td>{competition.date}</td>
                  </tr>
                );
              })
            }

          </tbody>
        </table>
      </div>
    );
  }
}

export default CompetitionsPage;
