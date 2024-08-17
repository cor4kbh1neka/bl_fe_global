import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { getUsername } from "../services/auth.service";
import { fetchDataLiveToday, getHistorybet, getSlider, handleClick } from "../services/api.service";
import Livechat from "../component/Livechat";
import { Logofirts } from "../fragment/Logofirts";
import { dataGames } from "../services/api.service";

export const LobbyPage = () => {
  const [username, setUsername] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSingle, setIsSingle] = useState(true);
  const [liveData, setLiveData] = useState(null);
  const [sportsBookData, setSportsBookData] = useState(null);
  const [virtualSportsData, setVirtualSportsData] = useState(null);
  const [gamesData, setGamesData] = useState(null);
  const [casinoData, setCasinoData] = useState(null);
  const [seamlessGameData, setSeamlessGameData] = useState(null);
  const [thirdPartySportsBookData, setThirdPartySportsBookData] = useState(null);
  const [winSportsbookData, setWinSportsbookData] = useState(null);
  const [combinedData, setCombinedData] = useState(null);
  const [loadingTaruhan, setLoadingTaruhan] = useState(true);
  const [dataIframe, setDataIframe] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showOptions, setShowOptions] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentGameList, setCurrentGameList] = useState([]);
  const [showGameList, setShowGameList] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);


  const dataPortopolio = {
    sportsBook: "SportsBook",
    virtualSports: "VirtualSports",
    games: "Games",
    seamlessGame: "SeamlessGame",
    casino: "Casino",
    thirdPartySportsBook: "ThirdPartySportsBook",
    WinSportsbook: "568WinSportsbook"
  };

  const renderSkeletonone = () => {
    return (
      <div className="listdatalive skeleton">
        <div className="loader"></div>
      </div>
    );
  };

  const renderListgame = (gameList) => {
    return (
      <>
        <div className="groupdataprovider">
          {gameList.map((game, index) => (
            <div className="listprovider" key={index}>
              <p className="namaprovider">{game.namaprovider}</p>
              <img src={game.img} alt={game.namaprovider} />
              <span className="isbt play" onClick={() => handleGameSelect(game)}>play</span>
              {game.gamebaru && <span className="newgames">baru</span>}
            </div>
          ))}
        </div>
        {selectedGame && (
          <div className={`sbobetopsi ${showOptions ? "show" : ""}`}>
            <div className="secsbobetopsi">
              <div className="cckomponenklik grouplogodanhalaman">
                <span className="closeshowme" onClick={handleShowOptions}>x</span>
                <Logofirts />
                <div className="grouplistbuttonbet">
                  <Link to={selectedGame.dekstopurl} className="groupbuttonbet listnavigasi parlay">
                    <Icon icon="noto:coin" />
                    <span>Dekstop</span>
                  </Link>
                  <Link to={selectedGame.mobileurl} className="groupbuttonbet listnavigasi parlay">
                    <Icon icon="noto:coin" />
                    <span>Mobile</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const handleGameSelect = (game, category) => {
    setSelectedGame(game);
    setActiveCategory(category);
    handleShowOptions();
  };

  useEffect(() => {
    const access = localStorage.getItem("acme");
    const fetchData = async () => {
      if (username) {
        const fetchAndSetData = async (portfolioKey, portfolioName, modifyCallback) => {
          const response = await getHistorybet(username, portfolioKey, access);
          const sortedData = response.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
          const modifiedData = sortedData.map(item => ({
            ...item,
            portoPolio: portfolioName,
            ...modifyCallback(item)
          }));
          return modifiedData;
        };

        const sportsBookData = await fetchAndSetData(dataPortopolio.sportsBook, "SportsBook", item => ({}));
        setSportsBookData(sportsBookData);

        const virtualSportsData = await fetchAndSetData(dataPortopolio.virtualSports, "VirtualSports", item => ({
          sportsType: item.productType
        }));
        setVirtualSportsData(virtualSportsData);

        const gamesData = await fetchAndSetData(dataPortopolio.games, "Games", item => ({
          sportsType: item.gameName,
          odds: "-"
        }));
        setGamesData(gamesData);

        const seamlessGameData = await fetchAndSetData(dataPortopolio.seamlessGame, "SeamlessGame", item => ({}));
        setSeamlessGameData(seamlessGameData);

        const casinoData = await fetchAndSetData(dataPortopolio.casino, "Casino", item => ({}));
        setCasinoData(casinoData);

        const thirdPartySportsBookData = await fetchAndSetData(dataPortopolio.thirdPartySportsBook, "ThirdPartySportsBook", item => ({}));
        setThirdPartySportsBookData(thirdPartySportsBookData);

        const winSportsbookData = await fetchAndSetData(dataPortopolio.WinSportsbook, "568WinSportsbook", item => ({}));
        setWinSportsbookData(winSportsbookData);

        setLoadingTaruhan(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
    }

    fetchData();
  }, [username]);

  useEffect(() => {
    if (sportsBookData && virtualSportsData && gamesData && seamlessGameData && casinoData && thirdPartySportsBookData && winSportsbookData) {
      const combinedData = [
        ...sportsBookData,
        ...virtualSportsData,
        ...gamesData,
        ...seamlessGameData,
        ...casinoData,
        ...thirdPartySportsBookData,
        ...winSportsbookData
      ];
      const sortedCombinedData = combinedData.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
      const limitedSortedCombinedData = sortedCombinedData.slice(0, 5);
      setCombinedData(limitedSortedCombinedData);
    }
  }, [sportsBookData, virtualSportsData, gamesData, seamlessGameData, casinoData, thirdPartySportsBookData, winSportsbookData]);

  useEffect(() => {
    const access = localStorage.getItem("acme");
    const fetchData = async () => {
      const response = await fetchDataLiveToday(access);
      setLiveData(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const access = localStorage.getItem("acme");
    const fetchDataIframe = async () => {
      if (!username) return;

      try {
        const response = await fetch("/prx/authlog", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
            Authorization: `Bearer ${access}`,
            'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
          },
          body: JSON.stringify({
            username: username,
            iswap: false,
            device: "m"
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const correctedUrl = data.url.replace(/\\/g, "");
          const urlParts = correctedUrl.split(/\/\/+/);
          const iframeUrl = `https://${urlParts[urlParts.length - 1]}`;
          setDataIframe(iframeUrl);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        } else {
          console.error("Failed to fetch parlay URL");
        }
      } catch (error) {
        console.error("Error fetching parlay URL:", error);
      }
    };

    fetchDataIframe();
  }, [username]);

  const handleParlayClick = async () => {
    const access = localStorage.getItem("acme");
    if (!username) return;

    try {
      const response = await fetch("/prx/authlog", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          Authorization: `Bearer ${access}`,
          'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({
          "username": username,
          "iswap": "false",
          "device": "d"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const correctedUrl = data.url.replace(/\\/g, "");
        window.location.href = correctedUrl;
      } else {
        console.error("Failed to fetch parlay URL");
        Swal.fire({
          text: "Akun anda belum dapat melakukan bet, Silahkan hubungi admin",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error fetching parlay URL:", error);
    }
  };

  useEffect(() => {
    const fetchSliderData = async () => {
      const data = await getSlider();
      const sortedData = (data.data || []).filter(item => item.statusctsldr === "1").sort((a, b) => a.idctsldr - b.idctsldr);
      setSliderData(sortedData);
    };

    fetchSliderData();
  }, []);

  const nextImage = () => {
    if (sliderData.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (sliderData.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderData]);

  useEffect(() => {
    const carousel = document.querySelector(".listkonteninfolobby");
    if (carousel) {
      carousel.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }
  }, [currentImageIndex]);

  const formatMatchTime = (isoTime, add12Hours = false) => {
    const date = new Date(isoTime);
    if (add12Hours) {
      date.setHours(date.getHours() + 11);
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleGameCategoryClick = (category) => {
    const gameList = dataGames.find((game) => game.namagame === category).listgame;
    setCurrentGameList(gameList);
    setShowGameList(true);
    setActiveCategory(category);
  };
  

  return (
    <div className="container">
      <Lobbynavbar pageTitle={`Selamat bermain ${username}`} />
      <div className="groupinfolobby">
        <div className="homenavbar">
          <Link to="/historybet" className="listhomenavbar">
            <Icon icon="material-symbols-light:history" />
            <span>history bet</span>
          </Link>
          <Link to="/promosilobby" className="listhomenavbar">
            <span className="hot">HOT</span>
            <span>promosi</span>
          </Link>
          <Link to="/livescorelobby" className="listhomenavbar">
            <Icon icon="arcticons:scoreboard" />
            <span>live score</span>
          </Link>
          <div className="listhomenavbar" onClick={() => handleClick(11, "Live Chat", "Whatsapp 1")}>
            <Icon
              icon="fluent-mdl2:chat-solid"
              style={{ color: "var(--primary-color)" }}
            />
            <span>live chat</span>
          </div>
        </div>
        <div className="groupkonteninfolobby">
          <div className="scdatacarbanner">
            {sliderData.length > 0 && (
              <div className="groupdatacarbanner">
                <div className="listkonteninfolobby">
                  {sliderData.map((image, index) => (
                    <img
                      key={image.idctsldr}
                      src={image.ctsldrur}
                      alt={`banner-${image.idctsldr}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/img/slider-dummy.webp";
                      }}
                      className={
                        index === currentImageIndex
                          ? "carbanner active"
                          : "carbanner"
                      }
                    />
                  ))}
                </div>
                <div className="splide-dots">
                  {sliderData.map((_, index) => (
                    <div
                      key={index}
                      className={
                        index === currentImageIndex
                          ? "splide__dot is-active"
                          : "splide__dot"
                      }
                      onClick={() => setCurrentImageIndex(index)}
                    ></div>
                  ))}
                </div>
                <button className="carousel-control prev" onClick={prevImage}>
                  <Icon icon="teenyicons:left-solid" />
                </button>
                <button className="carousel-control next" onClick={nextImage}>
                  <Icon icon="teenyicons:right-solid" />
                </button>
              </div>
            )}
          </div>
          <div className="groupdatahisbetingan">
            <div className="listgroupdatabet">
              <span className="titlehis">TARUHAN SAYA</span>
              <div className="grouplistbetingan">
                <div className="groupbuttonlistbet">
                  <span
                    className={isSingle ? "buttonlistbet active" : "buttonlistbet"}
                    onClick={() => setIsSingle(true)}
                  >
                    SINGLE
                  </span>
                  <span
                    className={!isSingle ? "buttonlistbet active" : "buttonlistbet"}
                    onClick={() => setIsSingle(false)}
                  >
                    PARLAY
                  </span>
                </div>
              </div>
              <div className="groupdatataruhan">
                {loadingTaruhan ? (
                  <>
                    {renderSkeletonone()}
                  </>
                ) : (
                  <>
                    {combinedData && combinedData.length > 0 ? (
                      combinedData
                        .filter(
                          taruhanItem =>
                            (isSingle && taruhanItem.sportsType !== "Mix Parlay") || (!isSingle && taruhanItem.sportsType === "Mix Parlay")
                        )
                        .map((taruhanItem, index) => (
                          <Link to={`/historybet/${taruhanItem.refNo}/${taruhanItem.portoPolio}`} className="listdatataruhan" key={index}>
                            <span className="namaligataruhan">{formatOrderTime(taruhanItem.orderTime)}</span>
                            <span className="pilihanbet">Invoice: <span className="datainvoice">{taruhanItem.refNo}</span></span>
                            <span className="namapertandingan">{taruhanItem.sportsType}</span>
                            <div className="opsibet">
                              <div className="groupjenisbet">
                                <div className="listjenisbet">
                                  <span className="textjenisbet">odds:</span>
                                  <span className="jenisbet" data-value={taruhanItem.odds}>{taruhanItem.odds}</span>
                                </div>
                                <div className="listjenisbet">
                                  <span className="textjenisbet">stake:</span>
                                  <span className="jenisbet stake">{taruhanItem.stake}</span>
                                </div>
                              </div>
                              <span className="oddsbet" data-value={taruhanItem.status}>{taruhanItem.status}</span>
                            </div>
                          </Link>
                        ))
                        .concat(
                          combinedData.filter(
                            taruhanItem =>
                              (isSingle && taruhanItem.sportsType !== "Mix Parlay") || (!isSingle && taruhanItem.sportsType === "Mix Parlay")
                          ).length === 0 && (
                            <span className="nobethome" key="no-bet">belum ada pemasangan pada jenis bet ini</span>
                          )
                        )
                    ) : (
                      <span className="nobethome" key="no-bet">belum ada pemasangan pada jenis bet ini</span>
                    )}
                    <Link to="/historybet" className="taruhanlengkap">
                      Selengkapnya
                      <Icon icon="line-md:arrow-right" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="groupcardsport">
          <div className="groupcardsportcc">
            <div
              className={`listcardsport ${activeCategory === "sportbooks" ? "active" : ""}`}
              onClick={() => handleGameCategoryClick("sportbooks")}
            >
              <Icon icon="ph:soccer-ball" />
              <span className="textcardsport">Sport Books</span>
            </div>
            <div
              className={`listcardsport ${activeCategory === "slot" ? "active" : ""}`}
              onClick={() => handleGameCategoryClick("slot")}
            >
              <Icon icon="mdi:slot-machine-outline" />
              <span className="textcardsport">Slot Games</span>
              <span className="newgames">baru</span>
            </div>
            <div
              className={`listcardsport ${activeCategory === "livecasino" ? "active" : ""}`}
              onClick={() => handleGameCategoryClick("livecasino")}
            >
              <Icon icon="mdi:casino-chip" />
              <span className="textcardsport">Live Casino</span>
              <span className="newgames">baru</span>
            </div>
            <div
              className={`listcardsport ${activeCategory === "virtualsportbooks" ? "active" : ""}`}
              onClick={() => handleGameCategoryClick("virtualsportbooks")}
            >
              <Icon icon="eos-icons:virtual-guest" />
              <span className="textcardsport">Virtual Sport</span>
              <span className="newgames">baru</span>
            </div>
            <div
              className={`listcardsport ${activeCategory === "virtualcasino" ? "active" : ""}`}
              onClick={() => handleGameCategoryClick("virtualcasino")}
            >
              <Icon icon="carbon:virtual-desktop" />
              <span className="textcardsport">Virtual Casino</span>
              <span className="newgames">baru</span>
            </div>
          </div>
        </div>
        <div className="groupmatchtoday">
          {showGameList ? (
            <>
              {renderListgame(currentGameList)}
            </>
          ) : (
            <div className="groupmatchtodaycc">
              <div className="topmatchtody">
                <span className="titlematchtoday">Today Match</span>
                <div className="recct"></div>
                <div className="imgbannermatchtodaytop"></div>
              </div>
              <div className="groupdatamatchtody">
                {loadingTaruhan ? (
                  renderSkeletonone()
                ) : (
                  <div className="groupdatamatchtody">
                    <object data={dataIframe} />
                    <div className="komponenklik">
                      <div className="cckomponenklik grouplogodanhalaman">
                        <Logofirts />
                        <div className="grouplistbuttonbet">
                          <Link to="/dekstopgames/sportsbobet" className="groupbuttonbet listnavigasi parlay">
                            <Icon icon="noto:coin" />
                            <span>Dekstop</span>
                          </Link>
                          <Link to="/mobilegames/sportsbobet" className="groupbuttonbet listnavigasi parlay">
                            <Icon icon="noto:coin" />
                            <span>Mobile</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default LobbyPage;
