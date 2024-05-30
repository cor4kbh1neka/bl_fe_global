import { Icon } from "@iconify/react";
import React from "react";

export const Runningtext = () => {
  const pProvideString = localStorage.getItem('halfPic');
  const pProvide = pProvideString ? JSON.parse(pProvideString) : null;

  return (
    <div className="secruntext">
      <Icon icon="heroicons-outline:speakerphone" />
      {pProvide && pProvide.rnntxt && (
        <marquee behavior="scroll" direction="left" className="runningtext">
          {pProvide.rnntxt}
        </marquee>
      )}
      <div className="shadowright"></div>
    </div>
  );
};

export default Runningtext;
