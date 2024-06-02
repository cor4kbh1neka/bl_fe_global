import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import { getProvide } from "../services/api.service";

const MaintenancePage = () => {
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
    <div className="container maintenance">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | Maintenance ${dataProvide.nmwebsite}`}
          customDescription={`Situs ${dataProvide.nmwebsite} melakukan pemeliharaan rutin untuk memastikan situs taruhan sepak bola dan olahraga online Anda tetap aman dan bebas gangguan.`}
          customKeywords={`maintenance situs taruhan, betting sepak bola, taruhan olahraga online, Maintenance ${dataProvide.nmwebsite}, pemeliharaan situs, judi bola, situs aman, maintenance online sports betting`}
        />
      ) : (
        <MetaTags
          customTitle="Maintenance"
          customDescription="Situs kami melakukan pemeliharaan rutin untuk memastikan situs taruhan sepak bola dan olahraga online Anda tetap aman dan bebas gangguan."
          customKeywords="maintenance situs taruhan, betting sepak bola, taruhan olahraga online, Maintenance, pemeliharaan situs, judi bola, situs aman, maintenance online sports betting"
        />
      )}
      <Logo />
      <div className="secperaturan">
        <div className="grouperaturan">
          <div className="titlesec">
            <h1>MAINTENANCE</h1>
            <p>Pemeliharaan Rutin {dataProvide.nmwebsite}</p>
          </div>
          <div className="kontenmt">
              <p>Maintenance di {dataProvide.nmwebsite} sangat penting untuk memastikan situs taruhan sepak bola dan olahraga online kami tetap aman, cepat, dan dapat diandalkan. Kami melakukan pemeliharaan rutin untuk memperbarui sistem keamanan, mencegah potensi ancaman, dan menjaga data pengguna tetap aman. Selain itu, maintenance membantu meningkatkan kinerja situs, memastikan bahwa Anda dapat menikmati pengalaman bermain tanpa hambatan. Dengan pemeliharaan yang teratur, kami juga dapat memperbaiki bug dan mengoptimalkan fitur-fitur baru untuk memberikan pengalaman terbaik kepada pengguna kami. Tim teknis kami berdedikasi untuk memastikan bahwa setiap kali Anda mengakses {dataProvide.nmwebsite}, Anda mendapatkan layanan yang maksimal dan bebas gangguan.</p>
          </div>
        </div>
        
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default MaintenancePage;
