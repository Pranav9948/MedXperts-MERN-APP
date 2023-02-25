import React from 'react'
import "./UserApplyAsDoctor.css";
 import Container from "react-bootstrap/Container";
 import Row from "react-bootstrap/Row";
 import Col from "react-bootstrap/Col";
 import applyDoctor1 from '../../../../../Images/applyDoctor1.jpg'
 import applyDoct2 from "../../../../../Images/applyDoc2.2tor.jpg";
 import applyDoct3 from "../../../../../Images/docApply2.jpg";
 import applyDoct4 from "../../../../../Images/applyDoctor3.jpg";
 import Button from "react-bootstrap/Button";

function UserApplyAsDoctor() {


  return (
    <div className="applyAsDoctor">
      <Container>
        <Row>
          <Col md={6}>
            <Row className="doctorImg">
              <Col md={6}>
                <img src={applyDoctor1} className="doctorImg1" />
              </Col>

              <Col md={6}>
                <img src={applyDoct2} className="doctorImg2" />
              </Col>
            </Row>

            <Row className="doctorImg">
              <Col md={6}>
                <img src={applyDoct3} className="doctorImg2" />
              </Col>

              <Col md={6}>
                <img src={applyDoct4} className="doctorImg4" />

                <div className="bckcolo"></div>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <h1>
              &nbsp;&nbsp; Revolutionizing <br></br> Remote Health Care{" "}
              <br></br>
            </h1>

            <h2>
              {" "}
              &nbsp;&nbsp; Quality health care comes only from qualified
              doctors...
            </h2>

            <h3> &nbsp;&nbsp; JOIN OUR TOP QUALITY DOCTOR TEAM</h3>

            <div className="applyDocBtn">
              <Row>
                <Col md={6}>
                  <Button variant="warning" size="lg" className="btn1">
                    Apply As Doctor
                  </Button>
                </Col>

                <Col md={6}>
                  <Button variant="warning" size="lg" className="btn2">
                    View our Doctors
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );


}

export default UserApplyAsDoctor