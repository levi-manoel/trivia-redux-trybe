import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  render() {
    const { seconds } = this.props;
    return (
      <div>
        <span>Timer:</span>
        <span>{ seconds }</span>
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
};

export default Timer;
