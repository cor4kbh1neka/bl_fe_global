import React from "react";
import Logo from "../fragment/Logo";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import Secloginonce from "../component/Secloginonce";

const LoginoncePage = () => {
  const pProvideString = localStorage.getItem('halfPic');
  const pProvide = pProvideString ? JSON.parse(pProvideString) : null;
  

  return (
    <div className="container sslogin">
      {pProvide ? (
        <MetaTags
          customTitle={`${pProvide.nmwebsite} | login akun`}
          customDescription={`${pProvide.nmwebsite} adalah situs terpercaya untuk login akun betting sepak bola dan olahraga online dengan pengalaman bermain terbaik dan keamanan terjamin.

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
        <p>Login Akun {pProvide.nmwebsite}</p>
      </div>
      <Secloginonce />
      <Footer />
      <Livechat />
    </div>
  );
};

export default LoginoncePage;
