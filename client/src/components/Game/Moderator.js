import React, { Component } from "react";
import { connect } from "react-redux";
import { resetPlayer } from "../../actions/socketActions";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";

class Moderator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      votedCounter: [],
      votedPlayer: ""
    };
  }

  componentDidMount() {
    const { socket } = this.props.socket;
    // Listen for timer once talking round starts.
    socket.on("timer", timer => {
      this.setState({ timer });
    });

    socket.on("all voted", () => {
      this.calculateVotes();
    });
  }

  calculateVotes() {
    const { allVoted, fullPlayerList } = this.props.socket;

    if (allVoted) {
      let votedCounter = [];
      fullPlayerList.forEach(vote => {
        const index = votedCounter.findIndex(
          voted => voted.voted === vote.voted
        );
        console.log("index", index, vote.voted, votedCounter);
        if (index === -1) {
          let voted = {};
          voted.voted = vote.voted;
          voted.count = 1;
          votedCounter.push(voted);
        } else {
          votedCounter[index].count++;
        }
      });
      votedCounter.sort((a, b) => (a.voted < b.voted ? 1 : -1));
      const votedPlayer = votedCounter[0].voted;
      this.setState({ votedCounter, votedPlayer });
    }
  }

  restartGame() {
    const { allVoted, socket, room } = this.props.socket;

    if (allVoted) {
      socket.emit("leave room", room);
      this.props.resetPlayer();
    }
  }

  renderResults() {
    return (
      <React.Fragment>
        <Card style={{ border: "black 2px solid" }}>
          <Card.Header
            style={{
              backgroundColor: "#e67e22",
              borderBottom: "black 2px solid"
            }}
            className='colony-font player-list'
          >
            Votes
          </Card.Header>
          <ListGroup variant='flush'>
            {this.state.votedCounter.map(({ voted, count, index }) => {
              return (
                <ListGroup.Item key={index}>
                  {voted} => {count} votes
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      </React.Fragment>
    );
  }

  render() {
    const { timer } = this.state;
    const {
      allReadyToPlay,
      allConfirmed,
      timeToVote,
      allVoted
    } = this.props.socket;
    return (
      <div style={{ textAlign: "center" }}>
        {allReadyToPlay ? (
          allConfirmed ? (
            !timeToVote ? (
              <React.Fragment>
                {/* Talking phase */}
                <h5 className='colony-text'>
                  The talking phase has begun! Try to figure out who the
                  infected are before the time runs out. At the end of the
                  timer, you will vote on which player you believe is part of
                  the Infected.
                </h5>
                {timer ? <div className='timer'>{timer}</div> : null}
              </React.Fragment>
            ) : !allVoted ? (
              // Voting Phase
              <h5 className='colony-text'>
                Now it is time to vote for who you think is part of the
                Infected!
              </h5>
            ) : (
              // End voting phase.
              <React.Fragment>
                <h4 className='colony-text'>Here are the results!</h4>
                {this.renderResults()}
                {/* If the logic is updated, can put the winning info here. */}
                {/* <h4 className='colony-text'>
                  {this.state.votedPlayer} received the most votes!
								</h4> */}
                <Link
                  className='main-btn btn-warning restart-btn'
                  to='/'
                  onClick={() => this.restartGame()}
                >
                  Play Another Game
                </Link>
              </React.Fragment>
            )
          ) : null
        ) : (
          <h3 className='colony-text'>
            The Game has Begun! Please review your roles and confirm you are
            ready to begin the game.
          </h3>
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
  { resetPlayer }
)(Moderator);
