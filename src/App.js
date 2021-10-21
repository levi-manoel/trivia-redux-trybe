import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/settings" render={ () => <Settings /> } />
        <Route exact path="/game" render={ () => <Game /> } />
        <Route exact path="/" render={ () => <Login /> } />
      </Switch>
    </div>
  );
}
