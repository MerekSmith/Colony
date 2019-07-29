import React, { Component } from "react";
import { connect } from "react-redux";

class Moderator extends Component {
  render() {
    return (
      <div>
        <h2 className='colony-text'>The Game has Begun!</h2>
      </div>
    );
  }
}

const mapStateToProps = ({ socket }) => ({
  socket
});

export default connect(mapStateToProps)(Moderator);
