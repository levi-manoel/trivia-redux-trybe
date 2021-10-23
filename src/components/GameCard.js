import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameCard extends Component {
  randomAlternative = () => {
    const { wrongAlternative } = this.props;
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
    return array;
  }

  render() {
    const { category, question, correct } = this.props;
    return (
      <section>
        <h3 data-testid="question-category">{category}</h3>
        <h3
          data-testid="question-text"
        >
          {question.replace(/&quot;/g, '"').replace(/&#039;/g, /'/)}
        </h3>
        <button type="button" data-testid="correct-answer">{correct}</button>
        {this.randomAlternative().map((alternative, index) => (
          <button
            key={ alternative }
            type="button"
            data-testid={ `wrong-answer-${index}` }
          >
            {alternative}
          </button>
        ))}
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
