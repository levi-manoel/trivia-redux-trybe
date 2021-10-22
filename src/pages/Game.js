import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { questions } = this.props;
    return (
      <main>
        <Header />
        <h1>Game</h1>
        {questions && <GameCard
          category={ questions[0].category }
          question={ questions[0].question }
          correct={ questions[0].correct_answer }
          wrongAlternative={ questions[0].incorrect_answers }
        /> }
      </main>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    questions: state.gameReducer.triviaQuestions,
  };
}

export default connect(mapStateToProps)(Game);
