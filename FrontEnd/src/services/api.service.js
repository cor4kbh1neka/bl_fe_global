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
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
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
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
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
