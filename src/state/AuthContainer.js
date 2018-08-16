import { Container } from 'unstated';
import auth0 from 'auth0-js';

class AuthContainer extends Container {
  state = {
    user: null,
    isLoggedIn: null
  };

  auth0 = new auth0.WebAuth({
    domain: 'adobot.auth0.com',
    clientID: '4rHNdgYhvnt4SIysKQFyPYeIY5INuHQg',
    redirectUri: 'https://pdx-complete.stackblitz.io/',
    audience: `beerme`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => this.auth0.authorize();

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        window.history.pushState(
          '',
          document.title,
          window.location.pathname + window.location.search
        );
        window.location.reload();
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  setSession = authResult => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  };

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
}

export default AuthContainer;
