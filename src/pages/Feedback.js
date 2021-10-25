import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          Feedback
        </div>
      </div>
    );
  }
}

export default Feedback;
