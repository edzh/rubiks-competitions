import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={'/'}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/create'}>Create Competition</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/competitions'}>Find Competition</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
