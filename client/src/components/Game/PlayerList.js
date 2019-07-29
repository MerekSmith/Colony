import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function PlayerList(props) {
  // console.log("props", props);
  const { players, room } = props.playerList;
  let playerCount = 0;
  if (players) {
    playerCount = players.length;
  }
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
          {playerCount > 1 ? (
            players.map(({ name, id }) => {
              return name === "Moderator" ? null : (
                <ListGroup.Item key={id}>{name}</ListGroup.Item>
              );
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
