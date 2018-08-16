import React from 'react';

const Header = ({ isAuthenticated, login, logout }) => (
  <nav className="navbar is-dark">
    <div className="container">
      {/* logo */}
      <div className="navbar-brand">
        <a className="navbar-item router-link-exact-active router-link-active">
          GIPHY BATTLE 🙈🙉🙊🐵
        </a>
      </div>

      {/* links */}
      <div className="navbar-menu is-active">
        <div className="navbar-end">
          {isAuthenticated ? (
            <a className="navbar-item" onClick={logout}>
              Logout
            </a>
          ) : (
            <a className="navbar-item" onClick={login}>
              Login
            </a>
          )}
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
