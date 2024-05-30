import React from "react";
import Logo from "../fragment/Logo";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";

const MaintenancePage = () => {
  const pProvideString = localStorage.getItem('halfPic');
  const pProvide = pProvideString ? JSON.parse(pProvideString) : null;

  return (
    <div className="container maintenance">
      {pProvide ? (
        <MetaTags
          customTitle={`${pProvide.nmwebsite} | Maintenance ${pProvide.nmwebsite}`}
          customDescription={`Situs ${pProvide.nmwebsite} melakukan pemeliharaan rutin untuk memastikan situs taruhan sepak bola dan olahraga online Anda tetap aman dan bebas gangguan.`}
          customKeywords={`maintenance situs taruhan, betting sepak bola, taruhan olahraga online, Maintenance ${pProvide.nmwebsite}, pemeliharaan situs, judi bola, situs aman, maintenance online sports betting`}
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
            <p>Pemeliharaan Rutin {pProvide.nmwebsite}</p>
          </div>
          <div className="kontenmt">
              <p>Maintenance di {pProvide.nmwebsite} sangat penting untuk memastikan situs taruhan sepak bola dan olahraga online kami tetap aman, cepat, dan dapat diandalkan. Kami melakukan pemeliharaan rutin untuk memperbarui sistem keamanan, mencegah potensi ancaman, dan menjaga data pengguna tetap aman. Selain itu, maintenance membantu meningkatkan kinerja situs, memastikan bahwa Anda dapat menikmati pengalaman bermain tanpa hambatan. Dengan pemeliharaan yang teratur, kami juga dapat memperbaiki bug dan mengoptimalkan fitur-fitur baru untuk memberikan pengalaman terbaik kepada pengguna kami. Tim teknis kami berdedikasi untuk memastikan bahwa setiap kali Anda mengakses {pProvide.nmwebsite}, Anda mendapatkan layanan yang maksimal dan bebas gangguan.</p>
          </div>
        </div>
        
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default MaintenancePage;
