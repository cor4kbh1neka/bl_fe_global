import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { handleClick } from "../services/api.service";
import { Link } from "react-router-dom";

const Footer = () => {
  const [currentUrl, setCurrentUrl] = useState("");
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

  useEffect(() => {
    const url = new URL(window.location.href);
    const mainUrl = url.origin;
    setCurrentUrl(mainUrl);
  }, []);

  useEffect(() => {
    const imageWrapper = document.querySelector('.listmitra');
    const images = imageWrapper.querySelectorAll('img');
    
    images.forEach(image => {
      const clone = image.cloneNode(true);
      imageWrapper.appendChild(clone);
    });
  }, []);

  return (
    <div className="secfooter">
      <div className="groupmitra">
        <span>Mitra Ekslusif</span>
        <div className="shadowmitra left"></div>
        <div className="shadowmitra right"></div>
        <div className="listmitra">
          <img src="../assets/img/games/mitra/sbobet-mitra.webp" alt="sbobet" />
          <img src="../assets/img/games/mitra/568win-mitra.webp" alt="568win" />
          <img src="../assets/img/games/mitra/pragmaticplay-mitra.webp" alt="pragmaticplay" />
          <img src="../assets/img/games/mitra/pgsoft-mitra.webp" alt="pgsoft" />
          <img src="../assets/img/games/mitra/microgaming-mitra.webp" alt="microgaming" />
          <img src="../assets/img/games/mitra/cqnine-mitra.webp" alt="cqnine" />
          <img src="../assets/img/games/mitra/jokergaming-mitra.webp" alt="jokergaming" />
          <img src="../assets/img/games/mitra/rtgslot-mitra.webp" alt="rtgslot" />
          <img src="../assets/img/games/mitra/worldmatch-mitra.webp" alt="worldmatch" />
          <img src="../assets/img/games/mitra/fungkygames-mitra.webp" alt="fungkygames" />
          <img src="../assets/img/games/mitra/netent-mitra.webp" alt="netent" />
          <img src="../assets/img/games/mitra/kiron-mitra.webp" alt="kiron" />
          <img src="../assets/img/games/mitra/playngo-mitra.webp" alt="playngo" />
          <img src="../assets/img/games/mitra/quickspin-mitra.webp" alt="quickspin" />
          <img src="../assets/img/games/mitra/redtiger-mitra.webp" alt="redtiger" />
          <img src="../assets/img/games/mitra/yggdrasil-mitra.webp" alt="yggdrasil" />
          <img src="../assets/img/games/mitra/gamatron-mitra.webp" alt="gamatron" />
          <img src="../assets/img/games/mitra/giocoplus-mitra.webp" alt="giocoplus" />
          <img src="../assets/img/games/mitra/lionking-mitra.webp" alt="lionking" />
        </div>
      </div>
      <div className="groupcontact">
        <div className="listcontactfooter" onClick={() => handleClick(1, "Whatsapp 1", "livechat")}>
          <Icon icon="ic:baseline-whatsapp" style={{ color: "#25d366" }} />
          <span>whatsapp 1</span>
        </div>
        <div className="listcontactfooter" onClick={() => handleClick(2, "Whatsapp 2", "Whatsapp 1")}>
          <Icon icon="ic:baseline-whatsapp" style={{ color: "#25d366" }} />
          <span>whatsapp 2</span>
        </div>
        <div className="listcontactfooter" onClick={() => handleClick(5, "Facebook", "livechat")}>
          <Icon icon="ri:facebook-fill" style={{ color: "#4267B2" }} />
          <span>facebook</span>
        </div>
        <div className="listcontactfooter" onClick={() => handleClick(6, "Instagram", "livechat")}>
          <Icon icon="bi:instagram" style={{ color: "#C13584" }} />
          <span>instagram</span>
        </div>
      </div>
      <div className="groupsecfooter">
        <div className="listfooter kiri">
          <span className="titlefooter">Partner</span>
          <div className="datafooter">
            <img src="/assets/img/partners/g21gaming-logo-nav.webp" alt="lotto21 group" />
            <img src="/assets/img/partners/sbobet.webp" alt="sbobet" />
          </div>
        </div>
        <div className="listfooter kanan">
          <span className="titlefooter">Certified By</span>
          <div className="datafooter">
            <img src="/assets/img/partners/gambleware.webp" alt="gambleware" />
            <img
              src="/assets/img/partners/bmm-testlabs.webp"
              alt="bmm testlabs"
            />
            <img
              src="/assets/img/partners/curacao-egaming.webp"
              alt="curacao egaming"
            />
            <img
              src="/assets/img/partners/responsible-gambling.webp"
              alt="responsible gambling"
            />
          </div>
        </div>
      </div>
      <div className="seccopyright">
        <div className="listcopyright kiri">
          <Link to="/aboutus">About Us</Link>
          <Link to="/hubungi">Contact Us</Link>
        </div>
        <div className="listcopyright kanan">
          <span>
            Copyright © <a href={currentUrl}>{dataProvide ? dataProvide.nmwebsite : "bola"}</a>. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
