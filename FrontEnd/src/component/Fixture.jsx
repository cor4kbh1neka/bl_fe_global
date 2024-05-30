import React from "react";

const Fixture = ({ fixtureData, matchData, activeTeam }) => {
  if (!fixtureData) return null;

  const fixtureByLeague = {};

  fixtureData.forEach((fixture) => {
    if (!fixtureByLeague[fixture.league_name]) {
      fixtureByLeague[fixture.league_name] = [];
    }
    fixtureByLeague[fixture.league_name].push(fixture);
  });
  Object.values(fixtureByLeague).forEach((fixtures) => {
    fixtures.sort((a, b) => new Date(b.match_date) - new Date(a.match_date));
  });
  const sortedLeagues = Object.keys(fixtureByLeague).sort((a, b) => {
    const latestFixtureDateA = new Date(fixtureByLeague[a][0].match_date);
    const latestFixtureDateB = new Date(fixtureByLeague[b][0].match_date);
    return latestFixtureDateB - latestFixtureDateA;
  });

  return sortedLeagues.map((leagueName) => (
    <div className="listgroupliga" key={leagueName}>
      <div className="headliga">
        <img
          src={fixtureByLeague[leagueName][0].league_logo}
          alt={fixtureByLeague[leagueName][0].league_name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/img/team.webp";
          }}
        />
        <div className="grouptexttitleliga">
          <span className="namaliga">{leagueName}</span>
          <span className="negaraliga">
            {fixtureByLeague[leagueName][0].country_name}
          </span>
        </div>
      </div>
      <div className="datagrouppertandingan">
        {fixtureByLeague[leagueName].map((fixture, index) => (
          <div className="grouppertandingan" key={index}>
            <div className="leftpertandingan">
              <span className="tanggalpertandingan">{fixture.match_date}</span>
              <div
                className="grpteam"
                data-teamid={matchData.match_hometeam_id}
              >
                <img
                  src={
                    activeTeam === matchData.match_hometeam_id
                      ? matchData.team_home_badge
                      : matchData.team_away_badge
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/team.webp";
                  }}
                  alt="nama team"
                />
                <span className="pertandingannamateam">
                  {activeTeam === matchData.match_hometeam_id
                    ? matchData.match_hometeam_name
                    : matchData.match_awayteam_name}
                </span>
              </div>
            </div>
            <span
              className="rightpertandingan"
              data-hasil={
                activeTeam === fixture.match_hometeam_id
                  ? parseInt(fixture.match_hometeam_score) >
                    parseInt(fixture.match_awayteam_score)
                    ? "w"
                    : parseInt(fixture.match_hometeam_score) ===
                        parseInt(fixture.match_awayteam_score)
                      ? "d"
                      : "l"
                  : parseInt(fixture.match_awayteam_score) >
                      parseInt(fixture.match_hometeam_score)
                    ? "w"
                    : parseInt(fixture.match_awayteam_score) ===
                        parseInt(fixture.match_hometeam_score)
                      ? "d"
                      : "l"
              }
            >
              {activeTeam === fixture.match_hometeam_id
                ? parseInt(fixture.match_hometeam_score) >
                  parseInt(fixture.match_awayteam_score)
                  ? "w"
                  : parseInt(fixture.match_hometeam_score) ===
                      parseInt(fixture.match_awayteam_score)
                    ? "d"
                    : "l"
                : parseInt(fixture.match_awayteam_score) >
                    parseInt(fixture.match_hometeam_score)
                  ? "w"
                  : parseInt(fixture.match_awayteam_score) ===
                      parseInt(fixture.match_hometeam_score)
                    ? "d"
                    : "l"}
            </span>
          </div>
        ))}
      </div>
    </div>
  ));
};

export default Fixture;
