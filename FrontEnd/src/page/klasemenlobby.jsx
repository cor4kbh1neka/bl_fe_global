import React, { useEffect, useState } from "react";
import Lobbynavbar from "../fragment/Lobbynavbar";
import Footer from "../component/Footer";
import {
  fetchDataLiga,
  dataLeague,
  fetchKlasemenLiga,
} from "../services/api.service";
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

export const KlasemenLobbyPage = () => {
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
      <Lobbynavbar pageTitle="klasemen" />
      <div className="secklasemenlobby">
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

export default KlasemenLobbyPage;
