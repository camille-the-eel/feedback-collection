import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    //test connect/state
      console.log(this.props);
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
