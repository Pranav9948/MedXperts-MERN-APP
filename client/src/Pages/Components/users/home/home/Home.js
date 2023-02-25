import React from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import doctor1 from "../../../../../Images/doctorHead1.png";
import plusHead1 from "../../../../../Images/plusHead1.png";
import './home.css'
import { faSquare } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Home() {


  return (
    <>
      <header>
        <Container>
          <Row>
            <Col md={8} lg={8}>
              <h5>We Provide All Health Care Solutions</h5>
              <h2>Instant Appointment With Doctor Guaranteed</h2>
              <button>Book Appointment</button>{" "}
              <img src={plusHead1} className='plus'/>
              
            </Col>

            <Col md={4} lg={4}>
              <div className="header-box">
                <img src={doctor1} />
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
}

export default Home