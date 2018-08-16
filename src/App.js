import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import CreateGif from './components/CreateGif';
import BattleGifs from './components/BattleGifs';
import Leaderboard from './components/Leaderboard';
import 'bulma/css/bulma.css';
import './App.css';

/**
 * Main app component
 */
class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <CreateGif />
        <BattleGifs />
        <Leaderboard />
      </Fragment>
    );
  }
}

export default App;
