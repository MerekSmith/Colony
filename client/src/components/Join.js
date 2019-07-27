import React, { Component } from "react";
import { connect } from "react-redux";
// import { fetchSocket } from "../actions/socketActions";

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      name: "",
      roomError: false
    };
  }

  joinRoom = e => {
    e.preventDefault();
    const socket = this.props.socket.socket;
    socket.emit("join room", this.state.room, this.state.name);
    // Creates an alert if the room entered does not exist.
    socket.on("room error", roomError => this.setState({ roomError }));
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Join Game</h2>
        <form id='contact-form' onSubmit={e => this.joinRoom(e)}>
          <div className='form-group'>
            {/* <label htmlFor="form_name">Firstname *</label> */}
            <input
              id='form_room'
              type='text'
              name='room'
              className='form-control'
              placeholder='Room *'
              required='required'
              data-error='Room is required.'
              value={this.state.room}
              onChange={e => this.setState({ room: e.target.value })}
            />
            <div className='help-block with-errors' />
          </div>
          <div className='form-group'>
            {/* <label htmlFor="form_name">Firstname *</label> */}
            <input
              id='form_name'
              type='text'
              name='name'
              className='form-control'
              placeholder='Name *'
              required='required'
              data-error='Name is required.'
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <div className='help-block with-errors'>
              {this.state.roomError ? (
                <h3 style={{ color: "red" }}>This room does not exist!</h3>
              ) : null}
            </div>
          </div>
          <input
            type='submit'
            className='main-btn btn btn-warning btn-lg'
            value='Join Room'
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ socket }) => ({
  socket
});

export default connect(mapStateToProps)(Join);
