import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions/authActions";
import { savePlayers, saveSocket } from "../actions/socketActions";
import io from "socket.io-client";
import "../index.css";

import Header from "./Header";
import Landing from "./Landing";
import Instructions from "./Instructions";
import GameModerator from "./GameModerator";
import Join from "./Join";

const socket = io.connect("http://localhost:5000");
class App extends Component {
  componentDidMount() {
    // Fetch Google Login
    this.props.fetchUser();

    // Save socket into Redux
    this.props.saveSocket(socket);

    // Listens for when people have joined but will only be received in they are in the specific room. Have it in App as it will be used by both GameModerator and Join components.
    socket.on("joined", ({ players, room }) =>
      this.props.savePlayers({ players, room })
    );
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <div className='container m-auto'>
              <Route exact path='/' component={Landing} />
              <Route exact path='/instuctions' component={Instructions} />
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
  { fetchUser, saveSocket, savePlayers }
)(App);
