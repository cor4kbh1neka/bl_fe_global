import React, { useEffect, useState } from 'react'
import { getProvide } from '../services/api.service';

export const Logofirts = () => {
    const [dataProvide, setDataProvide] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <>
        <img
            src={`/assets/img/${dataProvide.logrl}`}
            alt={`logo ${dataProvide.nmwebsite || 'our website'}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/img/logo-dummy.webp";
            }}
        />
    </>
  )
}
