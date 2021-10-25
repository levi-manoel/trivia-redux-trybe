import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getTrivia } from '../redux/actions';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = { canClick: true, index: 0 };
  }

  SetIndex = () => {
    const { index } = this.state;
    const maxIndex = 5;
    if (index < maxIndex) {
      this.setState((prev) => ({ index: prev.index + 1 }));
    }
  }

  handleCanClick = (bool) => {
    this.setState({ canClick: bool });
  }

  render() {
    const { questions } = this.props;
    const { canClick, index } = this.state;
    return (
      <main>
        <Header />
        <h1>Game</h1>
        {questions.length > 0 && <GameCard
          category={ questions[index].category }
          question={ questions[index].question }
          correct={ questions[index].correct_answer }
          wrongAlternative={ questions[index].incorrect_answers }
          canClick={ canClick }
          handleCanClick={ this.handleCanClick }
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
