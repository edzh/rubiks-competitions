import React from 'react';
import EventRole from './Role';

const StaffList = ({ attendees, eventid }) => 
  <table className="table">
    <tbody>
    <tr>
      <th>
        Staff
      </th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col"></th>
    </tr>
      {Object.keys(attendees).map(key => 
        attendees[key].title === 'Staff' && 
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

export default StaffList;