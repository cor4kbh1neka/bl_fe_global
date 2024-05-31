import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPromosi } from "../services/api.service";

const Promosi = () => {
  const [promosiData, setPromosiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPromosi();
      setPromosiData(data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderSkeletonone = () => {
    return (
      <div className="listdatalive skeleton promosihomecc">
        <div className="loader"></div>
      </div>
    );
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="secpromosihome">
      {loading ? (
        renderSkeletonone()
      ) : (
        <>
          <div className="groupheadsecpromosi">
            {promosiData.filter((promo) => promo.pssprm === "1").length > 0 ? (
              promosiData
                .filter((promo) => promo.pssprm === "1")
                .map((promo, index) => (
                  <div className="headsecpromosi" key={index}>
                    <img 
                      src={promo.pssprm === "1" ? promo.ctprmur : "/assets/img/promo-dummy.webp"} 
                      alt={promo.ttlectprm}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/promo-dummy.webp";
                      }}
                    />
                    <div className="buttonselengkapnya">
                      <Link to="/promosihome" className="tombol full primary">
                        Selengkapnya
                      </Link>
                    </div>
                  </div>
                ))
            ) : (
              <div className="headsecpromosi">
                <img src="/assets/img/promo-dummy.webp" alt="promo website" />
                <div className="buttonselengkapnya">
                  <Link to="/promosihome" className="tombol full primary">
                    Selengkapnya
                  </Link>
                </div>
              </div>
            )}
            {promosiData.filter((promo) => promo.pssprm === "2").length > 0 ? (
              promosiData
                .filter((promo) => promo.pssprm === "2")
                .map((promo, index) => (
                  <div className="headsecpromosi" key={index}>
                    <img 
                      src={promo.pssprm === "2" ? promo.ctprmur : "/assets/img/promo-dummy.webp"} 
                      alt={promo.ttlectprm}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/promo-dummy.webp";
                      }}
                    />
                    <div className="buttonselengkapnya">
                      <Link to="/promosihome" className="tombol full primary">
                        Selengkapnya
                      </Link>
                    </div>
                  </div>
                ))
            ) : (
              <div className="headsecpromosi">
                <img src="/assets/img/promo-dummy.webp" alt="promo website" />
                <div className="buttonselengkapnya">
                  <Link to="/promosihome" className="tombol full primary">
                    Selengkapnya
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="grouppromosihome">
            {["3", "4", "5", "6"].map((pssprmValue) => {
              const filteredPromos = promosiData.filter((promo) => promo.pssprm === pssprmValue);
              
              if (filteredPromos.length > 0) {
                return filteredPromos.sort((a, b) => a.pssprm - b.pssprm).map((promo, index) => (
                  <div className="listpromosihome" key={`${pssprmValue}-${index}`}>
                    <div className="headpromosihome">
                      <div className="coingroup">
                        {[...Array(4)].map((_, i) => (
                          <img
                            key={i}
                            src="/assets/img/GBCOIN.webp"
                            alt="global bola coin"
                            className={`coin${i + 1}`}
                          />
                        ))}
                      </div>
                      <img
                        src={promo.ctprmur}
                        alt={promo.ttlectprm}
                        className="imgpromosihome"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/promo-dummy.webp";
                        }}
                      />
                    </div>
                    <div className="overtext">
                      <span
                        title={promo.ttlectprm}
                        className="textlistpromosihome"
                      >
                        {truncateText(promo.ttlectprm, 20)}
                      </span>
                    </div>
                    <Link to="/promosihome" className="tombol full primary">
                      Selengkapnya
                    </Link>
                  </div>
                ));
              } else {
                return (
                  <div className="listpromosihome" key={`placeholder-${pssprmValue}`}>
                    <div className="headpromosihome">
                      <div className="coingroup">
                        {[...Array(4)].map((_, i) => (
                          <img
                            key={i}
                            src="/assets/img/GBCOIN.webp"
                            alt="global bola coin"
                            className={`coin${i + 1}`}
                          />
                        ))}
                      </div>
                      <img
                        src="/assets/img/promo-dummy.webp"
                        alt="promo website"
                        className="imgpromosihome"
                      />
                    </div>
                    <div className="overtext">
                      <span
                        title="promo website"
                        className="textlistpromosihome"
                      >
                        {truncateText("promo website", 20)}
                      </span>
                    </div>
                    <Link to="/promosihome" className="tombol full primary">
                      Selengkapnya
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Promosi;
