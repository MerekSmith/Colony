import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerList from "./game/PlayerList";

class GameModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: null
    };
  }

  componentDidMount() {
    console.log(!this.props.socket.socket, this.props.socket.socket);
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

  render() {
    return (
      <div>
        <h2>Game Moderator</h2>
        {this.state.room ? (
          <h4>
            Please have users join by going to the following link and entered in
            room # {this.state.room}
          </h4>
        ) : null}
        <PlayerList playerList={this.props.socket} />
      </div>
    );
  }
}

const mapStateToProps = ({ socket }) => ({
  socket
});

export default connect(mapStateToProps)(GameModerator);
