import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import AnnouncementList from '../Announcement/List';
import GMap from '../GMap';
import CompetitionDetails from './Details';
import CompetitionRegister from './Register/Register';
import EventList from '../Event/List';
import CompetitionAttendingList from './Attending/Attending';
import Profile from '../User/Profile';
import * as routes from '../../constants/routes';

const CompetitionManage = ({ compid, compName, address, date, lat, lng, uid, authUser, addToAnnouncements, details, venue,
    registrationLimit,
    registrationFee,
    registrationBegin,
    registrationEnd,
    registrationRequirements, }) =>
  <div>

    <div className="card bg-light">
      <Route exact path={`${routes.COMPETITIONS}/:compid`} render={({ match }) => (
        <CompetitionDetails authUser={authUser} compid={match.params.compid}
          details={details}
          venue={venue}
          address={address}
          registrationLimit={registrationLimit}
          registrationFee={registrationFee}
          registrationBegin={registrationBegin}
          registrationEnd={registrationEnd}
          registrationRequirements={registrationRequirements}
        />
      )}/>

      <Route exact path={`${routes.COMPETITIONS}/:compid/announcements`} render={({ match }) => (
        <AnnouncementList authUser={authUser} compid={match.params.compid} />
      )}/>

      <Route path={`${routes.COMPETITIONS}/:compid/events`} render={({ match }) => (
        <EventList authUser={authUser} date={date} compid={match.params.compid} />
      )}/>

      <Route exact path={`${routes.COMPETITIONS}/:compid/competitors`} render={({ match }) => (
        <CompetitionAttendingList compid={match.params.compid} />
      )}/>

      <Route exact path={`${routes.COMPETITIONS}/:compid/map`} render={() => <GMap lat={lat} lng={lng} />}/>

      <Route exact path={`${routes.COMPETITIONS}/:compid/register`} render={({ match }) => (
        <CompetitionRegister authUser={authUser} compid={match.params.compid} />
      )}/>
    </div>
  </div>


export default CompetitionManage;

CompetitionManage.propTypes = {
  date: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  venue: PropTypes.string,
  details: PropTypes.string,
  registrationLimit: PropTypes.number,
  registrationRequirements: PropTypes.string,
  registrationFee: PropTypes.number,
  registrationBegin: PropTypes.string.isRequired,
  registrationEnd: PropTypes.string.isRequired,
}
