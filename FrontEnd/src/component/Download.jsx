import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getProvide } from "../services/api.service";

const Download = () => {
  const [dataProvide, setDataProvide] = useState(null);
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
    <div className="secdownload">
      <div className="grousecdownload">
        <div className="imageandroid">
          {Array.from({ length: 4 }).map((_, index) => (
            <img
              key={index}
              src="/assets/img/ancdro.webp"
              alt="android"
              className={`android${index + 1}`}
            />
          ))}
        </div>
        <div className="shadowbottom"></div>
        {dataProvide ? (
          <React.Fragment>
            <img
              src={`/assets/img/${dataProvide.nmwebsite}-aplikasi.webp`}
              alt={`aplikasi ${dataProvide.nmwebsite}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/img/aplikasi.webp";
              }}
              className="downloadimg"
            />
            <div className="groupdownloaddown">
              <span className="titledownload">{dataProvide.nmwebsite} APP</span>
              <span className="downloadsekarang">Download Sekarang</span>
              {dataProvide.pkrl ? (
                <a href={dataProvide.pkrl} className="linkdownload">
                  <Icon icon="flat-color-icons:android-os" />
                  <div className="groutextdownload">
                    <span className="downloadfor">Download For</span>
                    <span className="androidapp">Android App</span>
                  </div>
                </a>
              ) : (
                <span className="error">Download link not available</span>
              )}
            </div>
          </React.Fragment>
        ) : (
          <span>No data available</span>
        )}
      </div>
    </div>
  );
};

export default Download;
