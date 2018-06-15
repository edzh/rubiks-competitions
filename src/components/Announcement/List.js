import React, { Component } from 'react';
import { base } from '../../firebase';
import AnnouncementForm from './Form';
import Announcement from './Announcement'


class AnnouncementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      announcements: [],
    };

    this.addToAnnouncements = this.addToAnnouncements.bind(this);
  }

  componentDidMount() {
    this.announcementsRef = base.syncState('announcements', {
      context: this,
      state: 'announcements',
      asArray: true,
      queries: {
        orderByChild: 'compid',
        equalTo: this.props.compid
      }
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.announcementsRef);
  }

  addToAnnouncements(announcement) {
    const announcements = this.state.announcements.concat(announcement);
    this.setState({ announcements });
  }

  render() {
    const { authUser, compid } = this.props;
    const { announcements } = this.state;


    return (
      <div>
      <h3>Announcements</h3>
        {Object.keys(announcements).map(key => {
          return (
            <Announcement 
              key={key}
              title={announcements[key].title}
              body={announcements[key].body}
            />
          );
        }
        )}
        <AnnouncementForm
          authUser={authUser}
          compid={compid}
          addToAnnouncements={this.addToAnnouncements}
        />
      </div>
    );
  }
}

export default AnnouncementList;
