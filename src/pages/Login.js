import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import getToken from '../services/tokenApi';
import { saveUserAction, getTrivia } from '../redux/actions/index';
import Button from '../components/Button';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      btnState: true,
    };
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token && token !== '') {
      this.prepareQuestion();
    }
  }

  prepareQuestion = () => {
    const { triviaQuestions } = this.props;
    triviaQuestions();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.loginValidation();
  }

  handleClick = async () => {
    const { saveUserData, history, questions } = this.props;
    const { name, email } = this.state;
    const token = await getToken();
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', JSON.stringify(token));
    }
    await saveUserData({
      name,
      email,
      token,
    });
    this.prepareQuestion();
    if (questions.length > 0) { history.push('/game'); }
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
    }
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
          <Button
            disabled={ btnState }
            title="Jogar"
            handleClick={ this.handleClick }
            testId="btn-play"
            rota="/game"
          />
          <Button
            title="Configuração"
            testId="btn-settings"
            rota="/settings"
          />
        </form>
      </header>
    );
  }
}

Login.propTypes = {
  saveUserData: PropTypes.func,
  gameQuestions: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (data) => dispatch(saveUserAction(data)),
  triviaQuestions: () => dispatch(getTrivia()),
});

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
