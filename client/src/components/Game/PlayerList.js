import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function PlayerList(props) {
  // console.log("props", props);
  const { players, room, playerCount } = props.playerList;

  return (
    <div>
      <Card style={{ border: "black 2px solid" }}>
        <Card.Header
          style={{
            backgroundColor: "#e67e22",
            borderBottom: "black 2px solid"
          }}
          className='colony-font player-list'
        >
          Players in room {room}
        </Card.Header>
        <ListGroup variant='flush'>
          {playerCount > 0 ? (
            players.map(({ name, ready, id }) => {
              return name !== "Moderator" ? (
                <ListGroup.Item key={id}>
                  {ready ? <i className='fas fa-check' /> : null} {name}
                </ListGroup.Item>
              ) : null;
            })
          ) : (
            <ListGroup.Item>Waiting for players to join...</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
}

export default PlayerList;
