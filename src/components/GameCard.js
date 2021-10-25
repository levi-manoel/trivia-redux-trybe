import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateScore } from '../redux/actions';

class GameCard extends Component {
  randomAlternative = () => {
    const { wrongAlternative, correct } = this.props;
    const array = [...wrongAlternative];
    let currentIndex = wrongAlternative.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [
        array[currentIndex],
        array[randomIndex],
      ] = [array[randomIndex], array[currentIndex]];
    }

    return this.createAlternativesButtons(array, correct);
  }

  createAlternativesButtons = (wrongAlternatives, correctAlternative) => {
    const { timePassed } = this.props;
    const wrong = wrongAlternatives
      .map((alternative, index) => (
        <button
          key={ alternative }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleClick }
          className="buttons"
          disabled={ timePassed }
        >
          {alternative}
        </button>
      ));
    const correct = (
      <button
        type="button"
        name="correct"
        data-testid="correct-answer"
        onClick={ this.handleClick }
        key={ correctAlternative }
        className="buttons"
        disabled={ timePassed }
      >
        {correctAlternative}
      </button>);
    return [...wrong, correct];
  }

  changeBackgroudColor = async () => {
    const buttons = document.getElementsByClassName('buttons');
    for (let index = 0; index < buttons.length; index += 1) {
      const element = buttons[index];
      if (element.name === 'correct') {
        element.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        element.style.border = '3px solid rgb(255, 0, 0)';
      }
    }
  }

  addPointsToScore = () => {
    const { difficulty, seconds, addScore } = this.props;
    const MINIMAL_SCORE = 10;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;

    let difficultyValue = 0;
    switch (difficulty) {
    case 'easy':
      difficultyValue = ONE;
      break;
    case 'medium':
      difficultyValue = TWO;
      break;
    case 'hard':
      difficultyValue = THREE;
      break;
    default:
      console.error('oxi');
      break;
    }

    const actualState = JSON.parse(localStorage.getItem('state'));
    const newScore = MINIMAL_SCORE + (difficultyValue * seconds);

    const actualScore = actualState.player.score + newScore;

    localStorage.setItem('state', JSON.stringify({ player: { score: actualScore } }));

    addScore(newScore);
  };

  handleClick = ({ target }) => {
    const { canClick, handleCanClick, timePassed } = this.props;
    if (target.name === 'correct' && canClick && !timePassed) {
      this.changeBackgroudColor();
      this.addPointsToScore();
    } else if (canClick) {
      console.log('incorreto');
      this.changeBackgroudColor();
    }
    handleCanClick(false);
  }

  render() {
    const { category, question } = this.props;
    return (
      <section>
        <h3 data-testid="question-category">{category}</h3>
        <h3
          data-testid="question-text"
        >
          {question.replace(/&quot;/g, '"').replace(/&#039;/g, /'/)}
        </h3>
        {
          this.randomAlternative()
        }
      </section>
    );
  }
}

GameCard.propTypes = {
  category: PropTypes.string,
  correct: PropTypes.string,
  question: PropTypes.string,
  wrongAlternative: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addScore: (scoreToAdd) => dispatch(updateScore(scoreToAdd)),
});

export default connect(null, mapDispatchToProps)(GameCard);

// Randomizar opções de resposta - Referência: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

// Remove '&quot;' - Referência: https://stackoverflow.com/questions/9244824/how-to-remove-quot-from-my-json-in-javascript/39619252
