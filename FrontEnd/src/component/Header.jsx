import React from "react";
import Logo from "../fragment/Logo";
import Homenavbar from "../fragment/Homenavbar";

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Homenavbar />
    </div>
  );
};

export default Header;
