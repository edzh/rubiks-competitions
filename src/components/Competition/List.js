import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
// import withAuthentication from './../withAuthentication';

import AuthUserContext from '../Auth/AuthUserContext';
import CompetitionForm from '../Competition/Form';

import { db, base } from '../../firebase';

import moment from 'moment';

const CompetitionsTable = ({ competitions, handleDelete }) =>
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
            <td><button onClick={() => handleDelete(key)} className="btn btn-danger">Delete</button></td>

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
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    db.watchAllCompetitions(snapshot =>
      this.setState(() => ({competitions: snapshot.val(), loading: false }))
    );
  }

  componentWillUnmount() {
    db.detach;
  }

  handleDelete(compid) {
    db.deleteCompetition(compid);
  }

  render() {
    const { competitions, loading } = this.state;
    const { authUser } = this.props;

    return (

        <div>
          <h2>Competitions</h2>
          { loading && <p>loading...</p> }
          { !!competitions && <CompetitionsTable competitions={competitions} handleDelete={this.handleDelete} /> }
          <CompetitionForm authUser={authUser} />
        </div>
    );
  }

}

export default React.forwardRef((props, ref) => (
  <AuthUserContext.Consumer>
    {authUser => !!authUser && <CompetitionList {...props} authUser={authUser} ref={ref} />}
  </AuthUserContext.Consumer>
));
