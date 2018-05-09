import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { firebase } from './firebase';

import Create from './components/Create';
import Navbar from './components/Navbar';
import CompetitionsPage from './components/CompetitionsPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp'
import Home from './components/Home';

import * as routes from './constants/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: [],
      authUser: null,
    };

    this.addToCompetitions = this.addToCompetitions.bind(this);
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  addToCompetitions(competition) {
    const competitions = this.state.competitions.concat(competition);
    this.setState({
      competitions: competitions
    });
  }

  render() {
    return(
      <div>
        <BrowserRouter>
          <div>
            <Navbar authUser={this.state.authUser} />
            <div className="container">
              <Route exact path={routes.HOME} render={() => <Home />} />
              <Route path={routes.CREATE_COMP} render={() => <Create addToCompetitions={this.addToCompetitions} />} />
              <Route path={routes.COMPETITIONS} render={() => <CompetitionsPage competitions={this.state.competitions} />} />
              <Route path={routes.LOG_IN} render={() => <LogIn />} />
              <Route path={routes.SIGN_UP} render={() => <SignUp />} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
