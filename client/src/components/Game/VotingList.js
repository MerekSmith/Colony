import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function VotingList(props) {
  const { playerList, playerName, onClick } = props;
  console.log("voting playerName", playerName);
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
          Player List
        </Card.Header>
        <ListGroup variant='flush'>
          {playerList.map(({ name, index }) => {
            return playerName !== name && name !== "Moderator" ? (
              <ListGroup.Item key={index} onClick={() => onClick(name)}>
                {name}
              </ListGroup.Item>
            ) : null;
          })}
        </ListGroup>
      </Card>
    </div>
  );
}

export default VotingList;
