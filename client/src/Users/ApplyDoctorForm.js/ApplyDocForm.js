import React from 'react'
import "./applyDoc.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form, Input,  } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { TimePicker } from "antd";
import moment from "moment";
import axios from 'axios';
 import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { HideLoading, showLoading } from '../../redux/actions/generalActions';
import toast from "react-hot-toast";




const { TextArea } = Input;


function ApplyDocForm() {

   const loading = useSelector((state) => state.general.loading);

 console.log("6777", loading);

 const navigate = useNavigate();
 const dispatch = useDispatch();


 
  const [form] = Form.useForm();





 const applyDocApiRequest = async(values) => {
   try {
     dispatch(showLoading());

     const token=localStorage.getItem("doctorAppToken")

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      

    const { data } = await axios.post("/api/users/apply-for-DoctorAccount", {
      values,config
    });
     

     dispatch(HideLoading());

     if (data.success) {
       await toast.success(data.message);
       toast("redirecting to home page...");

       localStorage.setItem("doctorAppToken", data.token);

       navigate("/");
     } else {
       toast.error(data.message);
       dispatch(HideLoading());
     }
   } catch (err) {
    console.log("xx",err)
     toast.error(err);
     dispatch(HideLoading());
   }
 };






const onFinish = (values) => {
  console.log("man123");
  console.log("Success:", values);

    applyDocApiRequest(values)

  
};


const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  listType: "picture",
  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = "red";
          ctx.textBaseline = "middle";
          ctx.font = "33px Arial";
          ctx.fillText("Ant Design", 20, 20);
          canvas.toBlob((result) => resolve(result));
        };
      };
    });
  },
};


  return (
    <div>
      <Container>
        <div className="applyDocHead">
          <h4 className="pt-5 text-center fw-bold  fs-1">
            Apply For a Doctor Account
          </h4>

          <h5 className="pt-5 ps-5 fw-bold fs-2">Personal Informations</h5>

          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            layout="vertical"

          
         
          
          >
            <Row className="mt-4">
              <Col md={6} className="formvalues">
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

              <Col md={6} className="formvalues">
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

              <Col md={6} className="formvalues">
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

              <Col md={6} className="formvalues">
                <Form.Item
                  name="address"
                  label="address"
                  style={{
                    width: "300px",
                    marginRight: "100px",
                  }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6} className="formvalues">
                <Form.Item
                  name="phoneNumber"
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

              <Col md={6} className="formvalues">
                <Form.Item
                  name="ProfileImage"
                  label="ProfileImage"
                 
                >
                  <Upload {...props}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        width: "300px",
                        marginRight: "100px",
                        height: "50px",
                      }}
                    >
                      Upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Row className="mt-2">
              <h3 className="fw-bold fs-2 ms-5 mt-5 mb-5">
                Professional Informations
              </h3>

              <Col md={6} className="formvalues">
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

              <Col md={6} className="formvalues">
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
              <Col md={6} className="formvalues">
                <Form.Item
                  name="specialization"
                  label="specialization"
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

              <Col md={6} className="formvalues">
                <Form.Item
                  name="DoctorCertificateId"
                  label="Doctor Certificate Id"
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

              <Col md={6} style={{ marginLeft: "120px" }}>
                <Form.Item
                  name="timings"
                  label="time"
                  required
                  rules={[{ required: true }]}
                >
                  <TimePicker.RangePicker />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit" className="docFormBtn">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default ApplyDocForm



