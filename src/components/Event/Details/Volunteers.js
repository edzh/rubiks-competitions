import React from 'react';
import EventRole from './Role';

const VolunteerList = ({ attendees, eventid }) => 
  <table className="table border col-6">
    <tbody>
    <tr>
      <th>
        Volunteers
      </th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col"></th>
    </tr>
      {attendees && Object.keys(attendees).map(key => 
        attendees[key].title === 'Volunteer' && attendees[key].role !== 'None' &&
        <tr key={key}>
          <td>
            {attendees[key].firstName} {attendees[key].lastName}
          </td>
          <td>{attendees[key].role}</td>
          <td>
            <EventRole role={attendees[key].role} eventid={eventid} uid={key} />
          </td>
        </tr>
      )}
      <tr>
        <th>Unassigned Volunteers</th>
        <th></th>
        <th></th>
      </tr>
      {attendees && Object.keys(attendees).map(key => 
        attendees[key].title === 'Volunteer' && attendees[key].role === 'None' &&
        <tr key={key}>
          <td>
            {attendees[key].firstName} {attendees[key].lastName}
          </td>
          <td>{attendees[key].role}</td>
          <td>
            <EventRole role={attendees[key].role} eventid={eventid} uid={key} />
          </td>
        </tr>
      )}
    </tbody>
  </table>

export default VolunteerList;