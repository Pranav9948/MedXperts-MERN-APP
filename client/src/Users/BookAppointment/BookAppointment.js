import React, { useEffect, useState } from "react";
import UsersLayout from "../usersLayout/UsersLayout";
import "./bookAppointment.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import moment from "moment";
import Button from "react-bootstrap/Button";

import { toast } from "react-hot-toast";

function BookAppointment() {
  const { id } = useParams();

  const [doctorDetailz, setDoctorDetailz] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [selectedTimings, setSelectedTimings] = useState();

  useEffect(() => {
    getDoctorDetailsApiRequest(id);
  }, []);

  const getDoctorDetailsApiRequest = async (id) => {
    const { data } = await axios.get(`/api/users/getDoctorDetails/${id}`);

    setDoctorDetailz(data.getDoctorDetailz);
    console.log("2222", doctorDetailz);
  };

  const checkAvailiabiltyApi = async () => {
    const { data } = await axios.post(
      `/api/users/check-booking-aviliabilty/${id}`,
      { date, selectedTimings }
    );

    console.log("444", data);

    if (data.success) {
      toast.success(data.message);
      setIsAvailable(true)
    } else {
      toast.error(data.message);
    }
  };


const booknow=async()=>{

 const { data } = await axios.post(
   `/api/users/bookAppointmentByUser/${id}`,
   { date, selectedTimings }
  
 );

    console.log("444", data);

    if (data.success) {
      toast.success(data.message);
      setIsAvailable(true)
    } else {
      toast.error(data.message);
    }

     setIsAvailable(false);
}





  return (
    <UsersLayout>
      <Container>
        <Row>
          <Col md={6} className="text-center">
            <h1 className="mt-4 mb-4">
              {doctorDetailz[0]?.firstName} {doctorDetailz[0]?.lastName}
            </h1>
            <hr></hr>
            <h3>Timings</h3>
            <hr></hr>
            <h3>
              {doctorDetailz[0]?.timings[0]} -:- {doctorDetailz[0]?.timings[1]}
            </h3>
            <h4 className="mb-5 mt-4">Select your Slot</h4>
            <DatePicker
              format="DD-MM-YYYY"
              className="me-4"
              onChange={(value) => setDate(moment(value).format("DD_MM_YYYY"))}
            />{" "}
            <TimePicker.RangePicker
              format="HH:mm"
              onChange={(values) => {
                setSelectedTimings([
                  moment(values[0]).format("HH:mm"),
                  moment(values[1]).format("HH:mm"),
                ]);
              }}
            />
            <hr></hr>
            <Button variant="primary" onClick={() => checkAvailiabiltyApi()}>
              Check Availabilty
            </Button>{" "}

{

     isAvailable && <Button variant="primary" className="mt-3 mb-3" onClick={()=>booknow}>
              Book Now
            </Button>
}



          </Col>

          <Col md={3}>
            <ListGroup>
              <h2 className="mt-3 mb-5"> Doctor Basic Info</h2>
              <ListGroup.Item>
                {" "}
                Specialization : {doctorDetailz[0]?.specialization}
              </ListGroup.Item>
              <ListGroup.Item>
                Experience : {doctorDetailz[0]?.experience}
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                feePerConsultation : {doctorDetailz[0]?.feePerConsultation}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </UsersLayout>
  );
}

export default BookAppointment;
