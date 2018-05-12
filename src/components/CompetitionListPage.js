import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { db } from '../firebase';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import withAuthentication from './withAuthentication';

import { base } from '../firebase';

const CompetitionsTable = ({ competitions, authUser }) =>
  <table className="table">
    <tbody>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Date</th>
      </tr>

      {
        Object.keys(competitions).map(key =>
          <tr key={key}>
            <td>{competitions[key].compName}</td>
            <td>{competitions[key].address}</td>
            <td>{competitions[key].date}</td>
            <td>
              <Link to={`${routes.COMPETITIONS}/${key}`}>
                <button className="btn">View</button>
              </Link>
            </td>

          </tr>
        )
      }
    </tbody>
  </table>



class CompetitionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: null,
      loading: true,
    };
  }

  componentDidMount() {
    // db.onceGetCompetitions().then(snapshot =>
    //   this.setState(() => ({competitions: snapshot.val(), loading: false }))
    // );

    this.ref = base.syncState('competitions', {
      context: this,
      state: 'competitions',
      asArray: true,
      then() {
        this.setState({ loading: false })
      }
    });
  }

  render() {
    const { competitions, loading } = this.state;

    return (
      <div>
        <h2>Competitions</h2>
        { loading && <p>loading...</p> }
        { !!competitions && <CompetitionsTable authUser={this.props.authUser} competitions={competitions} /> }
      </div>
    );
  }

}

const CompetitionListPage = withAuthentication(CompetitionList);

export default CompetitionListPage
