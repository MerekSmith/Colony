import React, { Component } from "react";
import { connect } from "react-redux";
import { startGame } from "../actions/socketActions";
import { Row, Col } from "react-bootstrap";
import PlayerList from "./Game/PlayerList";

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

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h2
            className='colony-text'
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Game Moderator
          </h2>
          {this.state.room ? (
            <h4
              className='colony-text'
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Please have users join this game with room # {this.state.room}
            </h4>
          ) : null}
        </div>
        <Row>
          <Col md={4}>
            <PlayerList playerList={this.props.socket} />
          </Col>
          <Col md={8}>
            <h4 className='colony-text'>
              Need 4 players to start the game. There are{" "}
              {this.props.socket.playerCount} players
            </h4>
          </Col>
        </Row>
        {this.props.socket.playerCount >= 1 ? (
          <div>
            <button
              className='main-btn btn-warning'
              onClick={() => this.startGame()}
            >
              Start Game
            </button>
          </div>
        ) : null}
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
