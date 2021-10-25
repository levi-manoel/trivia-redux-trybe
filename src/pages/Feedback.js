import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  feedBackMessage = () => {
    const actualState = JSON.parse(localStorage.getItem('state'));
    const { assertions } = actualState.player;
    const { score } = this.props;
    const tres = 3;
    if (assertions < tres) {
      return (
        <div>
          <h1>Podia ser melhor...</h1>
          <h2>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            questões!
          </h2>
          <h2>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </h2>
        </div>
      );
    } if (assertions >= tres) {
      return (
        <div>
          <h1>Mandou bem!</h1>
          <h2>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            questões!
          </h2>
          <h2>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </h2>
        </div>
      );
    } return '';
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          {this.feedBackMessage()}
        </h3>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.userReducer.email,
    name: state.userReducer.name,
    score: state.gameReducer.score,
  };
}

export default connect(mapStateToProps)(Feedback);
