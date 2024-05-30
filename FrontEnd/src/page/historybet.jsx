import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getUsername } from "../services/auth.service";
import { getHistorybet } from "../services/api.service";
import { renderSkeleton } from "../fragment/Skeleton";
import Swal from 'sweetalert2';
import Livechat from "../component/Livechat";

export const HistorybetPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
  const [username, setUsername] = useState("");
  const [sportsBookData, setSportsBookData] = useState(null);
  const [virtualSportsData, setVirtualSportsData] = useState(null);
  const [gamesData, setGamesData] = useState(null);
  const [casinoData, setCasinoData] = useState(null);
  const [seamlessGameData, setSeamlessGameData] = useState(null);
  const [thirdPartySportsBookData, setThirdPartySportsBookData] = useState(null);
  const [winSportsbookData, setWinSportsbookData] = useState(null);
  const [combinedData, setCombinedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPortopolio, setSelectedPortopolio] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMatch, setSelectedMatch] = useState("all match");

  const dataPortopolio = {
    sportsBook: "SportsBook",
    virtualSports: "VirtualSports",
    games: "Games",
    seamlessGame: "SeamlessGame",
    casino: "Casino",
    thirdPartySportsBook: "ThirdPartySportsBook",
    WinSportsbook: "568WinSportsbook"
  };

  const dataStatus = {
    all: "all",
    running: "running",
    lose: "lose",
    won: "won",
    draw: "draw",
    void: "void"
  };

  const dataMatch = {
    all: "all match",
    single: "single",
    parlay: "Mix Parlay"
  };

  const handlePortopolioChange = (event) => {
    setSelectedPortopolio(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleMatchChange = (event) => {
    setSelectedMatch(event.target.value);
  };

  useEffect(() => {
    const access = localStorage.getItem("acme");
    const fetchData = async () => {
      if (username) {
        const fetchAndSetData = async (portfolioKey, portfolioName) => {
          const response = await getHistorybet(username, portfolioKey, access);
          const sortedData = response.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
          const modifiedData = sortedData.map(item => ({
            ...item,
            portoPolio: portfolioName
          }));
          return modifiedData;
        };

        const sportsBookData = await fetchAndSetData(dataPortopolio.sportsBook, "SportsBook");
        setSportsBookData(sportsBookData);

        const virtualSportsData = await fetchAndSetData(dataPortopolio.virtualSports, "VirtualSports");
        setVirtualSportsData(virtualSportsData);

        const gamesData = await fetchAndSetData(dataPortopolio.games, "Games");
        setGamesData(gamesData);

        const casinoData = await fetchAndSetData(dataPortopolio.casino, "Casino");
        setCasinoData(casinoData);

        const seamlessGameData = await fetchAndSetData(dataPortopolio.seamlessGame, "SeamlessGame");
        setSeamlessGameData(seamlessGameData);

        const thirdPartySportsBookData = await fetchAndSetData(dataPortopolio.thirdPartySportsBook, "ThirdPartySportsBook");
        setThirdPartySportsBookData(thirdPartySportsBookData);

        const winSportsbookData = await fetchAndSetData(dataPortopolio.WinSportsbook, "568WinSportsbook");
        setWinSportsbookData(winSportsbookData);

        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
    }

    fetchData();
  }, [username]);

  useEffect(() => {
    if (sportsBookData && virtualSportsData && gamesData && casinoData && seamlessGameData && thirdPartySportsBookData && winSportsbookData) {
      let selectedData;
      if (selectedPortopolio === "all") {
        selectedData = [...sportsBookData, ...virtualSportsData, ...gamesData, ...casinoData, ...seamlessGameData, ...thirdPartySportsBookData, ...winSportsbookData];
      } else if (selectedPortopolio === dataPortopolio.sportsBook) {
        selectedData = sportsBookData;
      } else if (selectedPortopolio === dataPortopolio.virtualSports) {
        selectedData = virtualSportsData;
      } else if (selectedPortopolio === dataPortopolio.games) {
        selectedData = gamesData;
      } else if (selectedPortopolio === dataPortopolio.casino) {
        selectedData = casinoData;
      } else if (selectedPortopolio === dataPortopolio.seamlessGame) {
        selectedData = seamlessGameData;
      } else if (selectedPortopolio === dataPortopolio.thirdPartySportsBook) {
        selectedData = thirdPartySportsBookData;
      } else if (selectedPortopolio === dataPortopolio.WinSportsbook) {
        selectedData = winSportsbookData;
      }
      const sortedCombinedData = selectedData.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
      setCombinedData(sortedCombinedData);
    }
  }, [selectedPortopolio, sportsBookData, virtualSportsData, gamesData, casinoData, seamlessGameData, thirdPartySportsBookData, winSportsbookData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPortopolio]);

  const filteredData = combinedData ? combinedData.filter(bet => {
    const dateMatch = !selectedDate || new Date(bet.orderTime).toDateString() === new Date(selectedDate).toDateString();
    const statusMatch = selectedStatus === "all" || bet.status === selectedStatus;
    const matchTypeMatch = selectedMatch === "all match" || (selectedMatch === "single" ? bet.sportsType !== "Mix Parlay" : bet.sportsType === "Mix Parlay");
    return dateMatch && statusMatch && matchTypeMatch;
  }) : [];

  useEffect(() => {
    if (selectedDate && filteredData.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Opps...!',
        text: 'Data tidak tersedia, silahkan pilih tanggal lainnya.',
      }).then(() => setSelectedDate(""));
    }
  }, [selectedDate, filteredData]);

  const transactionsPerPage = 10;
  const totalPages = filteredData ? Math.ceil(filteredData.length / transactionsPerPage) : 0;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentBet = filteredData ? filteredData.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  ) : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisiblePages(pageNumber);
  };

  const updateVisiblePages = (pageNumber) => {
    const MAX_VISIBLE_PAGES = 5;

    if (totalPages <= MAX_VISIBLE_PAGES) {
      setVisiblePages(Array.from({ length: totalPages }, (_, i) => i + 1));
      return;
    }
    const startIndex = Math.max(
      Math.min(pageNumber - 1, totalPages - MAX_VISIBLE_PAGES + 1),
      1,
    );
    const endIndex = Math.min(startIndex + MAX_VISIBLE_PAGES - 1, totalPages);

    setVisiblePages(
      Array.from(
        { length: endIndex - startIndex + 1 },
        (_, i) => startIndex + i,
      ),
    );
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [totalPages]);

  const renderPaginationNumbers = () => {
    if (!totalPages) {
      return null;
    }

    return visiblePages.map((pageNumber) => (
      <span
        key={pageNumber}
        className={`numberpage ${pageNumber === currentPage ? "active" : ""}`}
        onClick={() => paginate(pageNumber)}
      >
        {pageNumber}
      </span>
    ));
  };

  const formatOrderTime = (orderTime) => {
    const date = new Date(orderTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  return (
    <div className="container">
      <Lobbynavbar pageTitle="history bet" />
      {loading ? (
        <div className="sechistory bet">
          {renderSkeleton()}
        </div>
      ) : (
        <div className="sechistory bet">
          <div className="groupsechistory">
            <div className="menuportopolio">
              <div className="listmenuportopolio">
                <label htmlFor="portopolio">Game Type</label>
                <select name="portopolio" id="portopolio" value={selectedPortopolio} onChange={handlePortopolioChange}>
                  <option value="all">All Game</option>
                  {Object.values(dataPortopolio).map((portopolio, index) => (
                    <option key={index} value={portopolio}>{portopolio}</option>
                  ))}
                </select>
              </div>
              <div className="listmenuportopolio">
                <label htmlFor="tanggal">Tanggal</label>
                <input type="date" name="tanggal" id="tanggal" value={selectedDate} onChange={handleDateChange} />
              </div>
              <div className="listmenuportopolio">
                <label htmlFor="match">Type Match</label>
                <select name="match" id="match" value={selectedMatch} onChange={handleMatchChange}>
                  {Object.values(dataMatch).map((match, index) => (
                    <option key={index} value={match}>{match}</option>
                  ))}
                </select>
              </div>
              <div className="listmenuportopolio">
                <label htmlFor="status">Status Bet</label>
                <select name="status" id="status" value={selectedStatus} onChange={handleStatusChange}>
                  {Object.values(dataStatus).map((status, index) => (
                    <option key={index} value={status}>{status} status</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="datasechistory">
              {currentBet.length === 0 ? (
                <div className="empty-message">
                  Data belum tersedia.
                </div>
              ) : (
                <>
                  <table>
                    <tbody>
                      <tr className="hover">
                        <th className="bagtgl">tanggal</th>
                        <th className="baginvoicest">invoice</th>
                        <th className="bagdetail">detail</th>
                        <th className="bagstake">stake (odds)</th>
                        <th className="bagstatusbet">status</th>
                      </tr>
                      {currentBet.map((bet, index) => (
                        <tr key={index}>
                          <td>{formatOrderTime(bet.orderTime)}</td>
                          <td>
                            <div className="datainvoicest">{bet.refNo}</div>
                          </td>
                          <td className="linkbet">
                            <Link to={`/historybet/${bet.refNo}/${bet.portoPolio}`}>
                              <span className="textdetail">{bet.portoPolio === "SeamlessGame" ? bet.gameType : bet.portoPolio === "VirtualSports" ? bet.productType : bet.portoPolio === "Games" ? bet.gameName : bet.portoPolio === "Casino" ? bet.productType : bet.sportsType}</span>
                              <span className="lihatdetail">{" (detail)"}</span>
                            </Link>
                          </td>
                          <td className="datanominal">
                            <span className="xxstake">{bet.stake}</span>
                            {bet.odds !== "-" && bet.odds && (
                              <>
                                {" ("}<span className="xxodds" data-value={bet.odds}>{bet.odds}</span>{")"}
                              </>
                            )}
                          </td>
                          <td className="datastatus" data-value={bet.status}>
                            {bet.status !== "draw" && bet.status !== "won" && bet.status !== "lose" ? bet.status : `${bet.status} (${bet.winLost})`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="grouppgaination">
                    <div className="grouppgainationcc">
                      <Icon
                        icon="teenyicons:left-solid"
                        className="pag left"
                        onClick={() => {
                          const newPage = Math.max(currentPage - 1, 1);
                          setCurrentPage(newPage);
                          updateVisiblePages(newPage);
                        }}
                      />
                      <Icon
                        icon="teenyicons:right-solid"
                        className="pag right"
                        onClick={() => {
                          const newPage = Math.min(currentPage + 1, totalPages);
                          setCurrentPage(newPage);
                          updateVisiblePages(newPage);
                        }}
                      />
                      {renderPaginationNumbers()}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
      <Livechat />
    </div>
  );
};

export default HistorybetPage;
