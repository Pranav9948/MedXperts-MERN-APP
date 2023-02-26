import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './verifydoctor.css'
import {adminListDoctors} from '../../../../../redux/actions/adminActions'
import { useDispatch,useSelector } from 'react-redux';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function VerifyDoctor() {

    const dispatch=useDispatch()

    const admin_Doctors_ListShow = useSelector(
      (state) => state?.admin_Doctors_ListShow
    );

    const { loading, Doctors, error } = admin_Doctors_ListShow;

console.log("455", Doctors);

    useEffect(()=>{

    dispatch(adminListDoctors())

    },[])

  return (
    <Layout>
      <Container>
        <div className="doctorRequest">
          <h1 className='text-center m-5'> All Doctor Verification Request</h1>

          <Row>

            {
                Doctors?.allDoctorRequest?.map((doc)=>{

                    return (
                      <Col md={4}>
                        <Card className="DoctorReqCard m-5">
                          <Card.Img variant="top" src={doc.ProfileImage} />
                          <Card.Body>
                            <ListGroup className="ls">
                              <ListGroup.Item>
                                <Card.Title>Dr: {doc.firstName}</Card.Title>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {doc.specialization}
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Link to={`/detailedDoctorsVerifyPage/${doc._id}`}>
                                  <Button variant="warning">
                                    See more details and approve
                                  </Button>
                                </Link>
                              </ListGroup.Item>
                            </ListGroup>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                })
            }
           
          </Row>
        </div>
      </Container>
    </Layout>
  );


}

export default VerifyDoctor