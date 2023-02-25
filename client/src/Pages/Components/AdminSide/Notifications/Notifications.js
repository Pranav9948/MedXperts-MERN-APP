import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Button from "react-bootstrap/Button";
import { getAdminInfo } from "../../../../redux/actions/generalActions";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../../../redux/actions/loginAction";
import axios from "axios";

function Notifications() {
  const userInfo = useSelector((state) => state.userInfo);

  const seenNotifications = userInfo.userInfo?.seenNotifications;

  const dispatch = useDispatch();

  const [unseenNotifications, setunseenNotification] = useState([]);
  const [markasseen, setMarkasseen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      const unseenNotification = userInfo.userInfo?.unseenNotifications;
      setunseenNotification(unseenNotification);
      console.log("okk", unseenNotification);
      console.log("234", userInfo);
    }
  }, [userInfo, unseenNotifications, markasseen]);

  const markAllasSeenApi = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("doctorAppToken"),
      },
    };

    const { data } = await axios.get("/api/users/markallasread", config);

    if (data.success) {
      setMarkasseen(!markasseen);

      const { data } = await axios.get("/api/users/getAdminDetails");

      console.log("castro", data);

      dispatch(loginAction(data));
    }

    console.log("123", data);
  };

  const deleteAllNotificationApi = async() => {


const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("doctorAppToken"),
      },
    };

    const { data } = await axios.get(
      "/api/users/deleteAllReadNotifications",
      config
    );

    if (data.success) {
     

      const { data } = await axios.get("/api/users/getAdminDetails");

      console.log("vk", data);

      dispatch(loginAction(data));
    }

    console.log("123", data);


  };

  const markAllAsSeen = () => {
    markAllasSeenApi();
  };

  const deleteAllNotification = () => {
    deleteAllNotificationApi();
  };

  return (
    <div>
      {console.log("mann", unseenNotifications)}
      <Layout>
        <h1 className="ps-5 pt-4 pb-4">Notifications</h1>

        <Tabs className="m-5">
          <Tabs.TabPane tab="unseen" key={0}>
            <div className="">
              <div className="contents d-flex justify-content-end  ">
                <Button
                  variant="warning"
                  size="lg"
                  className="me-4 mb-4 fs-4 fw-bold"
                  style={{ height: "70px" }}
                  onClick={() => markAllAsSeen()}
                >
                  Mark all as seen
                </Button>{" "}
              </div>

              {typeof unseenNotifications !== "undefined" &&
              unseenNotifications.length > 0
                ? unseenNotifications.map((notification, id) => {
                    return (
                      <div
                        style={{
                          width: "100%",
                          height: "70px",
                          marginBottom: "40px",
                        }}
                        className="card p-3"
                        onClick={() => notification.onClickPath}
                      >
                        <div className="card-text">{notification.message} </div>
                      </div>
                    );
                  })
                : " "}
            </div>
          </Tabs.TabPane>
          ;
          <Tabs.TabPane tab="seen" key={1}>
            <div>
              <div className="contents d-flex justify-content-end  ">
                <Button
                  variant="warning"
                  size="lg"
                  className="me-4 mb-4 fs-4 fw-bold"
                  style={{ height: "70px" }}
                  onClick={() => deleteAllNotification()}
                >
                  Delete All
                </Button>{" "}
              </div>

              {typeof seenNotifications !== "undefined" &&
              seenNotifications.length > 0
                ? seenNotifications.map((notification, id) => {
                    return (
                      <div
                        style={{
                          width: "100%",
                          height: "70px",
                          marginBottom: "40px",
                        }}
                        className="card p-3"
                        onClick={() => notification.onClickPath}
                      >
                        <div className="card-text">{notification.message} </div>
                      </div>
                    );
                  })
                : " "}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Layout>
    </div>
  );
}

export default Notifications;
