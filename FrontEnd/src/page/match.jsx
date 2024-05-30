import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { useParams } from "react-router-dom";
import {
  fetchMatch,
  fetchFixture,
  fetchHead,
  fetchPrediksi,
} from "../services/api.service";
import Fixture from "../component/Fixture";
import { Icon } from "@iconify/react";
import { renderSkeleton } from "../fragment/Skeleton";

export const MatchPage = () => {
  const [matchData, setMatchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponent, setActiveComponent] = useState("info");
  const [fixtureData, setFixtureData] = useState(null);
  const [activeTeam, setActiveTeam] = useState(
    matchData ? matchData.match_hometeam_id : null,
  );
  const [h2hData, setH2hData] = useState(null);
  const [prediksiData, setPrediksiData] = useState(null);
  const uniqueTypes = new Set();

  const [isStatisticsActive, setStatisticsActive] = useState(false);

  const handleStatisticsClick = () => {
    setStatisticsActive(true);
  };

  const handleEventsClick = () => {
    setStatisticsActive(false);
  };

  const { match_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMatch(match_id);
        setMatchData(data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching match data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [match_id]);

  useEffect(() => {
    if (matchData) {
      const fetchHeadto = async () => {
        try {
          const HomeId = matchData.match_hometeam_id;
          const AwayId = matchData.match_awayteam_id;
          const h2hResponse = await fetchHead(HomeId, AwayId);
          setH2hData(h2hResponse);
        } catch (error) {
          console.error("Error fetching H2H data:", error);
        }
      };

      fetchHeadto();
    }
  }, [matchData]);

  useEffect(() => {
    const fetchPrediksiData = async () => {
      try {
        const prediksiResponse = await fetchPrediksi(match_id);
        setPrediksiData(prediksiResponse);
      } catch (error) {
        console.error("Error fetching prediksi data:", error);
      }
    };

    if (match_id) {
      fetchPrediksiData();
    }
  }, [match_id]);

  useEffect(() => {
    if (matchData) {
      const getFixtureData = async () => {
        try {
          const data = await fetchFixture(matchData.match_hometeam_id);
          const filteredData = data.filter(
            (fixture) =>
              fixture.match_status && fixture.match_status !== "Cancelled",
          );
          setFixtureData(filteredData);
        } catch (error) {
          console.error("Error fetching fixture data:", error);
        }
      };

      getFixtureData();
    }
  }, [matchData]);

  const handleTeamClick = async (teamId) => {
    try {
      setIsLoading(true);
      const data = await fetchFixture(teamId);
      const filteredData = data.filter(
        (fixture) =>
          fixture.match_status && fixture.match_status !== "Cancelled",
      );
      setFixtureData(filteredData);
      setActiveComponent("info");
      setActiveTeam(teamId);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching fixture data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (matchData) {
      setActiveTeam(matchData.match_hometeam_id);
    }
  }, [matchData]);

  const formatDate = (dateString) => {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "info":
        return isLoading ? (
          renderSkeleton()
        ) : matchData ? (
          <div className="groupinfomatch">
            <div className="pilihinfonteam">
              <div
                className={
                  matchData.match_hometeam_id === activeTeam
                    ? "teampertandingan home active"
                    : "teampertandingan home"
                }
                data-teamid={matchData.match_hometeam_id}
                onClick={() => {
                  handleTeamClick(matchData.match_hometeam_id);
                  setActiveTeam(matchData.match_hometeam_id);
                }}
              >
                <span className="textteampertandingan">
                  {matchData.match_hometeam_name}
                </span>
              </div>
              <div
                className={
                  matchData.match_awayteam_id === activeTeam
                    ? "teampertandingan away active"
                    : "teampertandingan away"
                }
                data-teamid={matchData.match_awayteam_id}
                onClick={() => {
                  handleTeamClick(matchData.match_awayteam_id);
                  setActiveTeam(matchData.match_awayteam_id);
                }}
              >
                <span className="textteampertandingan">
                  {matchData.match_awayteam_name}
                </span>
              </div>
            </div>
            <div className="listgroupdatainfo">
              <Fixture
                fixtureData={fixtureData}
                matchData={matchData}
                activeTeam={activeTeam}
              />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        );
      case "summary":
        return (
          <div className="groupsummarymatch">
            {matchData.match_status ? (
              <div className="groupheadliga">
                <img
                  src={matchData.league_logo}
                  alt={matchData.league_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/team.webp";
                  }}
                />
                <div className="groupnamaheadliga">
                  <span className="namaliga">{matchData.league_name}</span>
                  <span className="negaraliga">{matchData.country_name}</span>
                </div>
              </div>
            ) : (
              <span className="statuspertandingan">
                Summary Pertandingan belum Tersedia
              </span>
            )}

            {matchData.match_status && (
              <div className="groupstatuspertandingan">
                <div className="teambadge home">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_home_badge}
                      alt={matchData.match_hometeam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="statusteam">H</span>
                    <span className="namateampertandingan">
                      {matchData.match_hometeam_name}
                    </span>
                  </div>
                </div>
                <div className="scorestatus">
                  <span className="tanggalmatchinfo">
                    {matchData && formatDate(matchData.match_date)}
                  </span>
                  <span className="scoresaatini">
                    {matchData.match_hometeam_score} -{" "}
                    {matchData.match_awayteam_score}
                  </span>
                  <span className="statusbabak">{matchData.match_status}'</span>
                </div>
                <div className="teambadge away">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_away_badge}
                      alt={matchData.match_awayteam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="namateampertandingan">
                      {matchData.match_awayteam_name}
                    </span>
                    <span className="statusteam">A</span>
                  </div>
                </div>
              </div>
            )}

            {matchData.match_status && (
              <div className="groupbuttondetail">
                <span
                  className={`buttondetail events ${!isStatisticsActive ? "active" : ""}`}
                  onClick={handleEventsClick}
                >
                  Events
                </span>
                <span
                  className={`buttondetail statistics ${isStatisticsActive ? "active" : ""}`}
                  onClick={handleStatisticsClick}
                >
                  Statistics
                </span>
              </div>
            )}

            {matchData.match_status && (
              <div className="grouprenderpertandingandetail">
                {isStatisticsActive ? (
                  <div className="groupsdatalineupsmatch">
                    {matchData.statistics.length === 0 ? (
                      <div className="data-belum-ada">Data belum tersedia</div>
                    ) : (
                      matchData.statistics.map((statistic, index) => {
                        if (!uniqueTypes.has(statistic.type)) {
                          uniqueTypes.add(statistic.type);

                          const total =
                            parseInt(statistic.home) + parseInt(statistic.away);
                          const homePercentage =
                            total !== 0
                              ? (parseInt(statistic.home) / total) * 100
                              : 0;
                          const awayPercentage =
                            total !== 0
                              ? (parseInt(statistic.away) / total) * 100
                              : 0;

                          return (
                            <div className="liststatistic" key={index}>
                              <div className="grouptextstat">
                                <span className="homestat">
                                  {statistic.home}
                                </span>
                                <span className="titlestat">
                                  {statistic.type}
                                </span>
                                <span className="awaystat">
                                  {statistic.away}
                                </span>
                              </div>
                              <div className="groubarstat">
                                <div className="statbar home">
                                  <div
                                    className="volumebar"
                                    style={{ width: `${homePercentage}%` }}
                                  ></div>
                                </div>
                                <div className="statbar away">
                                  <div
                                    className="volumebar"
                                    style={{ width: `${awayPercentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })
                    )}
                  </div>
                ) : (
                  <div className="grouphasilevents">
                    {[
                      ...matchData.goalscorer.map((goal) => ({
                        type: "goal",
                        ...goal,
                      })),
                      ...matchData.cards.map((card) => ({
                        type: "card",
                        ...card,
                      })),
                      ...matchData.substitutions.home.map((substitution) => ({
                        type: "substitution",
                        ...substitution,
                        team: "home",
                      })),
                      ...matchData.substitutions.away.map((substitution) => ({
                        type: "substitution",
                        ...substitution,
                        team: "away",
                      })),
                    ]
                      .sort((a, b) => {
                        const timeA = parseInt(a.time.match(/\d+/)[0]);
                        const timeB = parseInt(b.time.match(/\d+/)[0]);
                        return timeA - timeB;
                      })
                      .reduce((acc, event, index, array) => {
                        acc.push(event);
                        const time = parseInt(event.time.match(/\d+/)[0]);
                        if (time <= 45) {
                          const nextTime = parseInt(
                            array[index + 1]?.time.match(/\d+/)[0],
                          );
                          if (nextTime > 45 || !nextTime) {
                            acc.push({ type: "scorehalf" });
                          }
                        }
                        return acc;
                      }, [])
                      .map((event, index) => (
                        <div
                          className={`listhasilevents ${event.type === "scorehalf" ? "scorehalf" : ""}`}
                          key={index}
                        >
                          {event.type === "scorehalf" ? (
                            <>
                              <span className="waktukejadian">HT</span>
                              <span className="scorehalf">
                                {matchData.match_hometeam_halftime_score} -{" "}
                                {matchData.match_awayteam_halftime_score}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="waktukejadian">
                                {event.time}'
                              </span>
                              <div
                                className={`grouplistjadian ${event.team || (event.home_scorer ? "home" : "away")}`}
                              >
                                <div className="groupkejadian">
                                  {event.type === "goal" && (
                                    <>
                                      <span className="namapemain">
                                        {event.home_scorer || event.away_scorer}
                                      </span>
                                      <Icon icon="ph:soccer-ball-thin" />
                                      <span className="score">
                                        {event.score}
                                      </span>
                                    </>
                                  )}
                                  {event.type === "card" && (
                                    <>
                                      <Icon
                                        icon="mdi:card"
                                        className={event.card}
                                      />
                                      <span className="textkejadian">
                                        {event.home_fault || event.away_fault}
                                      </span>
                                    </>
                                  )}
                                  {event.type === "substitution" && (
                                    <>
                                      <Icon
                                        icon="mdi:arrow-bottom-bold"
                                        className="subkeluar"
                                      />
                                      <span className="textkejadian">
                                        {event.substitution}
                                      </span>
                                      <Icon
                                        icon="mdi:arrow-top-bold"
                                        className="submasuk"
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    {matchData.goalscorer.length === 0 &&
                      matchData.cards.length === 0 &&
                      matchData.substitutions.home.length === 0 &&
                      matchData.substitutions.away.length === 0 && (
                        <div className="data-belum-ada">
                          Data belum tersedia
                        </div>
                      )}
                    {matchData.match_status === "Finished" && (
                      <div className="listhasilevents scorehalf">
                        <span className="waktukejadian">FT</span>
                        <span className="scorehalf">
                          {matchData.match_hometeam_ft_score} -{" "}
                          {matchData.match_awayteam_ft_score}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case "lineups":
        return (
          <div className="grouplineupsmatch">
            {matchData.match_status ? (
              <div className="groupheadliga">
                <img
                  src={matchData.league_logo}
                  alt={matchData.league_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/team.webp";
                  }}
                />
                <div className="groupnamaheadliga">
                  <span className="namaliga">{matchData.league_name}</span>
                  <span className="negaraliga">{matchData.country_name}</span>
                </div>
              </div>
            ) : (
              <span className="statuspertandingan">
                Line-Ups belum Tersedia
              </span>
            )}

            {matchData.match_status && (
              <div className="groupstatuspertandingan">
                <div className="teambadge home">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_home_badge}
                      alt={matchData.match_hometeam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="statusteam">H</span>
                    <span className="namateampertandingan">
                      {matchData.match_hometeam_name}
                    </span>
                  </div>
                </div>
                <div className="scorestatus">
                  <span className="tanggalmatchinfo">
                    {matchData && formatDate(matchData.match_date)}
                  </span>
                  <span className="scoresaatini">
                    {matchData.match_hometeam_score} -{" "}
                    {matchData.match_awayteam_score}
                  </span>
                  <span className="statusbabak">{matchData.match_status}'</span>
                </div>
                <div className="teambadge away">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_away_badge}
                      alt={matchData.match_awayteam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="namateampertandingan">
                      {matchData.match_awayteam_name}
                    </span>
                    <span className="statusteam">A</span>
                  </div>
                </div>
              </div>
            )}

            {matchData.match_status && (
              <div className="groupsdatalineupsmatch">
                <div className="listdatalineupsmatch">
                  <span className="titlelineups">Starting Lineups</span>
                  <div className="groupdatateam">
                    <div className="grouptteam home">
                      {matchData.lineup.home.starting_lineups.length === 0 ? (
                        <div className="datakosong">Data tidak ada</div>
                      ) : (
                        matchData.lineup.home.starting_lineups.map(
                          (player, index) => (
                            <div className="listteam" key={index}>
                              <img
                                src={matchData.team_home_badge}
                                alt={matchData.match_hometeam_name}
                              />
                              <span className="nomorpemain">
                                {player.lineup_number}
                              </span>
                              <span className="namapemain">
                                {player.lineup_player}
                              </span>
                            </div>
                          ),
                        )
                      )}
                    </div>
                    <div className="grouptteam away">
                      {matchData.lineup.away.starting_lineups.length === 0 ? (
                        <div className="datakosong">Data tidak ada</div>
                      ) : (
                        matchData.lineup.away.starting_lineups.map(
                          (player, index) => (
                            <div className="listteam" key={index}>
                              <span className="namapemain">
                                {player.lineup_player}
                              </span>
                              <span className="nomorpemain">
                                {player.lineup_number}
                              </span>
                              <img
                                src={matchData.team_away_badge}
                                alt={matchData.match_awayteam_name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/assets/img/team.webp";
                                }}
                              />
                            </div>
                          ),
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="listdatalineupsmatch">
                  <span className="titlelineups">Substitutes</span>
                  <div className="groupdatateam">
                    <div className="grouptteam home">
                      {matchData.lineup.home.substitutes.length === 0 ? (
                        <div className="datakosong">Data tidak ada</div>
                      ) : (
                        matchData.lineup.home.substitutes.map(
                          (player, index) => (
                            <div className="listteam" key={index}>
                              <img
                                src={matchData.team_home_badge}
                                alt={matchData.match_hometeam_name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/assets/img/team.webp";
                                }}
                              />
                              <span className="nomorpemain">
                                {player.lineup_number}
                              </span>
                              <span className="namapemain">
                                {player.lineup_player}
                              </span>
                            </div>
                          ),
                        )
                      )}
                    </div>
                    <div className="grouptteam away">
                      {matchData.lineup.away.substitutes.length === 0 ? (
                        <div className="datakosong">Data tidak ada</div>
                      ) : (
                        matchData.lineup.away.substitutes.map(
                          (player, index) => (
                            <div className="listteam" key={index}>
                              <span className="namapemain">
                                {player.lineup_player}
                              </span>
                              <span className="nomorpemain">
                                {player.lineup_number}
                              </span>
                              <img
                                src={matchData.team_away_badge}
                                alt={matchData.match_awayteam_name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/assets/img/team.webp";
                                }}
                              />
                            </div>
                          ),
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="listdatalineupsmatch">
                  <span className="titlelineups">Coaches</span>
                  <div className="groupdatateam">
                    <div className="grouptteam home">
                      {matchData.lineup.home.coach.length === 0 ? (
                        <div className="datakosong">Data tidak ada</div>
                      ) : (
                        matchData.lineup.home.coach.map((coach, index) => (
                          <div className="listteam" key={index}>
                            <img
                              src={matchData.team_home_badge}
                              alt={matchData.match_hometeam_name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/assets/img/team.webp";
                              }}
                            />
                            <span className="nomorpemain">
                              {coach.lineup_number}
                            </span>
                            <span className="namapemain">
                              {coach.lineup_player}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="grouptteam away">
                      {matchData.lineup.away.coach.length === 0 ? (
                        <div className="datakosong">Data tidak ada</div>
                      ) : (
                        matchData.lineup.away.coach.map((coach, index) => (
                          <div className="listteam" key={index}>
                            <span className="namapemain">
                              {coach.lineup_player}
                            </span>
                            <span className="nomorpemain">
                              {coach.lineup_number}
                            </span>
                            <img
                              src={matchData.team_away_badge}
                              alt={matchData.match_awayteam_name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/assets/img/team.webp";
                              }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "h2h":
        return (
          <div className="grouph2hmatch">
            {matchData && (
              <div className="groupheadliga">
                <img
                  src={matchData.league_logo}
                  alt={matchData.league_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/team.webp";
                  }}
                />
                <div className="groupnamaheadliga">
                  <span className="namaliga">{matchData.league_name}</span>
                  <span className="negaraliga">{matchData.country_name}</span>
                </div>
              </div>
            )}

            {matchData && (
              <div className="groupstatuspertandingan">
                <div className="teambadge home">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_home_badge}
                      alt={matchData.match_hometeam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="statusteam">H</span>
                    <span className="namateampertandingan">
                      {matchData.match_hometeam_name}
                    </span>
                  </div>
                </div>
                <div className="scorestatus">
                  <span className="tanggalmatchinfo">
                    {matchData && formatDate(matchData.match_date)}
                  </span>
                  <span className="scoresaatini">
                    {matchData.match_hometeam_score} -{" "}
                    {matchData.match_awayteam_score}
                  </span>
                  <span className="statusbabak">{matchData.match_status}'</span>
                </div>
                <div className="teambadge away">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_away_badge}
                      alt={matchData.match_awayteam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="namateampertandingan">
                      {matchData.match_awayteam_name}
                    </span>
                    <span className="statusteam">A</span>
                  </div>
                </div>
              </div>
            )}

            {matchData && (
              <div className="groupdatah2h">
                <div className="listdatah2h">
                  <div className="groutitleh2h">
                    <span className="titleh2h">Head-To-Head Matches</span>
                    <span className="teamh2h">
                      {matchData.match_hometeam_name} vs{" "}
                      {matchData.match_awayteam_name}
                    </span>
                  </div>
                  <div className="grouplistpertandinganh2h">
                    {h2hData &&
                    h2hData.firstTeam_VS_secondTeam &&
                    h2hData.firstTeam_VS_secondTeam.length === 0 ? (
                      <div className="prediksibelumada">
                        Belum pernah bertanding
                      </div>
                    ) : (
                      h2hData &&
                      h2hData.firstTeam_VS_secondTeam &&
                      h2hData.firstTeam_VS_secondTeam.map((match, index) => (
                        <div className="listpertandinganh2h" key={index}>
                          {match.match_date && (
                            <span className="tanggalh2h">
                              {formatDate(match.match_date)}
                            </span>
                          )}
                          {match.league_name && (
                            <span className="namaligah2h">
                              {match.league_name}
                            </span>
                          )}
                          <span className="teamh2h home">
                            {match.match_hometeam_name}
                          </span>
                          <span className="scoreh2h">
                            {match.match_hometeam_score} -{" "}
                            {match.match_awayteam_score}
                          </span>
                          <span className="teamh2h away">
                            {match.match_awayteam_name}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="listdatah2h">
                  <div className="groutitleh2h">
                    <span className="titleh2h">Last Matches</span>
                    <span className="teamh2h">
                      {matchData.match_hometeam_name}
                    </span>
                  </div>
                  <div className="grouplistpertandinganh2h">
                    {h2hData &&
                      h2hData.firstTeam_lastResults.map((match, index) => (
                        <div className="listpertandinganh2h" key={index}>
                          {match.match_date && (
                            <span className="tanggalh2h">
                              {formatDate(match.match_date)}
                            </span>
                          )}
                          {match.league_name && (
                            <span className="namaligah2h">
                              {match.league_name}
                            </span>
                          )}
                          <span className="teamh2h home">
                            {match.match_hometeam_name}
                          </span>
                          <span className="scoreh2h">
                            {match.match_hometeam_score} -{" "}
                            {match.match_awayteam_score}
                          </span>
                          <span className="teamh2h away">
                            {match.match_awayteam_name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="listdatah2h">
                  <div className="groutitleh2h">
                    <span className="titleh2h">Last Matches</span>
                    <span className="teamh2h">
                      {matchData.match_awayteam_name}
                    </span>
                  </div>
                  <div className="grouplistpertandinganh2h">
                    {h2hData &&
                      h2hData.secondTeam_lastResults.map((match, index) => (
                        <div className="listpertandinganh2h" key={index}>
                          {match.match_date && (
                            <span className="tanggalh2h">
                              {formatDate(match.match_date)}
                            </span>
                          )}
                          {match.league_name && (
                            <span className="namaligah2h">
                              {match.league_name}
                            </span>
                          )}
                          <span className="teamh2h home">
                            {match.match_hometeam_name}
                          </span>
                          <span className="scoreh2h">
                            {match.match_hometeam_score} -{" "}
                            {match.match_awayteam_score}
                          </span>
                          <span className="teamh2h away">
                            {match.match_awayteam_name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "prediksi":
        return (
          <div className="groupprediksimatch">
            {matchData && (
              <div className="groupheadliga">
                <img
                  src={matchData.league_logo}
                  alt={matchData.league_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/team.webp";
                  }}
                />
                <div className="groupnamaheadliga">
                  <span className="namaliga">{matchData.league_name}</span>
                  <span className="negaraliga">{matchData.country_name}</span>
                </div>
              </div>
            )}

            {matchData && (
              <div className="groupstatuspertandingan">
                <div className="teambadge home">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_home_badge}
                      alt={matchData.match_hometeam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="statusteam">H</span>
                    <span className="namateampertandingan">
                      {matchData.match_hometeam_name}
                    </span>
                  </div>
                </div>
                <div className="scorestatus">
                  <span className="tanggalmatchinfo">
                    {matchData && formatDate(matchData.match_date)}
                  </span>
                  <span className="scoresaatini">
                    {matchData.match_hometeam_score} -{" "}
                    {matchData.match_awayteam_score}
                  </span>
                  <span className="statusbabak">{matchData.match_status}'</span>
                </div>
                <div className="teambadge away">
                  <div className="teambadgeimg">
                    <img
                      src={matchData.team_away_badge}
                      alt={matchData.match_awayteam_name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/team.webp";
                      }}
                    />
                  </div>
                  <div className="groupnamateam">
                    <span className="namateampertandingan">
                      {matchData.match_awayteam_name}
                    </span>
                    <span className="statusteam">A</span>
                  </div>
                </div>
              </div>
            )}

            {prediksiData ? (
              prediksiData.length > 0 ? (
                <div className="groupdataprediksi">
                  <div className="listdataprediksi">
                    <div className="titleprediksi">Prediksi 1X2</div>
                    <div className="grouppersentaseprediksi">
                      <div className="listpresentase">
                        <span className="titlepresentase">Home Win(1)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_HW) > parseFloat(prediksiData[0].prob_D) && parseFloat(prediksiData[0].prob_HW) > parseFloat(prediksiData[0].prob_AW) ? "bggreen" : parseFloat(prediksiData[0].prob_HW) < parseFloat(prediksiData[0].prob_D) && parseFloat(prediksiData[0].prob_HW) < parseFloat(prediksiData[0].prob_AW) ? "bgred" : "bgyellow"}`}
                        >
                          {parseFloat(prediksiData[0].prob_HW).toFixed(0)}%
                        </span>
                      </div>
                      <div className="listpresentase">
                        <span className="titlepresentase">Draw(X)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_D) > parseFloat(prediksiData[0].prob_HW) && parseFloat(prediksiData[0].prob_D) > parseFloat(prediksiData[0].prob_AW) ? "bggreen" : parseFloat(prediksiData[0].prob_D) < parseFloat(prediksiData[0].prob_HW) && parseFloat(prediksiData[0].prob_D) < parseFloat(prediksiData[0].prob_AW) ? "bgred" : "bgyellow"}`}
                        >
                          {parseFloat(prediksiData[0].prob_D).toFixed(0)}%
                        </span>
                      </div>
                      <div className="listpresentase">
                        <span className="titlepresentase">Away Win(2)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_AW) > parseFloat(prediksiData[0].prob_HW) && parseFloat(prediksiData[0].prob_AW) > parseFloat(prediksiData[0].prob_D) ? "bggreen" : parseFloat(prediksiData[0].prob_AW) < parseFloat(prediksiData[0].prob_HW) && parseFloat(prediksiData[0].prob_AW) < parseFloat(prediksiData[0].prob_D) ? "bgred" : "bgyellow"}`}
                        >
                          {parseFloat(prediksiData[0].prob_AW).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="listdataprediksi">
                    <div className="titleprediksi">Double Chance</div>
                    <div className="grouppersentaseprediksi">
                      <div className="listpresentase">
                        <span className="titlepresentase">
                          Home Win or Draw(1X)
                        </span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_HW_D) > parseFloat(prediksiData[0].prob_AW_D) && parseFloat(prediksiData[0].prob_HW_D) > parseFloat(prediksiData[0].prob_HW_AW) ? "bggreen" : parseFloat(prediksiData[0].prob_HW_D) < parseFloat(prediksiData[0].prob_AW_D) && parseFloat(prediksiData[0].prob_HW_D) < parseFloat(prediksiData[0].prob_HW_AW) ? "bgred" : "bgyellow"}`}
                        >
                          {parseFloat(prediksiData[0].prob_HW_D).toFixed(0)}%
                        </span>
                      </div>
                      <div className="listpresentase">
                        <span className="titlepresentase">
                          Away Win or Draw(2X)
                        </span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_AW_D) > parseFloat(prediksiData[0].prob_HW_D) && parseFloat(prediksiData[0].prob_AW_D) > parseFloat(prediksiData[0].prob_HW_AW) ? "bggreen" : parseFloat(prediksiData[0].prob_AW_D) < parseFloat(prediksiData[0].prob_HW_D) && parseFloat(prediksiData[0].prob_AW_D) < parseFloat(prediksiData[0].prob_HW_AW) ? "bgred" : "bgyellow"}`}
                        >
                          {parseFloat(prediksiData[0].prob_AW_D).toFixed(0)}%
                        </span>
                      </div>
                      <div className="listpresentase">
                        <span className="titlepresentase">
                          Home Win or Away Win(12)
                        </span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_HW_AW) > parseFloat(prediksiData[0].prob_HW_D) && parseFloat(prediksiData[0].prob_HW_AW) > parseFloat(prediksiData[0].prob_AW_D) ? "bggreen" : parseFloat(prediksiData[0].prob_HW_AW) < parseFloat(prediksiData[0].prob_HW_D) && parseFloat(prediksiData[0].prob_HW_AW) < parseFloat(prediksiData[0].prob_AW_D) ? "bgred" : "bgyellow"}`}
                        >
                          {parseFloat(prediksiData[0].prob_HW_AW).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="listdataprediksi">
                    <div className="titleprediksi">
                      Over Under 1.5 Goals/Match
                    </div>
                    <div className="grouppersentaseprediksi overunder">
                      <div className="listpresentase">
                        <span className="titlepresentase">Over(O)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_O_1) > parseFloat(prediksiData[0].prob_U_1) ? "bggreen" : parseFloat(prediksiData[0].prob_O_1) === parseFloat(prediksiData[0].prob_U_1) ? "bgyellow" : "bgred"}`}
                        >
                          {parseFloat(prediksiData[0].prob_O_1).toFixed(0)}%
                        </span>
                      </div>
                      <div className="listpresentase">
                        <span className="titlepresentase">Under(U)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_U_1) > parseFloat(prediksiData[0].prob_O_1) ? "bggreen" : parseFloat(prediksiData[0].prob_U_1) === parseFloat(prediksiData[0].prob_O_1) ? "bgyellow" : "bgred"}`}
                        >
                          {parseFloat(prediksiData[0].prob_U_1).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="listdataprediksi">
                    <div className="titleprediksi">
                      Over Under 2.5 Goals/Match
                    </div>
                    <div className="grouppersentaseprediksi overunder">
                      <div className="listpresentase">
                        <span className="titlepresentase">Over(O)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_O) > parseFloat(prediksiData[0].prob_U) ? "bggreen" : parseFloat(prediksiData[0].prob_O) === parseFloat(prediksiData[0].prob_U) ? "bgyellow" : "bgred"}`}
                        >
                          {parseFloat(prediksiData[0].prob_O).toFixed(0)}%
                        </span>
                      </div>
                      <div className="listpresentase">
                        <span className="titlepresentase">Under(U)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_U) > parseFloat(prediksiData[0].prob_O) ? "bggreen" : parseFloat(prediksiData[0].prob_U) === parseFloat(prediksiData[0].prob_O) ? "bgyellow" : "bgred"}`}
                        >
                          {parseFloat(prediksiData[0].prob_U).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="listdataprediksi">
                    <div className="titleprediksi">
                      Over Under 3.5 Goals/Match
                    </div>
                    <div className="grouppersentaseprediksi overunder">
                      <div className="listpresentase">
                        <span className="titlepresentase">Over(O)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_O_3) > parseFloat(prediksiData[0].prob_U_3) ? "bggreen" : parseFloat(prediksiData[0].prob_O_3) === parseFloat(prediksiData[0].prob_U_3) ? "bgyellow" : "bgred"}`}
                        >
                          {parseFloat(prediksiData[0].prob_O_3).toFixed(0)}%
                        </span>
                      </div>
                      <div className="listpresentase">
                        <span className="titlepresentase">Under(U)</span>
                        <span
                          className={`nilaipersentase ${parseFloat(prediksiData[0].prob_U_3) > parseFloat(prediksiData[0].prob_O_3) ? "bggreen" : parseFloat(prediksiData[0].prob_U_3) === parseFloat(prediksiData[0].prob_O_3) ? "bgyellow" : "bgred"}`}
                        >
                          {parseFloat(prediksiData[0].prob_U_3).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="prediksibelumada">Prediksi belum tersedia</div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <Lobbynavbar pageTitle="info pertandingan" />
      <div className="secmatch">
        <div className="groupsecmatch">
          <div className="groupmenumatch">
            <span
              className={
                activeComponent === "info"
                  ? "buttonmatch active"
                  : "buttonmatch"
              }
              onClick={() => setActiveComponent("info")}
            >
              Info
            </span>
            <span
              className={
                activeComponent === "summary"
                  ? "buttonmatch active"
                  : "buttonmatch"
              }
              onClick={() => setActiveComponent("summary")}
            >
              Summary
            </span>
            <span
              className={
                activeComponent === "lineups"
                  ? "buttonmatch active"
                  : "buttonmatch"
              }
              onClick={() => setActiveComponent("lineups")}
            >
              Line-Ups
            </span>
            <span
              className={
                activeComponent === "h2h" ? "buttonmatch active" : "buttonmatch"
              }
              onClick={() => setActiveComponent("h2h")}
            >
              H2H
            </span>
            <span
              className={
                activeComponent === "prediksi"
                  ? "buttonmatch active"
                  : "buttonmatch"
              }
              onClick={() => setActiveComponent("prediksi")}
            >
              Prediksi
            </span>
          </div>
          <div className="grouphasilbuttonmatch">{renderComponent()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MatchPage;
