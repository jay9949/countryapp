import { CiFlag1 } from "react-icons/ci";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="container">
          <Link
            to="/"
            style={{ cursor: "pointer", fontWeight: "bold", fontSize: "25px" }}
          >
            Country
            <CiFlag1 style={{ marginLeft: "10px" }} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
