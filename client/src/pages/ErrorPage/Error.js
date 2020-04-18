import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Fade from "react-reveal/Fade";
import "./Error.css";

class Error extends Component {
  render() {
    return (
      <>
        <div id="errorWrapper">
          <Container id="eCon">
            <Row id="eRow">
              <Col id="eCol">
                <div id="eh1">
                  ERROR 1203499C0005ƆB
                </div>
              </Col>
            </Row>
          </Container>
          
        </div>
      </>
    );
  }
}

export default Error;
