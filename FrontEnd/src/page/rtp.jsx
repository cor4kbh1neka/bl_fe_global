import React, { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import Livechat from "../component/Livechat";
import { dataRtp } from "../services/api.service";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const renderSkeleton = () => {
  return (
    <>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
        <div className="listdatalive skeleton" key={index}>
          <div className="loader"></div>
        </div>
    ))}
    </>
  )
  
}

const patternData = [
  '❌ ❌ ❌', '✔️ ❌ ❌', '❌ ✔️ ❌', '❌ ❌ ✔️', '✔️ ❌ ✔️', '❌ ✔️ ✔️'
];

const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const formatTime = (hour, minute) => `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

const THIRTY_MINUTES = 30 * 60 * 1000;

export const RtpPage = () => {
  const [selectedProvider, setSelectedProvider] = useState('pragmaticplay');
  const [selectedGame, setSelectedGame] = useState(null);
  const [countdown, setCountdown] = useState(300);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const updateGameData = () => {
      const providerData = dataRtp.find((item) => item.provider === selectedProvider);

      if (providerData) {
        const lastUpdateKey = `${selectedProvider}_lastUpdate`;
        const lastUpdate = parseInt(localStorage.getItem(lastUpdateKey) || '0', 10);
        const now = new Date();

        if (Date.now() - lastUpdate >= THIRTY_MINUTES) {
          const updatedGamesData = providerData.listgames.map((game) => {
            const randomPercent = randomValue(10, 97);
            let randomStartHour, randomStartMinute, randomEndHour, randomEndMinute;

            if (randomPercent > 65) {
              const maxMinutesBeforeNow = 120; // Maximum 2 hours before now
              const startMinutesBeforeNow = randomValue(1, maxMinutesBeforeNow);
              const startDate = new Date(now.getTime() - startMinutesBeforeNow * 60000);

              randomStartHour = startDate.getHours();
              randomStartMinute = startDate.getMinutes();

              const minMinutesAfterNow = 30;
              const maxMinutesAfterNow = 150; // 2 hours and 30 minutes
              const totalMinutesAfterNow = randomValue(minMinutesAfterNow, maxMinutesAfterNow);
              const endDate = new Date(now.getTime() + totalMinutesAfterNow * 60000);

              randomEndHour = endDate.getHours();
              randomEndMinute = endDate.getMinutes();
            } else {
              randomStartHour = randomValue(1, 21);
              randomStartMinute = randomValue(0, 59);

              const minMinutes = 15;
              const maxMinutes = 120;
              const totalMinutes = randomValue(minMinutes, maxMinutes);

              randomEndHour = randomStartHour;
              randomEndMinute = randomStartMinute + totalMinutes;

              if (randomEndMinute >= 60) {
                randomEndHour += Math.floor(randomEndMinute / 60);
                randomEndMinute = randomEndMinute % 60;
              }

              if (randomEndHour >= 24) {
                randomEndHour = 23;
                randomEndMinute = 59;
              }
            }

            const randomTime = `${formatTime(randomStartHour, randomStartMinute)} - ${formatTime(randomEndHour, randomEndMinute)}`;
            const randomStep2Pattern = randomChoice(patternData);
            const randomStep3Pattern = randomChoice(patternData);
            const randomManualCount = randomValue(3, 25);
            let randomStep2AutoCount, randomStep3AutoCount;

            if (providerData.pola === "2") {
                randomStep2AutoCount = randomChoice([10, 30, 50, 80]);
                randomStep3AutoCount = randomChoice([10, 30, 50, 80]);
            } else if (providerData.pola === "3") {
                randomStep2AutoCount = randomChoice([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
                randomStep3AutoCount = randomChoice([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
            } else if (providerData.pola === "4") {
                randomStep2AutoCount = randomChoice([10, 20, 50, 75, 100]);
                randomStep3AutoCount = randomChoice([10, 20, 50, 75, 100]);
            } else if (providerData.pola === "5") {
                randomStep2AutoCount = randomChoice([10, 25, 50, 75, 100]);
                randomStep3AutoCount = randomChoice([10, 25, 50, 75, 100]);
            } else if (providerData.pola === "6") {
                randomStep2AutoCount = randomChoice([10, 25, 50, 100]);
                randomStep3AutoCount = randomChoice([10, 25, 50, 100]);
            } else if (providerData.pola === "7") {
                randomStep2AutoCount = randomChoice([10, 20, 50, 100]);
                randomStep3AutoCount = randomChoice([10, 20, 50, 100]);
            } else {
                randomStep2AutoCount = randomChoice([10, 20, 30, 50, 70, 100]);
                randomStep3AutoCount = randomChoice([10, 20, 30, 50, 70, 100]);
            }

            return {
              id: game.id,
              percent: randomPercent,
              time: randomTime,
              step2Pattern: randomStep2Pattern,
              step3Pattern: randomStep3Pattern,
              manualCount: randomManualCount,
              step2_autoCount: randomStep2AutoCount,
              step3_autoCount: randomStep3AutoCount
            };
          });

          localStorage.setItem(`${selectedProvider}_gamesData`, JSON.stringify(updatedGamesData));
          localStorage.setItem(lastUpdateKey, now.getTime().toString());
        }
      }
    };

    updateGameData();
  }, [selectedProvider]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
    setSelectedGame(null);
  };

  const handleButtonClick = (game) => {
    setSelectedGame(game);
    const grouppolartp = document.querySelector('.grouppolartp');
    if (grouppolartp) {
      grouppolartp.style.display = 'block';
    }
  };

  const getColorBasedOnPercentage = (percent) => {
    if (percent < 35) {
      return 'var(--red-color)';
    } else if (percent >= 35 && percent <= 65) {
      return 'var(--yellow-color)';
    } else {
      return 'var(--green-color)';
    }
  };

  const providerData = dataRtp.find((item) => item.provider === selectedProvider);
  let gamesData = JSON.parse(localStorage.getItem(`${selectedProvider}_gamesData`)) || [];

  if (providerData) {
    providerData.listgames.sort((a, b) => {
      const gameDataA = gamesData.find(game => game.id === a.id);
      const gameDataB = gamesData.find(game => game.id === b.id);
      const percentA = gameDataA ? gameDataA.percent : 0;
      const percentB = gameDataB ? gameDataB.percent : 0;
      return percentB - percentA;
    });
  }

  const getRemainingTimeText = (selectedGameData) => {
    if (selectedGameData) {
      const now = new Date();
      const [startTime, endTime] = selectedGameData.time.split(' - ');

      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
      const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);

      if (now >= startDate && now <= endDate) {
        const remainingTime = Math.max(0, Math.floor((endDate - now) / 1000));

        const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = (remainingTime % 60).toString().padStart(2, '0');

        return `(${hours}:${minutes}:${seconds})`;
      } else {
        return 'belum waktu gacor';
      }
    }
    return 'belum waktu gacor';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const polartpElement = document.querySelector('.kontenpolartp');
      const buttonGroupElement = document.querySelector('.groupbuttonktnpola');

      if (
        polartpElement && 
        buttonGroupElement &&
        !polartpElement.contains(event.target) && 
        !buttonGroupElement.contains(event.target)
      ) {
        setSelectedGame(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  
  const filteredGames = providerData.listgames.filter((game) =>
    game.name.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    if (providerData) {
      const images = filteredGames.map((game) => {
        const img = new Image();
        img.src = game.image;
        return img;
      });
  
      let loadedCount = 0;
      images.forEach((img) => {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setLoading(false);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setLoading(false);
          }
        };
      });
    }
  }, [providerData, filteredGames]);
  

  return (
    <div className="container rtp">
      <Lobbynavbar pageTitle="rtp slot" />
      <div className="secrtp">
        <div className="groupsecrtp">
          <div className="groupshortrtp">
            <select name="provider" id="provider" value={selectedProvider} onChange={handleProviderChange}>
              {dataRtp.map((item) => (
                <option key={item.provider} value={item.provider}>
                  {item.provider}
                </option>
              ))}
            </select>
            <div className="groupsearchrtp">
              <Icon icon="subway:search" />
              <input
                  type="text"
                  id="searchrtp"
                  placeholder="cari game"
                  value={searchQuery}
                  onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="groupslotprovider">
          {loading || gamesData.length === 0 ? renderSkeleton() : (
            filteredGames.map((game) => {
              const gameData = gamesData.find(g => g.id === game.id);
              const percent = gameData ? gameData.percent : 0;
              const percentFormatted = `${percent}%`;
              const backgroundColor = getColorBasedOnPercentage(percent);

              return (
                <div
                  key={game.id}
                  className="listslotprovider"
                  title={game.name}
                >
                  <span className="name">{game.name}</span>
                  <img src={game.image} alt={game.name} />
                  <div className="barrtp">
                    <div className={`nilairtp nilairtp-${game.id}`} style={{ width: percentFormatted, background: backgroundColor }}></div>
                    <span className="textnilairtp">{percentFormatted}</span>
                  </div>
                  <div className="groubuttonlihat">
                    <button
                      className="btnlihatpola primary"
                      onClick={() => handleButtonClick(game)}
                    >
                      Lihat Pola
                    </button>
                  </div>
                </div>
              );
            })
          )}
          </div>
          <div className="grouppolartp" style={{ display: selectedGame ? 'block' : 'none' }}>
            <div className="datagrouppolartp">
              <div className="kontenpolartp">
                <span className="closepola" onClick={() => setSelectedGame(null)}>x</span>
                {selectedGame && (
                  <>
                    {(() => {
                      const gameData = gamesData.find(g => g.id === selectedGame.id);
                      return (
                        <>
                          <img className="imagepola" src={selectedGame.image} alt={selectedGame.name} />
                          <div className="grouptitlepola">
                            <span>{selectedGame.name}</span>
                            <span>{selectedProvider}</span>
                          </div>
                          <div className="groupintikontenrtp">
                            <div className="groupdataspecslot">
                              <span>Minimal Bet</span>
                              <span>:</span>
                              <span>Rp. 800</span>
                              <span>Jam Gacor</span>
                              <span>:</span>
                              <span>
                                {gameData?.time || `${formatTime(randomValue(1, 12), randomValue(0, 59))} - ${formatTime(randomValue(13, 23), randomValue(0, 59))}`}
                              </span>
                              <span>Sisa Waktu Gacor</span>
                              <span>:</span>
                              <span>{getRemainingTimeText(gameData)}</span>
                            </div>
                            <div className="groupangkapola">
                              <div className="listangkapola">
                                <span>Step 1: Panaskan Mesin Slot!</span>
                                <span>Manual {gameData?.manualCount || '24'}x</span>
                              </div>
                              <div className="listangkapola">
                                <span>Step 2: Acak Pola!</span>
                                <span>
                                  Auto {gameData?.step2_autoCount || '10'}x 
                                  {providerData.pola === "1" ? ` ${gameData?.step2Pattern || '✔️ ❌ ❌'}` : ''}
                                </span>
                              </div>
                              <div className="listangkapola">
                                <span>Step 3: Naikkan Bet!</span>
                                <span>
                                  Auto {gameData?.step3_autoCount || '10'}x 
                                  {providerData.pola === "1" ? ` ${gameData?.step3Pattern || '✔️ ✔️ ❌'}` : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="informasipola">Lakukan Tips Dari Awal & Ulangi</span>
                        </>
                      );
                    })()}
                  </>
                )}
              </div>
              <div className="groupbuttonktnpola">
                <Link to="/deposit" className="btnlihatpola primary">Deposit</Link>
                <Link to="/dekstopgames/slotgames" className="btnlihatpola green">Play</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default RtpPage;
