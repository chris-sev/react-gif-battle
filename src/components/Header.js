import React from 'react';

/**
 * Main header component
 */
const Header = ({ user, login }) => (
  <nav className="navbar is-dark">
    {/* logo */}
    <div className="navbar-brand">
      <a
        href="/"
        className="navbar-item router-link-exact-active router-link-active"
      >
        GIPHY BATTLE 🙈🙉🙊🐵
      </a>
    </div>

    {/* links */}
    <div className="navbar-menu">
      <div className="navbar-end">
        {user ? (
          <a className="navbar-item">{user.name}</a>
        ) : (
          <a className="navbar-item" onClick={login}>
            Login
          </a>
        )}
      </div>
    </div>
  </nav>
);

export default Header;
