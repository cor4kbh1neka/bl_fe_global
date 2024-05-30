import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../services/auth.service";
import Runningtext from "../fragment/Runningtext";
import { getMediaSosial } from "../services/api.service";

const Seclogin = ( ) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowPasswordIcon(!showPasswordIcon);
  };

  const handleLupaPasswordClick = () => {
    Swal.fire({
      text: "Silahkan hubungi Admin",
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    const filteredUsername = username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    e.target.value = filteredUsername;
  };

  const handlePasswordChange = (e) => {
    e.target.value = e.target.value.replace(/\s/g, '');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
  
    if (!username && !password) {
      Swal.fire({
        text: "Silahkan isi username dan password",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else if (!username) {
      Swal.fire({
        text: "Silahkan isi username",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else if (!password) {
      Swal.fire({
        text: "Silahkan isi password",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } else {
      const data = { username, password };
  
      try {
        const response = await login(data);
        if (response.status) {
          let tokenToSet = response.refreshToken;
          let acToSet = response.accessToken;
          if (window.location.pathname === '/webview') {
            tokenToSet = response.apkToken;
          }
          
          localStorage.setItem("acme", acToSet);
          localStorage.setItem("token", tokenToSet);
          window.location.href = "/lobby";
        } else {
          Swal.fire({
            text: "Username atau Password Salah",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          text: "Terjadi kesalahan saat login",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleClick = async (idctscmed, title, opsi) => {
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

  return (
    <>
      <Runningtext />
      <div className="seclogin">
        <div className="seccontact">
          <div className="listcontact" onClick={() => handleClick(11, "Live Chat", "Whatsapp 1")}>
            <Icon icon="fluent-mdl2:chat-solid" style={{ color: "#e59f26" }} />
            <span>live chat</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(1, "Whatsapp 1", "livechat")}>
            <Icon icon="ic:baseline-whatsapp" style={{ color: "#25d366" }} />
            <span>whatsapp 1</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(2, "Whatsapp 2", "Whatsapp 1")}>
            <Icon icon="ic:baseline-whatsapp" style={{ color: "#25d366" }} />
            <span>whatsapp 2</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(3, "Telegram", "livechat")}>
            <Icon icon="mingcute:telegram-fill" style={{ color: "#2AABEE" }} />
            <span>telegram</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(5, "Facebook", "livechat")}>
            <Icon icon="ri:facebook-fill" style={{ color: "#4267B2" }} />
            <span>facebook</span>
          </div>
        </div>
        <div className="secformlogin">
          <span className="textform">mulai bermain</span>
          <form id="formlogin" className="formlogin" onSubmit={handleLogin}>
            <div className="inputform">
              <Icon icon="heroicons:user-16-solid" />
              <input
                type="text"
                id="username"
                placeholder="Username"
                autoComplete="off"
                onChange={handleUsernameChange}
              />
            </div>
            <div className="inputform">
              <Icon icon="material-symbols:lock" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                autoComplete="off"
                onChange={handlePasswordChange}
              />
              <Icon
                icon={showPasswordIcon ? "ri:eye-fill" : "ri:eye-off-line"}
                id="showpassword"
                onClick={togglePasswordVisibility}
              />
            </div>
            <p className="lupapasswordhome" onClick={handleLupaPasswordClick}>
              Lupa Password?
            </p>
            <div className="groupbutton">
              <button type="submit" className="tombol border">
                <span className="textbutton">login</span>
                <Icon icon="material-symbols:login-rounded" />
              </button>
              <Link to="/register" className="tombol full primary">
                <span className="textbutton">daftar</span>
                <Icon icon="mdi:register" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Seclogin;
