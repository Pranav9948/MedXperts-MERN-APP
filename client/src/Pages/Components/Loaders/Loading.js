import React from "react";
import "./loading.css";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div>
      <Spinner animation="border" variant="primary" className="spinz" />
    </div>
  );
}

export default Loader;
