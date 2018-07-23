import React, { Component } from 'react';
import { db } from '../../firebase';
import AnnouncementForm from './Form';
import Announcement from './Announcement'


class AnnouncementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      announcements: null,
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    db.watchAnnouncements(this.props.compid, snap => {
      this.setState({ announcements: snap.val() })
    })
  }

  componentWillUnmount() {
    db.detach;
  }

  handleDelete(id) {
    db.deleteAnnouncement(id);
  }

  render() {
    const { authUser, compid } = this.props;
    const { announcements } = this.state;


    return (
      <div className="px-4 py-2">
      <h2>Announcements</h2>
        <AnnouncementForm
          authUser={authUser}
          compid={compid}
        />
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
      </div>
    );
  }
}

export default AnnouncementList;
