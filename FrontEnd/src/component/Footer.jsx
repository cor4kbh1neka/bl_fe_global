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

  return (
    <div className="secfooter">
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
