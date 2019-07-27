import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import Button from "./Helpers/Button";

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
            <Button
              label={"Login with Google to Create Game"}
              link={"/auth/google"}
              isLink={false}
              extraClass='google-btn'
            />
            <div className='g-signin2' data-onsuccess='onSignIn' />
            <Button label={"Join Game"} link={"/join"} isLink={true} />
          </React.Fragment>
        );
      default:
        // Logged in
        return (
          <React.Fragment>
            <Button label={"Create Game"} link={"/game"} isLink={true} />
            <Button label={"Join Game"} link={"/join"} isLink={true} />
            <Button label={"Logout"} link={"/api/logout"} isLink={false} />
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div className='container game-start' style={{ textAlign: "center" }}>
        <Button label={"Create Game"} link={"/game"} isLink={true} />
        <div>{this.renderContent()}</div>
        <Button label={"How to Play"} link={"/instructions"} isLink={true} />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  // This comes from state.auth.
  return { auth };
}

export default connect(mapStateToProps)(Landing);
