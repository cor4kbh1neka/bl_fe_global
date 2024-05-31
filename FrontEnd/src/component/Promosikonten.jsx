import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getPromosi } from "../services/api.service";
import { renderSkeleton } from "../fragment/Skeleton";

export const Promosikonten = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [dataPromosi, setDataPromosi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromosiData = async () => {
      const response = await getPromosi();
      const sortedData = (response?.data || []).sort((a, b) => a.pssprm - b.pssprm);
      setDataPromosi(sortedData);
      setLoading(false);
    };

    fetchPromosiData();
  }, []);

  const togglePromoDetails = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const getKesimpulan = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const textContent = tempElement.textContent || tempElement.innerText || "";
    return textContent.length > 50 ? textContent.substring(0, 70) + "..." : textContent;
  };

  return (
    <div className="grouppromosi">
      {loading ? (
        renderSkeleton()
      ) : dataPromosi.length === 0 ? (
        <div className="no-promosi">Promo Belum Ada</div>
      ) : (
        dataPromosi.map((promo, index) => (
          <div
            className="listpromosi"
            key={index}
            onClick={() => togglePromoDetails(index)}
          >
            <div className="bannerpromosi">
              <img
                className="imgutamapromo"
                src={promo.ctprmur}
                alt={`Gambar ${promo.ttlectprm}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/promo-dummy.webp";
                }}
              />
              {[1, 2, 3].map((_, i) => (
                <img
                  key={i}
                  src="/assets/img/GBCOIN.webp"
                  alt="coin global bola"
                  className={`coinpromo${i + 1}`}
                />
              ))}
            </div>
            <span className="judulpromo">{promo.ttlectprm}</span>
            {expandedIndex !== index && (
              <span className="kesimpulanpromo">{getKesimpulan(promo.dskprm)}</span>
            )}
            <div className="selengkapnya">
              <span className="textselengkapnya">Selengkapnya</span>
              <Icon icon="icon-park-outline:right" />
            </div>
            <div
              className={`promolengkap ${expandedIndex === index ? "expanded" : ""}`}
            >
              <span className="selengkapnyajudul">{promo.judul}</span>
              <div dangerouslySetInnerHTML={{ __html: promo.dskprm }}></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
