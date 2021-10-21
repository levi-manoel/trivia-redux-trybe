import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Button extends Component {
  render() {
    const { testId, handleClick = null, disabled = false, title, rota } = this.props;
    return (
      <Link to={ rota }>
        <button
          type="button"
          data-testid={ testId }
          onClick={ handleClick }
          disabled={ disabled }
        >
          {title}
        </button>
      </Link>
    );
  }
}

Button.propTypes = {
  testId: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  rota: PropTypes.string,
}.isRequired;

export default Button;
