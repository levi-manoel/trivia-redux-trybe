import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking 3000</h1>
        <h1>EM CONSTRUÇÃO</h1>
        <Link to="/">
          <button
            type="button"
          >
            Volte ao começo
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
