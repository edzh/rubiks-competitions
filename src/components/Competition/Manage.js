import React from 'react';
import moment from 'moment';
import AnnouncementList from '../Announcement/List';
import GMap from '../GMap';
import EventList from '../Event/List';
import CompetitionAttendingList from './Attending';
import CompetitionNavbar from './Navbar';

const CompetitionManage = ({ compid, compName, address, date, lat, lng, uid, authUser, addToAnnouncements, manage }) =>
  <div className="container">
    <h1 className="text-center">{compName}</h1>
    <p className="text-center">{moment(date).format('LL')}</p>
    <p className="text-center">{address}</p>
    <CompetitionNavbar compid={compid} />
    <GMap lat={lat} lng={lng} />
    
    <CompetitionAttendingList compid={compid} />
    <AnnouncementList
      manage={manage}
      authUser={authUser}
      compid={compid}
    />
    <hr/>
    <EventList authUser={authUser} manage={manage} date={date} compid={compid} />
    <hr/>
  </div>

export default CompetitionManage;
