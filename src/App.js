import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" height="200" />
        <p>
          SUA VEZ
        </p>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route path="/settings" render={ () => <Settings /> } />
          <Route path="/game" render={ () => <Game /> } />
        </Switch>
      </header>
    </div>
  );
}
