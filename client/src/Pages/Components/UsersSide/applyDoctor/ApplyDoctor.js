
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../Images/MedXpertsLogo.png";
import { useLocation } from "react-router-dom";
import './applyDoctor.css'
import { Button, Col, Form, Input, Row} from "antd";
import Container from "react-bootstrap/Container";
import { TimePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, HideLoading } from "../../../../redux/actions/generalActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function ApplyDoctor() {

  const username = useSelector((state) => state.userInfo.userInfo?.username);
  const isAdmin = useSelector((state) => state.userInfo.userInfo?.isAdmin);
const userInfo= useSelector((state) => state.userInfo.userInfo)

 

  let useritemz = [
    {
      menu: " Home",
      icon: "fa-solid fa-house",
      path: "/",
    },

    {
      menu: "Appointments",
      icon: "fa-solid fa-calendar-check",
      path: "/appointments",
    },

    {
      menu: "Apply Doctor",
      icon: "fa-solid fa-user-doctor",
      path: "/apply-doctor",
    },

    {
      menu: "Logout",
      icon: "fa-solid fa-right-from-bracket",
      path: "/logout",
    },
  ];

  let adminitemz = [
    {
      menu: " Home",
      icon: "fa-solid fa-house",
      path: "/",
    },

    {
      menu: "All users",
      icon: "fa-solid fa-user",
      path: "/allUsers",
    },

    {
      menu: "All Doctors",
      icon: "fa-solid fa-user-doctor",
      path: "/allDoctors",
    },

    {
      menu: "Logout",
      icon: "fa-solid fa-right-from-bracket",
      path: "/logout",
    },
  ];

  const location = useLocation();

  const menutoberendered = isAdmin ? adminitemz : useritemz;
  
 
  const [form] = Form.useForm();

   


//////

const navigate = useNavigate();
const dispatch = useDispatch();

const onFinish = (values) => { 

    console.log("man123")
  console.log("Success:", values);

     applyForDoctorAccountAPIRequest(values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const applyForDoctorAccountAPIRequest = async (values) => {
  try {

    console.log("1234")
    dispatch(showLoading());

    const { data } = await axios.post(
      "/api/users/applyfordoctoraccount",
      {
        ...values,
        userId:userInfo._id,
      },

      {
        headers:{

            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
    );
   

    dispatch(HideLoading());

    if (data.success) {
      await toast.success(data.message);
      toast("redirecting to home page...");


      navigate("/");
    } else {
      toast.error(data.message);
      dispatch(HideLoading());
    }
  } catch (err) {
    toast.error(err);
    dispatch(HideLoading());
  }
};


/////










  return (
    <div className="full">
      <div className="layouts d-flex">
        <div className="sidebar">
          <div className="sidebarHeading">
            <img src={logo}></img>
          </div>

          <div className={`sideBarOption  mt-3`}>
            {menutoberendered.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link to={item.path}>
                  <div className={`sidebarIcon ${isActive && "highlight"}`}>
                    <i class={item.icon}></i> <span>{item.menu}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="content">
          <div className="header d-flex justify-content-between">
            <div className="header_Title"></div>

            <div className="header_Icon">
              <i class="fa-solid fa-bell"></i>
            </div>

            <div className="userName">
              <h4>{username}</h4>
            </div>
          </div>

          <div className="mainBody">
            <Container>
              <h4 className="pt-3 ps-3">Apply Doctor Account</h4>

              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                layout="vertical"
              >
                <Row className="mt-4">
                  <Col md={8}>
                    <Form.Item
                      name="firstName"
                      label="firstName"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                          height: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}>
                    <Form.Item
                      name="lastName"
                      label="lastName"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}>
                    <Form.Item
                      name="email"
                      label="email"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={8}>
                    <Form.Item
                      name=" phoneNumber"
                      label="phoneNumber"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}>
                    <Form.Item
                      name="image"
                      label="image"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}></Col>
                </Row>

                <Row className="mt-2">
                  <Col md={8}>
                    <Form.Item
                      name="address"
                      label="address"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}>
                    <Form.Item
                      name="feePerConsultation"
                      label="feePerConsultation"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}>
                    <Form.Item
                      name="experience"
                      label="experience"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={8}>
                    <Form.Item
                      name="department"
                      label="department"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}>
                    <Form.Item
                      name="profession"
                      label="profession"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "300px",
                          marginRight: "100px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={8}>
                    <Form.Item
                  
                      name="timings"
                      label="time"
                      
                    >
                      <TimePicker.RangePicker />; 
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyDoctor






