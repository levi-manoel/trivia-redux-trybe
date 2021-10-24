import PropTypes from 'prop-types';
import React, { Component } from 'react';

class NextQuestionBtn extends Component {
  render() {
    const { sumIndex } = this.props;
    return (
      <button
        type="button"
        onClick={ sumIndex }
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }
}

NextQuestionBtn.propTypes = {
  sumIndex: PropTypes.func,
}.isrequired;

export default NextQuestionBtn;
