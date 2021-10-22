import React, { Component } from 'react';
import getTrivia from '../services/getTriviaApi';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  async componentDidMount() {
    await getTrivia();
  }

  render() {
    const { questions } = this.state;
    return (
      <main>
        <h1>Game</h1>
        <section>
          <span>{ questions }</span>
        </section>
      </main>
    );
  }
}
