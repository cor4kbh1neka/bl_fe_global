import React, { useEffect, useState } from 'react';

export const Mtonce = () => {
  const [dataMaintenance, setDataMaintenance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/content/sts", {
          method: "GET",
          credentials: "omit",
          headers: {
            'Content-Type': 'application/json',
            utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
            'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDataMaintenance(data.data.stsmtncnc);
          console.log(data.data.stsmtncnc);

          localStorage.setItem('timeApps', new Date().getTime());

          if (data.data.stsmtncnc !== "1") {
            handleLogout();
          }
        } else {
          console.error("Failed to fetch data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    const checkInterval = () => {
      const lastFetchTime = localStorage.getItem('timeApps');
      const currentTime = new Date().getTime();
      if (!lastFetchTime || (currentTime - lastFetchTime > 10 * 60 * 1000)) {
        fetchData();
      }
    };

    const initialCheck = () => {
      const lastFetchTime = localStorage.getItem('timeApps');
      const currentTime = new Date().getTime();
      if (!lastFetchTime || (currentTime - lastFetchTime > 10 * 60 * 1000)) {
        fetchData();
      }
    };

    initialCheck();
    const interval = setInterval(checkInterval, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("acme");
    localStorage.removeItem("dataVerified");
    localStorage.removeItem("broker");
    localStorage.removeItem("brokerwd");
    localStorage.removeItem("iseco");
    localStorage.removeItem("lastFetchTimestamp");
    localStorage.removeItem("exSure");
    localStorage.removeItem("timeApps");
    window.location.href = "/maintenance";
  };

  return null;
};
