import React, { useEffect, useState, useRef } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { dataCompetition, fetchPrediksiAll } from "../services/api.service";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Scroll from "../fragment/Scroll";
import { renderSkeleton } from "../fragment/Skeleton";
import Livechat from "../component/Livechat";

export const PrediksiPage = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState("");
  const [defaultDate, setDefaultDate] = useState("");
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [renderedPredictionCount, setRenderedPredictionCount] = useState(50);

  const getCompetitionIndex = (leagueId) => {
    const index = dataCompetition.findIndex(
      (league) => league.leagueId === parseInt(leagueId),
    );
    return index !== -1 ? index : Number.MAX_SAFE_INTEGER;
  };

  const handleDateChange = async (fromDate, toDate) => {
    const matchId = selectedLeagueId === "" ? "" : selectedLeagueId;

    const response = await fetchPrediksiAll(fromDate, toDate, matchId);
    if (response.error && response.error === 404) {
      Swal.fire({
        icon: "info",
        title: "Opps..",
        text: "Prediksi belum tersedia, silahkan pilih pertandingan atau tanggal lainnya.",
      });
      setIsLoading(true);
      return;
    }

    const sortedPredictions = response.sort((a, b) => {
      const indexA = getCompetitionIndex(a.league_id);
      const indexB = getCompetitionIndex(b.league_id);
      return indexA - indexB;
    });

    setPredictions(sortedPredictions);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleButtonClick = async () => {
    const fromDate = document.getElementById("fromtanggal").value;
    const toDate = document.getElementById("totanggal").value;

    if (!fromDate || !toDate) {
      Swal.fire({
        icon: "info",
        title: "Silahkan pilih tanggal",
      });
      return;
    }

    if (toDate < fromDate) {
      Swal.fire({
        icon: "info",
        title: "Tanggal tidak valid",
      });
      return;
    }

    setIsLoading(true);

    await handleDateChange(fromDate, toDate);

    setIsLoading(false);
  };

  const handleOpsiTanggalChange = () => {
    const opsitanggal = document.getElementById("opsitanggal").value;
    const today = new Date().toISOString().split("T")[0];
    let fromDate = "";
    let toDate = "";

    if (opsitanggal === "1") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      fromDate = toDate = yesterday.toISOString().split("T")[0];
    } else if (opsitanggal === "2") {
      fromDate = toDate = today;
    } else if (opsitanggal === "3") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      fromDate = toDate = tomorrow.toISOString().split("T")[0];
    }

    document.getElementById("fromtanggal").value = fromDate;
    document.getElementById("totanggal").value = toDate;
  };

  const addColorClasses = (predictions) => {
    predictions.forEach((prediction) => {
      const listPrediksiLiga = document.querySelectorAll(".listprediksiliga");

      listPrediksiLiga.forEach((listItem) => {
        const percentageElements =
          listItem.querySelectorAll(".nilaipersentase");

        let maxPercentage = -1;
        let secondMaxPercentage = -1;
        let minPercentage = 101;

        percentageElements.forEach((percentageElement) => {
          const percentage = parseFloat(percentageElement.textContent);
          if (percentage > maxPercentage) {
            secondMaxPercentage = maxPercentage;
            maxPercentage = percentage;
          } else if (percentage > secondMaxPercentage) {
            secondMaxPercentage = percentage;
          }
          if (percentage < minPercentage) {
            minPercentage = percentage;
          }
        });

        percentageElements.forEach((percentageElement) => {
          const percentage = parseFloat(percentageElement.textContent);
          percentageElement.classList.remove("bggreen", "bgred", "bgyellow");

          if (percentage === maxPercentage) {
            percentageElement.classList.add("bggreen");
          } else if (percentage === secondMaxPercentage) {
            percentageElement.classList.add("bgyellow");
          } else if (percentage === minPercentage) {
            percentageElement.classList.add("bgred");
          }
        });
      });
    });
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDefaultDate(today);
    handleOpsiTanggalChange();
    handleDateChange(today, today);
  }, []);

  useEffect(() => {
    if (predictions) {
      addColorClasses(predictions.slice(0, renderedPredictionCount));
    }
  }, [predictions, renderedPredictionCount]);

  useEffect(() => {
    const fromTanggalInput = document.getElementById("fromtanggal");
    const toTanggalInput = document.getElementById("totanggal");
    const opsitanggalSelect = document.getElementById("opsitanggal");

    const handleTanggalChange = () => {
      opsitanggalSelect.value = "";
    };

    fromTanggalInput.addEventListener("change", handleTanggalChange);
    toTanggalInput.addEventListener("change", handleTanggalChange);

    return () => {
      fromTanggalInput.removeEventListener("change", handleTanggalChange);
      toTanggalInput.removeEventListener("change", handleTanggalChange);
    };
  }, []);

  const handleShowMoreClick = () => {
    setRenderedPredictionCount((prevCount) => prevCount + 50);
    addColorClasses(predictions.slice(0, renderedPredictionCount + 50));
  };

  const addSixHours = (time) => {
    const [hours, minutes] = time.split(":");
    let newHours = parseInt(hours) + 6;
    let newTime = "";
  
    if (newHours >= 24) {
      newHours -= 24;
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayFormatted = formatDate(nextDay.toISOString().split("T")[0]);
      newTime = `${newHours < 10 ? "0" : ""}${newHours}:${minutes}`;
      return {
        newTime,
        newDate: nextDayFormatted,
      };
    } else if (!isNaN(newHours)) {
      newTime = `${newHours < 10 ? "0" : ""}${newHours}:${minutes}`;
      return {
        newTime,
        newDate: null,
      };
    } else {
      return {
        newTime: time,
        newDate: null,
      };
    }
  };  
  
  const renderMatchTime = (date, time) => {
    const { newTime, newDate } = addSixHours(time);
    if (newDate) {
      date = newDate;
    }
    return {
      date,
      time: newTime,
    };
  };

  return (
    <div className="container">
      <Lobbynavbar pageTitle="prediksi pertandingan" />
      <div className="secprediksi" id="secprediksi">
        <div className="groupsecprediksi">
          <div className="topheadprediksi">
            <select
              name="opsitanggal"
              id="opsitanggal"
              defaultValue="2"
              onChange={handleOpsiTanggalChange}
            >
              <option value="" className="Pilih" disabled>
                Pilih
              </option>
              <option value="1">Kemarin</option>
              <option value="2">Hari Ini</option>
              <option value="3">Besok</option>
            </select>
            <div className="goroufromdate">
              <label htmlFor="fromtanggal">Dari</label>
              <input
                type="date"
                id="fromtanggal"
                name="fromtanggal"
                defaultValue={defaultDate}
              />
            </div>
            <div className="goroufromdate">
              <label htmlFor="totanggal">Hingga</label>
              <input
                type="date"
                id="totanggal"
                name="totanggal"
                defaultValue={defaultDate}
              />
            </div>
          </div>
          <select
            id="namaliga"
            name="namaliga"
            className="form-select"
            defaultValue=""
            onChange={(e) => setSelectedLeagueId(e.target.value)}
          >
            <option value="">Semua Pertandingan</option>
            {dataCompetition.map((league) => (
              <option key={league.leagueId} value={league.leagueId}>
                {league.country} - {league.leagueName}
              </option>
            ))}
          </select>
          <span className="tombol full primary" onClick={handleButtonClick}>
            Submit
          </span>
          <div className="grouphasilprediksi">
            {isLoading || !predictions
              ? renderSkeleton()
              : predictions
                ? predictions
                    .slice(0, renderedPredictionCount)
                    .map((prediction, index) => {
                      const sameLeaguePredictions = predictions.filter(
                        (pred) => pred.league_id === prediction.league_id,
                      );

                      if (
                        index === 0 ||
                        prediction.league_id !==
                          predictions[index - 1].league_id
                      ) {
                        return (
                          <div className="listgroupprediksi" key={index}>
                            <div className="grptitleliga">
                              <span className="namaliganya">
                                {prediction.league_name}
                              </span>
                              <span className="namanegaranya">
                                {prediction.country_name}
                              </span>
                            </div>
                            <div className="listgrouppertandinganliga">
                              {sameLeaguePredictions.map((pred, idx) => (
                                <div className="listprediksiliga" key={idx}>
                                  <div className="groupteamprediksi">
                                    <span className="teamhome">
                                      {pred.match_hometeam_name}
                                    </span>
                                    <span className="teamaway">
                                      {pred.match_awayteam_name}
                                    </span>
                                    <div className="groupdatetimeprediksi">
                                    <span className="grouptglprediksi">
                                        {renderMatchTime(formatDate(pred.match_date), pred.match_time).date}
                                        </span>
                                        <span className="jam">
                                        {renderMatchTime(formatDate(pred.match_date), pred.match_time).time}
                                        </span>
                                    </div>
                                    <span className="statuprediksi">
                                      {pred.match_status
                                        ? pred.match_status + "'"
                                        : "-"}
                                    </span>
                                  </div>
                                  <div className="groupscoreprediksi">
                                    <span className="scorehome">
                                      {pred.match_hometeam_score || "-"}
                                    </span>
                                    <span className="scoreaway">
                                      {pred.match_awayteam_score || "-"}
                                    </span>
                                  </div>
                                  <div className="listprediksiall">
                                    <div className="grouppersentaseprediksi all">
                                      <div className="listpresentase">
                                        <span className="titlepresentase">
                                          Home Win(1)
                                        </span>
                                        <span className="nilaipersentase">
                                          {parseFloat(pred.prob_HW).toFixed()}%
                                        </span>
                                      </div>
                                      <div className="listpresentase">
                                        <span className="titlepresentase">
                                          Draw(X)
                                        </span>
                                        <span className="nilaipersentase">
                                          {parseFloat(pred.prob_D).toFixed()}%
                                        </span>
                                      </div>
                                      <div className="listpresentase">
                                        <span className="titlepresentase">
                                          Away Win(2)
                                        </span>
                                        <span className="nilaipersentase">
                                          {parseFloat(pred.prob_AW).toFixed()}%
                                        </span>
                                      </div>
                                    </div>
                                    <Link
                                      to={`/match/${pred.match_id}`}
                                      className="detailpertandingan"
                                    >
                                      Selengkapnya{" "}
                                      <Icon icon="line-md:arrow-right" />
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })
                : null}
          </div>
          {predictions && predictions.length > renderedPredictionCount && (
            <span className="tampilkansemua" onClick={handleShowMoreClick}>
              Tampilkan Lebih Banyak <Icon icon="material-symbols:refresh" />
            </span>
          )}
        </div>
      </div>
      <Scroll targetElementId="secprediksi" />
      <Footer />
      <Livechat />
    </div>
  );
};

export default PrediksiPage;
