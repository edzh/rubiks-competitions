import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import AnnouncementList from '../Announcement/List';
import GMap from '../GMap';
import CompetitionDetails from './Details';
import CompetitionRegister from './Register/Register';
import CompetitionManageNavbar from './ManageNavbar';
import EventList from '../Event/List';
import CompetitionAttendingList from './Attending/Attending';
import Profile from '../User/Profile';
import * as routes from '../../constants/routes';

const CompetitionManage = ({ ...props }) =>
  <div className="card bg-light">
    <CompetitionManageNavbar compid={props.compid} />
    <Route exact path={`${routes.COMPETITIONS}/:compid`} render={({ match }) => (
      <CompetitionDetails {...props} compid={match.params.compid} />
    )}/>

    <Route exact path={`${routes.COMPETITIONS}/:compid/announcements`} render={({ match }) => (
      <AnnouncementList authUser={props.authUser} compid={match.params.compid} />
    )}/>

    <Route path={`${routes.COMPETITIONS}/:compid/events`} render={({ match }) => (
      <EventList authUser={props.authUser} date={props.date} compid={match.params.compid} />
    )}/>

    <Route exact path={`${routes.COMPETITIONS}/:compid/competitors`} render={({ match }) => (
      <CompetitionAttendingList compid={match.params.compid} />
    )}/>

    <Route exact path={`${routes.COMPETITIONS}/:compid/map`} render={() => <GMap lat={props.lat} lng={props.lng} />}/>

    <Route exact path={`${routes.COMPETITIONS}/:compid/register`} render={({ match }) => (
      <CompetitionRegister authUser={props.authUser} compid={match.params.compid} />
    )}/>
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
