import { useEffect } from "react";
import Swal from "sweetalert2";

// export const FetchParlayUrl = ({ username, setParlayUrl }) => {
//   useEffect(() => {
//     const fetchParlayUrl = async () => {
//       if (!username) return;
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_CR_TWO_API_URL}/prx/login/${username}/false/d`,
//           {
//             method: "GET",
//             credentials: "omit",
//             headers: {
//               Authorization: import.meta.env.VITE_CR_TWO_AUTHORIZATION_TOKEN
//             }
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           const url = data.url.split("//")[1];
//           setParlayUrl(url);
//         } else {
//           console.error("Failed to fetch parlay URL");
//         }
//       } catch (error) {
//         console.error("Error fetching parlay URL:", error);
//       }
//     };

//     fetchParlayUrl();
//   }, [username, setParlayUrl]);

//   return null;
// };


export const fetchDataLiveToday = async (accesstoken) => {
  try {
    const response = await fetch("/prx/get-recommend-matches",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchDataPopular = async (leagueId) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_events&timezone=asia/jakarta&from=${formattedDate}&to=${formattedDate}&league_id=${leagueId}`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchDataIslive = async (leagueId) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_events&timezone=asia/jakarta&from=${formattedDate}&to=${formattedDate}&league_id=${leagueId}&match_live=1`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchDataIncoming = async (leagueId) => {
  try {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_events&timezone=asia/jakarta&from=${formattedDate}&to=${formattedDate}&league_id=${leagueId}&match_live=0`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchDataLiga = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_leagues`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchKlasemenLiga = async (ligaId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_standings&league_id=${ligaId}`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchMatch = async (match_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_events&match_id=${match_id}`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchFixture = async (teamid) => {
  try {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 6);

    const fromDate = formatDate(threeMonthsAgo);
    const toDate = formatDate(today);

    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_events&from=${fromDate}&to=${toDate}&team_id=${teamid}`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const fetchHead = async (HomeId, AwayId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_H2H&firstTeamId=${HomeId}&secondTeamId=${AwayId}`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchPrediksi = async (match_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_predictions&match_id=${match_id}`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const fetchPrediksiAll = async (fromdate, todate, match_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CR_BOLA_URL}&action=get_predictions&from=${fromdate}&to=${todate}&league_id=${match_id}`,
      {
        method: "GET",
        credentials: "omit",
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getHistoryDw = async ( xusername, accesstoken ) => {
  try {
    const response = await fetch("/prx/gthstry",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({ username: xusername }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getHistorybet = async (xusername, portopolio, accesstoken) => {
  try {
    const today = new Date();
    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(today.getDate() - 58);

    const startDate = sixtyDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    const response = await fetch("/prx/getHistoryGame",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI_TWO,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(
          {
            username: xusername,
            portfolio : portopolio,
            startDate : startDate,
            endDate : endDate,
          }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getDetailbet = async (xinvoice, xportopolio, accesstoken) => {
  try {
    const response = await fetch("/prx/getHistoryGameById",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI_TWO,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(
          {
            refNos : xinvoice,
            portfolio : xportopolio
          }
        ),
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getMemo = async (memostatus) => {
  try {
    const response = await fetch(`/memo${memostatus}`,
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getPromosi = async () => {
  try {
    const response = await fetch("/content/prm",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getLinkAlternatif = async () => {
  try {
    const response = await fetch("/content/ctlink",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getMediaSosial = async () => {
  try {
    const response = await fetch("/content/socmed",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const handleClick = async (idctscmed, title, opsi) => {
  const response = await getMediaSosial();
  if (response && response.data && Array.isArray(response.data)) {
    const targetItem = response.data.find(item => item.idctscmed === idctscmed);
    if (targetItem) {
      if (targetItem.statusctscmed === "1") {
        window.location.href = targetItem.trgturctscmed;
      } else {
        Swal.fire({
          title: `${title} tidak aktif`,
          text: `Silahkan Hubungi admin melalui ${opsi}.`,
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    } else {
      console.error(`No item with idctscmed equal to ${idctscmed} found`);
    }
  } else {
    console.error("Failed to fetch data or data is not in expected format");
  }
};

export const getMeta = async () => {
  try {
    const response = await fetch("/content/dtmttag/gtdt",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getProvide = async () => {
  try {
    const response = await fetch("/content/ctgeneral",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getSlider = async () => {
  try {
    const response = await fetch("/content/ctslider",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const getSitemap = async () => {
  try {
    const response = await fetch("/content/stmp",
      {
        method: "GET",
        credentials: "omit",
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch data from API");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

export const dataGameslogin = [
  {
      "namagame": "slot",
      "namalabel": "Slot games",
      "title": "SLOT GAMES",
      "description": "situs yang aman dan terpercaya, menyediakan permainan slot terbaik dan layanan unggulan untuk penggemar slot",
      "keyword": "permainan slot, slot aman, slot terpercaya, layanan slot, situs slot, slot terbaik",
      "gamesimg": "../assets/img/games/banner/slot.webp",
      "provider": [
          // {
          //     "id": "1",
          //     "nmprovider": "PragmaticPlay",
          //     "img": "../assets/img/games/provider/pragmaticplay.webp"
          // },
          // {
          //     "id": "2",
          //     "nmprovider": "PGSoft",
          //     "img": "../assets/img/games/provider/pgsoft.webp"
          // },
          // {
          //     "id": "3",
          //     "nmprovider": "MicroGaming",
          //     "img": "../assets/img/games/provider/microgaming.webp"
          // },
          {
              "id": "4",
              "nmprovider": "SBO Slot",
              "img": "../assets/img/games/provider/sbobetslot.webp"
          },
          // {
          //     "id": "5",
          //     "nmprovider": "CQNine",
          //     "img": "../assets/img/games/provider/cqnine.webp"
          // },
          // {
          //     "id": "6",
          //     "nmprovider": "JokerGaming",
          //     "img": "../assets/img/games/provider/jokergaming.webp"
          // },
          // {
          //     "id": "7",
          //     "nmprovider": "RTG",
          //     "img": "../assets/img/games/provider/rtg.webp"
          // },
          // {
          //     "id": "8",
          //     "nmprovider": "WorldMatch",
          //     "img": "../assets/img/games/provider/worldmatch.webp"
          // },
          // {
          //     "id": "9",
          //     "nmprovider": "FunkyGames",
          //     "img": "../assets/img/games/provider/funkygames.webp"
          // },
          // {
          //     "id": "10",
          //     "nmprovider": "Netent",
          //     "img": "../assets/img/games/provider/netent.webp"
          // },
          // {
          //     "id": "11",
          //     "nmprovider": "Kiron",
          //     "img": "../assets/img/games/provider/kiron.webp"
          // },
          // {
          //     "id": "12",
          //     "nmprovider": "PlayNGo",
          //     "img": "../assets/img/games/provider/playngo.webp"
          // },
          // {
          //     "id": "13",
          //     "nmprovider": "QuickSpin",
          //     "img": "../assets/img/games/provider/quickspin.webp"
          // },
          // {
          //     "id": "14",
          //     "nmprovider": "RedTiger",
          //     "img": "../assets/img/games/provider/redtiger.webp"
          // },
          // {
          //     "id": "15",
          //     "nmprovider": "Yggdrasil",
          //     "img": "../assets/img/games/provider/yggdrasil.webp"
          // },
          // {
          //     "id": "16",
          //     "nmprovider": "Gamatron",
          //     "img": "../assets/img/games/provider/gamatron.webp"
          // },
          // {
          //     "id": "17",
          //     "nmprovider": "GiocoPlus",
          //     "img": "../assets/img/games/provider/giocoplus.webp"
          // },
          // {
          //     "id": "18",
          //     "nmprovider": "LionKing",
          //     "img": "../assets/img/games/provider/lionking.webp"
          // }
      ]
  },
  {
      "namagame": "sportbook",
      "namalabel": "sportbook",
      "title": "SPORTBOOK GAMES",
      "description": "situs yang aman dan terpercaya, menyediakan permainan sportbook terbaik dan layanan unggulan untuk penggemar sportbook",
      "keyword": "permainan sportbook, sportbook aman, sportbook terpercaya, layanan sportbook, situs sportbook, sportbook terbaik",
      "gamesimg": "../assets/img/games/banner/sportbook.webp",
      "provider": [
          {
              "id": "1",
              "nmprovider": "SBOBET",
              "img": "../assets/img/games/provider/sbobet.webp"
          },
          // {
          //     "id": "2",
          //     "nmprovider": "568WIN",
          //     "img": "../assets/img/games/provider/568win.webp"
          // }
      ]
  },
  {
      "namagame": "virtualsportbook",
      "namalabel": "virtual sportbook",
      "title": "VIRTUAL SPORTBOOK GAMES",
      "description": "situs yang aman dan terpercaya, menyediakan permainan virtual sportbook terbaik dan layanan unggulan untuk penggemar virtual sportbook",
      "keyword": "permainan virtual sportbook, virtual sportbook aman, virtual sportbook terpercaya, layanan virtual sportbook, situs virtual sportbook, virtual sportbook terbaik",
      "gamesimg": "../assets/img/games/banner/virtual-sportbook.webp",
      "provider": [
          {
              "id": "1",
              "nmprovider": "568win",
              "img": "../assets/img/games/provider/568win.webp"
          },
      ]
  },
  {
      "namagame": "livecasino",
      "namalabel": "live casino",
      "title": "LIVE CASINO GAMES",
      "description": "situs yang aman dan terpercaya, menyediakan permainan live casino terbaik dan layanan unggulan untuk penggemar live casino",
      "keyword": "permainan live casino, live casino aman, live casino terpercaya, layanan live casino, situs live casino, live casino terbaik",
      "gamesimg": "../assets/img/games/banner/live-casino.webp",
      "provider": [
          {
              "id": "1",
              "nmprovider": "568win",
              "img": "../assets/img/games/provider/568win.webp"
          },
      ]
  },
  {
      "namagame": "virtualcasino",
      "namalabel": "virtual casino",
      "title": "VIRTUAL CASINO GAMES",
      "description": "situs yang aman dan terpercaya, menyediakan permainan virtual casino terbaik dan layanan unggulan untuk penggemar virtual casino",
      "keyword": "permainan virtual casino, virtual casino aman, virtual casino terpercaya, layanan virtual casino, situs virtual casino, virtual casino terbaik",
      "gamesimg": "../assets/img/games/banner/virtual-casino.webp",
      "provider": [
          {
              "id": "1",
              "nmprovider": "royal baccarat",
              "img": "../assets/img/games/provider/royalbaccarart.webp"
          },
      ]
  }
];

export const dataGames = [
  {
    namagame: "sportbooks",
    listgame: [
      {
        namaprovider: "SBOBET",
        img: "../assets/img/games/provider/sbobet.webp",
        url: "sportsbobet",
        request: "/prx/authlog",
        dekstopurl: "/dekstopgames/sportsbobet",
        mobileurl: "/mobilegames/sportsbobet",
        gamebaru: false,
        versimobile: true
      },
      // {
      //   namaprovider: "568WIN",
      //   img: "../assets/img/games/provider/568win.webp",
      //   url: "sport568win",
      //   request: "/prx/authlog/winsprt",
      //   dekstopurl: "/dekstopgames/sport568win",
      //   mobileurl: "/mobilegames/sport568win",
      //   gamebaru: true,
      //   versimobile: true
      // },
    ]
  },
  {
    namagame: "virtualsportbooks",
    listgame: [
      {
        namaprovider: "568WIN",
        img: "../assets/img/games/provider/568win.webp",
        url: "virtual568win",
        request: "/prx/authlog/vrsprt",
        dekstopurl: "/dekstopgames/virtual568win",
        mobileurl: "/mobilegames/virtual568win",
        gamebaru: true,
        versimobile: false
      },
    ]
  },
  {
    namagame: "livecasino",
    listgame: [
      {
        namaprovider: "568WIN",
        img: "../assets/img/games/provider/568win.webp",
        url: "livecasino568win",
        request: "/prx/authlog/csn",
        dekstopurl: "/dekstopgames/livecasino568win",
        mobileurl: "/mobilegames/livecasino568win",
        gamebaru: true,
        versimobile: true
      },
    ]
  },
  {
    namagame: "virtualcasino",
    listgame: [
      {
        namaprovider: "ROYAL BACCARAT",
        img: "../assets/img/games/provider/royalbaccarart.webp",
        url: "virtualcasinoroyal",
        request: "/prx/authlog/gms",
        dekstopurl: "/dekstopgames/virtualcasinoroyal",
        mobileurl: "/mobilegames/virtualcasinoroyal",
        gamebaru: true,
        versimobile: false
      },
    ]
  },
  {
    namagame: "slot",
    listgame: [
      {
        namaprovider: "ALL GAME SLOT",
        img: "../assets/img/games/provider/allslotsgame.webp",
        url: "slotgames",
        request: "/prx/authlog/slsgms",
        dekstopurl: "/dekstopgames/slotgames",
        mobileurl: "/mobilegames/slotgames",
        gamebaru: true,
        versimobile: false
      },
    ]
  },
];

export const dataCompetition = [
  { country: "International", leagueName: "AFC U23 Asian Cup", leagueId: 570 },
  {
    country: "International",
    leagueName: "AFC U23 Asian Cup Qualification",
    leagueId: 703,
  },
  {
    country: "Worldcup 2026",
    leagueName: "CONMEBOL World Cup Qualifiers",
    leagueId: 27,
  },
  { country: "Worldcup", leagueName: "AFC World Cup Qualifiers", leagueId: 22 },
  { country: "Worldcup", leagueName: "CAF World Cup Qualifiers", leagueId: 21 },
  {
    country: "Worldcup",
    leagueName: "Concacaf World Cup Qualifiers",
    leagueId: 23,
  },
  {
    country: "Eurocups",
    leagueName: "UEFA European Championship",
    leagueId: 1,
  },
  {
    country: "Eurocups",
    leagueName: "UEFA European Championship Qualifiers",
    leagueId: 354,
  },
  { country: "Eurocups", leagueName: "UEFA Champions League", leagueId: 3 },
  { country: "Eurocups", leagueName: "UEFA Europa League", leagueId: 4 },
  {
    country: "International",
    leagueName: "CONMEBOL Copa America",
    leagueId: 17,
  },
  { country: "England", leagueName: "FA Cup", leagueId: 146 },
  { country: "England", leagueName: "Premier League", leagueId: 152 },
  { country: "Spain", leagueName: "Copa del Rey", leagueId: 300 },
  { country: "Spain", leagueName: "La Liga", leagueId: 302 },
  { country: "Italy", leagueName: "Coppa Italia", leagueId: 205 },
  { country: "Italy", leagueName: "Serie A", leagueId: 207 },
  { country: "Germany", leagueName: "Super Cup", leagueId: 379 },
  { country: "Germany", leagueName: "Bundesliga", leagueId: 175 },
  { country: "France", leagueName: "Coupe de France", leagueId: 165 },
  { country: "France", leagueName: "Ligue 1", leagueId: 168 },
  { country: "Netherlands", leagueName: "Eredivisie", leagueId: 244 },
  { country: "Saudi Arabia", leagueName: "King's Cup", leagueId: 604 },
  { country: "Saudi Arabia", leagueName: "Saudi League", leagueId: 278 },
  { country: "Indonesia", leagueName: "Liga 1", leagueId: 194 },
  {
    country: "Argentina",
    leagueName: "Liga Profesional Argentina",
    leagueId: 44,
  },
  { country: "Belgium", leagueName: "Challenger Pro League", leagueId: 65 },
  { country: "Portugal", leagueName: "Primeira Liga", leagueId: 266 },
  { country: "Croatia", leagueName: "HNL", leagueId: 124 },
  { country: "Uruguay", leagueName: "Primera División", leagueId: 333 },
  { country: "Morocco", leagueName: "Botola Pro", leagueId: 239 },
  { country: "USA", leagueName: "MLS", leagueId: 332 },
  { country: "Colombia", leagueName: "Primera A", leagueId: 120 },
  { country: "Mexico", leagueName: "Liga MX", leagueId: 235 },
  { country: "Senegal", leagueName: "Ligue 1", leagueId: 497 },
  { country: "Japan", leagueName: "J1 League", leagueId: 209 },
  { country: "Switzerland", leagueName: "Super League", leagueId: 308 },
  { country: "Iran", leagueName: "Persian Gulf Pro League", leagueId: 195 },
  { country: "Denmark", leagueName: "1. Division", leagueId: 138 },
  { country: "Korea Republic", leagueName: "K League 1", leagueId: 219 },
  { country: "Australia", leagueName: "A-League Men", leagueId: 49 },
  { country: "Ukraine", leagueName: "Premier League", leagueId: 325 },
  { country: "Austria", leagueName: "Bundesliga", leagueId: 56 },
  { country: "Sweden", leagueName: "Allsvenskan", leagueId: 307 },
  { country: "Hungary", leagueName: "NB I", leagueId: 191 },
  { country: "Nigeria", leagueName: "NPFL", leagueId: 248 },
  { country: "Wales", leagueName: "Premier League", leagueId: 341 },
  { country: "Poland", leagueName: "I Liga", leagueId: 263 },
  { country: "Serbia", leagueName: "Super Liga", leagueId: 288 },
  { country: "Peru", leagueName: "Primera División", leagueId: 257 },
  { country: "Scotland", leagueName: "Premiership", leagueId: 279 },
  { country: "Turkey", leagueName: "Süper Lig", leagueId: 322 },
  { country: "Egypt", leagueName: "Premier League", leagueId: 141 },
  { country: "Qatar", leagueName: "Stars League", leagueId: 269 },
  { country: "Russia", leagueName: "Premier League", leagueId: 344 },
  { country: "Czech Republic", leagueName: "Czech Liga", leagueId: 134 },
  { country: "Cameroon", leagueName: "Elite One", leagueId: 112 },
  { country: "Ghana", leagueName: "Premier League", leagueId: 177 },
  { country: "Thailand", leagueName: "Thai League 1", leagueId: 314 },
  { country: "Vietnam", leagueName: "V.League 1", leagueId: 339 },
  { country: "Malaysia", leagueName: "Super League", leagueId: 232 },
  { country: "China", leagueName: "CSL", leagueId: 118 },
  { country: "Cambodia", leagueName: "Premier League", leagueId: 493 },
  { country: "Tunisia", leagueName: "Ligue 1", leagueId: 317 },
  { country: "Chile", leagueName: "Segunda División", leagueId: 599 },
  { country: "Algeria", leagueName: "Ligue 1", leagueId: 34 },
  { country: "Panama", leagueName: "LPF", leagueId: 406 },
  { country: "Romania", leagueName: "Liga I", leagueId: 272 },
  { country: "Norway", leagueName: "1. Division", leagueId: 362 },
  { country: "Slovakia", leagueName: "Super Liga", leagueId: 293 },
  { country: "Greece", leagueName: "Gamma Ethniki", leagueId: 180 },
  { country: "Canada", leagueName: "Canadian Premier League", leagueId: 659 },
  { country: "Venezuela", leagueName: "Primera División", leagueId: 337 },
  { country: "Costa Rica", leagueName: "Liga de Ascenso", leagueId: 122 },
  { country: "Slovenia", leagueName: "1. SNL", leagueId: 296 },
  { country: "Paraguay", leagueName: "Division Intermedia", leagueId: 256 },
  { country: "Jamaica", leagueName: "Premier League", leagueId: 208 },
  { country: "Iraq", leagueName: "Iraqi League", leagueId: 495 },
  { country: "Finland", leagueName: "Kakkonen", leagueId: 160 },
  { country: "Burkina Faso", leagueName: "Ligue 1", leagueId: 554 },
  { country: "Northern Ireland", leagueName: "Premiership", leagueId: 251 },
  { country: "Albania", leagueName: "Superliga", leagueId: 31 },
  { country: "Uzbekistan", leagueName: "Super League", leagueId: 335 },
  { country: "North Macedonia", leagueName: "First League", leagueId: 230 },
  { country: "United Arab Emirates", leagueName: "Pro League", leagueId: 328 },
  { country: "Jordan", leagueName: "League", leagueId: 213 },
  {
    country: "Bosnia and Herzegovina",
    leagueName: "Premijer Liga",
    leagueId: 70,
  },
  { country: "Montenegro", leagueName: "First League", leagueId: 398 },
  { country: "Iceland", leagueName: "Úrvalsdeild", leagueId: 192 },
  { country: "Israel", leagueName: "Ligat Ha'al", leagueId: 202 },
  { country: "Georgia", leagueName: "Erovnuli Liga", leagueId: 170 },
  { country: "Honduras", leagueName: "Liga Nacional", leagueId: 185 },
  { country: "Oman", leagueName: "Professional League", leagueId: 254 },
  { country: "El Salvador", leagueName: "Primera Division", leagueId: 142 },
  { country: "Bahrain", leagueName: "Premier League", leagueId: 59 },
  { country: "Bulgaria", leagueName: "First League", leagueId: 111 },
  { country: "Gabon", leagueName: "Championnat D1", leagueId: 7993 },
  { country: "Bolivia", leagueName: "Primera División", leagueId: 69 },
  { country: "Syria", leagueName: "Premier League", leagueId: 313 },
  { country: "Angola", leagueName: "Girabola", leagueId: 38 },
  { country: "Armenia", leagueName: "First League", leagueId: 46 },
  { country: "Belarus", leagueName: "Premier League", leagueId: 61 },
  {
    country: "Trinidad and Tobago",
    leagueName: "TT Premier League",
    leagueId: 315,
  },
  { country: "Tajikistan", leagueName: "Vysshaya Liga", leagueId: 569 },
  { country: "Kosovo", leagueName: "Superliga", leagueId: 544 },
  { country: "Mauritania", leagueName: "Premier League", leagueId: 559 },
  { country: "Guatemala", leagueName: "Liga Nacional", leagueId: 182 },
  { country: "Kenya", leagueName: "FKF Premier League", leagueId: 216 },
  { country: "Azerbaijan", leagueName: "Premyer Liqa", leagueId: 57 },
  { country: "India", leagueName: "Indian Super League", leagueId: 566 },
  { country: "Tanzania", leagueName: "Ligi kuu Bara", leagueId: 551 },
  { country: "Libya", leagueName: "Premier League", leagueId: 225 },
  { country: "Estonia", leagueName: "Esiliiga A", leagueId: 155 },
  { country: "Zimbabwe", leagueName: "Premier Soccer League", leagueId: 343 },
  { country: "Cyprus", leagueName: "1. Division", leagueId: 130 },
  { country: "Sudan", leagueName: "Sudani Premier League", leagueId: 303 },
  { country: "Nicaragua", leagueName: "Primera Division", leagueId: 247 },
  { country: "Faroe Islands", leagueName: "1. Deild", leagueId: 158 },
  { country: "Latvia", leagueName: "1. Liga", leagueId: 222 },
  { country: "Kuwait", leagueName: "Division 1", leagueId: 221 },
  { country: "Lithuania", leagueName: "1 Lyga", leagueId: 226 },
  { country: "Burundi", leagueName: "Ligue A", leagueId: 545 },
  { country: "Turkmenistan", leagueName: "Ýokary Liga", leagueId: 582 },
  { country: "Surinam", leagueName: "Eerste Divisie", leagueId: 304 },
  { country: "Ethiopia", leagueName: "Premier League", leagueId: 556 },
  { country: "Botswana", leagueName: "Premier League", leagueId: 490 },
  { country: "Dominican Republic", leagueName: "Liga Mayor", leagueId: 400 },
  {
    country: "Chinese Taipei",
    leagueName: "Taiwan Football Premier League",
    leagueId: 119,
  },
  { country: "Bermuda", leagueName: "Premier League", leagueId: 68 },
  { country: "Malta", leagueName: "Challenge League", leagueId: 233 },
  { country: "Nepal", leagueName: "A Division", leagueId: 496 },
  { country: "Barbados", leagueName: "Premier League", leagueId: 403 },
  { country: "Belize", leagueName: "Premier League", leagueId: 488 },
  { country: "Bangladesh", leagueName: "Premier League", leagueId: 60 },
  { country: "Aruba", leagueName: "Division di Honor", leagueId: 47 },
  { country: "San Marino", leagueName: "Campionato", leagueId: 276 },
  { country: "International", leagueName: "Club Friendlies", leagueId: 355 },
  {
    country: "International",
    leagueName: "CAF Africa Cup of Nations",
    leagueId: 29,
  },
  {
    country: "International",
    leagueName: "CAF Champions League",
    leagueId: 346,
  },
  {
    country: "Eurocups",
    leagueName: "UEFA Europa Conference League",
    leagueId: 683,
  },
  { country: "Eurocups", leagueName: "UEFA Nations League", leagueId: 633 },
  { country: "Eurocups", leagueName: "UEFA Super Cup", leagueId: 372 },
  {
    country: "International",
    leagueName: "Concacaf Champions Cup",
    leagueId: 5,
  },
  {
    country: "International",
    leagueName: "CONMEBOL Libertadores",
    leagueId: 18,
  },
  {
    country: "International",
    leagueName: "CONMEBOL Sudamericana",
    leagueId: 385,
  },
  { country: "England", leagueName: "Community Shield", leagueId: 377 },
  { country: "Belgium", leagueName: "Super Cup", leagueId: 381 },
  { country: "Netherlands", leagueName: "Eerste Divisie", leagueId: 245 },
  { country: "Portugal", leagueName: "Super Cup", leagueId: 268 },
  { country: "USA", leagueName: "MLS All-Star", leagueId: 722 },
  { country: "Japan", leagueName: "Super Cup", leagueId: 361 },
  { country: "Korea Republic", leagueName: "FA Cup", leagueId: 419 },
  { country: "Thailand", leagueName: "League Cup", leagueId: 7091 },
  { country: "Vietnam", leagueName: "Super Cup", leagueId: 470 },
  { country: "Malaysia", leagueName: "FA Cup", leagueId: 7100 },
  {
    country: "Philippines",
    leagueName: "Copa Paulino Alcantara",
    leagueId: 696,
  },
];

export const dataLeague = [
  { negara: "England", ligaName: "Premier League", leagueId: 152 },
  { negara: "Spain", ligaName: "La Liga", leagueId: 302 },
  { negara: "Italy", ligaName: "Serie A", leagueId: 207 },
  { negara: "Germany", ligaName: "Bundesliga", leagueId: 175 },
  { negara: "France", ligaName: "Ligue 1", leagueId: 168 },
  { negara: "Netherlands", ligaName: "Eredivisie", leagueId: 244 },
  { negara: "Saudi Arabia", ligaName: "Saudi League", leagueId: 278 },
  { negara: "USA", ligaName: "MLS", leagueId: 332 },
  { negara: "Indonesia", ligaName: "Liga 1", leagueId: 194 },
  { negara: "Thailand", ligaName: "Thai League 1", leagueId: 314 },
  { negara: "Vietnam", ligaName: "V.League 1", leagueId: 339 },
  { negara: "Malaysia", ligaName: "Super League", leagueId: 232 },
  { negara: "China", ligaName: "CSL", leagueId: 118 },
  { negara: "Cambodia", ligaName: "Premier League", leagueId: 493 },
  { negara: "Argentina", ligaName: "Liga Profesional Argentina", leagueId: 44 },
  { negara: "Belgium", ligaName: "Challenger Pro League", leagueId: 65 },
  { negara: "Portugal", ligaName: "Primeira Liga", leagueId: 266 },
  { negara: "Croatia", ligaName: "HNL", leagueId: 124 },
  { negara: "Uruguay", ligaName: "Primera División", leagueId: 333 },
  { negara: "Morocco", ligaName: "Botola Pro", leagueId: 239 },
  { negara: "Colombia", ligaName: "Primera A", leagueId: 120 },
  { negara: "Mexico", ligaName: "Liga MX", leagueId: 235 },
  { negara: "Senegal", ligaName: "Ligue 1", leagueId: 497 },
  { negara: "Japan", ligaName: "J1 League", leagueId: 209 },
  { negara: "Switzerland", ligaName: "Super League", leagueId: 308 },
  { negara: "Iran", ligaName: "Persian Gulf Pro League", leagueId: 195 },
  { negara: "Denmark", ligaName: "1. Division", leagueId: 138 },
  { negara: "Korea Republic", ligaName: "K League 1", leagueId: 219 },
  { negara: "Australia", ligaName: "A-League Men", leagueId: 49 },
  { negara: "Ukraine", ligaName: "Premier League", leagueId: 325 },
  { negara: "Austria", ligaName: "Bundesliga", leagueId: 56 },
  { negara: "Sweden", ligaName: "Allsvenskan", leagueId: 307 },
  { negara: "Hungary", ligaName: "NB I", leagueId: 191 },
  { negara: "Nigeria", ligaName: "NPFL", leagueId: 248 },
  { negara: "Wales", ligaName: "Premier League", leagueId: 341 },
  { negara: "Poland", ligaName: "I Liga", leagueId: 263 },
  { negara: "Serbia", ligaName: "Super Liga", leagueId: 288 },
  { negara: "Peru", ligaName: "Primera División", leagueId: 257 },
  { negara: "Scotland", ligaName: "Premiership", leagueId: 279 },
  { negara: "Turkey", ligaName: "Süper Lig", leagueId: 322 },
  { negara: "Egypt", ligaName: "Premier League", leagueId: 141 },
  { negara: "Qatar", ligaName: "Stars League", leagueId: 269 },
  { negara: "Russia", ligaName: "Premier League", leagueId: 344 },
  { negara: "Czech Republic", ligaName: "Czech Liga", leagueId: 134 },
  { negara: "Cameroon", ligaName: "Elite One", leagueId: 112 },
  { negara: "Ghana", ligaName: "Premier League", leagueId: 177 },
  { negara: "Tunisia", ligaName: "Ligue 1", leagueId: 317 },
  { negara: "Chile", ligaName: "Segunda División", leagueId: 599 },
  { negara: "Algeria", ligaName: "Ligue 1", leagueId: 34 },
  { negara: "Panama", ligaName: "LPF", leagueId: 406 },
  { negara: "Romania", ligaName: "Liga I", leagueId: 272 },
  { negara: "Norwa", ligaName: "1. Division", leagueId: 362 },
  { negara: "Slovakia", ligaName: "Super Liga", leagueId: 293 },
  { negara: "Greece", ligaName: "Gamma Ethniki", leagueId: 180 },
  { negara: "Canada", ligaName: "Canadian Premier League", leagueId: 659 },
  { negara: "Venezuela", ligaName: "Primera División", leagueId: 337 },
  { negara: "Costa Rica", ligaName: "Liga de Ascenso", leagueId: 122 },
  { negara: "Slovenia", ligaName: "1. SNL", leagueId: 296 },
  { negara: "Paraguay", ligaName: "Division Intermedia", leagueId: 256 },
  { negara: "Jamaica", ligaName: "Premier League", leagueId: 208 },
  { negara: "Iraq", ligaName: "Iraqi League", leagueId: 495 },
  { negara: "Finland", ligaName: "Kakkonen", leagueId: 160 },
  { negara: "Burkina Faso", ligaName: "Ligue 1", leagueId: 554 },
  { negara: "Northern Ireland", ligaName: "Premiership", leagueId: 251 },
  { negara: "Albania", ligaName: "Superliga", leagueId: 31 },
  { negara: "Uzbekistan", ligaName: "Super League", leagueId: 335 },
  { negara: "North Macedonia", ligaName: "First League", leagueId: 230 },
  { negara: "United Arab Emirates", ligaName: "Pro League", leagueId: 328 },
  { negara: "Jordan", ligaName: "League", leagueId: 213 },
  { negara: "Bosnia and Herzegovina", ligaName: "Premijer Liga", leagueId: 70 },
  { negara: "Montenegro", ligaName: "First League", leagueId: 398 },
  { negara: "Iceland", ligaName: "Úrvalsdeild", leagueId: 192 },
  { negara: "Israel", ligaName: "Ligat Ha'al", leagueId: 202 },
  { negara: "Georgia", ligaName: "Erovnuli Liga", leagueId: 170 },
  { negara: "Honduras", ligaName: "Liga Nacional", leagueId: 185 },
  { negara: "Oman", ligaName: "Professional League", leagueId: 254 },
  { negara: "El Salvador", ligaName: "Primera Division", leagueId: 142 },
  { negara: "Bahrain", ligaName: "Premier League", leagueId: 59 },
  { negara: "Bulgaria", ligaName: "First League", leagueId: 111 },
  { negara: "Gabon", ligaName: "Championnat D1", leagueId: 7993 },
  { negara: "Bolivia", ligaName: "Primera División", leagueId: 69 },
  { negara: "Syria", ligaName: "Premier League", leagueId: 313 },
  { negara: "Angola", ligaName: "Girabola", leagueId: 38 },
  { negara: "Armenia", ligaName: "First League", leagueId: 46 },
  { negara: "Belarus", ligaName: "Premier League", leagueId: 61 },
  {
    negara: "Trinidad and Tobago",
    ligaName: "TT Premier League",
    leagueId: 315,
  },
  { negara: "Tajikistan", ligaName: "Vysshaya Liga", leagueId: 569 },
  { negara: "Kosovo", ligaName: "Superliga", leagueId: 544 },
  { negara: "Mauritania", ligaName: "Premier League", leagueId: 559 },
  { negara: "Guatemala", ligaName: "Liga Nacional", leagueId: 182 },
  { negara: "Kenya", ligaName: "FKF Premier League", leagueId: 216 },
  { negara: "Azerbaijan", ligaName: "Premyer Liqa", leagueId: 57 },
  { negara: "India", ligaName: "Indian Super League", leagueId: 566 },
  { negara: "Tanzania", ligaName: "Ligi kuu Bara", leagueId: 551 },
  { negara: "Libya", ligaName: "Premier League", leagueId: 225 },
  { negara: "Estonia", ligaName: "Esiliiga A", leagueId: 155 },
  { negara: "Zimbabwe", ligaName: "Premier Soccer League", leagueId: 343 },
  { negara: "Cyprus", ligaName: "1. Division", leagueId: 130 },
  { negara: "Sudan", ligaName: "Sudani Premier League", leagueId: 303 },
  { negara: "Nicaragua", ligaName: "Primera Division", leagueId: 247 },
  { negara: "Faroe Islands", ligaName: "1. Deild", leagueId: 158 },
  { negara: "Latvia", ligaName: "1. Liga", leagueId: 222 },
  { negara: "Kuwait", ligaName: "Division 1", leagueId: 221 },
  { negara: "Lithuania", ligaName: "1 Lyga", leagueId: 226 },
  { negara: "Burundi", ligaName: "Ligue A", leagueId: 545 },
  { negara: "Turkmenistan", ligaName: "Ýokary Liga", leagueId: 582 },
  { negara: "Surinam", ligaName: "Eerste Divisie", leagueId: 304 },
  { negara: "Ethiopia", ligaName: "Premier League", leagueId: 556 },
  { negara: "Botswana", ligaName: "Premier League", leagueId: 490 },
  { negara: "Dominican Republic", ligaName: "Liga Mayor", leagueId: 400 },
  {
    negara: "Chinese Taipei",
    ligaName: "Taiwan Football Premier League",
    leagueId: 119,
  },
  { negara: "Bermuda", ligaName: "Premier League", leagueId: 68 },
  { negara: "Malta", ligaName: "Challenge League", leagueId: 233 },
  { negara: "Nepal", ligaName: "A Division", leagueId: 496 },
  { negara: "Barbados", ligaName: "Premier League", leagueId: 403 },
  { negara: "Belize", ligaName: "Premier League", leagueId: 488 },
  { negara: "Bangladesh", ligaName: "Premier League", leagueId: 60 },
  { negara: "Aruba", ligaName: "Division di Honor", leagueId: 47 },
  { negara: "San Marino", ligaName: "Campionato", leagueId: 276 },
];

export const dataRtp = [
  {
    provider: 'pragmaticplay',
    imgprovider: "../assets/img/games/provider/pragmaticplay.webp",
    pola: "1",
    listgames: [
      {
        id: 1,
        name: "gates of olympus",
        image: "../assets/img/games/games/pragmaticplay/gates-of-olympus.webp",
      },
      {
        id: 2,
        name: "starlight princess",
        image: "../assets/img/games/games/pragmaticplay/starlight-princess.webp",
      },
      {
        id: 3,
        name: "sweet bonanza",
        image: "../assets/img/games/games/pragmaticplay/sweet-bonanza.webp",
      },
      {
        id: 4,
        name: "Sugar Rush",
        image: "../assets/img/games/games/pragmaticplay/Sugar-Rush.webp",
      },
      {
        id: 5,
        name: "Gates of Gatot Kaca",
        image: "../assets/img/games/games/pragmaticplay/Gates-of-Gatot-Kaca.webp",
      },
      {
        id: 6,
        name: "Pyramid Bonanza",
        image: "../assets/img/games/games/pragmaticplay/Pyramid-Bonanza.webp",
      },
      {
        id: 7,
        name: "5 Lions Megaways",
        image: "../assets/img/games/games/pragmaticplay/5-Lions-Megaways.webp",
      },
      {
        id: 8,
        name: "Wild West Gold",
        image: "../assets/img/games/games/pragmaticplay/Wild-West-Gold.webp",
      },
      {
        id: 9,
        name: "Mahjong Wins™",
        image: "../assets/img/games/games/pragmaticplay/Mahjong-Wins.webp",
      },
      {
        id: 10,
        name: "Sweet Bonanza Xmas",
        image: "../assets/img/games/games/pragmaticplay/Sweet-Bonanza-Xmas.webp",
      },
      {
        id: 11,
        name: "5 Rabbits Megaways",
        image: "../assets/img/games/games/pragmaticplay/5-Rabbits-Megaways.webp",
      },
      {
        id: 12,
        name: "Aztec Gems",
        image: "../assets/img/games/games/pragmaticplay/Aztec-Gems.webp",
      },
      {
        id: 13,
        name: "Gates of Olympus Dice",
        image: "../assets/img/games/games/pragmaticplay/Gates-of-Olympus-Dice.webp",
      },
      {
        id: 14,
        name: "Power of Thor Megaways",
        image: "../assets/img/games/games/pragmaticplay/Power-of-Thor-Megaways.webp",
      },
      {
        id: 15,
        name: "Tweety House",
        image: "../assets/img/games/games/pragmaticplay/Tweety-House.webp",
      },
      {
        id: 16,
        name: "Wisdom of Athena™",
        image: "../assets/img/games/games/pragmaticplay/Wisdom-of-Athena.webp",
      },
      {
        id: 17,
        name: "Buffalo King Megaways",
        image: "../assets/img/games/games/pragmaticplay/Buffalo-King-Megaways.webp",
      },
      {
        id: 18,
        name: "Bonanza Gold",
        image: "../assets/img/games/games/pragmaticplay/Bonanza-Gold.webp",
      },
      {
        id: 19,
        name: "Cleocatra",
        image: "../assets/img/games/games/pragmaticplay/Cleocatra.webp",
      },
      {
        id: 20,
        name: "Great Rhino Megaways",
        image: "../assets/img/games/games/pragmaticplay/Great-Rhino-Megaways.webp",
      },
      {
        id: 21,
        name: "Aztec King Megaways",
        image: "../assets/img/games/games/pragmaticplay/Aztec-King-Megaways.webp",
      },
      {
        id: 22,
        name: "Zeus vs Hades - Gods of War™",
        image: "../assets/img/games/games/pragmaticplay/Zeus-vs-Hades-Gods-of-War.webp",
      },
      {
        id: 23,
        name: "Madame Destiny Megaways",
        image: "../assets/img/games/games/pragmaticplay/Madame-Destiny-Megaways.webp",
      },
      {
        id: 24,
        name: "Wild West Gold Megaways",
        image: "../assets/img/games/games/pragmaticplay/Wild-West-Gold-Megaways.webp",
      },
      {
        id: 25,
        name: "Power of Ninja",
        image: "../assets/img/games/games/pragmaticplay/Power-of-Ninja.webp",
      },
      {
        id: 26,
        name: "Wild West Duels™",
        image: "../assets/img/games/games/pragmaticplay/Wild-West-Duels.webp",
      },
      {
        id: 27,
        name: "Candy Blitz Bombs",
        image: "../assets/img/games/games/pragmaticplay/Candy-Blitz-Bombs.webp",
      },
      {
        id: 28,
        name: "Gold Party™",
        image: "../assets/img/games/games/pragmaticplay/Gold-Party.webp",
      },
      {
        id: 29,
        name: "Candy Village",
        image: "../assets/img/games/games/pragmaticplay/Candy-Village.webp",
      },
      {
        id: 30,
        name: "The Dog House",
        image: "../assets/img/games/games/pragmaticplay/The-Dog-House.webp",
      },
      {
        id: 31,
        name: "The Dog House Megaways",
        image: "../assets/img/games/games/pragmaticplay/The-Dog-House-Megaways.webp",
      },
      {
        id: 32,
        name: "Wild Wild Riches Megaways™",
        image: "../assets/img/games/games/pragmaticplay/Wild-Wild-Riches-Megaways.webp",
      },
      {
        id: 33,
        name: "Mahjong Panda",
        image: "../assets/img/games/games/pragmaticplay/Mahjong-Panda.webp",
      },
      {
        id: 34,
        name: "Barn Festival",
        image: "../assets/img/games/games/pragmaticplay/Barn-Festival.webp",
      },
      {
        id: 35,
        name: "Wild Bison Charge™",
        image: "../assets/img/games/games/pragmaticplay/Wild-Bison-Charge.webp",
      },
      {
        id: 36,
        name: "Mahjong Wins Bonus",
        image: "../assets/img/games/games/pragmaticplay/Mahjong-Wins-Bonus.webp",
      },
      {
        id: 37,
        name: "Muertos Multiplier Megaways",
        image: "../assets/img/games/games/pragmaticplay/Muertos-Multiplier-Megaways.webp",
      },
      {
        id: 38,
        name: "888 Dragons",
        image: "../assets/img/games/games/pragmaticplay/888-Dragons.webp",
      },
      {
        id: 39,
        name: "Great Rhino",
        image: "../assets/img/games/games/pragmaticplay/Great-Rhino.webp",
      },
      {
        id: 40,
        name: "Pompeii Megareels Megaways",
        image: "../assets/img/games/games/pragmaticplay/Pompeii-Megareels-Megaways.webp",
      },
      {
        id: 41,
        name: "Zombie Carnival",
        image: "../assets/img/games/games/pragmaticplay/Zombie-Carnival.webp",
      },
      {
        id: 42,
        name: "Heroic Spin",
        image: "../assets/img/games/games/pragmaticplay/Heroic-Spin.webp",
      },
      {
        id: 43,
        name: "Heart of Cleopatra",
        image: "../assets/img/games/games/pragmaticplay/Heart-of-Cleopatra.webp",
      },
      {
        id: 44,
        name: "The Dog House Multihold™",
        image: "../assets/img/games/games/pragmaticplay/The-Dog-House-Multihold.webp",
      },
      {
        id: 45,
        name: "Fire Portals",
        image: "../assets/img/games/games/pragmaticplay/Fire-Portals.webp",
      },
      {
        id: 46,
        name: "Release the Bison",
        image: "../assets/img/games/games/pragmaticplay/Release-the-Bison.webp",
      },
      {
        id: 47,
        name: "Rise of Samurai Megaways",
        image: "../assets/img/games/games/pragmaticplay/Rise-of-Samurai-Megaways.webp",
      },
      {
        id: 48,
        name: "Joker’s Jewels Wild",
        image: "../assets/img/games/games/pragmaticplay/Joker’s-Jewels-Wild.webp",
      },
      {
        id: 49,
        name: "Forge of Olympus™",
        image: "../assets/img/games/games/pragmaticplay/Forge-of-Olympus.webp",
      },
      {
        id: 50,
        name: "The Dog House – Dog or Alive",
        image: "../assets/img/games/games/pragmaticplay/The-Dog-House-Dog-or-Alive.webp",
      },
      {
        id: 51,
        name: "Monster Superlanche™",
        image: "../assets/img/games/games/pragmaticplay/Monster-Superlanche.webp",
      },
      {
        id: 52,
        name: "Sweet Bonanza Dice™",
        image: "../assets/img/games/games/pragmaticplay/Sweet-Bonanza-Dice.webp",
      },
      {
        id: 53,
        name: "Joker's Jewels",
        image: "../assets/img/games/games/pragmaticplay/Joker's-Jewels.webp",
      },
    ]    
  },
  {
    provider: 'pgsoft',
    imgprovider: "../assets/img/games/provider/pgsoft.webp",
    pola: "2",
    listgames: [
      {
        id: 1,
        name: "rise of apollo",
        image: "../assets/img/games/games/pgsoft/rise-of-apollo.webp",
      },
      {
        id: 2,
        name: "mahjong ways",
        image: "../assets/img/games/games/pgsoft/mahjong-ways.webp",
      },
      {
        id: 3,
        name: "lucky neko",
        image: "../assets/img/games/games/pgsoft/lucky-neko.webp",
      },
      {
        id: 4,
        name: "Treasures of Aztec",
        image: "../assets/img/games/games/pgsoft/Treasures-of-Aztec.webp",
      },
      {
        id: 5,
        name: "Leprechaun Riches",
        image: "../assets/img/games/games/pgsoft/Leprechaun-Riches.webp",
      },
      {
        id: 6,
        name: "Caishen Wins",
        image: "../assets/img/games/games/pgsoft/Caishen-Wins.webp",
      },
      {
        id: 7,
        name: "Dreams of Macau",
        image: "../assets/img/games/games/pgsoft/Dreams-of-Macau.webp",
      },
      {
        id: 8,
        name: "Dragon Hatch",
        image: "../assets/img/games/games/pgsoft/Dragon-Hatch.webp",
      },
      {
        id: 9,
        name: "Ganesha Fortune",
        image: "../assets/img/games/games/pgsoft/Ganesha-Fortune.webp",
      },
      {
        id: 10,
        name: "The Great Icescape",
        image: "../assets/img/games/games/pgsoft/The-Great-Icescape.webp",
      },
      {
        id: 11,
        name: "Flirting Scholar",
        image: "../assets/img/games/games/pgsoft/Flirting-Scholar.webp",
      },
      {
        id: 12,
        name: "Captains Bounty",
        image: "../assets/img/games/games/pgsoft/Captains-Bounty.webp",
      },
      {
        id: 13,
        name: "Wild Fireworks",
        image: "../assets/img/games/games/pgsoft/Wild-Fireworks.webp",
      },
      {
        id: 14,
        name: "Egypts Book of Mystery",
        image: "../assets/img/games/games/pgsoft/Egypts-Book-of-Mystery.webp",
      },
      {
        id: 15,
        name: "Fortune Ox",
        image: "../assets/img/games/games/pgsoft/Fortune-Ox.webp",
      },
      {
        id: 16,
        name: "Queen of Bounty",
        image: "../assets/img/games/games/pgsoft/Queen-of-Bounty.webp",
      },
      {
        id: 17,
        name: "Thai River Wonders",
        image: "../assets/img/games/games/pgsoft/Thai-River-Wonders.webp",
      },
      {
        id: 18,
        name: "Crypto Gold",
        image: "../assets/img/games/games/pgsoft/Crypto-Gold.webp",
      },
      {
        id: 19,
        name: "Candy Burst",
        image: "../assets/img/games/games/pgsoft/Candy-Burst.webp",
      },
      {
        id: 20,
        name: "Phoenix Rises",
        image: "../assets/img/games/games/pgsoft/Phoenix-Rises.webp",
      },
      {
        id: 21,
        name: "Candy Bonanza",
        image: "../assets/img/games/games/pgsoft/Candy-Bonanza.webp",
      },
      {
        id: 22,
        name: "Double Fortune",
        image: "../assets/img/games/games/pgsoft/Double-Fortune.webp",
      },
      {
        id: 23,
        name: "Galactic Gems",
        image: "../assets/img/games/games/pgsoft/Galactic-Gems.webp",
      },
      {
        id: 24,
        name: "Shaolin Soccer",
        image: "../assets/img/games/games/pgsoft/Shaolin-Soccer.webp",
      },
      {
        id: 25,
        name: "Ganesha Gold",
        image: "../assets/img/games/games/pgsoft/Ganesha-Gold.webp",
      },
      {
        id: 26,
        name: "Majestic Treasures",
        image: "../assets/img/games/games/pgsoft/Majestic-Treasures.webp",
      },
      {
        id: 27,
        name: "Jewels of Prosperity",
        image: "../assets/img/games/games/pgsoft/Jewels-of-Prosperity.webp",
      },
      {
        id: 28,
        name: "Genies 3 Wishes",
        image: "../assets/img/games/games/pgsoft/Genies-3-Wishes.webp",
      },
      {
        id: 29,
        name: "Opera Dynasty",
        image: "../assets/img/games/games/pgsoft/Opera-Dynasty.webp",
      },
      {
        id: 30,
        name: "Dragon Tiger Luck",
        image: "../assets/img/games/games/pgsoft/Dragon-Tiger-Luck.webp",
      },
      {
        id: 31,
        name: "Honey Trap of Diao Chan",
        image: "../assets/img/games/games/pgsoft/Honey-Trap-of-Diao-Chan.webp",
      },
      {
        id: 32,
        name: "Gem Saviour",
        image: "../assets/img/games/games/pgsoft/Gem-Saviour.webp",
      },
      {
        id: 33,
        name: "Fortune Gods",
        image: "../assets/img/games/games/pgsoft/Fortune-Gods.webp",
      },
      {
        id: 34,
        name: "Medusa II",
        image: "../assets/img/games/games/pgsoft/Medusa-II.webp",
      },
      {
        id: 35,
        name: "Medusa",
        image: "../assets/img/games/games/pgsoft/Medusa.webp",
      },
      {
        id: 36,
        name: "Hood vs Wolf",
        image: "../assets/img/games/games/pgsoft/Hood-vs-Wolf.webp",
      },
      {
        id: 37,
        name: "Reel Love",
        image: "../assets/img/games/games/pgsoft/Reel-Love.webp",
      },
      {
        id: 38,
        name: "Win Win Won",
        image: "../assets/img/games/games/pgsoft/Win-Win-Won.webp",
      },
      {
        id: 39,
        name: "Plushie Frenzy",
        image: "../assets/img/games/games/pgsoft/Plushie-Frenzy.webp",
      },
      {
        id: 40,
        name: "Tree of Fortune",
        image: "../assets/img/games/games/pgsoft/Tree-of-Fortune.webp",
      },
      {
        id: 41,
        name: "Dragon Legend",
        image: "../assets/img/games/games/pgsoft/Dragon-Legend.webp",
      },
      {
        id: 42,
        name: "Hip Hop Panda",
        image: "../assets/img/games/games/pgsoft/Hip-Hop-Panda.webp",
      },
      {
        id: 43,
        name: "Legend of Hou Yi",
        image: "../assets/img/games/games/pgsoft/Legend-of-Hou-Yi.webp",
      },
      {
        id: 44,
        name: "Mr. Hallow-Win",
        image: "../assets/img/games/games/pgsoft/Mr-Hallow-Win.webp",
      },
      {
        id: 45,
        name: "Prosperity Lion",
        image: "../assets/img/games/games/pgsoft/Prosperity-Lion.webp",
      },
      {
        id: 46,
        name: "Santas Gift Rush",
        image: "../assets/img/games/games/pgsoft/Santas-Gift-Rush.webp",
      },
      {
        id: 47,
        name: "Gem Saviour Sword",
        image: "../assets/img/games/games/pgsoft/Gem-Saviour-Sword.webp",
      },
      {
        id: 48,
        name: "Piggy Gold",
        image: "../assets/img/games/games/pgsoft/Piggy-Gold.webp",
      },
      {
        id: 49,
        name: "Jungle Delight",
        image: "../assets/img/games/games/pgsoft/Jungle-Delight.webp",
      },
      {
        id: 50,
        name: "Symbols of Egypt",
        image: "../assets/img/games/games/pgsoft/Symbols-of-Egypt.webp",
      },
      {
        id: 51,
        name: "Emperors Favour",
        image: "../assets/img/games/games/pgsoft/Emperors-Favour.webp",
      },
      {
        id: 52,
        name: "Journey to the Wealth",
        image: "../assets/img/games/games/pgsoft/Journey-to-the-Wealth.webp",
      },
      {
        id: 53,
        name: "Vampires Charm",
        image: "../assets/img/games/games/pgsoft/Vampires-Charm.webp",
      }
    ]    
  },
  {
    provider: 'jokergaming',
    imgprovider: "../assets/img/games/provider/jokergaming.webp",
    pola: "3",
    listgames: [
      {
        id: 1,
        name: "A Night Out",
        image: "../assets/img/games/games/jokergaming/A-Night-Out.webp",
      },
      {
        id: 2,
        name: "Aladdin",
        image: "../assets/img/games/games/jokergaming/Aladdin.webp",
      },
      {
        id: 3,
        name: "Alice",
        image: "../assets/img/games/games/jokergaming/Alice.webp",
      },
      {
        id: 4,
        name: "Ancient Artifact",
        image: "../assets/img/games/games/jokergaming/Ancient-Artifact.webp",
      },
      {
        id: 5,
        name: "Ancient Egypt",
        image: "../assets/img/games/games/jokergaming/Ancient-Egypt.webp",
      },
      {
        id: 6,
        name: "Archer",
        image: "../assets/img/games/games/jokergaming/Archer.webp",
      },
      {
        id: 7,
        name: "Arctic Treasure",
        image: "../assets/img/games/games/jokergaming/Arctic-Treasure.webp",
      },
      {
        id: 8,
        name: "Azteca",
        image: "../assets/img/games/games/jokergaming/Azteca.webp",
      },
      {
        id: 9,
        name: "Bagua",
        image: "../assets/img/games/games/jokergaming/Bagua.webp",
      },
      {
        id: 10,
        name: "Beans talk",
        image: "../assets/img/games/games/jokergaming/Beans-talk.webp",
      },
      {
        id: 11,
        name: "Bonus Bear",
        image: "../assets/img/games/games/jokergaming/Bonus-Bear.webp",
      },
      {
        id: 12,
        name: "Book Of Ra",
        image: "../assets/img/games/games/jokergaming/Book-Of-Ra.webp",
      },
      {
        id: 13,
        name: "Book Of Ra Deluxe",
        image: "../assets/img/games/games/jokergaming/Book-Of-Ra-Deluxe.webp",
      },
      {
        id: 14,
        name: "Burning Pearl",
        image: "../assets/img/games/games/jokergaming/Burning-Pearl.webp",
      },
      {
        id: 15,
        name: "Bushido Blade",
        image: "../assets/img/games/games/jokergaming/Bushido-Blade.webp",
      },
      {
        id: 16,
        name: "Caishen Riches",
        image: "../assets/img/games/games/jokergaming/Caishen-Riches.webp",
      },
      {
        id: 17,
        name: "Captai's Treasure",
        image: "../assets/img/games/games/jokergaming/Captai's-Treasure.webp",
      },
      {
        id: 18,
        name: "Captai's Treasure Pro",
        image: "../assets/img/games/games/jokergaming/Captai's-Treasure-Pro.webp",
      },
      {
        id: 19,
        name: "Captains Treasure Progressive",
        image: "../assets/img/games/games/jokergaming/Captains-Treasure-Progressive.webp",
      },
      {
        id: 20,
        name: "China",
        image: "../assets/img/games/games/jokergaming/China.webp",
      },
      {
        id: 21,
        name: "Columbus",
        image: "../assets/img/games/games/jokergaming/Columbus.webp",
      },
      {
        id: 22,
        name: "Crypto Mania",
        image: "../assets/img/games/games/jokergaming/Crypto-Mania.webp",
      },
      {
        id: 23,
        name: "Dolphins Pearl",
        image: "../assets/img/games/games/jokergaming/Dolphins-Pearl.webp",
      },
      {
        id: 24,
        name: "Dolphin Reef",
        image: "../assets/img/games/games/jokergaming/Dolphin-Reef.webp",
      },
      {
        id: 25,
        name: "Dolphin Treasure",
        image: "../assets/img/games/games/jokergaming/Dolphin-Treasure.webp",
      },
      {
        id: 26,
        name: "Dragon Phoenix",
        image: "../assets/img/games/games/jokergaming/Dragon-Phoenix.webp",
      },
      {
        id: 27,
        name: "Dragon Power Flame",
        image: "../assets/img/games/games/jokergaming/Dragon-Power-Flame.webp",
      },
      {
        id: 28,
        name: "Dynamite Reels",
        image: "../assets/img/games/games/jokergaming/Dynamite-Reels.webp",
      },
      {
        id: 29,
        name: "Egypt Queen",
        image: "../assets/img/games/games/jokergaming/Egypt-Queen.webp",
      },
      {
        id: 30,
        name: "Empress Regnant",
        image: "../assets/img/games/games/jokergaming/Empress-Regnant.webp",
      },
      {
        id: 31,
        name: "Enter The KTV",
        image: "../assets/img/games/games/jokergaming/Enter-The-KTV.webp",
      },
      {
        id: 32,
        name: "FeiLong Zai Tian",
        image: "../assets/img/games/games/jokergaming/FeiLong-Zai-Tian.webp",
      },
      {
        id: 33,
        name: "Fifty Dragons",
        image: "../assets/img/games/games/jokergaming/Fifty-Dragons.webp",
      },
      {
        id: 34,
        name: "Fifty Lions",
        image: "../assets/img/games/games/jokergaming/Fifty-Lions.webp",
      },
      {
        id: 35,
        name: "Five Tiger Generals",
        image: "../assets/img/games/games/jokergaming/Five-Tiger-Generals.webp",
      },
      {
        id: 36,
        name: "Horus Eye",
        image: "../assets/img/games/games/jokergaming/Horus-Eye.webp",
      },
      {
        id: 37,
        name: "Four Dragons",
        image: "../assets/img/games/games/jokergaming/Four-Dragons.webp",
      },
      {
        id: 38,
        name: "Four Tigers",
        image: "../assets/img/games/games/jokergaming/Four-Tigers.webp",
      },
      {
        id: 39,
        name: "Geisha",
        image: "../assets/img/games/games/jokergaming/Geisha.webp",
      },
      {
        id: 40,
        name: "Genie",
        image: "../assets/img/games/games/jokergaming/Genie.webp",
      },
      {
        id: 41,
        name: "Golden Dragon",
        image: "../assets/img/games/games/jokergaming/Golden-Dragon.webp",
      },
      {
        id: 42,
        name: "Golden Island",
        image: "../assets/img/games/games/jokergaming/Golden-Island.webp",
      },
      {
        id: 43,
        name: "Golden Monkey King",
        image: "../assets/img/games/games/jokergaming/Golden-Monkey-King.webp",
      },
      {
        id: 44,
        name: "Golden Rooster",
        image: "../assets/img/games/games/jokergaming/Golden-Rooster.webp",
      },
      {
        id: 45,
        name: "Great Blue",
        image: "../assets/img/games/games/jokergaming/Great-Blue.webp",
      },
      {
        id: 46,
        name: "Happy Buddha",
        image: "../assets/img/games/games/jokergaming/Happy-Buddha.webp",
      },
      {
        id: 47,
        name: "Happy Party",
        image: "../assets/img/games/games/jokergaming/Happy-Party.webp",
      },
      {
        id: 48,
        name: "Hercules",
        image: "../assets/img/games/games/jokergaming/Hercules.webp",
      },
      {
        id: 49,
        name: "Highway Kings",
        image: "../assets/img/games/games/jokergaming/Highway-Kings.webp",
      },
      {
        id: 50,
        name: "Hot Fruits",
        image: "../assets/img/games/games/jokergaming/Hot-Fruits.webp",
      },
    ]    
  },
  {
    provider: 'worldmatch',
    imgprovider: "../assets/img/games/provider/worldmatch.webp",
    pola: "3",
    listgames: [
      {
        id: 1,
        name: "3D Farm",
        image: "../assets/img/games/games/worldmatch/3D-Farm.webp",
      },
      {
        id: 2,
        name: "Space Blast",
        image: "../assets/img/games/games/worldmatch/Space-Blast.webp",
      },
      {
        id: 3,
        name: "Big Grizzly",
        image: "../assets/img/games/games/worldmatch/Big-Grizzly.webp",
      },
      {
        id: 4,
        name: "Royal Key",
        image: "../assets/img/games/games/worldmatch/Royal-Key.webp",
      },
      {
        id: 5,
        name: "Sahara",
        image: "../assets/img/games/games/worldmatch/Sahara.webp",
      },
      {
        id: 6,
        name: "Songkran Holidays",
        image: "../assets/img/games/games/worldmatch/Songkran-Holidays.webp",
      },
      {
        id: 7,
        name: "King Neptun",
        image: "../assets/img/games/games/worldmatch/King-Neptun.webp",
      },
      {
        id: 8,
        name: "Golden Pig",
        image: "../assets/img/games/games/worldmatch/Golden-Pig.webp",
      },
      {
        id: 9,
        name: "Golden Tree",
        image: "../assets/img/games/games/worldmatch/Golden-Tree.webp",
      },
      {
        id: 10,
        name: "King's Valley",
        image: "../assets/img/games/games/worldmatch/Kings-Valley.webp",
      },
      {
        id: 11,
        name: "Tuan Yuan Panda",
        image: "../assets/img/games/games/worldmatch/Tuan-Yuan-Panda.webp",
      },
      {
        id: 12,
        name: "Fa Fa Spin",
        image: "../assets/img/games/games/worldmatch/Fa-Fa-Spin.webp",
      },
      {
        id: 13,
        name: "Jolly Roger",
        image: "../assets/img/games/games/worldmatch/Jolly-Roger.webp",
      },
      {
        id: 14,
        name: "Wily fox",
        image: "../assets/img/games/games/worldmatch/Wily-fox.webp",
      },
      {
        id: 15,
        name: "Alchemist",
        image: "../assets/img/games/games/worldmatch/Alchemist.webp",
      },
      {
        id: 16,
        name: "Alien Domination",
        image: "../assets/img/games/games/worldmatch/Alien-Domination.webp",
      },
      {
        id: 17,
        name: "Land Of Trolls",
        image: "../assets/img/games/games/worldmatch/Land-Of-Trolls.webp",
      },
      {
        id: 18,
        name: "Book of Pharaon",
        image: "../assets/img/games/games/worldmatch/Book-of-Pharaon.webp",
      },
      {
        id: 19,
        name: "Bandit's bounty",
        image: "../assets/img/games/games/worldmatch/Bandit's-bounty.webp",
      },
      {
        id: 20,
        name: "Dragon Queen",
        image: "../assets/img/games/games/worldmatch/Dragon-Queen.webp",
      },
      {
        id: 21,
        name: "Sugar Rush",
        image: "../assets/img/games/games/worldmatch/Sugar-Rush.webp",
      },
      {
        id: 22,
        name: "The Forbidden City",
        image: "../assets/img/games/games/worldmatch/The-Forbidden-City.webp",
      },
      {
        id: 23,
        name: "Disco Baby",
        image: "../assets/img/games/games/worldmatch/Disco-Baby.webp",
      },
      {
        id: 24,
        name: "Atlantis",
        image: "../assets/img/games/games/worldmatch/Atlantis.webp",
      },
      {
        id: 25,
        name: "Sultan",
        image: "../assets/img/games/games/worldmatch/Sultan.webp",
      },
      {
        id: 26,
        name: "Funny Monkey",
        image: "../assets/img/games/games/worldmatch/Funny-Monkey.webp",
      },
      {
        id: 27,
        name: "Fruits Evolution",
        image: "../assets/img/games/games/worldmatch/Fruits-Evolution.webp",
      },
      {
        id: 28,
        name: "Zombie lab",
        image: "../assets/img/games/games/worldmatch/Zombie-lab.webp",
      },
      {
        id: 29,
        name: "Zen Blade",
        image: "../assets/img/games/games/worldmatch/Zen-Blade.webp",
      },
      {
        id: 30,
        name: "Magic Frog",
        image: "../assets/img/games/games/worldmatch/Magic-Frog.webp",
      },
      {
        id: 31,
        name: "Indian Spirit",
        image: "../assets/img/games/games/worldmatch/Indian-Spirit.webp",
      },
      {
        id: 32,
        name: "Archibald Maya",
        image: "../assets/img/games/games/worldmatch/Archibald-Maya.webp",
      },
      {
        id: 33,
        name: "Archibald Africa",
        image: "../assets/img/games/games/worldmatch/Archibald-Africa.webp",
      },
      {
        id: 34,
        name: "Archibald Orient",
        image: "../assets/img/games/games/worldmatch/Archibald-Orient.webp",
      },
      {
        id: 35,
        name: "Monte Carlo Jewels",
        image: "../assets/img/games/games/worldmatch/Monte-Carlo-Jewels.webp",
      },
      {
        id: 36,
        name: "Banana King",
        image: "../assets/img/games/games/worldmatch/Banana-King.webp",
      },
      {
        id: 37,
        name: "Maximum",
        image: "../assets/img/games/games/worldmatch/Maximum.webp",
      },
      {
        id: 38,
        name: "Drago's Reels",
        image: "../assets/img/games/games/worldmatch/Dragos-Reels.webp",
      },
      {
        id: 39,
        name: "Crime Records",
        image: "../assets/img/games/games/worldmatch/Crime-Records.webp",
      },
      {
        id: 40,
        name: "China Lóng",
        image: "../assets/img/games/games/worldmatch/China-Lóng.webp",
      },
      {
        id: 41,
        name: "Go Wild",
        image: "../assets/img/games/games/worldmatch/Go-Wild.webp",
      },
      {
        id: 42,
        name: "Sherlock",
        image: "../assets/img/games/games/worldmatch/Sherlock.webp",
      },
      {
        id: 43,
        name: "Glamour Hills",
        image: "../assets/img/games/games/worldmatch/Glamour-Hills.webp",
      },
      {
        id: 44,
        name: "Fantasy island",
        image: "../assets/img/games/games/worldmatch/Fantasy-island.webp",
      },
      {
        id: 45,
        name: "Re-Wild",
        image: "../assets/img/games/games/worldmatch/Re-Wild.webp",
      },
      {
        id: 46,
        name: "Super Heroes",
        image: "../assets/img/games/games/worldmatch/Super-Heroes.webp",
      },
      {
        id: 47,
        name: "Egyptian WILD",
        image: "../assets/img/games/games/worldmatch/Egyptian-WILD.webp",
      },
      {
        id: 48,
        name: "Slot Cup",
        image: "../assets/img/games/games/worldmatch/Slot-Cup.webp",
      },
      {
        id: 49,
        name: "Uga Age",
        image: "../assets/img/games/games/worldmatch/Uga-Age.webp",
      },
      {
        id: 50,
        name: "Vampire Killer",
        image: "../assets/img/games/games/worldmatch/Vampire-Killer.webp",
      },
    ]    
  },
  {
    provider: 'playngo',
    imgprovider: "../assets/img/games/provider/playngo.webp",
    pola: "4",
    listgames: [
      {
        id: 1,
        name: "Rich Wilde and the Shield of Athena",
        image: "../assets/img/games/games/playngo/Rich-Wilde-and-the-Shield-of-Athena.webp",
      },
      {
        id: 2,
        name: "Charlie Chance in Hell to Pay",
        image: "../assets/img/games/games/playngo/Charlie-Chance-in-Hell-to-Pay.webp",
      },
      {
        id: 3,
        name: "Agent Destiny",
        image: "../assets/img/games/games/playngo/Agent-Destiny.webp",
      },
      {
        id: 4,
        name: "Cloud Quest",
        image: "../assets/img/games/games/playngo/Cloud-Quest.webp",
      },
      {
        id: 5,
        name: "Ring of Odin",
        image: "../assets/img/games/games/playngo/Ring-of-Odin.webp",
      },
      {
        id: 6,
        name: "Annihilator",
        image: "../assets/img/games/games/playngo/Annihilator.webp",
      },
      {
        id: 7,
        name: "Thats Rich",
        image: "../assets/img/games/games/playngo/Thats-Rich.webp",
      },
      {
        id: 8,
        name: "Testament",
        image: "../assets/img/games/games/playngo/Testament.webp",
      },
      {
        id: 9,
        name: "Riches of Robin",
        image: "../assets/img/games/games/playngo/Riches-of-Robin.webp",
      },
      {
        id: 10,
        name: "Sticky Joker",
        image: "../assets/img/games/games/playngo/Sticky-Joker.webp",
      },
      {
        id: 11,
        name: "Fortunes of Ali Baba",
        image: "../assets/img/games/games/playngo/Fortunes-of-Ali-Baba.webp",
      },
      {
        id: 12,
        name: "Leprechaun Goes Wild",
        image: "../assets/img/games/games/playngo/Leprechaun-Goes-Wild.webp",
      },
      {
        id: 13,
        name: "Dawn of Egypt",
        image: "../assets/img/games/games/playngo/Dawn-of-Egypt.webp",
      },
      {
        id: 14,
        name: "Wild Blood 2",
        image: "../assets/img/games/games/playngo/Wild-Blood-2.webp",
      },
      {
        id: 15,
        name: "Coywolf Cash",
        image: "../assets/img/games/games/playngo/Coywolf-Cash.webp",
      },
      {
        id: 16,
        name: "3 Hand Casino Holdem",
        image: "../assets/img/games/games/playngo/3-Hand-Casino-Holdem.webp",
      },
      {
        id: 17,
        name: "5x Magic",
        image: "../assets/img/games/games/playngo/5x-Magic.webp",
      },
      {
        id: 18,
        name: "7 Sins",
        image: "../assets/img/games/games/playngo/7-Sins.webp",
      },
      {
        id: 19,
        name: "Ace of Spades",
        image: "../assets/img/games/games/playngo/Ace-of-Spades.webp",
      },
      {
        id: 20,
        name: "Ankh of Anubis",
        image: "../assets/img/games/games/playngo/Ankh-of-Anubis.webp",
      },
      {
        id: 21,
        name: "Aztec Idols",
        image: "../assets/img/games/games/playngo/Aztec-Idols.webp",
      },
      {
        id: 22,
        name: "Aztec Warrior Princess",
        image: "../assets/img/games/games/playngo/Aztec-Warrior-Princess.webp",
      },
      {
        id: 23,
        name: "Bakers Treat",
        image: "../assets/img/games/games/playngo/Bakers-Treat.webp",
      },
      {
        id: 24,
        name: "Banana Rock",
        image: "../assets/img/games/games/playngo/Banana-Rock.webp",
      },
      {
        id: 25,
        name: "Battle Royal",
        image: "../assets/img/games/games/playngo/Battle-Royal.webp",
      },
      {
        id: 26,
        name: "Big Win 777",
        image: "../assets/img/games/games/playngo/Big-Win-777.webp",
      },
      {
        id: 27,
        name: "Big Win Cat",
        image: "../assets/img/games/games/playngo/Big-Win-Cat.webp",
      },
      {
        id: 28,
        name: "Black Mamba",
        image: "../assets/img/games/games/playngo/Black-Mamba.webp",
      },
      {
        id: 29,
        name: "BlackJack Multi hand",
        image: "../assets/img/games/games/playngo/BlackJack-Multi-hand.webp",
      },
      {
        id: 30,
        name: "Book of Dead",
        image: "../assets/img/games/games/playngo/Book-of-Dead.webp",
      },
      {
        id: 31,
        name: "Cash Pump",
        image: "../assets/img/games/games/playngo/Cash-Pump.webp",
      },
      {
        id: 32,
        name: "Cash Vandal",
        image: "../assets/img/games/games/playngo/Cash-Vandal.webp",
      },
      {
        id: 33,
        name: "Cats and Cash",
        image: "../assets/img/games/games/playngo/Cats-and-Cash.webp",
      },
      {
        id: 34,
        name: "Chinese New Year",
        image: "../assets/img/games/games/playngo/Chinese-New-Year.webp",
      },
      {
        id: 35,
        name: "Chronos Joker",
        image: "../assets/img/games/games/playngo/Chronos-Joker.webp",
      },
      {
        id: 36,
        name: "Contact",
        image: "../assets/img/games/games/playngo/Contact.webp",
      },
      {
        id: 37,
        name: "Cops n Robbers",
        image: "../assets/img/games/games/playngo/Cops-n-Robbers.webp",
      },
      {
        id: 38,
        name: "Crazy Cows",
        image: "../assets/img/games/games/playngo/Crazy-Cows.webp",
      },
      {
        id: 39,
        name: "Crystal Sun",
        image: "../assets/img/games/games/playngo/Crystal-Sun.webp",
      },
      {
        id: 40,
        name: "Demon",
        image: "../assets/img/games/games/playngo/Demon.webp",
      },
      {
        id: 41,
        name: "Deuces Wild MH",
        image: "../assets/img/games/games/playngo/Deuces-Wild-MH.webp",
      },
      {
        id: 42,
        name: "Divine Showdown",
        image: "../assets/img/games/games/playngo/Divine-Showdown.webp",
      },
      {
        id: 43,
        name: "Double Exposure BlackJack Multi hand",
        image: "../assets/img/games/games/playngo/Double-Exposure-BlackJack-Multi-hand.webp",
      },
      {
        id: 44,
        name: "Dragon Maiden",
        image: "../assets/img/games/games/playngo/Dragon-Maiden.webp",
      },
      {
        id: 45,
        name: "Dragon Ship",
        image: "../assets/img/games/games/playngo/Dragon-Ship.webp",
      },
      {
        id: 46,
        name: "Easter Eggs",
        image: "../assets/img/games/games/playngo/Easter-Eggs.webp",
      },
      {
        id: 47,
        name: "Enchanted Crystals",
        image: "../assets/img/games/games/playngo/Enchanted-Crystals.webp",
      },
      {
        id: 48,
        name: "Enchanted Meadow",
        image: "../assets/img/games/games/playngo/Enchanted-Meadow.webp",
      },
      {
        id: 49,
        name: "Energoonz",
        image: "../assets/img/games/games/playngo/Energoonz.webp",
      },
      {
        id: 50,
        name: "European BlackJack Multi hand",
        image: "../assets/img/games/games/playngo/European-BlackJack-Multi-hand.webp",
      }
    ]    
  },
  {
    provider: 'quickspin',
    imgprovider: "../assets/img/games/provider/quickspin.webp",
    pola: "5",
    listgames: [
      {
        id: 1,
        name: "Diamond Duke",
        image: "../assets/img/games/games/quickspin/Diamond-Duke.webp",
      },
      {
        id: 2,
        name: "Skulls Up",
        image: "../assets/img/games/games/quickspin/Skulls-Up.webp",
      },
      {
        id: 3,
        name: "Nero's Fortune",
        image: "../assets/img/games/games/quickspin/Neros-Fortune.webp",
      },
      {
        id: 4,
        name: "Polar Paws",
        image: "../assets/img/games/games/quickspin/Polar-Paws.webp",
      },
      {
        id: 5,
        name: "Golden Glyph",
        image: "../assets/img/games/games/quickspin/Golden-Glyph.webp",
      },
      {
        id: 6,
        name: "Wild Chase Tokyo Go",
        image: "../assets/img/games/games/quickspin/Wild-Chase-Tokyo-Go.webp",
      },
      {
        id: 7,
        name: "Wild Tome of the Woods",
        image: "../assets/img/games/games/quickspin/Wild-Tome-of-the-Woods.webp",
      },
      {
        id: 8,
        name: "Sticky Bandits Wild Return",
        image: "../assets/img/games/games/quickspin/Sticky-Bandits-Wild-Return.webp",
      },
      {
        id: 9,
        name: "Tales of Dr. Dolittle",
        image: "../assets/img/games/games/quickspin/Tales-of-Dr-Dolittle.webp",
      },
      {
        id: 10,
        name: "Durian Dynamite",
        image: "../assets/img/games/games/quickspin/Durian-Dynamite.webp",
      },
      {
        id: 11,
        name: "The Grand",
        image: "../assets/img/games/games/quickspin/The-Grand.webp",
      },
      {
        id: 12,
        name: "Ticket to the Stars",
        image: "../assets/img/games/games/quickspin/Ticket-to-the-Stars.webp",
      },
      {
        id: 13,
        name: "Divine Dreams",
        image: "../assets/img/games/games/quickspin/Divine-Dreams.webp",
      },
      {
        id: 14,
        name: "Ivan and the Immortal King",
        image: "../assets/img/games/games/quickspin/Ivan-and-the-Immortal-King.webp",
      },
      {
        id: 15,
        name: "Tigers Glory",
        image: "../assets/img/games/games/quickspin/Tigers-Glory.webp",
      },
      {
        id: 16,
        name: "Ark of Mystery",
        image: "../assets/img/games/games/quickspin/Ark-of-Mystery.webp",
      },
      {
        id: 17,
        name: "Bigbot Crew",
        image: "../assets/img/games/games/quickspin/Bigbot-Crew.webp",
      },
      {
        id: 18,
        name: "Hidden Valley",
        image: "../assets/img/games/games/quickspin/Hidden-Valley.webp",
      },
      {
        id: 19,
        name: "Eastern Emeralds",
        image: "../assets/img/games/games/quickspin/Eastern-Emeralds.webp",
      },
      {
        id: 20,
        name: "Dwarfs Gone Wild",
        image: "../assets/img/games/games/quickspin/Dwarfs-Gone-Wild.webp",
      },
      {
        id: 21,
        name: "Pirates Charm",
        image: "../assets/img/games/games/quickspin/Pirates-Charm.webp",
      },
      {
        id: 22,
        name: "Joker Strike",
        image: "../assets/img/games/games/quickspin/Joker-Strike.webp",
      },
      {
        id: 23,
        name: "Volcano Riches",
        image: "../assets/img/games/games/quickspin/Volcano-Riches.webp",
      },
      {
        id: 24,
        name: "Northern Sky",
        image: "../assets/img/games/games/quickspin/Northern-Sky.webp",
      },
      {
        id: 25,
        name: "Pied Piper",
        image: "../assets/img/games/games/quickspin/Pied-Piper.webp",
      },
      {
        id: 26,
        name: "Rapunzels Tower",
        image: "../assets/img/games/games/quickspin/Rapunzels-Tower.webp",
      },
      {
        id: 27,
        name: "Mighty Arthur",
        image: "../assets/img/games/games/quickspin/Mighty-Arthur.webp",
      },
      {
        id: 28,
        name: "Mayana",
        image: "../assets/img/games/games/quickspin/Mayana.webp",
      },
      {
        id: 29,
        name: "Fairy Gate",
        image: "../assets/img/games/games/quickspin/Fairy-Gate.webp",
      },
      {
        id: 30,
        name: "Sticky Bandits",
        image: "../assets/img/games/games/quickspin/Sticky-Bandits.webp",
      },
      {
        id: 31,
        name: "Goldi Locks",
        image: "../assets/img/games/games/quickspin/Goldi-Locks.webp",
      },
      {
        id: 32,
        name: "Wins of Fortune",
        image: "../assets/img/games/games/quickspin/Wins-of-Fortune.webp",
      },
      {
        id: 33,
        name: "Sakura Fortune",
        image: "../assets/img/games/games/quickspin/Sakura-Fortune.webp",
      },
      {
        id: 34,
        name: "Hot Sync",
        image: "../assets/img/games/games/quickspin/Hot-Sync.webp",
      },
      {
        id: 35,
        name: "Leprechaun Hills",
        image: "../assets/img/games/games/quickspin/Leprechaun-Hills.webp",
      },
      {
        id: 36,
        name: "Phoenix Sun",
        image: "../assets/img/games/games/quickspin/Phoenix-Sun.webp",
      },
      {
        id: 37,
        name: "Dragon Shrine",
        image: "../assets/img/games/games/quickspin/Dragon-Shrine.webp",
      },
      {
        id: 38,
        name: "Big Bad Wolf",
        image: "../assets/img/games/games/quickspin/Big-Bad-Wolf.webp",
      },
      {
        id: 39,
        name: "Crystal Queen",
        image: "../assets/img/games/games/quickspin/Crystal-Queen.webp",
      },
      {
        id: 40,
        name: "Genies Touch",
        image: "../assets/img/games/games/quickspin/Genies-Touch.webp",
      },
      {
        id: 41,
        name: "Gold Lab",
        image: "../assets/img/games/games/quickspin/Gold-Lab.webp",
      },
      {
        id: 42,
        name: "Illuminous",
        image: "../assets/img/games/games/quickspin/Illuminous.webp",
      },
      {
        id: 43,
        name: "King Colossus",
        image: "../assets/img/games/games/quickspin/King-Colossus.webp",
      },
      {
        id: 44,
        name: "Razortooth",
        image: "../assets/img/games/games/quickspin/Razortooth.webp",
      },
      {
        id: 45,
        name: "Second Strike",
        image: "../assets/img/games/games/quickspin/Second-Strike.webp",
      },
      {
        id: 46,
        name: "Sevens High",
        image: "../assets/img/games/games/quickspin/Sevens-High.webp",
      },
      {
        id: 47,
        name: "Spinions",
        image: "../assets/img/games/games/quickspin/Spinions.webp",
      },
      {
        id: 48,
        name: "The Wild Chase",
        image: "../assets/img/games/games/quickspin/The-Wild-Chase.webp",
      },
      {
        id: 49,
        name: "Treasure Island",
        image: "../assets/img/games/games/quickspin/Treasure-Island.webp",
      },
      {
        id: 50,
        name: "Dinosaur Rage",
        image: "../assets/img/games/games/quickspin/Dinosaur-Rage.webp",
      }
    ]    
  },
  {
    provider: 'yggdrasil',
    imgprovider: "../assets/img/games/provider/yggdrasil.webp",
    pola: "5",
    listgames: [
      {
        id: 1,
        name: "Vault of Fortune",
        image: "../assets/img/games/games/yggdrasil/Vault-of-Fortune.webp",
      },
      {
        id: 2,
        name: "Lucky Neko",
        image: "../assets/img/games/games/yggdrasil/Lucky-Neko.webp",
      },
      {
        id: 3,
        name: "Valley of the Gods",
        image: "../assets/img/games/games/yggdrasil/Valley-of-the-Gods.webp",
      },
      {
        id: 4,
        name: "Multifly",
        image: "../assets/img/games/games/yggdrasil/Multifly.webp",
      },
      {
        id: 5,
        name: "Brazil Bomba",
        image: "../assets/img/games/games/yggdrasil/Brazil-Bomba.webp",
      },
      {
        id: 6,
        name: "Vikings go Berzerk",
        image: "../assets/img/games/games/yggdrasil/Vikings-go-Berzerk.webp",
      },
      {
        id: 7,
        name: "Lightning Joker",
        image: "../assets/img/games/games/yggdrasil/Lightning-Joker.webp",
      },
      {
        id: 8,
        name: "Avatars Gateway Guardians",
        image: "../assets/img/games/games/yggdrasil/Avatars-Gateway-Guardians.webp",
      },
      {
        id: 9,
        name: "Wild Robo Factory",
        image: "../assets/img/games/games/yggdrasil/Wild-Robo-Factory.webp",
      },
      {
        id: 10,
        name: "9kYeti",
        image: "../assets/img/games/games/yggdrasil/9kYeti.webp",
      },
      {
        id: 11,
        name: "Neon Rush Splitz",
        image: "../assets/img/games/games/yggdrasil/Neon-Rush-Splitz.webp",
      },
      {
        id: 12,
        name: "Temple Stacks Splitz",
        image: "../assets/img/games/games/yggdrasil/Temple-Stacks-Splitz.webp",
      },
      {
        id: 13,
        name: "Pirates Smugglers Paradise",
        image: "../assets/img/games/games/yggdrasil/Pirates-Smugglers-Paradise.webp",
      },
      {
        id: 14,
        name: "Football Glory",
        image: "../assets/img/games/games/yggdrasil/Football-Glory.webp",
      },
      {
        id: 15,
        name: "Age of Asgard",
        image: "../assets/img/games/games/yggdrasil/Age-of-Asgard.webp",
      },
      {
        id: 16,
        name: "Spina Colada",
        image: "../assets/img/games/games/yggdrasil/Spina-Colada.webp",
      },
      {
        id: 17,
        name: "Dwarf Mine",
        image: "../assets/img/games/games/yggdrasil/Dwarf-Mine.webp",
      },
      {
        id: 18,
        name: "Dark Joker Rizes",
        image: "../assets/img/games/games/yggdrasil/Dark-Joker-Rizes.webp",
      },
      {
        id: 19,
        name: "Chibeasties",
        image: "../assets/img/games/games/yggdrasil/Chibeasties.webp",
      },
      {
        id: 20,
        name: "Vikings go Wild",
        image: "../assets/img/games/games/yggdrasil/Vikings-go-Wild.webp",
      },
      {
        id: 21,
        name: "Cazino Zeppelin",
        image: "../assets/img/games/games/yggdrasil/Cazino-Zeppelin.webp",
      },
      {
        id: 22,
        name: "Incinerator",
        image: "../assets/img/games/games/yggdrasil/Incinerator.webp",
      },
      {
        id: 23,
        name: "Winter berries",
        image: "../assets/img/games/games/yggdrasil/Winter-berries.webp",
      },
      {
        id: 24,
        name: "Golden Fish Tank",
        image: "../assets/img/games/games/yggdrasil/Golden-Fish-Tank.webp",
      },
      {
        id: 25,
        name: "Jokerizer",
        image: "../assets/img/games/games/yggdrasil/Jokerizer.webp",
      },
      {
        id: 26,
        name: "Seasons",
        image: "../assets/img/games/games/yggdrasil/Seasons.webp",
      },
      {
        id: 27,
        name: "Legend of the Golden Monkey",
        image: "../assets/img/games/games/yggdrasil/Legend-of-the-Golden-Monkey.webp",
      },
      {
        id: 28,
        name: "Bicicleta",
        image: "../assets/img/games/games/yggdrasil/Bicicleta.webp",
      },
      {
        id: 29,
        name: "Double Dragons",
        image: "../assets/img/games/games/yggdrasil/Double-Dragons.webp",
      },
      {
        id: 30,
        name: "Nirvana",
        image: "../assets/img/games/games/yggdrasil/Nirvana.webp",
      },
      {
        id: 31,
        name: "Alchymedes",
        image: "../assets/img/games/games/yggdrasil/Alchymedes.webp",
      },
      {
        id: 32,
        name: "Beauty and the Beast",
        image: "../assets/img/games/games/yggdrasil/Beauty-and-the-Beast.webp",
      },
      {
        id: 33,
        name: "Sunny Shores",
        image: "../assets/img/games/games/yggdrasil/Sunny-Shores.webp",
      },
      {
        id: 34,
        name: "Rainbow Ryan",
        image: "../assets/img/games/games/yggdrasil/Rainbow-Ryan.webp",
      },
      {
        id: 35,
        name: "Jungle Books",
        image: "../assets/img/games/games/yggdrasil/Jungle-Books.webp",
      },
      {
        id: 36,
        name: "Pumpkin Smash",
        image: "../assets/img/games/games/yggdrasil/Pumpkin-Smash.webp",
      },
      {
        id: 37,
        name: "Orient Express",
        image: "../assets/img/games/games/yggdrasil/Orient-Express.webp",
      },
      {
        id: 38,
        name: "Gem Rocks",
        image: "../assets/img/games/games/yggdrasil/Gem-Rocks.webp",
      },
      {
        id: 39,
        name: "Easter Island",
        image: "../assets/img/games/games/yggdrasil/Easter-Island.webp",
      },
      {
        id: 40,
        name: "Lucha Maniacs",
        image: "../assets/img/games/games/yggdrasil/Lucha-Maniacs.webp",
      },
      {
        id: 41,
        name: "Fruitoids",
        image: "../assets/img/games/games/yggdrasil/Fruitoids.webp",
      },
      {
        id: 42,
        name: "Vikings Go To Hell",
        image: "../assets/img/games/games/yggdrasil/Vikings-Go-To-Hell.webp",
      },
      {
        id: 43,
        name: "Tuts Twister",
        image: "../assets/img/games/games/yggdrasil/Tuts-Twister.webp",
      },
      {
        id: 44,
        name: "Penguin City",
        image: "../assets/img/games/games/yggdrasil/Penguin-City.webp",
      },
      {
        id: 45,
        name: "Hanzos Dojo",
        image: "../assets/img/games/games/yggdrasil/Hanzos-Dojo.webp",
      },
      {
        id: 46,
        name: "Wolf Hunters",
        image: "../assets/img/games/games/yggdrasil/Wolf-Hunters.webp",
      },
      {
        id: 47,
        name: "Dark Vortex",
        image: "../assets/img/games/games/yggdrasil/Dark-Vortex.webp",
      },
      {
        id: 48,
        name: "Baron Samedi",
        image: "../assets/img/games/games/yggdrasil/Baron-Samedi.webp",
      },
      {
        id: 49,
        name: "Trolls Bridge",
        image: "../assets/img/games/games/yggdrasil/Trolls-Bridge.webp",
      },
      {
        id: 50,
        name: "Cazino Cosmos",
        image: "../assets/img/games/games/yggdrasil/Cazino-Cosmos.webp",
      }
    ]    
  },
  {
    provider: 'microgaming',
    imgprovider: "../assets/img/games/provider/microgaming.webp",
    pola: "6",
    listgames: [
      {
        id: 1,
        name: "Thunderstruck Wild Lightning",
        image: "../assets/img/games/games/microgaming/Thunderstruck-Wild-Lightning.webp",
      },
      {
        id: 2,
        name: "Legacy of Oz",
        image: "../assets/img/games/games/microgaming/Legacy-of-Oz.webp",
      },
      {
        id: 3,
        name: "Hyper Gold",
        image: "../assets/img/games/games/microgaming/Hyper-Gold.webp",
      },
      {
        id: 4,
        name: "Atlantis Rising",
        image: "../assets/img/games/games/microgaming/Atlantis-Rising.webp",
      },
      {
        id: 5,
        name: "Silver Seas",
        image: "../assets/img/games/games/microgaming/Silver-Seas.webp",
      },
      {
        id: 6,
        name: "Odins Riches",
        image: "../assets/img/games/games/microgaming/Odins-Riches.webp",
      },
      {
        id: 7,
        name: "Blazing Mammoth",
        image: "../assets/img/games/games/microgaming/Blazing-Mammoth.webp",
      },
      {
        id: 8,
        name: "Oni Hunter Plus",
        image: "../assets/img/games/games/microgaming/Oni-Hunter-Plus.webp",
      },
      {
        id: 9,
        name: "10000 Wishes",
        image: "../assets/img/games/games/microgaming/10000-Wishes.webp",
      },
      {
        id: 10,
        name: "Ancient Fortunes Poseidon Megaways™",
        image: "../assets/img/games/games/microgaming/Ancient-Fortunes-Poseidon-Megaways.webp",
      },
      {
        id: 11,
        name: "Queen of Alexandria™",
        image: "../assets/img/games/games/microgaming/Queen-of-Alexandria.webp",
      },
      {
        id: 12,
        name: "Egyptian Tombs",
        image: "../assets/img/games/games/microgaming/Egyptian-Tombs.webp",
      },
      {
        id: 13,
        name: "Book of King Arthur",
        image: "../assets/img/games/games/microgaming/Book-of-King-Arthur.webp",
      },
      {
        id: 14,
        name: "Emerald Gold",
        image: "../assets/img/games/games/microgaming/Emerald-Gold.webp",
      },
      {
        id: 15,
        name: "Serengeti Gold",
        image: "../assets/img/games/games/microgaming/Serengeti-Gold.webp",
      },
      {
        id: 16,
        name: "Oni Hunter",
        image: "../assets/img/games/games/microgaming/Oni-Hunter.webp",
      },
      {
        id: 17,
        name: "Maui Mischief™",
        image: "../assets/img/games/games/microgaming/Maui-Mischief.webp",
      },
      {
        id: 18,
        name: "Fire Forge",
        image: "../assets/img/games/games/microgaming/Fire-Forge.webp",
      },
      {
        id: 19,
        name: "Solar Wilds",
        image: "../assets/img/games/games/microgaming/Solar-Wilds.webp",
      },
      {
        id: 20,
        name: "Amazing Link Zeus",
        image: "../assets/img/games/games/microgaming/Amazing-Link-Zeus.webp",
      },
      {
        id: 21,
        name: "Gold Collector",
        image: "../assets/img/games/games/microgaming/Gold-Collector.webp",
      },
      {
        id: 22,
        name: "108 Heroes",
        image: "../assets/img/games/games/microgaming/108-Heroes.webp",
      },
      {
        id: 23,
        name: "5 Reel Drive",
        image: "../assets/img/games/games/microgaming/5-Reel-Drive.webp",
      },
      {
        id: 24,
        name: "777 Mega Deluxe™",
        image: "../assets/img/games/games/microgaming/777-Mega-Deluxe.webp",
      },
      {
        id: 25,
        name: "777 Royal Wheel",
        image: "../assets/img/games/games/microgaming/777-Royal-Wheel.webp",
      },
      {
        id: 26,
        name: "9 Masks of Fire",
        image: "../assets/img/games/games/microgaming/9-Masks-of-Fire.webp",
      },
      {
        id: 27,
        name: "9 Pots of Gold",
        image: "../assets/img/games/games/microgaming/9-Pots-of-Gold.webp",
      },
      {
        id: 28,
        name: "A Dark Matter",
        image: "../assets/img/games/games/microgaming/A-Dark-Matter.webp",
      },
      {
        id: 29,
        name: "A Tale of Elves",
        image: "../assets/img/games/games/microgaming/A-Tale-of-Elves.webp",
      },
      {
        id: 30,
        name: "ActionOps Snow and Sable",
        image: "../assets/img/games/games/microgaming/ActionOps-Snow-and-Sable.webp",
      },
      {
        id: 31,
        name: "Adventure Palace",
        image: "../assets/img/games/games/microgaming/Adventure-Palace.webp",
      },
      {
        id: 32,
        name: "Adventures Of Doubloon Island™",
        image: "../assets/img/games/games/microgaming/Adventures-Of-Doubloon-Island.webp",
      },
      {
        id: 33,
        name: "Age of Discovery",
        image: "../assets/img/games/games/microgaming/Age-of-Discovery.webp",
      },
      {
        id: 34,
        name: "Agent Jane Blonde",
        image: "../assets/img/games/games/microgaming/Agent-Jane-Blonde.webp",
      },
      {
        id: 35,
        name: "Alaskan Fishing",
        image: "../assets/img/games/games/microgaming/Alaskan-Fishing.webp",
      },
      {
        id: 36,
        name: "Alchemy Fortunes",
        image: "../assets/img/games/games/microgaming/Alchemy-Fortunes.webp",
      },
      {
        id: 37,
        name: "Ariana",
        image: "../assets/img/games/games/microgaming/Ariana.webp",
      },
      {
        id: 38,
        name: "Asian Beauty",
        image: "../assets/img/games/games/microgaming/Asian-Beauty.webp",
      },
      {
        id: 39,
        name: "Assassin Moon",
        image: "../assets/img/games/games/microgaming/Assassin-Moon.webp",
      },
      {
        id: 40,
        name: "Aurora Wilds",
        image: "../assets/img/games/games/microgaming/Aurora-Wilds.webp",
      },
      {
        id: 41,
        name: "Avalon",
        image: "../assets/img/games/games/microgaming/Avalon.webp",
      },
      {
        id: 42,
        name: "Badminton Hero",
        image: "../assets/img/games/games/microgaming/Badminton-Hero.webp",
      },
      {
        id: 43,
        name: "Banana Odyssey",
        image: "../assets/img/games/games/microgaming/Banana-Odyssey.webp",
      },
      {
        id: 44,
        name: "Bar Bar Black Sheep 5 Reel",
        image: "../assets/img/games/games/microgaming/Bar-Bar-Black-Sheep-5-Reel.webp",
      },
      {
        id: 45,
        name: "Bars and Stripes",
        image: "../assets/img/games/games/microgaming/Bars-and-Stripes.webp",
      },
      {
        id: 46,
        name: "Basketball Star",
        image: "../assets/img/games/games/microgaming/Basketball-Star.webp",
      },
      {
        id: 47,
        name: "Basketball Star Deluxe",
        image: "../assets/img/games/games/microgaming/Basketball-Star-Deluxe.webp",
      },
      {
        id: 48,
        name: "Basketball Star on Fire",
        image: "../assets/img/games/games/microgaming/Basketball-Star-on-Fire.webp",
      },
      {
        id: 49,
        name: "Beach Babes",
        image: "../assets/img/games/games/microgaming/Beach-Babes.webp",
      },
      {
        id: 50,
        name: "Beautiful Bones",
        image: "../assets/img/games/games/microgaming/Beautiful-Bones.webp",
      }
    ]    
  },
  {
    provider: 'sbobetslot',
    imgprovider: "../assets/img/games/provider/sbobetslot.webp",
    pola: "7",
    listgames: [
      {
        id: 1,
        name: "Richman",
        image: "../assets/img/games/games/sbobetslot/Richman.webp",
      },
      {
        id: 2,
        name: "Jurassic Park",
        image: "../assets/img/games/games/sbobetslot/Jurassic-Park.webp",
      },
      {
        id: 3,
        name: "Halloween",
        image: "../assets/img/games/games/sbobetslot/Halloween.webp",
      },
      {
        id: 4,
        name: "Amazing Circus",
        image: "../assets/img/games/games/sbobetslot/Amazing-Circus.webp",
      },
      {
        id: 5,
        name: "Tai Wang Si Shen",
        image: "../assets/img/games/games/sbobetslot/Tai-Wang-Si-Shen.webp",
      },
      {
        id: 6,
        name: "5 Treasures",
        image: "../assets/img/games/games/sbobetslot/5-Treasures.webp",
      },
      {
        id: 7,
        name: "88 Fortunes",
        image: "../assets/img/games/games/sbobetslot/88-Fortunes.webp",
      },
      {
        id: 8,
        name: "Diamond Eternity",
        image: "../assets/img/games/games/sbobetslot/Diamond-Eternity.webp",
      },
      {
        id: 9,
        name: "Dancing Drum",
        image: "../assets/img/games/games/sbobetslot/Dancing-Drum.webp",
      },
      {
        id: 10,
        name: "Flower Of Riches",
        image: "../assets/img/games/games/sbobetslot/Flower-Of-Riches.webp",
      },
      {
        id: 11,
        name: "Platinum",
        image: "../assets/img/games/games/sbobetslot/Platinum.webp",
      },
      {
        id: 12,
        name: "Golden Tale",
        image: "../assets/img/games/games/sbobetslot/Golden-Tale.webp",
      },
      {
        id: 13,
        name: "Eternal Diamond",
        image: "../assets/img/games/games/sbobetslot/Eternal-Diamond.webp",
      },
      {
        id: 14,
        name: "Fountain Of Wealth",
        image: "../assets/img/games/games/sbobetslot/Fountain-Of-Wealth.webp",
      },
      {
        id: 15,
        name: "Blooming Riches",
        image: "../assets/img/games/games/sbobetslot/Blooming-Riches.webp",
      },
      {
        id: 16,
        name: "Rhythm Of Fortune",
        image: "../assets/img/games/games/sbobetslot/Rhythm-Of-Fortune.webp",
      },
      {
        id: 17,
        name: "Buffalo Bonus",
        image: "../assets/img/games/games/sbobetslot/Buffalo-Bonus.webp",
      },
      {
        id: 18,
        name: "Triple Monkey",
        image: "../assets/img/games/games/sbobetslot/Triple-Monkey.webp",
      },
      {
        id: 19,
        name: "Funky Monkey",
        image: "../assets/img/games/games/sbobetslot/Funky-Monkey.webp",
      },
      {
        id: 20,
        name: "Long Long Long",
        image: "../assets/img/games/games/sbobetslot/Long-Long-Long.webp",
      },
      {
        id: 21,
        name: "Fa Fa Fa",
        image: "../assets/img/games/games/sbobetslot/Fa-Fa-Fa.webp",
      },
      {
        id: 22,
        name: "777",
        image: "../assets/img/games/games/sbobetslot/777.webp",
      },
      {
        id: 23,
        name: "Chaoji 8",
        image: "../assets/img/games/games/sbobetslot/Chaoji-8.webp",
      },
      {
        id: 24,
        name: "Arcadia",
        image: "../assets/img/games/games/sbobetslot/Arcadia.webp",
      },
      {
        id: 25,
        name: "City Of Poli",
        image: "../assets/img/games/games/sbobetslot/City-Of-Poli.webp",
      },
      {
        id: 26,
        name: "Dragon Skies",
        image: "../assets/img/games/games/sbobetslot/Dragon-Skies.webp",
      },
      {
        id: 27,
        name: "As The Gods Will",
        image: "../assets/img/games/games/sbobetslot/As-The-Gods-Will.webp",
      },
      {
        id: 28,
        name: "Hungry Hungry Shark",
        image: "../assets/img/games/games/sbobetslot/Hungry-Hungry-Shark.webp",
      },
      {
        id: 29,
        name: "Jo ma ji",
        image: "../assets/img/games/games/sbobetslot/Jo-ma-ji.webp",
      },
      {
        id: 30,
        name: "Tarzan",
        image: "../assets/img/games/games/sbobetslot/Tarzan.webp",
      },
      {
        id: 31,
        name: "Diamond Slot",
        image: "../assets/img/games/games/sbobetslot/Diamond-Slot.webp",
      },
      {
        id: 32,
        name: "50 Lions",
        image: "../assets/img/games/games/sbobetslot/50-Lions.webp",
      },
      {
        id: 33,
        name: "Speed Racing",
        image: "../assets/img/games/games/sbobetslot/Speed-Racing.webp",
      },
      {
        id: 34,
        name: "Marvel Tsum Tsum",
        image: "../assets/img/games/games/sbobetslot/Marvel-Tsum-Tsum.webp",
      },
      {
        id: 35,
        name: "Get Rich",
        image: "../assets/img/games/games/sbobetslot/Get-Rich.webp",
      },
      {
        id: 36,
        name: "Special Chef",
        image: "../assets/img/games/games/sbobetslot/Special-Chef.webp",
      },
      {
        id: 37,
        name: "Wu Lu Cai Shen",
        image: "../assets/img/games/games/sbobetslot/Wu-Lu-Cai-Shen.webp",
      },
      {
        id: 38,
        name: "Fishing Expert",
        image: "../assets/img/games/games/sbobetslot/Fishing-Expert.webp",
      },
      {
        id: 39,
        name: "Zhao Cai Tong Zi",
        image: "../assets/img/games/games/sbobetslot/Zhao-Cai-Tong-Zi.webp",
      },
      {
        id: 40,
        name: "Zhao Cai Jin Bao",
        image: "../assets/img/games/games/sbobetslot/Zhao-Cai-Jin-Bao.webp",
      },
      {
        id: 41,
        name: "Great Blue",
        image: "../assets/img/games/games/sbobetslot/Great-Blue.webp",
      },
      {
        id: 42,
        name: "Fish Party",
        image: "../assets/img/games/games/sbobetslot/Fish-Party.webp",
      },
      {
        id: 43,
        name: "Queen Of Cash",
        image: "../assets/img/games/games/sbobetslot/Queen-Of-Cash.webp",
      },
      {
        id: 44,
        name: "Universe Quest",
        image: "../assets/img/games/games/sbobetslot/Universe-Quest.webp",
      },
      {
        id: 45,
        name: "5 Dragons",
        image: "../assets/img/games/games/sbobetslot/5-Dragons.webp",
      },
      {
        id: 46,
        name: "Good Fortune",
        image: "../assets/img/games/games/sbobetslot/Good-Fortune.webp",
      },
      {
        id: 47,
        name: "True Zhao Cai Jin Bao",
        image: "../assets/img/games/games/sbobetslot/True-Zhao-Cai-Jin-Bao.webp",
      },
      {
        id: 48,
        name: "Money Farm",
        image: "../assets/img/games/games/sbobetslot/Money-Farm.webp",
      },
      {
        id: 49,
        name: "5 Dealers",
        image: "../assets/img/games/games/sbobetslot/5-Dealers.webp",
      },
      {
        id: 50,
        name: "Seven Lucky God",
        image: "../assets/img/games/games/sbobetslot/Seven-Lucky-God.webp",
      }
    ]     
  },
  {
    provider: 'cqnine',
    imgprovider: "../assets/img/games/provider/cqnine.webp",
    pola: "3",
    listgames: [
      {
        id: 1,
        name: "Hero of the 3 Kingdoms CaoCao",
        image: "../assets/img/games/games/cqnine/Hero-of-the-3-Kingdoms-CaoCao.webp",
      },
      {
        id: 2,
        name: "Mafia",
        image: "../assets/img/games/games/cqnine/Mafia.webp",
      },
      {
        id: 3,
        name: "Treasure Pirate",
        image: "../assets/img/games/games/cqnine/Treasure-Pirate.webp",
      },
      {
        id: 4,
        name: "Funky Bingo",
        image: "../assets/img/games/games/cqnine/Funky-Bingo.webp",
      },
      {
        id: 5,
        name: "Paradise",
        image: "../assets/img/games/games/cqnine/Paradise.webp",
      },
      {
        id: 6,
        name: "Mummy's Treasure",
        image: "../assets/img/games/games/cqnine/Mummys-Treasure.webp",
      },
      {
        id: 7,
        name: "Hanuman Bingo",
        image: "../assets/img/games/games/cqnine/Hanuman-Bingo.webp",
      },
      {
        id: 8,
        name: "Striker WILD",
        image: "../assets/img/games/games/cqnine/Striker-WILD.webp",
      },
      {
        id: 9,
        name: "All Star Team",
        image: "../assets/img/games/games/cqnine/All-Star-Team.webp",
      },
      {
        id: 10,
        name: "Seotda",
        image: "../assets/img/games/games/cqnine/Seotda.webp",
      },
      {
        id: 11,
        name: "Football Fever M",
        image: "../assets/img/games/games/cqnine/Football-Fever-M.webp",
      },
      {
        id: 12,
        name: "Baseball Fever",
        image: "../assets/img/games/games/cqnine/Baseball-Fever.webp",
      },
      {
        id: 13,
        name: "Myeong ryang",
        image: "../assets/img/games/games/cqnine/Myeong-ryang.webp",
      },
      {
        id: 14,
        name: "Night City",
        image: "../assets/img/games/games/cqnine/Night-City.webp",
      },
      {
        id: 15,
        name: "Mirror Mirror",
        image: "../assets/img/games/games/cqnine/Mirror-Mirror.webp",
      },
      {
        id: 16,
        name: "Disco Night",
        image: "../assets/img/games/games/cqnine/Disco-Night.webp",
      },
      {
        id: 17,
        name: "Lucky Boxes",
        image: "../assets/img/games/games/cqnine/Lucky-Boxes.webp",
      },
      {
        id: 18,
        name: "Rave High",
        image: "../assets/img/games/games/cqnine/Rave-High.webp",
      },
      {
        id: 19,
        name: "Oriental Beauty",
        image: "../assets/img/games/games/cqnine/Oriental-Beauty.webp",
      },
      {
        id: 20,
        name: "Lord Ganesha",
        image: "../assets/img/games/games/cqnine/Lord-Ganesha.webp",
      },
      {
        id: 21,
        name: "Fortune Dragon",
        image: "../assets/img/games/games/cqnine/Fortune-Dragon.webp",
      },
      {
        id: 22,
        name: "Cricket Fever",
        image: "../assets/img/games/games/cqnine/Cricket-Fever.webp",
      },
      {
        id: 23,
        name: "Wing Chun",
        image: "../assets/img/games/games/cqnine/Wing-Chun.webp",
      },
      {
        id: 24,
        name: "Fire Queen 2",
        image: "../assets/img/games/games/cqnine/Fire-Queen-2.webp",
      },
      {
        id: 25,
        name: "Six Gacha",
        image: "../assets/img/games/games/cqnine/Six-Gacha.webp",
      },
      {
        id: 26,
        name: "Wolf Disco",
        image: "../assets/img/games/games/cqnine/Wolf-Disco.webp",
      },
      {
        id: 27,
        name: "Football Fever",
        image: "../assets/img/games/games/cqnine/Football-Fever.webp",
      },
      {
        id: 28,
        name: "888 Cai Shen",
        image: "../assets/img/games/games/cqnine/888-Cai-Shen.webp",
      },
      {
        id: 29,
        name: "Thai Pok Deng",
        image: "../assets/img/games/games/cqnine/Thai-Pok-Deng.webp",
      },
      {
        id: 30,
        name: "K.O. Island",
        image: "../assets/img/games/games/cqnine/KO-Island.webp",
      },
      {
        id: 31,
        name: "Mr. Miser",
        image: "../assets/img/games/games/cqnine/Mr-Miser.webp",
      },
      {
        id: 32,
        name: "Lucky Tigers",
        image: "../assets/img/games/games/cqnine/Lucky-Tigers.webp",
      },
      {
        id: 33,
        name: "Thai Fish Prawn Crab",
        image: "../assets/img/games/games/cqnine/Thai-Fish-Prawn-Crab.webp",
      },
      {
        id: 34,
        name: "Hero Fishing",
        image: "../assets/img/games/games/cqnine/Hero-Fishing.webp",
      },
      {
        id: 35,
        name: "Acrobatics",
        image: "../assets/img/games/games/cqnine/Acrobatics.webp",
      },
      {
        id: 36,
        name: "Dragon Koi",
        image: "../assets/img/games/games/cqnine/Dragon-Koi.webp",
      },
      {
        id: 37,
        name: "Hot DJ",
        image: "../assets/img/games/games/cqnine/Hot-DJ.webp",
      },
      {
        id: 38,
        name: "Alice Run JP",
        image: "../assets/img/games/games/cqnine/Alice-Run-JP.webp",
      },
      {
        id: 39,
        name: "Coin Spinner",
        image: "../assets/img/games/games/cqnine/Coin-Spinner.webp",
      },
      {
        id: 40,
        name: "Loy Krathong",
        image: "../assets/img/games/games/cqnine/Loy-Krathong.webp",
      },
      {
        id: 41,
        name: "Floating Market",
        image: "../assets/img/games/games/cqnine/Floating-Market.webp",
      },
      {
        id: 42,
        name: "King Kong Shake",
        image: "../assets/img/games/games/cqnine/King-Kong-Shake.webp",
      },
      {
        id: 43,
        name: "Dollar Bomb",
        image: "../assets/img/games/games/cqnine/Dollar-Bomb.webp",
      },
      {
        id: 44,
        name: "Ganesha Jr.",
        image: "../assets/img/games/games/cqnine/Ganesha-Jr.webp",
      },
      {
        id: 45,
        name: "Aladdin's lamp",
        image: "../assets/img/games/games/cqnine/Aladdins-lamp.webp",
      },
      {
        id: 46,
        name: "Mahjong Fruit",
        image: "../assets/img/games/games/cqnine/Mahjong-Fruit.webp",
      },
      {
        id: 47,
        name: "Xoc Dia",
        image: "../assets/img/games/games/cqnine/Xoc-Dia.webp",
      },
      {
        id: 48,
        name: "Monster Hunter",
        image: "../assets/img/games/games/cqnine/Monster-Hunter.webp",
      },
      {
        id: 49,
        name: "King of Atlantis",
        image: "../assets/img/games/games/cqnine/King-of-Atlantis.webp",
      },
      {
        id: 50,
        name: "Hot Pinatas",
        image: "../assets/img/games/games/cqnine/Hot-Pinatas.webp",
      }
    ]        
  },
];