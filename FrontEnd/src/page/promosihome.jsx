import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import Footer from "../component/Footer";
import { Promosikonten } from "../component/Promosikonten";
import { Logindaftar } from "../fragment/Logindaftar";
import Scroll from "../fragment/Scroll";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import { getProvide } from "../services/api.service";

const PromosihomePage = () => {
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
    <div className="container">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | Promosi terupdate dan Menarik`}
          customDescription={`Temukan promosi terbaru dan menarik di situs ${dataProvide.nmwebsite}. Dapatkan penawaran terbaik dan nikmati pengalaman taruhan terbaik!`}
          customKeywords="promosi terbaru, promosi menarik, taruhan sepak bola, taruhan olahraga, penawaran terbaik, pengalaman taruhan, situs taruhan, promosi taruhan, taruhan online, taruhan sport"
        />
      ) : (
        <MetaTags
          customTitle="Promosi terupdate dan Menarik"
          customDescription="Temukan promosi terbaru dan menarik di situs taruhan sepak bola dan olahraga lainnya. Dapatkan penawaran terbaik dan nikmati pengalaman taruhan terbaik!"
          customKeywords="promosi terbaru, promosi menarik, taruhan sepak bola, taruhan olahraga, penawaran terbaik, pengalaman taruhan, situs taruhan, promosi taruhan, taruhan online, taruhan sport"
        />
      )}
      <Logo />
      <div className="secpromosi" id="secpromosi">
        <div className="titlesec">
          <h1>PROMOSI</h1>
          <p>Promosi terupdate {dataProvide.nmwebsite}</p>
        </div>
        <Logindaftar />
        <Promosikonten />
      </div>
      <Scroll targetElementId="secpromosi" />
      <Footer />
      <Livechat />
    </div>
  );
};

export default PromosihomePage;