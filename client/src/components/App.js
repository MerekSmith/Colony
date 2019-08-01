import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/authActions";
import {
  savePlayers,
  saveSocket,
  startGame,
  playerReady,
  powerConfirmed,
  timeToVote,
  updateVotedList
} from "../actions/socketActions";
import io from "socket.io-client";
import "../index.css";

import Header from "./Header";
import Landing from "./Landing";
import Instructions from "./Instructions";
import GameModerator from "./GameModerator";
import Join from "./Join";

const socket = io.connect("/");
class App extends Component {
  componentDidMount() {
    // Fetch Google Login
    this.props.fetchUser();

    // Save socket into Redux
    this.props.saveSocket(socket);

    // Listens for when people have joined but will only be received in they are in the specific room. Have it in App as it will be used by both GameModerator and Join components.
    socket.on("joined", ({ players, room, playerCount }) =>
      this.props.savePlayers({ players, room, playerCount })
    );
    // List for game to start
    socket.on("game has started", role => {
      socket.role = role;
      this.props.saveSocket(socket);
      this.props.startGame();
    });

    socket.on("player is ready", (players, allReadyToPlay) => {
      this.props.playerReady({ players, allReadyToPlay });
    });

    socket.on("power is confirmed", (players, allConfirmed) => {
      this.props.powerConfirmed({ players, allConfirmed });
      if (allConfirmed && this.props.socket.socket.name === "Moderator") {
        socket.emit("start talking phase", this.props.socket.room);
      }
    });

    // Listen for voting round.
    socket.on("time to vote", () => {
      console.log("vote hit");
      this.props.timeToVote();
    });

    // List for voting player list update.
    socket.on("vote update", (fullPlayerList, votedCount) => {
      console.log("full playerlist", fullPlayerList);
      let allVoted = false;
      if (votedCount === this.props.socket.playerCount) {
        allVoted = true;
      }
      this.props.updateVotedList({ fullPlayerList, allVoted });
      if (allVoted) {
        socket.emit("all have voted", this.props.socket.room);
      }
    });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div className='container m-auto'>
              <Route exact path='/' component={Landing} />
              <Route exact path='/instructions' component={Instructions} />
              <Route exact path='/game' component={GameModerator} />
              <Route exact path='/join' component={Join} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    fetchUser,
    saveSocket,
    savePlayers,
    startGame,
    playerReady,
    powerConfirmed,
    timeToVote,
    updateVotedList
  }
)(App);
