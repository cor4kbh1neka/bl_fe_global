import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { getLinkAlternatif } from "../services/api.service";

const Linkalternatif = () => {
  const [dataLink, setDataLink] = useState([]);

  useEffect(() => {
    const fetchLinkData = async () => {
      const response = await getLinkAlternatif();
      const data = response?.data || [];
      const sortedData = data.sort((a, b) => a.idctlnk - b.idctlnk);
      setDataLink(sortedData);
      localStorage.setItem("linkAlt", JSON.stringify(sortedData));
      localStorage.setItem("timeLinkAlt", Date.now());
    };

    const loadLinkData = () => {
      const storedData = localStorage.getItem("linkAlt");
      const storedTime = localStorage.getItem("timeLinkAlt");

      if (storedData && storedTime) {
        const currentTime = Date.now();
        const timeDiff = currentTime - storedTime;

        if (timeDiff < 3600000) {
          const parsedData = JSON.parse(storedData);
          const sortedData = parsedData.sort((a, b) => a.idctlnk - b.idctlnk);
          setDataLink(sortedData);
          return;
        }
      }

      fetchLinkData();
    };

    loadLinkData();
  }, []);

  const handleLinkClick = (url) => {
    window.open(url);
  };

  return (
    <div className="seclinkalternatif">
      <div className="grouplinkalternatif">
        {dataLink.map((link) => (
          <div
            key={link.idctlnk}
            className="linklinkalternatif"
            onClick={() => handleLinkClick(link.ctlnkdmn)}
          >
            <Icon icon="octicon:globe-24" />
            <span className="textlink">{link.ctlnkname}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Linkalternatif;
