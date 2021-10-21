import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      btnState: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.loginValidation();
  }

  handleClick = () => {
    console.log('salvou');
  }

  loginValidation = () => {
    const { name, email } = this.state;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regexEmail.test(email) && name.length !== 0) {
      this.setState({
        btnState: false,
      });
    } else {
      this.setState({
        btnState: true,
      });
    } console.log(name.length);
  }

  render() {
    const { email, name, btnState } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            placeholder="Digite o seu nome"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            placeholder="Digite seu email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ btnState }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
