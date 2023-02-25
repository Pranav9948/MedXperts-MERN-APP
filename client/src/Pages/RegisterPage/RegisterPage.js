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
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios";

import doctorReg from "../../Images/doctorRegister.jpg";

import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

function RegisterPage() {


const navigate=useNavigate()

  const onFinish = (values) => {
    console.log("Success:", values);

    const registerApiRequest = async () => {
      try {
        const { data } = await axios.post("/api/users/register", values);

        if (data.success) {
          toast.success(data.message);
          navigate('/login')
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("something went wrong....");
      }
    };

    registerApiRequest();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard className="loginCard">
        <MDBRow className="g-0">
          <MDBCol md="5">
            <MDBCardImage
              src={doctorReg}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6 ">
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
                    label="Username"
                    name="username"
                    className="formItems"
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
                    label=" Email"
                    name="email"
                    className="formItems"
                    rules={[
                      {
                        required: true,
                        message: "Please enter email @ is required",
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
                      className="lgnbtn me-4"
                      htmlType="submit"
                      size="large"
                    >
                      Submit
                    </Button>{" "}
                    <br></br>
                    Already have a account ?{" "}
                    <Link to="/login"> Login here</Link>
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

export default RegisterPage;
