import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getTrivia } from '../redux/actions';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends Component {
  render() {
    const { questions } = this.props;
    console.log(questions, 'game');
    return (
      <main>
        <Header />
        <h1>Game</h1>
        {questions.length > 0 && <GameCard
          category={ questions[0].category }
          question={ questions[0].question }
          correct={ questions[0].correct_answer }
          wrongAlternative={ questions[0].incorrect_answers }
        />}
      </main>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

export default connect(mapStateToProps)(Game);

// Referência: Contribuição para elaboração de: Gustuvo Santanna, Bel Albuquerque, Fabrício Cardoso, Pessini.
