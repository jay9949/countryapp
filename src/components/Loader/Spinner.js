import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img
        className="my-3"
        style={{ width: "100px", fontSize: "15px" }}
        src={loading}
        alt="loading"
      />
    </div>
  );
};

export default Spinner;
