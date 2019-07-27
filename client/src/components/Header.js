import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Still Deciding";
      case false:
        return (
          <React.Fragment>
            <li className='nav-item'>
              <a href='/auth/google' className='navbar-brand'>
                Login With Google
              </a>
            </li>
            <li>
              <div className='g-signin2' data-onsuccess='onSignIn' />
            </li>
          </React.Fragment>
        );
      default:
        return (
          <li className='nav-item'>
            <a href='/api/logout' className='navbar-brand'>
              Logout
            </a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav className='navbar'>
        <div className='container'>
          <Link className='navbar-brand main-header m-auto' to={"/"}>
            The Colony
          </Link>
          {/* <ul className='navbar-nav ml-auto'>{this.renderContent()}</ul> */}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  // This comes from state.auth.
  return { auth };
}

export default connect(mapStateToProps)(Header);
