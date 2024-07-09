import React, { useEffect, useState } from "react";

const Bankinfo = () => {
  const [dataBank, setDataBank] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/banks/master", {
          headers: {
            'Content-Type': 'application/json',
            'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
          }
        });
        const responseData = await response.json();
        setDataBank(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="secbankinfo">
      <div className="bungkusbankinfo">
        <span className="titlebankinfo">BANK INFO</span>
        <div className="groupbank">
          {dataBank && dataBank.data && dataBank.data.map((bank, index) => (
            <div
              className="listbank"
              key={index}
              data-online={bank.statusxyxyy}
              data-namabank={bank.bnkmstrxyxyx}
            >
              <div
                className={`dot ${bank.statusxyxyy === 1 ? "online" : bank.statusxyxyy === 3 ? "gangguan" : "offline"}`}
              ></div>
              <img src={`/assets/img/bank/${bank.urllogoxxyx}`} alt={`bank ${bank.bnkmstrxyxyx}`} />
            </div>
          ))}
        </div>
        <span className="informasigangguan">
        {dataBank && dataBank.data && dataBank.data.filter((bank) => bank.statusxyxyy === 2).length > 0 ? (
          `Metode deposit ${dataBank.data
            .filter((bank) => bank.statusxyxyy === 2)
            .map((bank) => bank.bnkmstrxyxyx)
            .join(", ")} sedang dalam gangguan, mohon hubungi customer service.`
        ) : (
          "Seluruh bank, e-wallet, dan pulsa online. Silahkan melakukan deposit."
        )}
      </span>
        <div className="groupketeranganbank">
          <div className="ghketeranganbank">
            <div className="listketeranganbank">
              <div className="dot online"></div>
              <span className="textketerangan">Online</span>
            </div>
            <div className="listketeranganbank">
              <div className="dot gangguan"></div>
              <span className="textketerangan">Gangguan</span>
            </div>
            <div className="listketeranganbank">
              <div className="dot offline"></div>
              <span className="textketerangan">Offline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bankinfo;
