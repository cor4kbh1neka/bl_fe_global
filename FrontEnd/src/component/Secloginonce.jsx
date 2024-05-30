import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../services/auth.service";
import Runningtext from "../fragment/Runningtext";
import { Kontakcc } from "./kontakcc";

const Secloginonce = ( ) => {
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

  return (
    <>
      <Runningtext />
      <div className="seclogin">
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
        <Kontakcc />
      </div>
    </>
  );
};

export default Secloginonce;
