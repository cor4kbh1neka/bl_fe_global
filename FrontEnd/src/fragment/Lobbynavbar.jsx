import React, { useEffect, useRef, useState } from "react";
import { getUsername, getCoinxx, banking } from "../services/auth.service";
import { getMemo } from "../services/api.service";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Runningtext from "../fragment/Runningtext";
import Mainmenu from "../component/Mainmenu";
import { Logofirts } from "./Logofirts";
import Swal from "sweetalert2";

export const Lobbynavbar = ({ pageTitle, linkurldekstop, linkurlmobile, prediksimenu }) => {
  const [username, setUsername] = useState("");
  const [accesstoken, setAccesstoken] = useState("");
  const [balance, setBalance] = useState("");
  const [lastClicked, setLastClicked] = useState(0);
  const CLICK_DELAY = 5000;
  const [isMainmenuVisible, setIsMainmenuVisible] = useState(false);
  const mainMenuRef = useRef(null);
  const [isBalanceReady, setIsBalanceReady] = useState(false);
  const [memoData, setMemoData] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const access = localStorage.getItem("acme");
    if (!username && token && access) {
      setUsername(getUsername(token));
      setAccesstoken(access);
    } else if (!token) {
      window.location.href = "/";
    }
  }, [username]);

  useEffect(() => {
    if (username && accesstoken) {
      getCoinxx(username, accesstoken)
        .then((response) => {
          if (response) {
            setBalance(
              parseFloat(response.balance).toLocaleString("id-ID", {
                minimumFractionDigits: 2
              })
            );
            setIsBalanceReady(true);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [username, accesstoken]);

  useEffect(() => {
    const logHistory = async () => {
      if (!username || !accesstoken) {
        return;
      }
      const exSure = localStorage.getItem('exSure');
      if (exSure === 'true') {
        return;
      }

      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipResponse.json();
  
        const response = await fetch('/prx/history/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'utilitiesgenerate': import.meta.env.VITE_CR_ONE_UTILI,
            Authorization: `Bearer ${accesstoken}`,
            'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
          },
          body: JSON.stringify({
            username: username,
            ipaddres: ip 
          })
        });
  
        if (response.ok) {
          const responseData = await response.json();
          localStorage.setItem('exSure', 'true');
        } else {
          console.error('Failed to log history:', response.statusText);
        }
  
      } catch (error) {
        console.error('Error logging history:', error);
      }
    };
  
    logHistory();
  }, [username, accesstoken]);

  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        const access = localStorage.getItem("acme");

        if (token && access) {
            setUsername(getUsername(token));

            // Check if required data is missing
            const dataVerified = localStorage.getItem("dataVerified");
            const brokerData = localStorage.getItem("broker");
            const brokerDatawd = localStorage.getItem("brokerwd");
            const iseco = localStorage.getItem("iseco");

            if (!dataVerified || !brokerData || !brokerDatawd || !iseco) {
                const statusVerified = await banking(token, access);
                localStorage.setItem("broker", statusVerified.databank.group);
                localStorage.setItem("brokerwd", statusVerified.databank.groupwd);
                localStorage.setItem("dataVerified", JSON.stringify(statusVerified.databank.is_verified));
                localStorage.setItem("iseco", JSON.stringify({
                    bank: statusVerified.databank.xybanknamexyy,
                    narek: statusVerified.databank.xybankuserxy,
                    norek: statusVerified.databank.xxybanknumberxy
                }));
            }

            const lastFetchTimestamp = parseInt(localStorage.getItem("lastFetchTimestamp") || 0);
            const currentTimestamp = Date.now();
            const timeDifference = currentTimestamp - lastFetchTimestamp;
            const isFetchRequired = timeDifference >= (30 * 60 * 1000);

            if (isFetchRequired) {
                const isVerified = localStorage.getItem("dataVerified");
                const memostatus = isVerified === "true" ? "/1" : "";
                const memoData = await getMemo(memostatus);
                const memoDataWithRead = memoData?.data?.map(memo => ({ ...memo, read: "false" }));
                const sortedMemoData = memoDataWithRead?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const existingSumMemo = JSON.parse(localStorage.getItem("sumMemo")) || [];
                const combinedMemoData = [
                    ...(sortedMemoData?.filter(newMemo => !existingSumMemo.some(existingMemo => existingMemo.idmemo === newMemo.idmemo)) || []),
                    ...existingSumMemo,
                ];
                setMemoData(combinedMemoData);
                localStorage.setItem("sumMemo", JSON.stringify(combinedMemoData));
                localStorage.setItem("lastFetchTimestamp", currentTimestamp);
            } else {
                const existingSumMemo = JSON.parse(localStorage.getItem("sumMemo")) || [];
                setMemoData(existingSumMemo);
            }
        } else {
            window.location.href = "/";
        }
    };

    fetchData();
}, []);

  useEffect(() => {
    if (memoData) {
      const unreadMemoCount = memoData.filter(memo => memo.read === "false").length;
      setUnreadCount(unreadMemoCount);
    }
  }, [memoData]);

  const updateBalance = () => {
    const now = Date.now();
    if (now - lastClicked < CLICK_DELAY) {
      return;
    }
    setLastClicked(now);
  
    if (username && accesstoken) {
      getCoinxx(username, accesstoken)
        .then((response) => {
          if (response) {
            setBalance(
              parseFloat(response.balance).toLocaleString("id-ID", {
                minimumFractionDigits: 2
              })
            );
            setIsBalanceReady(true);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleMainMenuToggle = () => {
    setIsMainmenuVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mainMenuRef.current && !mainMenuRef.current.contains(event.target)) {
        mainMenuRef.current.classList.add("hide");
        setTimeout(() => {
          setIsMainmenuVisible(false);
          mainMenuRef.current.classList.remove("hide");
        }, 500);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mainMenuRef, setIsMainmenuVisible]);

  const handleHistoryBetDesktop = () => {
    const width = 425;
    const height = 800;
    const left = window.innerWidth / 1.15 - width / 2;
    const top = window.innerHeight / 2 - height / 2.5;
  
    const url = "/historybetdekstop";
  
    window.open(
      url,
      "_blank",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  };

  const handlePrediksisportDesktop = () => {
    const width = 425;
    const height = 800;
    const left = window.innerWidth / 1.15 - width / 2;
    const top = window.innerHeight / 2 - height / 2.5;
  
    const url = "/prediksi";
  
    window.open(
      url,
      "_blank",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  };

  const handleRtpslotDesktop = () => {
    const width = 425;
    const height = 800;
    const left = window.innerWidth / 1.15 - width / 2;
    const top = window.innerHeight / 2 - height / 2.5;
  
    const url = "/rtplobby";
  
    window.open(
      url,
      "_blank",
      `width=${width}, height=${height}, left=${left}, top=${top}`
    );
  };

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
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({
          "username" : username,
          "iswap" : "false",
          "device" : "d"
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

  return (
    <>
      <Mainmenu
        isMainmenuVisible={isMainmenuVisible}
        setIsMainmenuVisible={setIsMainmenuVisible}
      />
      <div className="grouplobby">
        <div className="datakontengrouplobby">
          <div className="navigasi">
            <div className="bar1navigasi">
              <div className="listbar1navigasi">
                <Icon
                  icon="ion:menu"
                  className="humbergermenu"
                  onClick={handleMainMenuToggle}
                />
                <div className="groupbuttonnavigasi">
                  {prediksimenu === "slotgames" ? (
                    <div className="listnavigasi parlay" onClick={handleRtpslotDesktop} >
                      RTP Slot
                    </div>
                  ) : (
                    <div className="listnavigasi parlay" onClick={handlePrediksisportDesktop}>
                      prediksi
                    </div>
                  )}
                  <div
                    className="listnavigasi withdraw"
                    onClick={handleShowOptions}
                  >
                    parlay
                  </div>
                    <Link to={linkurldekstop}
                      className="listnavigasi sbobetmode dekstop"
                    >
                      dekstop
                    </Link>
                  <Link to={linkurlmobile} className="listnavigasi sbobetmode mobile">
                      <span>Mobile Version</span>
                  </Link>
                  <div className="listnavigasi sbobetmode mobile historybet" onClick={handleHistoryBetDesktop}>
                      <span>History Bet</span>
                  </div>
                  <Link className="listnavigasi deposit" to="/deposit">
                    deposit
                  </Link>
                  <Link className="notifikasi" to="/pagememo">
                    <Icon icon="ion:notifcations" />
                    {unreadCount !== 0 && <span className="countnotifikasi">{unreadCount}</span>}
                  </Link>
                  <div className="groupnavdekstop">
                    <a href="/" target="_blank" className="listnavigasi livechat">
                      <Icon icon="fluent-mdl2:chat-solid" />
                      livechat
                    </a>
                  </div>
                </div>
              </div>
              <Runningtext />
            </div>
            <div className="groupcoin">
              <div className="topcoin">
                <span className="idr">IDR</span>
                <div className="groupnominalcoin">
                  <span className="saldocoin">
                    {isBalanceReady ? (
                      balance
                    ) : (
                      <Icon icon="eos-icons:three-dots-loading" />
                    )}
                  </span>
                  <span className="ketsaldocoin">
                    <Icon icon="tabler:user-star" />
                    {username}
                  </span>
                </div>
              </div>
              <div
                className="bottomcoint"
                onClick={updateBalance}
              >
                <Icon icon="material-symbols:refresh" />
                <span className="refreshcoin">refresh</span>
              </div>
            </div>
          </div>
        </div>
        <div className="showpage">
          <span className="titlehalaman">{pageTitle}</span>
        </div>
      </div>
      <div className="logodanhalaman">
        <div className="grouplogodanhalaman">
          <Link to="/lobby" className="logonavbar">
            <Logofirts />
          </Link>
        </div>
      </div>
      <div className={`sbobetopsi ${showOptions ? "show" : ""}`}>
        <div className="secsbobetopsi">
          <div className="cckomponenklik grouplogodanhalaman">
            <span className="closeshowme" onClick={handleShowOptions}>x</span>
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
    </>
  );
};

export default Lobbynavbar;
