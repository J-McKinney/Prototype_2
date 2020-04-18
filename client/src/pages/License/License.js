import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./License.css";

class License extends Component {
  render() {
    return (
      <>
        <div id="licenseWrapper">
          <Container>
            <Row>
              <Col>
                <div id="licenseAgreement">License Agreement</div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default License;
