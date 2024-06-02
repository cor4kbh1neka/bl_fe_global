import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import { Logindaftar } from "../fragment/Logindaftar";
import Footer from "../component/Footer";
import {
  fetchDataLiga,
  dataLeague,
  fetchKlasemenLiga,
  getProvide,
} from "../services/api.service";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";

const TeamRow = ({
  position,
  logo,
  name,
  matchesPlayed,
  goalsAgainst,
  goalsFor,
  goalsDifference,
  points,
}) => (
  <tr>
    <td>{position}</td>
    <td>
      <div className="listteam">
        <img
          src={logo}
          alt="team"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/img/team.webp";
          }}
        />
        <span className="namateam">{name}</span>
      </div>
    </td>
    <td className="ratatengah">{matchesPlayed}</td>
    <td className="ratatengah">{goalsAgainst}</td>
    <td className="ratatengah">{goalsFor}</td>
    <td className="ratatengah">{goalsDifference}</td>
    <td className="ratatengah">{points}</td>
  </tr>
);

const KlasemenhomePage = () => {
  const [selectedLeague, setSelectedLeague] = useState({
    ligaName: "",
    leagueId: "152",
    imgLiga: "",
    namaLiga: "",
    negaraLiga: "",
  });
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);

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
    const fetchInitialLeagueData = async () => {
      try {
        const storedData = localStorage.getItem("dataLigastor");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const lastFetchedTime = parsedData.lastFetchedTime;
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - lastFetchedTime;
          const hoursDiff = timeDiff / (1000 * 60 * 60);

          if (hoursDiff < 24) {
            setFetchedData(parsedData.data);
            setLoading(false);
            const selectedLeagueData = parsedData.data.find(
              (league) => league.league_id === selectedLeague.leagueId,
            );
            if (selectedLeagueData) {
              setSelectedLeague({
                ligaName: selectedLeagueData.league_name,
                leagueId: selectedLeague.leagueId,
                imgLiga: selectedLeagueData.league_logo,
                namaLiga: selectedLeagueData.league_name,
                negaraLiga: selectedLeagueData.country_name,
              });
            }
          } else {
            await fetchDataAndSetLeagueData();
          }
        } else {
          await fetchDataAndSetLeagueData();
        }
      } catch (error) {
        console.error("Error fetching initial league data:", error);
      }
    };

    const fetchDataAndSetLeagueData = async () => {
      try {
        const fetchedData = await fetchDataLiga();
        const sortedData = [...fetchedData].sort((a, b) => {
          if (a.league_id === "152") return -1;
          if (b.league_id === "152") return 1;
          return 0;
        });

        setFetchedData(sortedData);
        setLoading(false);
        const newData = {
          data: sortedData,
          lastFetchedTime: new Date().getTime(),
        };
        localStorage.setItem("dataLigastor", JSON.stringify(newData));

        if (sortedData && sortedData.length > 0) {
          const defaultLeagueData = sortedData.find(
            (league) => league.league_id === "152",
          );
          setSelectedLeague({
            ligaName: defaultLeagueData.league_name,
            leagueId: defaultLeagueData.league_id,
            imgLiga: defaultLeagueData.league_logo,
            namaLiga: defaultLeagueData.league_name,
            negaraLiga: defaultLeagueData.country_name,
          });
        }
      } catch (error) {
        console.error("Error fetching data and setting league data:", error);
      }
    };

    fetchInitialLeagueData();
  }, []);

  useEffect(() => {
    const fetchFetchedData = async () => {
      try {
        const storedData = localStorage.getItem("dataLigastor");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const lastFetchedTime = parsedData.lastFetchedTime;
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - lastFetchedTime;
          const hoursDiff = timeDiff / (1000 * 60 * 60);

          if (hoursDiff >= 24) {
            await fetchDataAndSetLeagueData();
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching fetched data:", error);
      }
    };

    fetchFetchedData();
  }, []);

  useEffect(() => {
    const fetchInitialKlasemenData = async () => {
      setLoading(true);
      const klasemenData = await fetchKlasemenLiga(selectedLeague.leagueId);
      const uniquePositions = new Set();
      const filteredTeams = klasemenData.filter((team) => {
        if (!uniquePositions.has(team.overall_league_position)) {
          uniquePositions.add(team.overall_league_position);
          return true;
        }
        return false;
      });

      setSelectedTeams(filteredTeams);
      setLoading(false);
    };

    fetchInitialKlasemenData();
  }, [selectedLeague.leagueId]);

  const handleLeagueChange = async (event) => {
    const selectedLeagueId = event.target.value;
    const storedData = localStorage.getItem("dataLigastor");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const selectedLeagueData = parsedData.data.find(
        (league) => league.league_id === selectedLeagueId,
      );
      setSelectedLeague({
        ligaName: selectedLeagueData.league_name,
        leagueId: selectedLeagueId,
        imgLiga: selectedLeagueData.league_logo,
        namaLiga: selectedLeagueData.league_name,
        negaraLiga: selectedLeagueData.country_name,
      });
    }
    const klasemenData = await fetchKlasemenLiga(selectedLeagueId);

    const uniquePositions = new Set();

    const filteredTeams = klasemenData.filter((team) => {
      if (!uniquePositions.has(team.overall_league_position)) {
        uniquePositions.add(team.overall_league_position);
        return true;
      }
      return false;
    });

    setSelectedTeams(filteredTeams);
    setLoading(false);
  };

  return (
    <div className="container">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | Informasi Klasemen Liga Terupdate`}
          customDescription={`Dapatkan informasi klasemen liga terupdate tentang posisi tim favorit Anda di ${dataProvide.nmwebsite} yaitu website taruhan sepak bola dan olahraga terpercaya.`}
          customKeywords="Klasemen Liga Terbaru, Update Klasemen Liga, Posisi Tim Sepak Bola, Taruhan Sepak Bola, Website Taruhan Olahraga, Update Sepak Bola Terbaru, Taruhan Sepak Bola Terpercaya, Posisi Tim Favorit, Info Klasemen Liga, Website Olahraga Terpercaya"
        />
      ) : (
        <MetaTags
          customTitle="Informasi Klasemen Liga Terupdate"
          customDescription="Dapatkan informasi klasemen liga terupdate tentang posisi tim favorit Anda di website taruhan sepak bola dan olahraga terpercaya."
          customKeywords="Klasemen Liga Terbaru, Update Klasemen Liga, Posisi Tim Sepak Bola, Taruhan Sepak Bola, Website Taruhan Olahraga, Update Sepak Bola Terbaru, Taruhan Sepak Bola Terpercaya, Posisi Tim Favorit, Info Klasemen Liga, Website Olahraga Terpercaya"
        />
      )}
      <Logo />
      <div className="secklasemen">
        <div className="titlesec">
          <h1>KLASEMEN</h1>
          <p>Cek Klasemen Liga di {dataProvide.nmwebsite}</p>
        </div>
        <Logindaftar />
        <div className="groupklasemen">
          <select
            id="namaliga"
            name="namaliga"
            className="form-select"
            onChange={handleLeagueChange}
            value={selectedLeague.leagueId}
          >
            <option value="" className="Pilih Liga" disabled>
              Pilih Liga
            </option>
            {dataLeague.map((league) => (
              <option key={league.leagueId} value={league.leagueId}>
                {league.negara} - {league.ligaName}
              </option>
            ))}
          </select>
          <div className="grouptitleliga">
            <img
              src={selectedLeague.imgLiga || ""}
              alt={selectedLeague.namaLiga}
              className="imgtitleliga"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/img/team.webp";
              }}
            />
            <div className="grouptexttitleliga">
              <span className="namaliga">{selectedLeague.namaLiga}</span>
              <span className="negaraliga">{selectedLeague.negaraLiga}</span>
            </div>
          </div>
          <div className="datatable">
            <table>
              <tbody>
                <tr>
                  <th>#</th>
                  <th>TEAM</th>
                  <th className="ratatengah">P</th>
                  <th className="ratatengah">GM</th>
                  <th className="ratatengah">GK</th>
                  <th className="ratatengah">SG</th>
                  <th className="ratatengah">POIN</th>
                </tr>
                {loading ? (
                  <tr>
                    <td colSpan="7">
                      <div className="loading-row">
                        <div className="loader"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  selectedTeams.map((team, index) => (
                    <TeamRow
                      key={team.team_id + index}
                      position={team.overall_league_position}
                      logo={team.team_badge}
                      name={team.team_name}
                      matchesPlayed={team.overall_league_payed}
                      goalsAgainst={team.overall_league_GF}
                      goalsFor={team.overall_league_GA}
                      goalsDifference={
                        team.overall_league_GF - team.overall_league_GA
                      }
                      points={team.overall_league_PTS}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default KlasemenhomePage;
