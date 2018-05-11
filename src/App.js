import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Create from './components/Create';
import Navbar from './components/Navbar';
import CompetitionListPage from './components/CompetitionListPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp'
import Home from './components/Home';
import Competition from './components/Competition';

import * as routes from './constants/routes';
import withAuthentication from './components/withAuthentication';

const App = () =>
  <BrowserRouter>
    <div>
      <Navbar />
      <div className="container">
        <Route exact path={routes.HOME} render={() => <Home />} />
        <Route path={routes.CREATE_COMP} render={() => <Create />} />
        <Route exact path={routes.COMPETITIONS} render={() => <CompetitionListPage />} />
        <Route path={routes.LOG_IN} render={() => <LogIn />} />
        <Route path={routes.SIGN_UP} render={() => <SignUp />} />
      
        <Route exact path={`${routes.COMPETITIONS}/:compid`} component={Competition}/>
      </div>
    </div>
  </BrowserRouter>

export default withAuthentication(App);
