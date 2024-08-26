import { Icon } from "@iconify/react";
import React, { useRef, useEffect, useState } from "react";
import { fetchDataPopular, dataCompetition } from "../services/api.service";
import Swal from "sweetalert2";
import { Gamesbar } from "./Gamesbar";

const Popular = () => {
  const bungkusPopularRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [combinedData, setCombinedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        const storedData = localStorage.getItem("dataPopular");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const storedTimestamp = parsedData.timestamp;
          const currentTime = new Date().getTime();
          if (currentTime - storedTimestamp < 3600000) {
            setCombinedData(parsedData.data);
            setLoading(false);
            return;
          }
        }
  
        const fetchPromises = dataCompetition.map((item) =>
          fetchDataPopular(item.leagueId),
        );
        let combinedData = await Promise.all(fetchPromises);
  
        combinedData = combinedData
          .filter(
            (data) =>
              data !== null && 
              (!data.hasOwnProperty("error") ||
                (data.error !== 404 && data.error !== 503))
          )
          .flat()
          .filter((data) => data.match_status === "");
  
        if (combinedData.length > 0) {
          localStorage.setItem(
            "dataPopular",
            JSON.stringify({
              data: combinedData,
              timestamp: new Date().getTime(),
            }),
          );
          setCombinedData(combinedData);
        } else {
          console.warn("No valid data available to display.");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching combined data:", error);
        setLoading(false);
      }
    };
  
    fetchCombinedData();
  }, []);

  useEffect(() => {
    const bungkusPopularElement = bungkusPopularRef.current;

    const slide = () => {
      if (!bungkusPopularElement) return;

      const childWidth = bungkusPopularElement.children[0].offsetWidth;
      const newTranslateX = translateX - childWidth;
      bungkusPopularElement.style.transition = "transform 0.5s ease";
      setTranslateX(newTranslateX);
    };

    const transitionEnd = () => {
      const bungkusPopularElement = bungkusPopularRef.current;
      if (!bungkusPopularElement) return;

      const firstChild = bungkusPopularElement.children[0];
      bungkusPopularElement.style.transition = "none";
      bungkusPopularElement.style.transform = `translateX(0)`;
      bungkusPopularElement.appendChild(firstChild);
      setTranslateX(0);
    };

    const interval = setInterval(slide, 3000);

    bungkusPopularElement.addEventListener("transitionend", transitionEnd);

    return () => {
      clearInterval(interval);
      bungkusPopularElement.removeEventListener("transitionend", transitionEnd);
    };
  }, [translateX]);

  const moveLeft = () => {
    const bungkusPopularElement = bungkusPopularRef.current;
    if (!bungkusPopularElement) return;

    const childWidth = bungkusPopularElement.children[0].offsetWidth;
    const newTranslateX = translateX + childWidth;
    bungkusPopularElement.style.transition = "transform 0.5s ease";
    setTranslateX(newTranslateX);
  };

  const moveRight = () => {
    const bungkusPopularElement = bungkusPopularRef.current;
    if (!bungkusPopularElement) return;

    const childWidth = bungkusPopularElement.children[0].offsetWidth;
    const newTranslateX = translateX - childWidth;
    bungkusPopularElement.style.transition = "transform 0.5s ease";
    setTranslateX(newTranslateX);
  };
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleMatchClick = () => {
    Swal.fire({
      text: "Silahkan Daftar atau Login!",
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="secpopular">
      <Gamesbar activeGame="popular match" />
      <div className="secgrouppopular">
        <img
          className="globalbolaplayer"
          src="/assets/img/298166678_10159879671529597_3324265039382551123_n.webp"
          alt="global bola player"
        />
        <span className="headpopular">popular matches</span>
        <div className="grouppopular">
          <div
            className="bungkuspopular"
            ref={bungkusPopularRef}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {combinedData
              ? combinedData.map((match, index) => (
                  <div
                    key={index}
                    className="listpopular"
                    onClick={handleMatchClick}
                  >
                    <span className="leaguename">{match.league_name}</span>
                    <span className="leaguecountry">{match.country_name}</span>
                    <span className="matchtime">
                      <span className="tanggal">
                        {formatDate(match.match_date)}
                      </span>
                      <span className="today">{match.match_time} WIB</span>
                    </span>
                    <div className="detailteam">
                      <div className="listdetailteam">
                        <img
                          src={match.team_home_badge}
                          alt={match.match_hometeam_name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/team.webp";
                          }}
                        />
                        <span className="teamname">
                          {match.match_hometeam_name}
                        </span>
                      </div>
                      <span className="min">-</span>
                      <div className="listdetailteam">
                        <img
                          src={match.team_away_badge}
                          alt={match.match_awayteam_name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/img/team.webp";
                          }}
                        />
                        <span className="teamname">
                          {match.match_awayteam_name}
                        </span>
                      </div>
                    </div>
                    <button className="predks">prediksi</button>
                  </div>
                ))
              : Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="listpopular">
                    <div className="loader"></div>
                  </div>
                ))}
          </div>
          <div className="arrowkey kiri" onClick={moveLeft}>
            <Icon icon="teenyicons:left-solid" />
          </div>
          <div className="arrowkey kanan" onClick={moveRight}>
            <Icon icon="teenyicons:right-solid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
