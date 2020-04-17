import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1 id="title">Simil-tune</h1>
              </Col>
              <Col>
                <h1 id="title">SimilTune</h1>
              </Col>
              <Col>
                <h1 id="title">Similtune</h1>
              </Col>
              <Col>
                <h1 id="title">Simil-Tune</h1>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <hr />
        <Container id="startBox">
          <Link to="/game">
            <Button id="startButton">Press Here To Start</Button>
          </Link>
        </Container>
      </>
    );
  }
}

export default Landing;
