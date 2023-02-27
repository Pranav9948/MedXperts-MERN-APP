import React, { useEffect, useState } from "react";
import UsersLayout from "../usersLayout/UsersLayout";
import { useDispatch } from "react-redux";
import { ViewAllApprovedDoctors } from "../../redux/actions/UserAction";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";


function ViewAllDoctors() {
  const [viewAllDoctors, setViewAllDoctors] = useState([]);

  const Doctors = useSelector(
    (state) => state?.ViewAllApprovedDoctors?.Doctors
  );

  const getApprovedDoctors = Doctors?.getApprovedDoctors;



  const dispatch = useDispatch();

  useEffect(() => {
    getAllApprovedDoctor();
  }, []);

  const getAllApprovedDoctor = () => {
    dispatch(ViewAllApprovedDoctors());
  };

  console.log("22444", getApprovedDoctors);

  return(
  
  
  <UsersLayout>
    <Container>
      <Row>
        {

getApprovedDoctors?.map((doctor)=>{
    return (
      <Col md={4}>
        <Card className="m-5">
          <Card.Img
            variant="top"
            src={doctor.ProfileImage}
            style={{ height: "250px" }}
          />
          <Card.Body className="text-center">
            <ListGroup>
              <ListGroup.Item>
                <Card.Title>
                  {doctor.firstName} {doctor.lastName}
                </Card.Title>
              </ListGroup.Item>{" "}
              <ListGroup.Item>{doctor.specialization}</ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Fee : Rs: {doctor.feePerConsultation}
              </ListGroup.Item>
              <ListGroup.Item> Experience : {doctor.experience}</ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Timings: {doctor.timings[0]} {" : "}
                {doctor.timings[1]}
              </ListGroup.Item>
              <Link to={`/bookDoctorAppointment/${doctor._id}`}>
                <Button variant="primary">Book Now</Button>
              </Link>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    );
})



   
     
      
   

        
     
}
      </Row>
    </Container>

  
  </UsersLayout>

  )
}

export default ViewAllDoctors;
