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
            <li>
              <a href='/auth/google'>Login With Google</a>
            </li>
            <li>
              <div className='g-signin2' data-onsuccess='onSignIn' />
            </li>
          </React.Fragment>
        );
      default:
        return (
          <li>
            <a href='/api/logout'>Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav className='nav'>
        <div className=''>
          <div className='container'>
            <Link className='left brand-logo' to={"/"}>
              The Colony
            </Link>
            <ul className='right'>{this.renderContent()}</ul>
          </div>
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
