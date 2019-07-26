import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Landing extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <div className='preloader-wrapper big active'>
            <div className='spinner-layer spinner-blue'>
              <div className='circle-clipper left'>
                <div className='circle' />
              </div>
              <div className='gap-patch'>
                <div className='circle' />
              </div>
              <div className='circle-clipper right'>
                <div className='circle' />
              </div>
            </div>
          </div>
        );
      case false:
        // Not logged in yet.
        return (
          <React.Fragment>
            <a
              className='btn waves-effect waves-light btn-large orange'
              href='/auth/google'
            >
              Login With Google and Create Game
            </a>
            <div className='g-signin2' data-onsuccess='onSignIn' />
            <Link
              to='join'
              className='btn waves-effect waves-light btn-large orange'
            >
              Join Game
            </Link>
          </React.Fragment>
        );
      default:
        // Logged in
        return (
          <React.Fragment>
            <div>
              <Link
                className='btn waves-effect waves-light btn-large orange'
                to='/game'
              >
                Start Game
              </Link>
            </div>
            <div>
              {" "}
              <Link
                to='join'
                className='btn waves-effect waves-light btn-large orange'
              >
                Join Game
              </Link>
            </div>
            <div>
              <a
                className='btn waves-effect waves-light btn-large orange'
                href='/api/logout'
              >
                Logout
              </a>
            </div>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div className='container game-start' style={{ textAlign: "center" }}>
        <div>{this.renderContent()}</div>
        <Link
          to='/instructions'
          className='btn waves-effect waves-light btn-large orange'
        >
          How to Play
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  // This comes from state.auth.
  return { auth };
}

export default connect(mapStateToProps)(Landing);
