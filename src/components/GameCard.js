import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const wrong = wrongAlternatives
      .map((alternative, index) => (
        <button
          key={ alternative }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleClick }
          className="buttons"
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

  handleClick = ({ target }) => {
    const { canClick, handleCanClick } = this.props;
    if (target.name === 'correct' && canClick) {
      this.changeBackgroudColor();
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

export default GameCard;

// Randomizar opções de resposta - Referência: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

// Remove '&quot;' - Referência: https://stackoverflow.com/questions/9244824/how-to-remove-quot-from-my-json-in-javascript/39619252
