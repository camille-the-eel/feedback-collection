import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Emaily
          </a>
          <a className="nav-item nav-link" href="#">
            Login with Google
          </a>
          <a className="nav-item nav-link" href="#">
            Login with Facebook
          </a>
        </nav>
      </div>
    );
  }
}

export default Header;
