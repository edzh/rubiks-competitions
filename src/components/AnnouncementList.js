import React, { Component } from 'react';
import { base } from '../firebase';
import AnnouncementForm from './AnnouncementForm';


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
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.announcementsRef);
  }

  addToAnnouncements(announcement) {
    const announcements = this.state.announcements.concat(announcement);
    this.setState({
      announcements: announcements,
    });
  }

  render() {
    const { authUser, compid } = this.props;
    const { announcements } = this.state;


    return (
      <div>
        {Object.keys(announcements).map(key => 
          <div>
            <h4>{announcements[key].title}</h4>
            <p>{announcements[key].body}</p>
            
          </div>
        )}
        <AnnouncementForm 
          authUser={authUser} 
          compid={compid} 
          addToAnnouncements={this.addToAnnouncements}
        />
      </div>
    )
  }
}

export default AnnouncementList;