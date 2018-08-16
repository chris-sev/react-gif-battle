import { Container } from 'unstated';
import auth0 from 'auth0-js';

class AuthContainer extends Container {
  state = { isAuthenticated: null };

  auth0 = new auth0.WebAuth({
    domain: 'adobot.auth0.com',
    clientID: 'E7v0bIDB2bM4ICfIgbWPbe6J6T54hsiT',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'gifbattle',
    responseType: 'token id_token',
    scope: 'openid'
  });

  /**
   * Log a user in by redirecting them to the auth0 hosted login page
   */
  login = () => this.auth0.authorize();

  /**
   * Check to see if were logged in first.
   * Also check to see if the url has a hash. Parse it for auth stuff like token
   */
  handleAuthentication = () => {
    this.updateAuthentication();

    this.auth0.parseHash((err, authResult) => {
      if (err)
        return alert(
          `Error: ${err.error}. Check the console for further details.`
        );

      if (authResult) {
        this.setSession(authResult);
        window.location.hash = '';
      }
    });
  };

  /**
   * Set when the session will expire
   * Set all things in localStorage
   */
  setSession = authResult => {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.updateAuthentication();
  };

  /**
   * Clear all things from localStorage
   */
  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.updateAuthentication();
  };

  /**
   * Check whether the current time is past the access token's expiry time
   */
  updateAuthentication = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    this.setState({
      isAuthenticated: new Date().getTime() < expiresAt
    });
  };
}

export default AuthContainer;
