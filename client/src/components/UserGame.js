import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { playerReady, resetPlayer } from "../actions/socketActions";
import Character from "./Game/Character";
import RoleRevealList from "./Game/RoleRevealList";
import VotingList from "./Game/VotingList";

class UserGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // ready: false,
      revealPlayerList: null,
      extraRolesList: null,
      fullPlayerList: null,
      revealSelected: false,
      extraRolesSelected: false,
      revealSelectedList: [],
      powerConfirmed: false,
      voted: false
    };
  }

  updateReveal(name, roleName, isRevealed, myRole) {
    isRevealed = true;
    const player = { name, roleName, isRevealed };

    if (
      name.slice(0, 10) !== "Extra Role" ||
      this.state.revealSelectedList.length === 1 ||
      (myRole === "Infected" && this.state.revealSelectedList.length < 2)
    ) {
      this.setState({ revealSelected: true });
      this.setState(prevState => ({
        revealSelectedList: [...prevState.revealSelectedList, player]
      }));
    } else if (this.state.revealSelectedList.length < 2) {
      this.setState({ extraRolesSelected: true });
      this.setState(prevState => ({
        revealSelectedList: [...prevState.revealSelectedList, player]
      }));
    }

    this.setState(prevState => ({
      extraRolesList: prevState.extraRolesList.map(role =>
        role.name === name ? Object.assign({}, role, { isRevealed }) : role
      )
    }));
  }

  ready() {
    const { socket, room } = this.props.socket;
    socket.ready = true;
    socket.emit("ready to play", room);
  }

  powerConfirm() {
    const { socket, room } = this.props.socket;
    socket.ready = true;
    this.setState({ powerConfirmed: true });
    socket.emit("power confirmed", room);
  }

  getRoles(socket, room, roleName) {
    // The if function looks to see if the array has been filled. It seems this will continue to run in a loop unless something stops it. Not sure of a better method for now.
    if (!this.state.revealPlayerList) {
      socket.emit(
        "review roles",
        room,
        roleName,
        (revealPlayerList, extraRolesList) => {
          const fullPlayerList = revealPlayerList.concat(extraRolesList);
          this.setState({ fullPlayerList, revealPlayerList, extraRolesList });
        }
      );
    }
  }

  submitVote(votedName) {
    const { socket, room } = this.props.socket;

    socket.emit("player voted", room, votedName);
    this.setState({ voted: true });
  }

  restartGame() {
    const { allVoted, socket, room } = this.props.socket;

    if (allVoted) {
      socket.emit("leave room", room);
      this.props.resetPlayer();
    }
  }

  renderJoined() {
    return (
      <React.Fragment>
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
          <React.Fragment>
            {this.props.socket.socket.ready ? (
              <h2 className='colony-text'>
                You are now ready to play! Waiting for the remaining players to
                click ready.
              </h2>
            ) : (
              <div>
                <h3 className='colony-text'>Game has started!</h3>
                <h5 className='colony-text'>
                  You have been assigned this role:
                </h5>
                <Character info={this.props.socket.socket.role} />
                <button
                  className='main-btn btn-warning'
                  onClick={() => this.ready()}
                >
                  Ready to Play
                </button>
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  // Once everyone in game is ready and knows their roles, this will display specific information based on their role. The players will then again confirm to start the talking phase.
  roleAction() {
    const { socket, room } = this.props.socket;
    const { roleName } = socket.role;

    switch (roleName) {
      case "Infected":
        this.getRoles(socket, room, roleName);
        return (
          <React.Fragment>
            <Card
              body
              style={{
                backgroundColor: "#e67e22",
                textAlign: "justify",
                marginBottom: "20px"
              }}
            >
              <h5 className='power-text'>
                You have been Infected. Your goal is to fool everyone in
                thinking you are not one of the infected. If there is another
                infected player, they will be listed below. If any infected
                player dies, you lose.
              </h5>
            </Card>
            <RoleRevealList
              className='RoleRevealList'
              playerList={this.state.revealPlayerList}
              header={"Infected Players"}
            />
          </React.Fragment>
        );
      case "Colonist":
        return (
          <Card
            body
            style={{
              backgroundColor: "#e67e22",
              textAlign: "justify",
              marginBottom: "20px"
            }}
          >
            <h5 className='power-text'>
              You are a Colonist. You have no special power but you need to
              convince everyone else that you are not one of the Infected. Find
              the infected before they kill the Colony!
            </h5>
          </Card>
        );
      case "Psychopath":
        this.getRoles(socket, room, roleName);
        return (
          <React.Fragment>
            <Card
              body
              style={{
                backgroundColor: "#e67e22",
                textAlign: "justify",
                marginBottom: "20px"
              }}
            >
              <h5 className='power-text'>
                You are not infected but you don't care. You are still on the
                side of the infected and know who they are, if any players are
                infected, but they don't know who you are. Work to pull doubt
                away from your infected players in order to win! If you die but
                none of the infected do, you still win. If there are no infected
                and you are not killed, you win. If any infected player dies,
                you lose.
              </h5>
            </Card>
            <RoleRevealList
              className='RoleRevealList'
              playerList={this.state.revealPlayerList}
              header={"Infected Players"}
            />
          </React.Fragment>
        );
      case "Scientist":
        this.getRoles(socket, room, roleName);
        return (
          <React.Fragment>
            <Card
              body
              style={{
                backgroundColor: "#e67e22",
                textAlign: "justify",
                marginBottom: "20px"
              }}
            >
              <h5 className='power-text'>
                As a Scientist you are able to determine if someone is Infected
                but you only have time to select one person. Choose a player
                from the list below and their role will be revealed to you. You
                are on the side of the Colonists and humanity. Kill at least one
                infected and the Colonists win.
              </h5>
            </Card>
            <RoleRevealList
              className='RoleRevealList'
              // The scientist can choose either 1 player or 2 extra roles to reveal. If they choose an extra role, then it will switch to only displaying the extra roles list so they can select one more. If they select a player or their 2nd role, it will show only what they selected.
              playerList={
                !this.state.revealSelected
                  ? !this.state.extraRolesSelected
                    ? this.state.fullPlayerList
                    : this.state.extraRolesList
                  : this.state.revealSelectedList
              }
              header={"Choose 1 player or 2 extra roles"}
              onClick={(playerName, roleName, isRevealed) =>
                this.updateReveal(playerName, roleName, isRevealed)
              }
              isClickList={true}
            />
          </React.Fragment>
        );
      case "Sad Robot":
        return (
          <Card
            body
            style={{
              backgroundColor: "#e67e22",
              textAlign: "justify",
              marginBottom: "20px"
            }}
          >
            <h5 className='power-text'>
              As the Sad Robot, you just want it all to end. Your goal is to be
              the one picked to be killed, in order to win. If you and an
              infected player are killed, both the Colonists and Infected teams
              win. You are considered a Colonists but not actually on their
              team.
            </h5>
          </Card>
        );
      case "Paranoid":
        return (
          <Card
            body
            style={{
              backgroundColor: "#e67e22",
              textAlign: "justify",
              marginBottom: "20px"
            }}
          >
            <h5 className='power-text'>
              As a Paranoid Colonist, you are prepared with booby traps. If you
              are selected to be killed at the end of the game, the person you
              selected will also be killed.
            </h5>
          </Card>
        );
      default:
        return (
          <h2 className='colony-text'>
            There is something wrong with your role!
          </h2>
        );
    }
  }

  render() {
    const { socket } = this.props;
    return (
      <div style={{ textAlign: "center" }}>
        {!this.props.socket.timeToVote ? (
          this.props.socket.allReadyToPlay ? (
            // This is where the game play will start to be displayed once all players are ready.
            <React.Fragment>
              {this.roleAction()}
              {!this.state.powerConfirmed ? (
                <button
                  className='main-btn btn-warning power-btn'
                  onClick={() => this.powerConfirm()}
                >
                  Ready for Game
                </button>
              ) : null}
            </React.Fragment>
          ) : (
            this.renderJoined()
          )
        ) : !this.state.voted ? (
          <React.Fragment>
            <h5>Click on the player you vote for:</h5>
            <VotingList
              playerList={socket.players}
              playerName={socket.socket.name}
              onClick={votedName => this.submitVote(votedName)}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h4 className='colony-text'>
              You have voted! Watch the Moderator screen to see the results!
            </h4>
            <Link
              className='main-btn btn-warning restart-btn'
              to='/join'
              onClick={() => this.restartGame()}
            >
              Play Another Game
            </Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ socket }) => ({
  socket
});

export default connect(
  mapStateToProps,
  { playerReady, resetPlayer }
)(UserGame);
