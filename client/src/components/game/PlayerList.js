import React from "react";
import { Card, ListGroup, ListGroupItem, Header } from "react-bootstrap";

function PlayerList(props) {
  // console.log("props", props);
  const { players, room } = props.playerList;
  let playerCount = 0;
  if (players) {
    playerCount = players.length;
  }
  console.log("players", players);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Header>Players in room {room}</Card.Header>
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
