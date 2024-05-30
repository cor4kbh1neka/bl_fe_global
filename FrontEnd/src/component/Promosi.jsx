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
            {promosiData
              .filter((promo) => promo.pssprm === "1")
              .map((promo, index) => (
                <div className="headsecpromosi" key={index}>
                  <img src={promo.ctprmur} alt={promo.ttlectprm} />
                  <div className="buttonselengkapnya">
                    <Link to="/promosihome" className="tombol full primary">
                      Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            {promosiData
              .filter((promo) => promo.pssprm === "2")
              .map((promo, index) => (
                <div className="headsecpromosi" key={index}>
                  <img src={promo.ctprmur} alt={promo.ttlectprm} />
                  <div className="buttonselengkapnya">
                    <Link to="/promosihome" className="tombol full primary">
                      Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <div className="grouppromosihome">
          {promosiData
              .filter((promo) => promo.pssprm >= "3" && promo.pssprm <= "6")
              .sort((a, b) => a.pssprm - b.pssprm)
              .map((promo, index) => (
                <div className="listpromosihome" key={index}>
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
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Promosi;
