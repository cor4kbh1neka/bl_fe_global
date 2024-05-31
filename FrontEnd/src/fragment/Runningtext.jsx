import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

export const Runningtext = () => {
  const [dataProvide, setDataProvide] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTime = new Date().getTime();
        const storedTimestamp = localStorage.getItem('timestamp_timeHalf');
        const storedData = localStorage.getItem('halfPic');

        if (storedTimestamp && storedData && currentTime - storedTimestamp < 3600000) {
          setDataProvide(JSON.parse(storedData));
        } else {
          const response = await getProvide();
          setDataProvide(response.data);
          localStorage.setItem('halfPic', JSON.stringify(response.data));
          localStorage.setItem('timestamp_timeHalf', currentTime.toString());
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } 
    };

    fetchData();
  }, []);

  return (
    <div className="secruntext">
      <Icon icon="heroicons-outline:speakerphone" />
      {dataProvide && dataProvide.rnntxt && (
        <marquee behavior="scroll" direction="left" className="runningtext">
          {dataProvide.rnntxt}
        </marquee>
      )}
      <div className="shadowright"></div>
    </div>
  );
};

export default Runningtext;
