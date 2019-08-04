import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetPlayer } from "../actions/socketActions";

class Header extends Component {
  // Currently not being used as only the main Colony title is showing.
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

  restartGame() {
    const { allVoted, socket, room } = this.props.socket;

    if (allVoted) {
      socket.emit("leave room", room);
      this.props.resetPlayer();
    }
  }

  render() {
    return (
      <nav className='navbar'>
        <div className='container'>
          <Link
            className='navbar-brand main-header m-auto'
            to={"/"}
            onClick={() => this.restartGame()}
          >
            The Colony
          </Link>
          {/* <ul className='navbar-nav ml-auto'>{this.renderContent()}</ul> */}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth, socket }) {
  // This comes from state.auth.
  return { auth, socket };
}

export default connect(
  mapStateToProps,
  { resetPlayer }
)(Header);
