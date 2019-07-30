import React from "react";
import roles from "../assets/roles.json";
import Character from "./Game/Character";
import { Col, Row } from "react-bootstrap";

function Instructions() {
  return (
    <div>
      <h2 className='colony-text' style={{ textAlign: "center" }}>
        Instructions
      </h2>
      {/* TODO: Add game instructions here. */}
      <Row>
        {roles.map((role, index) => {
          return (
            <Col md={4} style={{ marginBottom: "10px" }} key={index}>
              <Character info={role} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Instructions;
