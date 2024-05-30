import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { handleClick } from "../services/api.service";

const Homenavbar = () => {
  return (
    <div className="homenavbar">
      <Link to="/promosihome" className="listhomenavbar">
        <span className="hot">HOT</span>
        <span>promosi</span>
      </Link>
      <Link to="/klasemenhome" className="listhomenavbar">
        <Icon icon="circum:trophy" />
        <span>klasemen</span>
      </Link>
      <Link to="/livescorehome" className="listhomenavbar">
        <Icon icon="arcticons:scoreboard" />
        <span>live score</span>
      </Link>
      <div className="listhomenavbar" onClick={() => handleClick(12, "Keluhan", "livechat")}>
        <Icon icon="fluent-mdl2:set-action" />
        <span>keluhan</span>
      </div>
    </div>
  );
};

export default Homenavbar;
