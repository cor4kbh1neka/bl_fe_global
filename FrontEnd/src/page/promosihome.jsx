import React from "react";
import Logo from "../fragment/Logo";
import Footer from "../component/Footer";
import { Promosikonten } from "../component/Promosikonten";
import { Logindaftar } from "../fragment/Logindaftar";
import Scroll from "../fragment/Scroll";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import { Mtonce } from "../fragment/Mtonce";

const PromosihomePage = () => {
  const pProvideString = localStorage.getItem('halfPic');
  const pProvide = pProvideString ? JSON.parse(pProvideString) : null;

  return (
    <div className="container">
      {pProvide ? (
        <MetaTags
          customTitle={`${pProvide.nmwebsite} | Promosi terupdate dan Menarik`}
          customDescription={`Temukan promosi terbaru dan menarik di situs ${pProvide.nmwebsite}. Dapatkan penawaran terbaik dan nikmati pengalaman taruhan terbaik!`}
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
          <p>Promosi terupdate {pProvide.nmwebsite}</p>
        </div>
        <Logindaftar />
        <Promosikonten />
      </div>
      <Scroll targetElementId="secpromosi" />
      <Footer />
      <Livechat />
      <Mtonce />
    </div>
  );
};

export default PromosihomePage;