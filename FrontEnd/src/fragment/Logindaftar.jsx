import React from "react";
import { Link } from "react-router-dom";

export const Logindaftar = () => {
  return (
    <div className="logindaftar">
      <Link to="/login" className="tombol border">
        <span className="textbutton">login</span>
      </Link>
      <Link to="/register" className="tombol full primary">
        <span className="textbutton">daftar</span>
      </Link>
    </div>
  );
};
