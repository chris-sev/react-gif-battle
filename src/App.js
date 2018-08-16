import React, { Component } from 'react';
import { Provider, Subscribe } from 'unstated';
import AuthContainer from './state/AuthContainer';
import Header from './components/Header';
import 'bulma/css/bulma.css';
import './App.css';

/**
 * Main app component
 */
class App extends Component {
  componentDidMount() {
    this.props.handleAuthentication();
  }

  render() {
    const { user, login } = this.props;

    return (
      <div className="app">
        <Header user={user} login={login} />
      </div>
    );
  }
}

/**
 * Wrapper to pass down unstated things
 */
const AppWrapper = () => (
  <Provider>
    <Subscribe to={[AuthContainer]}>
      {auth => (
        <App
          user={auth.state.user}
          login={auth.login}
          handleAuthentication={auth.handleAuthentication}
        />
      )}
    </Subscribe>
  </Provider>
);

export default AppWrapper;
