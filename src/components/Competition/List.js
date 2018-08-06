import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
// import withAuthentication from './../withAuthentication';

import AuthUserContext from '../Auth/AuthUserContext';
import CompetitionForm from '../Competition/Form';

import { db } from '../../firebase';

import moment from 'moment';

const competitionStyle = {
  width: '100%',
  height: '360px',
  textAlign: 'center',
}

const CompetitionsTable = ({ competitions, handleDelete }) =>
  <div className="row border bg-light">
  {
    Object.keys(competitions).map(key =>
      <div key={key} className="col-4 mt-3">
        <div className="card m-2">
          <Link to={`${routes.COMPETITIONS}/${key}`}>
            <div className="border" style={competitionStyle}>
              <h3 className="mx-auto">Placeholder</h3>
            </div>
          </Link>
          <h4 className="mx-2">{competitions[key].compName}</h4>
          <p className="mx-2" style={{height: '50px'}}>{competitions[key].address}</p>
          <div className="mx-2 row">
            <p>{moment(competitions[key].date).format('LL')}</p>
            <button onClick={() => handleDelete(key)} className="ml-auto mb-4 btn btn-sm btn-danger">Delete</button>
          </div>
        </div>
      </div>
    )
  }
  </div>

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

  handleDelete(compid) {
    db.deleteCompetition(compid);
  }

  render() {
    const { competitions, loading } = this.state;
    const { authUser } = this.props;

    return (

        <div>
          <div className="my-4 row">
            <h2 className="col-2">Competitions</h2>
            <input
              type="text"
              className="col-8 form-control"
              placeholder="Search..."
            />
            <button className="btn ml-auto col-1">Filter </button>
          </div>
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

CompetitionList.propTypes = {
  authUser: PropTypes.object,
}
