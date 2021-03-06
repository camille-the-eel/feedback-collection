import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripeWrapper from './StripeWrapper';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div className="auth-false">
            <a className="nav-item nav-link" href="/auth/google">
              Login with Google
            </a>
            <a className="nav-item nav-link" href="/auth/facebook">
              Login with Facebook
            </a>
          </div>
        );
      default:
        return (
          <div className="auth-true">
            <div className="nav-item nav-link">
              <StripeWrapper/>
            </div>
            <div className="nav-item nav-link">
              Credits: {this.props.auth.credits}
            </div>
            <a className="nav-item nav-link" href="/api/logout">
              Logout
            </a>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="navbar-brand"
          >
            Emaily
          </Link>
          {this.renderContent()}
        </nav>
      </div>
    );
  }
}

// called with the entire state object out of the redux store
// then we return which branches of it we want -- see reducers/index for where we defined the keys (branches)

// function mapStateToProps(state) {
//     return { auth: state.auth };
// }

// refactored with destructuring, but so you remember ^^^ that is what is happening there
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
