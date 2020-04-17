import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Landing.css";

// var context;

// window.onload = function () {
//   context = new AudioContext();
//   // Setup all nodes
//   console.log(context);
// };

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.Listening = this.Listening.bind(this);
  }

  componentDidMount() {
    // console.log(context);
  }
  componentDidUpdate() {
    // console.log(context);
  }

  Listening = () => {
    // context.resume().then(() => {
    console.log("Playback resumed successfully");
    // });
  };

  render() {
    return (
      <>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1 id="title">SimilTune</h1>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <hr />
        <Container id="startBox">
          <Link to="/game">
            <Button id="startButton" onClick={this.Listening}>
              Press Here To Start
            </Button>
          </Link>
        </Container>
      </>
    );
  }
}

export default Landing;
