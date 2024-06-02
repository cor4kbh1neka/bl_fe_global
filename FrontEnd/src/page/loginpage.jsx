import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import Secloginonce from "../component/Secloginonce";
import { getUsername } from "../services/auth.service";
import { getProvide } from "../services/api.service";

const LoginoncePage = () => {
  const [dataProvide, setDataProvide] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  }, [navigate]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } 
    };

    fetchData();
  }, []);
  

  return (
    <div className="container sslogin">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | login akun`}
          customDescription={`${dataProvide.nmwebsite} adalah situs terpercaya untuk login akun betting sepak bola dan olahraga online dengan pengalaman bermain terbaik dan keamanan terjamin.

          `}
          customKeywords="login akun, betting sepak bola, betting olahraga online, situs betting terpercaya, taruhan bola, taruhan olahraga, taruhan online, judi bola, judi olahraga online"
        />
      ) : (
        <MetaTags
          customTitle="Login Akun"
          customDescription="Situs kami adalah situs terpercaya untuk login akun betting sepak bola dan olahraga online dengan pengalaman bermain terbaik dan keamanan terjamin."
          customKeywords="login akun, betting sepak bola, betting olahraga online, situs betting terpercaya, taruhan bola, taruhan olahraga, taruhan online, judi bola, judi olahraga online"
        />
      )}
      <Logo />
      <div className="titlesec">
        <h1>LOGIN</h1>
        <p>Login Akun {dataProvide.nmwebsite}</p>
      </div>
      <Secloginonce />
      <Footer />
      <Livechat />
    </div>
  );
};

export default LoginoncePage;
