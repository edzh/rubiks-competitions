import React, { Component } from 'react';
import { base, db } from '../../firebase';
import AnnouncementForm from './Form';
import Announcement from './Announcement'


class AnnouncementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      announcements: null,
    };

    this.addToAnnouncements = this.addToAnnouncements.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // this.announcementsRef = base.syncState('announcements', {
    //   context: this,
    //   state: 'announcements',
    //   asArray: true,
    //   queries: {
    //     orderByChild: 'compid',
    //     equalTo: this.props.compid
    //   }
    // });
    console.log(db.onceGetAnnouncements(this.props.compid))
  }

  componentWillUnmount() {
    base.removeBinding(this.announcementsRef);
  }

  addToAnnouncements(announcement) {
    const announcements = this.state.announcements.concat(announcement);
    this.setState({ announcements });
  }

  handleDelete(index) {
    const announcement = this.state.announcements[index];
    this.setState({
      announcements: this.state.announcements.filter(i => i !== announcement)
    })
  }

  render() {
    const { authUser, compid } = this.props;
    const { announcements } = this.state;


    return (
      <div>
      <h3>Announcements</h3>
        {!!announcements && Object.keys(announcements).map(key => {
          return (
            <Announcement
              key={key}
              id={key}
              title={announcements[key].title}
              body={announcements[key].body}
              handleDelete={this.handleDelete}
              manage={this.props.manage}
            />
          );
        }
        )}
        {this.props.manage && <AnnouncementForm
          authUser={authUser}
          compid={compid}
          addToAnnouncements={this.addToAnnouncements}
        /> }
      </div>
    );
  }
}

export default AnnouncementList;
