import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Logo from "../fragment/Logo";
import { Icon } from "@iconify/react";
import { Logindaftar } from "../fragment/Logindaftar";
import {
  fetchDataIslive,
  fetchDataIncoming,
  dataCompetition,
  getProvide,
} from "../services/api.service";
import Swal from "sweetalert2";
import Scroll from "../fragment/Scroll";
import { renderSkeleton } from "../fragment/Skeleton";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";

export const LivescorehomePage = () => {
  const [showLiveMatches, setShowLiveMatches] = useState(false);
  const [combinedData, setCombinedData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const fetchData = async (isLive) => {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);

        let fetchFunction;
        if (isLive) {
          fetchFunction = fetchDataIslive;
        } else {
          fetchFunction = fetchDataIncoming;
          currentDate.setDate(currentDate.getDate() + 1);
        }

        const fetchPromises = dataCompetition.map((item) =>
          fetchFunction(item.leagueId),
        );
        let combinedData = await Promise.all(fetchPromises);

        combinedData = combinedData
          .filter((data) => !data.hasOwnProperty("error") || data.error !== 404)
          .flat();

        if (combinedData.length === 0) {
          const response = await fetch(
            `${import.meta.env.VITE_CR_BOLA_URL}&action=get_events&timezone=asia/jakarta&from=${formattedDate}&to=${formattedDate}&match_live=${isLive ? 1 : 0}`,
            {
              method: "GET",
              credentials: "omit",
            },
          );

          if (response.ok) {
            const data = await response.json();
            setCombinedData(data);
          } else {
            console.error("Failed to fetch data from API");
          }
          setLoading(false);
          return;
        }

        setCombinedData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching combined data:", error);
      }
    };

    fetchData(showLiveMatches);
  }, [showLiveMatches]);

  const handleMatchClick = () => {
    Swal.fire({
      text: "Silahkan Daftar atau Login!",
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  const handleLiveClick = () => {
    if (!showLiveMatches) {
      setLoading(true);
      setShowLiveMatches(true);
    }
  };

  const handleIncomingClick = () => {
    if (showLiveMatches) {
      setLoading(true);
      setShowLiveMatches(false);
    }
  };

  const groupedMatches = {};
  if (combinedData && Array.isArray(combinedData)) {
    combinedData.forEach((match) => {
      const leagueId = match.league_id;
      if (!groupedMatches[leagueId]) {
        groupedMatches[leagueId] = [];
      }
      groupedMatches[leagueId].push(match);
    });
  } else if (
    combinedData &&
    combinedData.hasOwnProperty("error") &&
    combinedData.error === 404
  ) {
  } else {
    //Console error di sini
  }

  const formatDate = (dateString) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  return (
    <div className="container">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | Informasi Live Score Terupdate`}
          customDescription={`Informasi live score terupdate untuk sepak bola dan olahraga lainnya hanya di ${dataProvide.nmwebsite}. Temukan peluang taruhan terbaik di situs kami!`}
          customKeywords="Live Score Terupdate, skor langsung, sepak bola, olahraga, peluang taruhan, taruhan sepak bola, taruhan olahraga, update skor, live score bola, situs taruhan"
        />
      ) : (
        <MetaTags
          customTitle="Informasi Live Score Terupdate"
          customDescription="Informasi live score terupdate untuk sepak bola dan olahraga lainnya hanya di situs kami. Temukan peluang taruhan terbaik di situs kami!"
          customKeywords="Live Score Terupdate, skor langsung, sepak bola, olahraga, peluang taruhan, taruhan sepak bola, taruhan olahraga, update skor, live score bola, situs taruhan"
        />
      )}
      <Logo />
      <div className="seclivescore" id="seclivescore">
        <div className="titlesec">
          <h1>LIVE SCORE</h1>
          <p>Cek Live Score Terkini di {dataProvide.nmwebsite}</p>
        </div>
        <Logindaftar />
        <div className="groupklivescore">
          <div className="togglelivescore">
            <div
              className={`listtogglelivescore ${showLiveMatches ? "active" : ""}`}
              onClick={handleLiveClick}
            >
              <span className="texttoggle">LIVE <Icon icon="fluent:live-20-filled" /></span>
            </div>
            <div
              className={`listtogglelivescore ${!showLiveMatches ? "active" : ""}`}
              onClick={handleIncomingClick}
            >
              <span className="texttoggle">INCOMING</span>
            </div>
          </div>
          <div className="grouplistdatalive">
            {loading
              ? renderSkeleton()
              : Object.entries(groupedMatches).map(([leagueId, matches]) => (
                  <div
                    key={leagueId}
                    className="listdatalive"
                    data-liga={leagueId}
                  >
                    <div className="grouptitleliga">
                      <img
                        src={matches[0].league_logo}
                        alt={matches[0].country_name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/img/team.webp";
                        }}
                        className="imgtitleliga"
                      />
                      <div className="grouptexttitleliga">
                        <span className="namaliga">
                          {matches[0].league_name}
                        </span>
                        <span className="negaraliga">
                          {matches[0].country_name}
                        </span>
                      </div>
                    </div>
                    <div className="groupmatchteam">
                      {matches.map((match, index) => (
                        <React.Fragment key={`${leagueId}-${index}`}>
                          {index === 0 && match.match_live === "0" && (
                            <span className="tanggalincoming">
                              {formatDate(match.match_date)}
                            </span>
                          )}
                          <div
                            className={`listmatchteam ${showLiveMatches && match.match_live === "1" ? "live" : "incoming"}`}
                            onClick={handleMatchClick}
                          >
                            <span className="timematch">
                              {showLiveMatches && match.match_live === "1"
                                ? match.match_status + "'"
                                : match.match_time}
                            </span>
                            <div className="ratalistdatateam">
                              <div className="listdatateam">
                                <span className="teamfrom">h</span>
                                <img
                                  src={match.team_home_badge}
                                  alt={match.match_hometeam_name}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/assets/img/team.webp";
                                  }}
                                  className="imgfromteam"
                                />
                                <span className="teamname">
                                  {match.match_hometeam_name}
                                </span>
                              </div>
                              <div className="listscorematch">
                                <span className="datascore home">
                                  {match.match_hometeam_score}
                                </span>
                                <span className="separator">-</span>
                                <span className="datascore away">
                                  {match.match_awayteam_score}
                                </span>
                              </div>
                              <div className="listdatateam">
                                <span className="teamfrom">a</span>
                                <img
                                  src={match.team_away_badge}
                                  alt={match.match_awayteam_name}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/assets/img/team.webp";
                                  }}
                                  className="imgfromteam"
                                />
                                <span className="teamname">
                                  {match.match_awayteam_name}
                                </span>
                              </div>
                            </div>
                            <span className="seematch">
                              <Icon icon="icon-park-outline:right" />
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
            {combinedData &&
              !Array.isArray(combinedData) &&
              combinedData.hasOwnProperty("error") &&
              combinedData.error === 404 && (
                <div className="listdatalive">
                  <span className="tidakadapertandingan">
                    Tidak ada pertandingan live saat ini.
                  </span>
                </div>
              )}
          </div>
        </div>
      </div>
      <Scroll targetElementId="seclivescore" />
      <Footer />
      <Livechat />
    </div>
  );
};

export default LivescorehomePage;
