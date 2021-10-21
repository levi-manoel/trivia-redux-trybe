import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import getToken from '../services/tokenApi';
import { saveUserAction } from '../redux/actions/index';

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

  handleClick = async () => {
    const { saveUserData } = this.props;
    const { name, email } = this.state;
    const token = await getToken();
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', JSON.stringify(token));
    }
    saveUserData({
      name,
      email,
      token,
    });
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
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" height="200" />
        <p>
          SUA VEZ
        </p>
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
      </header>
    );
  }
}

Login.propTypes = {
  saveUserData: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (data) => dispatch(saveUserAction(data)),
});

export default connect(null, mapDispatchToProps)(Login);
