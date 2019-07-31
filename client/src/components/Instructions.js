import React from "react";
import roles from "../assets/roles.json";
import Character from "./Game/Character";
import { Col, Row, Card } from "react-bootstrap";

function Instructions() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2
        className='colony-text'
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Instructions
      </h2>
      <Card
        body
        style={{
          backgroundColor: "#e67e22",
          textAlign: "justify",
          marginBottom: "20px"
        }}
      >
        <h5>
          This is a bluffing/deduction game. You are colonists on Mars but there
          has been a recent outbreak. Some of the colonists have been infected
          and are trying to kill everyone. The colonists have one night to
          indentify the infected and kill them before they start their rampage.
          Someone will login using their google account and then being able to
          create a game room. All players will then use another device, such as
          a phone or tablet, to join in the game with the provided room #. This
          can play 3-6 players so once 3 players have joined, the game can
          begin. This game plays similarly to One Night Ultimate Werewolf but is
          rethemed as a Mars Colony with infected players.
        </h5>
        <h5 style={{ margin: "30px 0px" }}>
          The game begins with 6 different roles, seen below, being secretly
          assigned randomly to the players. There are 3 additional roles hidden
          to everyone, regardless of player count, which gives the game more
          variety and mystery as to which role the other players could be.
          Currently, this game can play a max of 6 players. If there are at
          least 5 players, there can be up to 2 infected players. Otherwise,
          there will be only 1 infected player. There are at most 3 Colonists
          being played too. Only 1 of each of the remaining 4 roles can be
          played. Once the roles have been assigned, the moderator screen will
          display which roles are in play as some may not have been randomly
          choosen.
        </h5>
        <h5>
          The game begins during the night phase where certain roles get to
          perform special powers. In a traditional game similar to this, each
          role takes its turn in a specific order. Due to this game being
          automated and having a moderator, all the roles are able to perform
          their powers at the same time on their user screen. At the end of the
          game, each player will vote on which other player they believe is
          Infected. The person with the most votes will be killed. On ties, all
          tied players will be killed. If you believe no one is infected, you
          can opt to vote for no one.
        </h5>
      </Card>
      <h3 className='colony-text'>Characters:</h3>
      <Row>
        {roles.map((role, index) => {
          return (
            <Col md={4} style={{ marginBottom: "20px" }} key={index}>
              <Character info={role} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Instructions;
