import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class PickDate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.onDateChange(this.state.date.format());
  }

  handleChange(date) {
    this.setState({
      date
    });
    this.props.onDateChange(date.format());
  }

  render() {
    return <DatePicker
        selected={this.state.date}
        onChange={this.handleChange}
    />;
  }
}

export default PickDate;
