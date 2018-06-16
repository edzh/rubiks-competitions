import React, { Component } from 'react';
import moment from 'moment';
import AnnouncementList from '../Announcement/List';
import GMap from '../GMap';
import EventList from '../Event/List';

const CompetitionManage = ({ competitions, compid, authUser, addToAnnouncements }) =>
  <div className="container">
  asdasd
    <h2>{competitions[compid].compName}</h2>
    <br/>
    <p>{competitions[compid].address}</p>
    <p>{moment(competitions[compid].date).format('LL')}</p>
    <AnnouncementList authUser={authUser} compid={compid} />
    <hr/>
    <EventList compid={compid} date={competitions[compid].date} />
    <hr/>
    <GMap lat={competitions[compid].lat} lng={competitions[compid].lng} />
  </div>

export default CompetitionManage;