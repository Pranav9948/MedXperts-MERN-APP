import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import './Login.css'
import {showLoading,HideLoading} from '../../redux/actions/generalActions'
import axios from "axios";
import doctorLogin from "../../Images/doctorLogin.jpg";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

import { useSelector,useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loaders/Loading";
import {loginAction} from '../../redux/actions/loginAction'

function Login() {

const loading=useSelector((state)=>state.general.loading)

console.log("6777",loading)



const navigate=useNavigate()
const dispatch=useDispatch()


  const onFinish = (values) => {
    console.log("Success:", values);

 
    loginApiRequest(values)


  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const  loginApiRequest= async(values)=>{

    try{


      dispatch(showLoading())
    


    const {data}=await axios.post('/api/users/login',values)
     dispatch(loginAction(data.User));


    dispatch(HideLoading())

    if(data.success){

        await toast.success(data.message)
           toast("redirecting to home page...");

         localStorage.setItem("doctorAppToken",data.token)

         navigate('/')

    }

    else{

         toast.error(data.message);   
         dispatch(HideLoading());
    }

    }


    catch(err){

          toast.error(err)
          dispatch(HideLoading());
    }

  }



 

  return (
    <MDBContainer className="my-5">
      <MDBCard className="loginCards">
        <MDBRow className="g-0">
          <MDBCol md="5" sm="12">
            <MDBCardImage
              src={doctorLogin}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6" sm="12">
            <MDBCardBody className="d-flex flex-column  ms-5 mt-4">
              <div className="d-flex flex-row mt-2 ms-5">
                <MDBIcon
                  fas
                  icon="fa-solid fa-user-doctor fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <span className="h1 fw-bold mb-0 appText">MedXpert</span>
              </div>
              <h5
                className="fw-normal my-4 pb-3 mt-5 textz"
                style={{ letterSpacing: "1px" }}
              >
                Sign into your account
              </h5>
             
              <div>{loading && <Loader />}</div>
               
              <div className="loginForm">
                <Form
                  className="fs-1 formtext"
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label=" Email Address"
                    name="email"
                    className="formItems fs-1 inputK"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    className="formItems"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  ></Form.Item>

                  <Form.Item
                    className="btnz"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      type="primary"
                      className="lgnbtnz me-4"
                      htmlType="submit"
                      size="large"
                    >
                      Submit
                    </Button>{" "}
                    <br></br>
                    <h6 style={{ marginLeft: "-130px" }}>
                      {" "}
                      Create a new account ?{" "}
                      <Link to="/register"> Register</Link>
                    </h6>
                  </Form.Item>
                </Form>
              </div>
            </MDBCardBody>
          </MDBCol>
          <MDBCol md="1"></MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
