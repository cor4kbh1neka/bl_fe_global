import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Promosikonten } from "../component/Promosikonten";
import Scroll from "../fragment/Scroll";
import Livechat from "../component/Livechat";

export const PromosilobbyPage = () => {
  return (
    <div className="container">
      <div className="secromolobby" id="secromolobby">
        <Lobbynavbar pageTitle="promosi" />
        <Promosikonten />
      </div>
      <Scroll targetElementId="secromolobby" />
      <Footer />
      <Livechat />
    </div>
  );
};

export default PromosilobbyPage;
