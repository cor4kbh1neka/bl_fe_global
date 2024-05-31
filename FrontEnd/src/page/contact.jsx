import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import { Kontakcc } from "../component/kontakcc";

const ContactPage = () => {
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
    <div className="container contactcc">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | Hubungi ${dataProvide.nmwebsite}`}
          customDescription={`Hubungi ${dataProvide.nmwebsite} untuk taruhan sepak bola dan olahraga online terbaik. Dapatkan pengalaman bertaruh yang aman dan menyenangkan.`}
          customKeywords={`hubungi ${dataProvide.nmwebsite}, taruhan sepak bola, taruhan olahraga online, situs betting bola, taruhan bola terpercaya, betting online`}
        />
      ) : (
        <MetaTags
          customTitle="Hubungi Kami"
          customDescription="hubungi Situs kami untuk taruhan sepak bola dan olahraga online terbaik. Dapatkan pengalaman bertaruh yang aman dan menyenangkan."
          customKeywords="taruhan sepak bola, taruhan olahraga online, situs betting bola, taruhan bola terpercaya, betting online"
        />
      )}
      <Logo />
      <div className="secperaturan">
        <div className="grouperaturan">
          <div className="titlesec">
            <h1>HUBUNGI {dataProvide.nmwebsite}</h1>
            <p>Hubungi layanan kontak {dataProvide.nmwebsite}</p>
          </div>
          <main>
            <section className="aboutmess">
                <Kontakcc />
                <p>Hubungi {dataProvide.nmwebsite} untuk mendapatkan layanan pelanggan yang sangat lengkap dan responsif. Kami memahami betapa pentingnya dukungan yang cepat dan efisien dalam pengalaman taruhan Anda. Tim kami siap membantu Anda melalui berbagai saluran komunikasi, termasuk live chat, email, dan telepon. Apapun pertanyaan atau masalah yang Anda hadapi, kami akan memberikan solusi yang tepat dan cepat.</p>
                <p>Selain dukungan pelanggan 24/7, {dataProvide.nmwebsite} juga menyediakan panduan lengkap dan FAQ untuk membantu Anda memahami berbagai fitur dan layanan kami. Kami berkomitmen untuk memberikan pengalaman taruhan yang aman dan nyaman bagi semua pemain. Dengan layanan yang lengkap dan profesional, Anda dapat menikmati taruhan tanpa khawatir. Hubungi {dataProvide.nmwebsite} sekarang dan rasakan sendiri keunggulan layanan kami!</p>
                <p>Kami di {dataProvide.nmwebsite} juga memastikan bahwa setiap interaksi Anda dengan tim dukungan kami bersifat pribadi dan rahasia. Layanan pelanggan kami dilatih secara profesional untuk menangani segala situasi dengan sopan dan efisien. Kami selalu mendengarkan umpan balik dari pengguna untuk terus meningkatkan kualitas layanan kami. Percayakan kebutuhan taruhan Anda kepada {dataProvide.nmwebsite}, dan nikmati layanan terbaik di industri ini.</p>
            </section>
          </main>
        </div>
        
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default ContactPage;
