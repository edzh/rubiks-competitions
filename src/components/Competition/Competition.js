import React, { Component } from 'react';
import { base } from '../../firebase';
import AuthUserContext from '../Auth/AuthUserContext';
import AnnouncementList from '../Announcement/List';
import EventList from '../Event/List';
import GMap from '../GMap';

import moment from 'moment';

const CompetitionManage = ({ compid, compName, address, date, lat, lng, uid, authUser, addToAnnouncements }) =>
  <div className="container">
    <h2>{compName}</h2>
    <br/>
    <p>{address}</p>
    <p>{moment(date).format('LL')}</p>
    <AnnouncementList authUser={authUser} compid={compid} />
    <hr/>
    <EventList compid={compid} />
    <hr/>
    <GMap lat={lat} lng={lng} />
  </div>

class Competition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      compid: this.props.match.params.compid,
      address: '',
      compName: '',
      date: '',
      lat: '',
      lng: '',
      uid: '',
    };
  }

  componentDidMount() {
    this.competitionsRef = base.syncState(`competitions`, {
      context: this,
      state: 'competitions',
      asArray: true,
      queries: {
        orderByKey:'',
        equalTo: this.props.match.params.compid,
      },
      then() {
        Object.keys(this.state.competitions[0]).map(key => {
          this.setState({ [key]: this.state.competitions[0][key] })
        });
        this.setState({ loading: false });
      }}
    )
  }

  componentWillUnmount() {
    base.removeBinding(this.competitionsRef);

  }

  render() {

    const { address, compName, date, lat, lng, uid, compid, loading } = this.state;

    return (
    !!loading ? <p>loading...</p> :
    <AuthUserContext.Consumer>
      { // Check if competitions state is populated before passing competitions down
        authUser => !loading && authUser ?
        authUser.uid === this.state.uid ?
          <CompetitionManage
            address={address}
            compName={compName}
            date={date}
            lat={lat}
            lng={lng}
            uid={uid}
            compid={compid}
            addToAnnouncements={this.addToAnnouncements}
            authUser={authUser} />
        : <p>Register</p>
      : <p>Please login to register for competition</p>
      }
    </AuthUserContext.Consumer>

    );
  }
}




export default Competition;
