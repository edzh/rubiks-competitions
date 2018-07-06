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
        /> }
      </div>
    );
  }
}

export default AnnouncementList;
