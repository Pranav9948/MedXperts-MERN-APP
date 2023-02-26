import React, { useEffect, useState } from 'react'
import Layout from "../../Layout/Layout";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
 import toast from "react-hot-toast";
        

function DetailedDoctorverify() {

   let  doctorId  = useParams();
   const [doctorDetails,setDoctorDetails]=useState('')
   const navigate=useNavigate()

  const  DoctorDetailsApiRequest= async(req,res)=>{

    try{

      console.log("9948",doctorId.id);
      const { data } = await axios.get(
        `/api/admin/detailedDoctorsVerifyPage/${doctorId.id}`
      );

      console.log("345",data)

      const {allDoctorRequest}=data

      console.log("678",allDoctorRequest)
      setDoctorDetails(allDoctorRequest)

    }

    catch(err){

          console.log(err)
    }


  }

useEffect(()=>{

   DoctorDetailsApiRequest()

},[])


const approveDoctorApiRequest=async(docId)=>{

  try{

  console.log(2233,docId)

  const {data}= await axios.get(`/api/admin/approveDoctorAccount/${docId}`)

  console.log("xc",data.message.message)
   

  if(data.message=== "Approve As Doctor"){

    console.log(data.message)
      
          toast.success(data.message);
          navigate("/verifyDoctor");
        } else {
          toast.error(data.message);
        }


      }

  

        catch (err) {
        toast.error("something went wrong....");
      }
      
    } 


    const RejectApplyAsDocRequestApi= async(docId)=>{

      try{

  console.log(2233,docId)

  const {data}= await axios.get(`/api/admin/RejectDoctorAccount/${docId}`)

  console.log("xc",data.message)
   

  if(data.message=== "Deleted Doctor"){

    console.log(data.message)
      
          toast.success(data.message);
          navigate("/verifyDoctor");
        } else {
          toast.error(data.message);
        }


      }

  

        catch (err) {
        toast.error("something went wrong....");
      }
      
    } 

    




  return (
    <Layout>
      <div className="doctorDetailedDetailsPage">
        <h1 className="text-center pt-3 mb-5">Detailed Doctor Page</h1>

        <div className="doctorDetails">
          <Container>
            <Row>
              <Col md={4}>
                <Image
                  src={doctorDetails[0]?.ProfileImage}
                  className="doctorDimg"
                ></Image>
              </Col>

              <Col md={1}></Col>

              <Col md={6}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>View Doctor Details</Accordion.Header>
                    <Accordion.Body>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Field</th>
                            <th>value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            <tr>
                              <td>DoctorCertificateId</td>
                              <td>{doctorDetails[0]?.DoctorCertificateId}</td>
                            </tr>

                            <tr>
                              <td>Name</td>
                              <td>
                                {doctorDetails[0]?.firstName} {""}{" "}
                                {doctorDetails[0]?.lastName}
                              </td>
                            </tr>

                            <tr>
                              <td>PhoneNumber</td>
                              <td>{doctorDetails[0]?.phoneNumber}</td>
                            </tr>

                            <tr>
                              <td>Specialization</td>
                              <td>{doctorDetails[0]?.specialization}</td>
                            </tr>

                            <tr>
                              <td>Experience</td>
                              <td>{doctorDetails[0]?.experience}</td>
                            </tr>

                            <tr>
                              <td>FeePerConsultation</td>
                              <td>{doctorDetails[0]?.feePerConsultation}</td>
                            </tr>

                            <tr>
                              <td>Timings</td>
                              <td>{doctorDetails[0]?.timings}</td>
                            </tr>

                            <tr>
                              <td>status</td>
                              <td>{doctorDetails[0]?.status}</td>
                            </tr>

                            <tr>
                              <td>Approve Request</td>
                              <td>
                                {
                                  <Button
                                    variant="success"
                                    onClick={() =>
                                      approveDoctorApiRequest(
                                        doctorDetails[0]._id
                                      )
                                    }
                                  >
                                    Approve
                                  </Button>
                                }
                              </td>
                            </tr>

                            <tr>
                              <td>Delete Request</td>
                              <td>
                                {
                                  <Button
                                    variant="danger"
                                    onClick={() =>
                                      RejectApplyAsDocRequestApi(
                                        doctorDetails[0]._id
                                      )
                                    }
                                  >
                                    Reject
                                  </Button>
                                }
                              </td>
                            </tr>
                          </>
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );


}

export default DetailedDoctorverify