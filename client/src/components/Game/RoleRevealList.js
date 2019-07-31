import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function RoleRevealList(props) {
  // console.log("props", props);
  const { playerList, isClickList = false, onClick, header } = props;
  const InfectedCount = playerList ? playerList.length : null;
  console.log("click list", isClickList);
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
          {header}
        </Card.Header>
        <ListGroup variant='flush'>
          {InfectedCount ? (
            playerList.map(({ name, roleName, isRevealed = false, index }) => {
              return isClickList ? (
                <ListGroup.Item
                  key={index}
                  onClick={() => onClick(name, roleName, isRevealed)}
                >
                  {name} {isRevealed ? `= ${roleName}` : null}
                </ListGroup.Item>
              ) : (
                <ListGroup.Item key={index}>{name}</ListGroup.Item>
              );
            })
          ) : (
            <ListGroup.Item>No other infected players.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </div>
  );
}

export default RoleRevealList;
