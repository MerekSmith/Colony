import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

function Character(props) {
  const {
    roleName,
    effect,
    team,
    winCondition,
    maxRoleCount,
    image
  } = props.info;
  return (
    <div className='m-auto' style={{ textAlign: "center", margin: "auto" }}>
      <Card
        className='character-card'
        style={{ backgroundColor: "#e67e22", border: "black 3px solid" }}
      >
        <Card.Img
          variant='top'
          src={image}
          style={{ backgroundColor: "#e67e22" }}
        />
        <Card.Body
          style={{
            backgroundColor: "#e67e22",
            borderBottom: "black 2px solid"
          }}
        >
          <Card.Title style={{ textDecoration: "underline" }}>
            {roleName}
          </Card.Title>
          <Card.Text>
            <span className='card-title'>Role:</span> {effect}
          </Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem style={{ backgroundColor: "#e67e22" }}>
            <span className='card-title'>Team:</span> {team}
          </ListGroupItem>
          <ListGroupItem
            style={{
              backgroundColor: "#e67e22",
              borderTop: "black 2px solid",
              borderBottom: "black 3px solid"
            }}
          >
            <span className='card-title'>How to Win:</span> {winCondition}
          </ListGroupItem>
          <ListGroupItem style={{ backgroundColor: "#e67e22" }}>
            <span className='card-title'>Max Role Count: </span> {maxRoleCount}
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default Character;
