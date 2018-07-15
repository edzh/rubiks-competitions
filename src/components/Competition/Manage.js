import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import moment from 'moment';
import AnnouncementList from '../Announcement/List';
import GMap from '../GMap';
import EventList from '../Event/List';
import CompetitionAttendingList from './Attending';
import CompetitionNavbar from './Navbar';

import * as routes from '../../constants/routes';

const CompetitionManage = ({ compid, compName, address, date, lat, lng, uid, authUser, addToAnnouncements, manage }) =>
  <BrowserRouter>
    <div className="container">
      <h1 className="text-center">{compName}</h1>
      <p className="text-center">{moment(date).format('LL')}</p>
      <p className="text-center">{address}</p>
      <CompetitionNavbar compid={compid} />
      <div className="col-5">
        <GMap lat={lat} lng={lng} />
      </div>
      
      <div>
        <Route exact path={`${routes.COMPETITIONS}/:compid/announcements`} render={({ match }) => (
          <AnnouncementList manage={manage} authUser={authUser} compid={match.params.compid} />
        )}/>
        <Route exact path={`${routes.COMPETITIONS}/:compid/events`} render={({ match }) => (
          <EventList authUser={authUser} manage={manage} date={date} compid={match.params.compid} />
        )}/>
        <Route exact path={`${routes.COMPETITIONS}/:compid/competitors`} render={({ match }) => (
          <CompetitionAttendingList compid={match.params.compid} />
        )}/>
      </div>
    </div>
  </BrowserRouter>

export default CompetitionManage;
