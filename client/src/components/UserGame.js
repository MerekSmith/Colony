import React, { Component } from "react";
import { connect } from "react-redux";

class UserGame extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {!this.props.socket.gameStarted ? (
          <div>
            <h3
              className='colony-text'
              style={{ marginTop: "40px", marginBottom: "20px" }}
            >
              You have joined room {this.props.socket.room}
            </h3>
            <h4 className='colony-text'>
              Waiting for the remaining players to join and Moderator to start
              the game.
            </h4>
          </div>
        ) : (
          // This is where the game play will start to be displayed.
          <h1 className='colony-text'>Game has started!</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ socket }) => ({
  socket
});

export default connect(mapStateToProps)(UserGame);
