import React, { Component } from "react";
import { connect } from "react-redux";
import { startGame } from "../actions/socketActions";
import { Row, Col } from "react-bootstrap";
import PlayerList from "./Game/PlayerList";
import Moderator from "./Game/Moderator";

class GameModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: null,
      playerCount: 0
    };
  }

  componentDidMount() {
    // console.log(!this.props.socket.socket, this.props.socket.socket);
    if (!this.props.socket.socket) {
      this.props.history.push("/");
    } else {
      this.createRoom();
    }
  }

  createRoom() {
    const socket = this.props.socket.socket;

    // Generate room #
    const room = Math.floor(Math.random() * 90000) + 10000;
    this.setState({ room });
    // Set name as Moderator
    const name = "Moderator";
    socket.emit("join room", room, name);
  }

  startGame() {
    const socket = this.props.socket.socket;

    this.props.startGame();
    socket.emit("start game", this.state.room);
  }

  renderContent() {
    switch (this.props.socket.gameStarted) {
      case false:
        return (
          <React.Fragment>
            {this.state.room ? (
              <div>
                <h4 className='colony-text' style={{ marginBottom: "10px" }}>
                  Please have users join this game with room # {this.state.room}
                </h4>
                {this.props.socket.playerCount >= 3 ? (
                  <button
                    className='main-btn btn-warning'
                    style={{ margin: "auto" }}
                    onClick={() => this.startGame()}
                  >
                    Start Game
                  </button>
                ) : (
                  <h4 className='colony-text'>
                    Need 3 players to start the game. There are currently{" "}
                    {this.props.socket.playerCount} players.
                  </h4>
                )}
              </div>
            ) : (
              <h2 className='colony-text'>
                There was an issue creating a room. Please go back and try
                again.
              </h2>
            )}
          </React.Fragment>
        );
      case true:
        return <Moderator />;
    }
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h2 className='colony-text' style={{ marginBottom: "30px" }}>
            Game Moderator
          </h2>
        </div>
        <Row>
          <Col md={4}>
            <PlayerList playerList={this.props.socket} />
          </Col>
          <Col md={8}>{this.renderContent()}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ socket }) => ({
  socket
});

export default connect(
  mapStateToProps,
  { startGame }
)(GameModerator);
