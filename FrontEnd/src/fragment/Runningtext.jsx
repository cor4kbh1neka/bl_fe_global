import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { getProvide } from "../services/api.service";

export const Runningtext = () => {
  const [dataProvide, setDataProvide] = useState({ rnntxt: "Loading..." });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          if (response.data && response.data.rnntxt) {
            setDataProvide(response.data);
            localStorage.setItem('halfPic', JSON.stringify(response.data));
            localStorage.setItem('timestamp_timeHalf', currentTime.toString());
          } else {
            throw new Error("Invalid data structure");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="secruntext">
      <Icon icon="heroicons-outline:speakerphone" />
      {error ? (
        <div>{error}</div>
      ) : (
        <marquee behavior="scroll" direction="left" className="runningtext">
          {dataProvide.rnntxt}
        </marquee>
      )}
      <div className="shadowright"></div>
    </div>
  );
};

export default Runningtext;
