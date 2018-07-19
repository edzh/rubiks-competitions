import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import moment from 'moment';
import AnnouncementList from '../Announcement/List';
import GMap from '../GMap';
import CompetitionDetails from './Details';
import EventList from '../Event/List';
import CompetitionAttendingList from './Attending';
import CompetitionNavbar from './Navbar';
import Profile from '../User/Profile';
import * as routes from '../../constants/routes';

const CompetitionManage = ({ compid, compName, address, date, lat, lng, uid, authUser, addToAnnouncements, manage, details, venue, 
    registrationLimit, 
    registrationFee,
    registrationBegin,
    registrationEnd,
    registrationRequirements, }) =>
  <div className="container">
    <h1 className="text-center">{compName}</h1>
    <p className="text-center">{moment(date).format('LL')}</p>
    <p className="text-center">{address}</p>
    <CompetitionNavbar compid={compid} />
    
    <div>
      <Route exact path={`${routes.COMPETITIONS}/:compid`} render={({ match }) => (
        <CompetitionDetails manage={manage} authUser={authUser} compid={match.params.compid} 
          details={details}
          venue={venue}
          registrationLimit={registrationLimit}
          registrationFee={registrationFee}
          registrationBegin={registrationBegin}
          registrationEnd={registrationEnd}
          registrationRequirements={registrationRequirements} 
        />
      )}/>
      <Route exact path={`${routes.COMPETITIONS}/:compid/announcements`} render={({ match }) => (
        <AnnouncementList manage={manage} authUser={authUser} compid={match.params.compid} />
      )}/>
      <Route exact path={`${routes.COMPETITIONS}/:compid/events`} render={({ match }) => (
        <EventList authUser={authUser} manage={manage} date={date} compid={match.params.compid} />
      )}/>
      <Route exact path={`${routes.COMPETITIONS}/:compid/competitors`} render={({ match }) => (
        <CompetitionAttendingList compid={match.params.compid} />
      )}/>
      <Route exact path={`${routes.COMPETITIONS}/:compid/map`} render={() => <GMap lat={lat} lng={lng} />}/>
    </div>
  </div>


export default CompetitionManage;
