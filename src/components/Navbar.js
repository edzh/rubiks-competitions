import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../constants/routes';

class Navbar extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={routes.HOME}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={routes.CREATE_COMP}>Create Competition</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={routes.COMPETITIONS}>Find Competition</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={routes.LOG_IN}>Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={routes.SIGN_UP}>Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
