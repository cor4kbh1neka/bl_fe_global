import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./page/register.jsx";
import ErrorPage from "./page/404.jsx";
import LoginPage from "./page/login.jsx";
import PeraturanPage from "./page/peraturanhome.jsx";
import PromosihomePage from "./page/promosihome.jsx";
import KlasemenhomePage from "./page/klasemenhome.jsx";
import LivescorehomePage from "./page/livescorehome.jsx";
import LobbyPage from "./page/lobby.jsx";
import DepositPage from "./page/deposit.jsx";
import WithdrawPage from "./page/withdraw.jsx";
import HistoryPage from "./page/history.jsx";
import PromosilobbyPage from "./page/promosilobby.jsx";
import LivescorelobbyPage from "./page/livescorelobby.jsx";
import ReferralPage from "./page/referral.jsx";
import MemoPage from "./page/memo.jsx";
import PesanPage from "./page/pesan.jsx";
import PengaturanPage from "./page/setting.jsx";
import KontakPage from "./page/kontak.jsx";
import KlasemenLobbyPage from "./page/klasemenlobby.jsx";
import MatchPage from "./page/match.jsx";
import PrediksiPage from "./page/prediksi.jsx";
import HistorybetPage from "./page/historybet.jsx";
import HistorybetdetailPage from "./page/historybetdetail.jsx";
import SbobetmobilePage from "./page/sbobetmobile.jsx";
import SbobetdekstopPage from "./page/sbobetdekstop.jsx";
import HistorybetdekstopPage from "./page/historybetdekstop.jsx";
import HistorybetdekstopdetailPage from "./page/historybetdekstopdetail.jsx";
import MaintenancePage from "./page/maintenance.jsx";
import LoginoncePage from "./page/loginpage.jsx";
import AboutPage from "./page/aboutus.jsx";
import ContactPage from "./page/contact.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginoncePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:webview",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/peraturanhome",
    element: <PeraturanPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/promosihome",
    element: <PromosihomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/klasemenhome",
    element: <KlasemenhomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/livescorehome",
    element: <LivescorehomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/lobby",
    element: <LobbyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/deposit",
    element: <DepositPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/withdraw",
    element: <WithdrawPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/historybet",
    element: <HistorybetPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/historybet/:invoice/:portopolio",
    element: <HistorybetdetailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/historybetdekstop",
    element: <HistorybetdekstopPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/historybetdekstop/:invoice/:portopolio",
    element: <HistorybetdekstopdetailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/promosilobby",
    element: <PromosilobbyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/livescorelobby",
    element: <LivescorelobbyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/referral",
    element: <ReferralPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register/:xreferral",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pagememo",
    element: <MemoPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pesan/:id",
    element: <PesanPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/setting",
    element: <PengaturanPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/kontak",
    element: <KontakPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/klasemenlobby",
    element: <KlasemenLobbyPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/match/:match_id",
    element: <MatchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/prediksi",
    element: <PrediksiPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sbobetmobile",
    element: <SbobetmobilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sbobetdekstop",
    element: <SbobetdekstopPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/aboutus",
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/hubungi",
    element: <ContactPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/maintenance",
    element: <MaintenancePage />,
    errorElement: <ErrorPage />,
  },
]);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
