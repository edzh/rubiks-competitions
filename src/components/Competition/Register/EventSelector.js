import React from 'react';
import PropTypes from 'prop-types';

import events from '../../../constants/events';

const eventStyleDeselected = {
  width: '64px',
  height: '64px',
  backgroundColor: 'white',
}

const eventStyleSelected = {
  width: '64px',
  height: '64px',
  color: 'white',
  backgroundColor: 'black',
}

const EventSelector = ({...props}) =>
  <div className="mx-0 row">
    {props.events && Object.keys(props.events).map(key =>
      <div
        key={key}
        className="mr-2 border rounded"
        onClick={() => props.toggleEvent(key)}
        style={props.events[key] ? eventStyleSelected : eventStyleDeselected}
      ><p className="small">{events[key]}</p>
      </div>
    )}
  </div>

export default EventSelector;

EventSelector.propTypes = {
  events: PropTypes.object,
  toggleEvent: PropTypes.func,
};