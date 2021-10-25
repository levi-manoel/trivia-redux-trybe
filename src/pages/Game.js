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

    const localStorageShape = {
      player: {
        score: 0,
        name: '',
        assertions: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(localStorageShape));
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
    const { history } = this.props;
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
    } else {
      history.push('/feedback');
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
          difficulty={ questions[index].difficulty }
          seconds={ seconds }
          canClick={ canClick }
          handleCanClick={ this.handleCanClick }
          timePassed={ timePassed }
        />}
        { !canClick && <NextQuestionBtn sumIndex={ this.SetIndex } />}
      </main>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  email: state.userReducer.email,
  name: state.userReducer.name,
  score: state.gameReducer.score,
});

export default connect(mapStateToProps)(Game);

// Referência: Contribuição para elaboração de: Gustuvo Santanna, Bel Albuquerque, Fabrício Cardoso, Pessini.
