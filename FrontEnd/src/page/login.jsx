import Header from "../component/Header";
import Seclogin from "../component/Seclogin";
import Popular from "../component/Popular";
import Promosi from "../component/Promosi";
import Download from "../component/Download";
import Bankinfo from "../component/Bankinfo";
import Linkalternatif from "../component/Linkalternatif";
import Article from "../component/Article";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import { getUsername } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { MetaTags } from "../component/MetaTags";
import { getProvide } from "../services/api.service";
import { Livechat } from "../component/Livechat";

const LoginPage  = () =>  {
  const navigate = useNavigate();
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [dataProvide, setDataProvide] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const storedTimestamp = localStorage.getItem('timestamp_timeHalf');
      const storedData = localStorage.getItem('halfPic');

      if (storedTimestamp && storedData && currentTime - storedTimestamp < 3600000) {
        setDataProvide(JSON.parse(storedData));
      } else {
        const response = await getProvide();
        setDataProvide(response.data);
        localStorage.setItem('halfPic', JSON.stringify(response.data));
        localStorage.setItem('timestamp_timeHalf', currentTime.toString());
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const username = getUsername(token);
      if (username) {
        navigate("/lobby");
      } else {
        console.error("Invalid token");
      }
    }
    
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent === "true") {
      setShowCookieConsent(false);
    }
  }, [navigate]);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true"); 
    setShowCookieConsent(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowCookieConsent(false);
  };

  return (
      <div className="container utama">
        <MetaTags />
        <Header />
        <Seclogin />
        <Popular />
        <Promosi />
        <Download />
        <Bankinfo />
        <Linkalternatif />
        <Article />
        <Footer />
        {showCookieConsent && (
          <div className="cookie-consent-notification">
            <p>Kami menggunakan cookie untuk meningkatkan pengalaman pengguna Anda. Dengan menggunakan situs web kami, Anda menyetujui penggunaan cookie.</p>
            <button className="tombol full green" onClick={acceptCookies}>Terima</button>
            <button className="tombol border green" onClick={rejectCookies}>Tolak</button>
          </div>
        )}
        <Livechat />
      </div>
  );
}

export default LoginPage;
