import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Create from './components/Create';
import Navbar from './components/Navbar';
import CompetitionsPage from './components/CompetitionsPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp'
import Home from './components/Home';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitions: []
    };

    this.addToCompetitions = this.addToCompetitions.bind(this);
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
            <Navbar />
            <div className="container">
              <Route exact path="/" render={() => <Home />} />
              <Route path="/create" render={() => <Create addToCompetitions={this.addToCompetitions} />} />
              <Route path="/competitions" render={() => <CompetitionsPage competitions={this.state.competitions} />} />
              <Route path="/login" render={() => <LogIn />} />
              <Route path="/signup" render={() => <SignUp />} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
