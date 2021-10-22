import React, { Component } from 'react';
import GameCard from '../components/GameCard';
import getTrivia from '../services/getTriviaApi';
import Header from '../components/Header';


export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.saveTrivia();
  }

  saveTrivia = () => {
    getTrivia().then((triviaQuestions) => {
      this.setState({
        questions: [...triviaQuestions],
        loading: false,
      });
    });
  }

  render() {
    const { questions, loading } = this.state;
    console.log(questions);
    return (
     <main>
        <Header />
        <h1>Game</h1>
        {loading ? 'Loading...'
          : (
            <GameCard
              category={ questions[0].category }
              question={ questions[0].question }
              correct={ questions[0].correct_answer }
              wrongAlternative={ questions[0].incorrect_answers }
            />)}
       </main>
    );
  }
}
