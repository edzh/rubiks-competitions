import React from 'react';

import { auth } from '../firebase';

const LogOutButton = () =>
  <a href="" className="nav-link" onClick={auth.doSignOut}>Log Out</a>

export default LogOutButton;
