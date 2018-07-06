import React, { Component } from 'react';
import moment from 'moment';
import AnnouncementList from '../Announcement/List';
import GMap from '../GMap';
import EventList from '../Event/List';
import AttendingList from './Attending';

const CompetitionManage = ({ compid, compName, address, date, lat, lng, uid, authUser, addToAnnouncements, manage }) =>
  <div className="container">
    <h2>{compName}</h2>
    <br/>
    <p>{address}</p>
    <p>{moment(date).format('LL')}</p>
    <AnnouncementList
      manage={manage}
      authUser={authUser}
      compid={compid}
    />
    <hr/>
    <EventList manage={manage} date={date} compid={compid} />
    <hr/>
    <GMap lat={lat} lng={lng} />
    <AttendingList compid={compid} />
  </div>

export default CompetitionManage;
