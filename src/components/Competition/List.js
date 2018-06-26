import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
// import withAuthentication from './../withAuthentication';

import AuthUserContext from '../Auth/AuthUserContext';
import CompetitionForm from '../Competition/Form';

import { db, base } from '../../firebase';

import moment from 'moment';

const CompetitionsTable = ({ competitions }) =>
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
            <td>{moment(competitions[key].date).format('LL')}</td>
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
    db.watchAllCompetitions(snapshot =>
      this.setState(() => ({competitions: snapshot.val(), loading: false }))
    );
  }

  componentWillUnmount() {
    db.detach;
  }

  render() {
    const { competitions, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
      {
        authUser => authUser ?
        <div>
          <h2>Competitions</h2>
          { loading && <p>loading...</p> }
          { !!competitions && <CompetitionsTable competitions={competitions} /> }
          <CompetitionForm authUser={authUser} />
        </div>
       : <p>hi</p>

      }
      </AuthUserContext.Consumer>
    );
  }

}

// const CompetitionListPage = withAuthentication(CompetitionList);

export default CompetitionList;
