import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../../constants/routes';
// import EventRole from './Role';

const AttendeeList = ({ attendees }) =>
  <table className="table border">
    <tbody>
    <tr>
      <th scope="col">Name</th>
    </tr>

    {
     attendees && Object.keys(attendees).map(key => 
        <tr key={key}>
          <td>
            <Link to={`${routes.PROFILE}/${key}`}>
            {attendees[key].firstName} {attendees[key].lastName}
            </Link>
          </td>


        </tr> 
      )
    }
    </tbody>
  </table>


export default AttendeeList;