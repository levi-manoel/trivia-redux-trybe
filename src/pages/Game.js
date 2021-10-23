import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrivia } from '../redux/actions';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends Component {
  componentDidMount() {
    this.prepareQuestion();
  }

  prepareQuestion = () => {
    const { triviaQuestions } = this.props;
    triviaQuestions();
  }

  render() {
    const { questions, loading } = this.props;
    console.log(questions, 'game');
    console.log(loading, 'loading');
    return (
      <main>
        <Header />
        <h1>Game</h1>
        {!loading && <GameCard
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
  loading: PropTypes.bool.isRequired,
  triviaQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  triviaQuestions: () => dispatch(getTrivia()),
});

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  loading: state.gameReducer.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
