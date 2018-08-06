import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import * as routes from '../../constants/routes';

const Navbar = ({ compid }) =>
  <nav className="rounded-top navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to={`${routes.COMPETITIONS}/${compid}`}>Details</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`${routes.COMPETITIONS}/${compid}/announcements`}>Announcements</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`${routes.COMPETITIONS}/${compid}/events`}>Events</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`${routes.COMPETITIONS}/${compid}/competitors`}>Competitors</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`${routes.COMPETITIONS}/${compid}/map`}>Map</NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to={`${routes.COMPETITIONS}/${compid}/register`}>Register</NavLink>
      </li>
    </ul>
  </nav>

export default Navbar;

Navbar.propTypes = {
  compid: PropTypes.string.isRequired,
}
