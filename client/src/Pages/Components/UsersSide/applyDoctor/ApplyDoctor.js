
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
import moment from "moment";


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
      "/api/users//apply-for-DoctorAccount",
      {
        ...values,
        userId: userInfo._id,
        timings: [
          moment(values.timings[0]).format("HH:mm"),
          moment(values.timings[1]).format("HH:mm"),
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
                layout="vertical"
                onFinish={onFinish}
                
                
              >
                <h1 className="card-title mt-3">Personal Information</h1>
                <Row gutter={20}>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="First Name"
                      name="firstName"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Last Name"
                      name="lastName"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Phone Number"
                      name="phoneNumber"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Website"
                      name="website"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Website" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Address"
                      name="address"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Address" />
                    </Form.Item>
                  </Col>
                </Row>
                <hr />
                <h1 className="card-title mt-3">Professional Information</h1>
                <Row gutter={20}>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Specialization"
                      name="specialization"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Specialization" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Experience"
                      name="experience"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Experience" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Fee Per Cunsultation"
                      name="feePerCunsultation"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Fee Per Cunsultation" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item
                      required
                      label="Timings"
                      name="timings"
                      rules={[{ required: true }]}
                    >
                      <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button className="primary-button" htmlType="submit">
                    SUBMIT
                  </Button>
                </div>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyDoctor






