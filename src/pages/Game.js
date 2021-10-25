import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NextQuestionBtn from '../components/NextQuestionBtn';
import GameCard from '../components/GameCard';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();

    this.timer = 0;
    this.limitTimeReached = 0;

    this.state = {
      canClick: true,
      index: 0,
      seconds: 30,
      timePassed: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    const ONE_SECOND = 1000;

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds ? prevState.seconds - 1 : 0,
      }));
    }, ONE_SECOND);

    const LIMIT_TIME = 30000;

    this.limitTimeReached = setTimeout(() => {
      this.setState({
        timePassed: true,
        canClick: false,
      });
    }, LIMIT_TIME);
  }

  SetIndex = () => {
    const { index } = this.state;
    const maxIndex = 4;
    if (index < maxIndex) {
      this.setState((prev) => ({
        index: prev.index + 1,
        canClick: true,
        seconds: 30,
        timePassed: false,
      }));
      clearTimeout(this.limitTimeReached);
      this.startTimer();
    }
  }

  handleCanClick = (bool) => {
    this.setState({ canClick: bool });
    clearInterval(this.timer);
  }

  render() {
    const { questions } = this.props;
    const { canClick, index, seconds, timePassed } = this.state;
    return (
      <main>
        <Header />
        <h1>Game</h1>
        <Timer seconds={ seconds } />
        {questions.length > 0 && <GameCard
          category={ questions[index].category }
          question={ questions[index].question }
          correct={ questions[index].correct_answer }
          wrongAlternative={ questions[index].incorrect_answers }
          canClick={ canClick }
          handleCanClick={ this.handleCanClick }
          timePassed={ timePassed }
          showNextButtonWhenTimePass={ this.showNextButtonWhenTimePass }
        />}
        { !canClick && <NextQuestionBtn sumIndex={ this.SetIndex } />}
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
