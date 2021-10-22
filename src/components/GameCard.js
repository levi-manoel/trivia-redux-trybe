import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameCard extends Component {
  constructor() {
    super();
    this.state = {
      wrongAlternative: [],
    };
  }

  componentDidMount() {
    this.randomAlternative();
  }

  randomAlternative = () => {
    const { wrongAlternative } = this.props;
    console.log(wrongAlternative);
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
    this.setState({
      wrongAlternative: [...array],
    });
  }

  render() {
    const { category, question, correct } = this.props;
    const { wrongAlternative } = this.state;
    return (
      <section>
        <h3 data-testid="question-category">{category}</h3>
        <h3 data-testid="question-text">{question.replace(/&quot;/g, '"')}</h3>
        <button type="button" data-testid="correct-answer">{correct}</button>
        {wrongAlternative.map((alternative, index) => (
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
