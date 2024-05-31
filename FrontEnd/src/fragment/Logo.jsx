import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProvide } from "../services/api.service";

const Logo = () => {
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
    <div className="contlogo">
      <div className="halfball"></div>
      <Link to="/">
        {dataProvide && (
          <img
            className="logo"
            src={`/assets/img/${dataProvide.logrl}`}
            alt={`logo ${dataProvide.nmwebsite}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/img/logo-dummy.webp";
            }}
          />
        )}
      </Link>
      <img
        className="flag"
        src="/assets/img/flag/indonesia.webp"
        alt="indonesia flag"
      />
    </div>
  );
};

export default Logo;
