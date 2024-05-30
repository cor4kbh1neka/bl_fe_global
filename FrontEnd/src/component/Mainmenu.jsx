import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getUsername, deleteToken, putToken } from "../services/auth.service";
import Swal from "sweetalert2";
import { Logofirts } from "../fragment/Logofirts";

export const Mainmenu = ({ isMainmenuVisible, setIsMainmenuVisible }) => {
  const [username, setUsername] = useState("");
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  const [activeMenu, setActiveMenu] = useState("general");
  const mainMenuRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const access = localStorage.getItem("acme");
    if (!username && token && access) {
      setUsername(getUsername(token));
      setAccess(access);
    } else if (!token) {
      window.location.href = "/";
    }
  }, [username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const access = localStorage.getItem("acme");
    
    const fetchData = async () => {
      const response = await putToken(token, access);
      if (response.status) {
        const newAccess = response.responseData.data.accessToken;
        const newRefresh = response.responseData.data.refreshTokennew;
        setAccess(newAccess);
        setRefresh(newRefresh);
      } else {
        if (response.error === "Token expired") {
          handleLogout();
        } else {
          console.error(
            "Error occurred while updating token:",
            response.error
          );
          handleLogout();
        }
      }
    };
  
    const timeoutId = setTimeout(fetchData, 3000);
    const intervalId = setInterval(fetchData, 7200000);
  
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const handlePyClick = async () => {
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

  const MenuItem = ({ icon, text, url, elementa, classet }) => {
    if (elementa === "true") {
      return (
        <Link to={url} className="listmainmenu">
          <Icon icon={icon} className={classet} />
          <span className="textlistmainmenu">{text}</span>
        </Link>
      );
    } else {
      const access = localStorage.getItem("acme");
      const handleParlayClick = async () => {
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
            
            window.open(correctedUrl, '_blank');
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

      return (
        <div className="listmainmenu" onClick={handleShowOptions}>
          <Icon icon={icon} />
          <span className="textlistmainmenu">{text}</span>
        </div>
      );
    }
  };

  const MenuGroup = ({ label, items }) => (
    <div className="grouplistmainmenu">
      <span className="labelgrouplist">{label}</span>
      <div className="sclistmainmenu">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mainMenuRef.current && !mainMenuRef.current.contains(event.target)) {
        setIsMainmenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mainMenuRef]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      window.location.href = "/";
      return;
    }
    
    try {
      const { status, responseData } = await deleteToken(token);
    
      if (status) {
        localStorage.removeItem("token");
        localStorage.removeItem("acme");
        localStorage.removeItem("dataVerified");
        localStorage.removeItem("broker");
        localStorage.removeItem("brokerwd");
        localStorage.removeItem("iseco");
        localStorage.removeItem("lastFetchTimestamp");
        localStorage.removeItem("exSure");
        window.location.href = "/";
      } else {
        console.error("Error deleting token from server:", responseData);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error deleting token:", error);
      window.location.href = "/";
    }
  };

  const menuItems = [
    {
      label: "umum",
      items: [
        {
          icon: "carbon:home",
          text: "home",
          url: "/lobby",
          elementa: "true",
          classet: "",
        },
        {
          icon: "fluent-mdl2:chat-solid",
          text: "live chat",
          url: "/",
          elementa: "true",
          classet: "livechat",
        },
        {
          icon: "mdi:instant-deposit",
          text: "deposit",
          url: "/deposit",
          elementa: "true",
          classet: "",
        },
        {
          icon: "streamline:payment-cash-out-3",
          text: "withdraw",
          url: "/withdraw",
          elementa: "true",
          classet: "",
        },
        {
          icon: "system-uicons:files-history",
          text: "statement",
          url: "/history",
          elementa: "true",
          classet: "",
        },
        {
          icon: "material-symbols-light:history",
          text: "history bet",
          url: "/historybet",
          elementa: "true",
          classet: "",
        },
        {
          icon: "fluent-emoji:wrapped-gift",
          text: "promosi",
          url: "/promosilobby",
          elementa: "true",
          classet: "",
        },
        {
          icon: "iconamoon:notification-light",
          text: "memo",
          url: "/pagememo",
          elementa: "true",
          classet: "",
        },
        {
          icon: "mingcute:announcement-line",
          text: "referral",
          url: "/referral",
          elementa: "true",
          classet: "",
        },
      ],
    },
    {
      label: "akun",
      items: [
        {
          icon: "uiw:setting-o",
          text: "pengaturan akun",
          url: "/setting",
          elementa: "true",
          classet: "",
        },
      ],
    },
    {
      label: "bantuan",
      items: [
        {
          icon: "grommet-icons:contact",
          text: "kontak",
          url: "/kontak",
          elementa: "true",
          classet: "",
        },
      ],
    },
  ];

  const pasangItems = [
    {
      label: "sports",
      items: [
        {
          icon: "ph:soccer-ball",
          text: "soccer",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
        {
          icon: "streamline:esports",
          text: "esport",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
        {
          icon: "ic:outline-sports-mma",
          text: "MMA",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
        {
          icon: "mdi:tennis",
          text: "tennis",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
        {
          icon: "cil:american-football",
          text: "ametican footbal",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
        {
          icon: "solar:basketball-outline",
          text: "NBA",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
        {
          icon: "fluent-mdl2:golf",
          text: "golf",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
        {
          icon: "mdi:badminton",
          text: "badminton",
          url: "/sbobetmobile",
          elementa: "false",
          classet: "",
        },
      ],
    },
  ];

  const fiturItems = [
    {
      label: "Fitur",
      items: [
        {
          icon: "arcticons:livescore",
          text: "live score",
          url: "/livescorelobby",
          elementa: "true",
          classet: "",
        },
        {
          icon: "solar:ranking-outline",
          text: "klasemen liga",
          url: "/klasemenlobby",
          elementa: "true",
          classet: "",
        },
        {
          icon: "solar:notes-broken",
          text: "prediksi pertandingan",
          url: "/prediksi",
          elementa: "true",
          classet: "",
        },
      ],
    },
  ];

  const handleMenuToggle = (menu) => {
    setActiveMenu(menu);
  };

  const renderMenu = (items) => {
    if (items.length === 0) {
      return <span className="datatidakada">Data tidak ada</span>;
    }

    return items.map((group, index) => <MenuGroup key={index} {...group} />);
  };

  const handleCloseMenu = () => {
    if (mainMenuRef.current) {
      mainMenuRef.current.classList.add("hide");
      setTimeout(() => {
        setIsMainmenuVisible(false);
        mainMenuRef.current.classList.remove("hide");
      }, 500);
    }
  };

  return (
    <>
      <div className={`secmainmenu ${isMainmenuVisible ? "show" : ""}`}>
        <div className="groupsecmainmenu">
          <div className="groupmainmenu" ref={mainMenuRef}>
            <div className="datagroupmenu">
              <div className="headgroupmainmenu">
                <Link to="/lobby" className="logomenu">
                  <Logofirts />
                </Link>
                <div className="topmenutoggle">
                  <div
                    className={`listmenutoggle ${activeMenu === "general" ? "active" : ""}`}
                    onClick={() => handleMenuToggle("general")}
                  >
                    <Icon icon="system-uicons:circle-menu" />
                    <span className="textmenutoggle">MENU</span>
                  </div>
                  <div
                    className={`listmenutoggle ${activeMenu === "pasang" ? "active" : ""}`}
                    onClick={() => handleMenuToggle("pasang")}
                  >
                    <Icon icon="ph:soccer-ball" />
                    <span className="textmenutoggle">SPORT</span>
                  </div>
                  <div
                    className={`listmenutoggle ${activeMenu === "prediksi" ? "active" : ""}`}
                    onClick={() => handleMenuToggle("prediksi")}
                  >
                    <Icon icon="f7:sportscourt" />
                    <span className="textmenutoggle">FITUR</span>
                  </div>
                </div>
              </div>
              <div className="datalistmainmenu">
                {activeMenu === "general" && renderMenu(menuItems)}
                {activeMenu === "pasang" && renderMenu(pasangItems)}
                {activeMenu === "prediksi" && renderMenu(fiturItems)}
              </div>
            </div>
            <div className="grouplistmainmenu logout">
              <div className="listmainmenu" onClick={handleLogout}>
                <Icon icon="mingcute:power-line" />
                <span className="textlistmainmenu">logout</span>
              </div>
            </div>
          </div>
        </div>
        <div className="closemainmenu" onClick={handleCloseMenu}>
          <Icon icon="solar:close-square-outline" />
        </div>
      </div>
      <div className={`sbobetopsi ${showOptions ? "show" : ""}`}>
        <div className="secsbobetopsi">
          <div className="cckomponenklik grouplogodanhalaman">
            <span className="closeshowme" onClick={handleShowOptions}>x</span>
              <img src="/assets/img/global-bola-logo.webp" alt="global bola logo" />
              <div className="grouplistbuttonbet">
                {windowWidth < 730 ? (
                  <div className="groupbuttonbet listnavigasi parlay" onClick={handlePyClick}>
                    <Icon icon="noto:coin" />
                    <span>Dekstop</span>
                  </div>
                ) : (
                  <Link to="/sbobetdekstop" className="groupbuttonbet listnavigasi parlay">
                    <Icon icon="noto:coin" />
                    <span>Dekstop</span>
                  </Link>
                )}
                <Link to="/sbobetmobile" className="groupbuttonbet listnavigasi parlay">
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

export default Mainmenu;
