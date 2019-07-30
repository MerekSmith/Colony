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
      <Card className='character-card'>
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title>
            {roleName} {`(${maxRoleCount})`}
          </Card.Title>
          <Card.Text>
            <span className='card-title'>Role:</span> {effect}
          </Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem>
            <span className='card-title'>Team:</span> {team}
          </ListGroupItem>
          <ListGroupItem>
            <span className='card-title'>How to Win:</span> {winCondition}
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default Character;
