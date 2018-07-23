import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import CompetitionListPage from './components/Competition/List';
import LogIn from './components/Auth/LogIn';
import SignUp from './components/Auth/SignUp'
import Home from './components/Home';
import Competition from './components/Competition/Competition';
import Profile from './components/User/Profile';

import * as routes from './constants/routes';
import withAuthentication from './components/Auth/withAuthentication';

const App = () =>
  <BrowserRouter>
    <div>
      <Navbar />
      <div className="container col-10">
        <Route exact path={routes.HOME} render={() => <Home />} />
        <Route exact path={routes.COMPETITIONS} render={() => <CompetitionListPage />} />
        <Route path={routes.LOG_IN} render={() => <LogIn />} />
        <Route path={routes.SIGN_UP} render={() => <SignUp />} />

        <Route exact path={`${routes.PROFILE}/:uid`} component={Profile} />
        <Route path={`${routes.COMPETITIONS}/:compid`} component={Competition}/>
      </div>
    </div>
  </BrowserRouter>

export default withAuthentication(App);
