import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { login } from "../services/auth.service";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import { getProvide } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { xreferral } = useParams();
  const [referral, setReferral] = useState(xreferral || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [inputMessages, setInputMessages] = useState({
    username: "",
    passworduser: "",
    ulangisandi: "",
    nomorhp: "",
    email: "",
    referral: "",
    namabank: "",
    namarek: "",
    nomorrek: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    passworduser: "",
    ulangisandi: "",
    nomorhp: "",
    email: "",
    referral: "",
    namabank: "",
    namarek: "",
    nomorrek: "",
    setuju: false,
  });

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("acme");
    localStorage.removeItem("dataVerified");
    localStorage.removeItem("broker");
    localStorage.removeItem("brokerwd");
    localStorage.removeItem("iseco");
    localStorage.removeItem("lastFetchTimestamp");
    localStorage.removeItem("exSure");
  }, []);

  const [showSkeleton, setShowSkeleton] = useState(false);
  const [dataProvide, setDataProvide] = useState([]);
  const [error, setError] = useState(null);
  
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

  useEffect(() => {
    setReferral(xreferral || "");
  }, [xreferral]);

  useEffect(() => {
    const checkReferral = async () => {
      if (xreferral) {
        try {
          const response = await fetch("/prx/cekuserreferral", {
            method: "POST",
            credentials: "omit",
            headers: {
              "Content-Type": "application/json",
              utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI_TWO,
              "x-customblhdrs": import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN,
            },
            body: JSON.stringify({ username: xreferral }),
          });

          const text = await response.text();
          console.log("Raw response:", text);

          let data;
          try {
            data = JSON.parse(text);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return;
          }

          if (data.message === "Referral tidak ditemukan") {
            setReferral("");

            Swal.fire({
              title: "Opps!",
              text: "Referral tidak ditemukan",
              icon: "info",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/register");
            });
          }
        } catch (error) {
          console.error("Error checking referral:", error);
        }
      }
    };

    checkReferral();
  }, [xreferral, navigate]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    let lowercaseValue = value.toLowerCase();

    if (id === "username" && lowercaseValue.length >= 13) {
      setInputMessages((prevState) => ({
        ...prevState,
        username: "maksimal 12 digit",
      }));
      return;
    }

    if (id === "referral" && lowercaseValue.length >= 13) {
      setInputMessages((prevState) => ({
        ...prevState,
        referral: "maksimal 12 digit",
      }));
      return;
    }

    if (id === "passworduser" && lowercaseValue.length >= 13) {
      setInputMessages((prevState) => ({
        ...prevState,
        passworduser: "maksimal 12 digit",
      }));
      return;
    }

    if (id === "nomorhp" && lowercaseValue.length >= 15) {
      setInputMessages((prevState) => ({
        ...prevState,
        nomorhp: "maksimal 15 digit",
      }));
      return;
    }

    if (id === "email" && lowercaseValue.length >= 51) {
      setInputMessages((prevState) => ({
        ...prevState,
        email: "maksimal 50 digit",
      }));
      return;
    }

    if (id === "namabank") {
      if (value === "") {
        setInputMessages((prevState) => ({
          ...prevState,
          namabank: "Silahkan pilih Bank",
        }));
      } else {
        setInputMessages((prevState) => ({
          ...prevState,
          namabank: "",
        }));
      }
    }

    if (id === "namarek" && lowercaseValue.length >= 51) {
      setInputMessages((prevState) => ({
        ...prevState,
        namarek: "maksimal 50 digit",
      }));
      return;
    }

    if (id === "nomorrek" && lowercaseValue.length >= 21) {
      setInputMessages((prevState) => ({
        ...prevState,
        nomorrek: "maksimal 20 digit",
      }));
      return;
    }

    if (id === "setuju") {
      setFormData((prevState) => ({
        ...prevState,
        setuju: checked,
      }));

      const setujuElement = document.getElementById("setuju");
      if (setujuElement && checked) {
        setujuElement.classList.remove("pulse");
      }

      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : lowercaseValue,
    }));

    if (id === "username") {
      const numericRegex = /^\d+$/;
      if (lowercaseValue.trim().length === 0) {
        setInputMessages((prevState) => ({
          ...prevState,
          username: "",
        }));
      } else if (lowercaseValue.length < 6) {
        setInputMessages((prevState) => ({
          ...prevState,
          username: "Username minimal 6 digit",
        }));
      } else if (numericRegex.test(lowercaseValue)) {
        setInputMessages((prevState) => ({
          ...prevState,
          username: "Username harus berisi kombinasi huruf dan angka",
        }));
      } else {
        setInputMessages((prevState) => ({
          ...prevState,
          username: "",
        }));
      }
    }

    if (id === "passworduser") {
      if (value.trim().length === 0) {
        setInputMessages((prevState) => ({
          ...prevState,
          passworduser: "",
        }));
      } else if (value.length < 6) {
        setInputMessages((prevState) => ({
          ...prevState,
          passworduser: "Kata Sandi minimal 6 digit",
        }));
      } else {
        setInputMessages((prevState) => ({
          ...prevState,
          passworduser: "",
        }));
      }
    }if (id === "passworduser") {
      if (value.trim().length === 0) {
        setInputMessages((prevState) => ({
          ...prevState,
          passworduser: "",
        }));
      } else if (value.length < 6) {
        setInputMessages((prevState) => ({
          ...prevState,
          passworduser: "Kata Sandi minimal 6 digit",
        }));
      } else {
        setInputMessages((prevState) => ({
          ...prevState,
          passworduser: "",
        }));
      }
    }

    if (id === "ulangisandi") {
      if (value.trim().length === 0) {
        setConfirmPasswordError("");
      } else if (value !== formData.passworduser) {
        setConfirmPasswordError("Password tidak cocok");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (id === "nomorhp") {
      if (value.trim().length === 0) {
        setInputMessages((prevState) => ({
          ...prevState,
          nomorhp: "",
        }));
      } else {
        const numericRegex = /^\d*$/;
        if (!numericRegex.test(value)) {
          setInputMessages((prevState) => ({
            ...prevState,
            nomorhp: "Nomor HP hanya boleh berisi angka",
          }));
        } else if (value.substring(0, 2) !== "08") {
          setInputMessages((prevState) => ({
            ...prevState,
            nomorhp: "Nomor HP harus diawali dengan angka 08",
          }));
        } else if (value.length < 9) {
          setInputMessages((prevState) => ({
            ...prevState,
            nomorhp: "Nomor HP minimal 9 digit",
          }));
        } else {
          setInputMessages((prevState) => ({
            ...prevState,
            nomorhp: "",
          }));
        }
      }
    }

    if (id === "email") {
      if (lowercaseValue.trim().length === 0) {
        setInputMessages((prevState) => ({
          ...prevState,
          email: "",
        }));
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        setInputMessages((prevState) => ({
          ...prevState,
          email: "tulis sesuai format, contoh: email@gmail.com",
        }));
      } else {
        setInputMessages((prevState) => ({
          ...prevState,
          email: "",
        }));
      }
    }

    if (id === "namarek") {
      if (value.trim().length === 0) {
        setInputMessages((prevState) => ({
          ...prevState,
          namarek: "",
        }));
      } else {
        setInputMessages((prevState) => ({
          ...prevState,
          namarek: "",
        }));
      }
    }

    if (id === "nomorrek") {
      if (value.trim().length === 0) {
        setInputMessages((prevState) => ({
          ...prevState,
          nomorrek: "",
        }));
      } else {
        const numericRegex = /^\d*$/;
        if (!numericRegex.test(value)) {
          setInputMessages((prevState) => ({
            ...prevState,
            nomorrek: "Nomor rek. hanya boleh berisi angka",
          }));
        } else if (value.length < 9) {
          setInputMessages((prevState) => ({
            ...prevState,
            nomorrek: "Nomor rek. minimal 9 digit",
          }));
        } else {
          setInputMessages((prevState) => ({
            ...prevState,
            nomorrek: "",
          }));
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    const { id, value } = e.target;
    const specialChars = /[!@#$%^&*(),.?":{}|<>_\-]/; 
  
    if (id === "username" && value.length >= 13 && e.key !== "Backspace") {
      e.preventDefault();
    }
    if (id === "passworduser" && value.length >= 13 && e.key !== "Backspace") {
      e.preventDefault();
    }
    if (id === "nomorhp" && value.length >= 15 && e.key !== "Backspace") {
      e.preventDefault();
    }
    if (id === "email" && value.length >= 51 && e.key !== "Backspace") {
      e.preventDefault();
    }
    if (id === "namarek" && value.length >= 51 && e.key !== "Backspace") {
      e.preventDefault();
    }
    if (id === "nomorrek" && value.length >= 21 && e.key !== "Backspace") {
      e.preventDefault();
    }
  
    if (
      id === "username" ||
      id === "passworduser" ||
      id === "ulangisandi" ||
      id === "email" ||
      id === "referral"
    ) {
      if (e.key === " ") {
        e.preventDefault();
      }
    }
  
    if (id === "namarek" && value.length === 0 && e.key === " ") {
      e.preventDefault();
    }

    if (id === "username" && specialChars.test(e.key)) {
      e.preventDefault();
    }
  };  

  const handleKeyPress = (e) => {
    const { id, value } = e.target;
    if (id === "nomorhp") {
      const numericRegex = /^[0-9\b]+$/;
      if (!numericRegex.test(e.key)) {
        e.preventDefault();
      }
    }
    if (
      id === "namarek" &&
      !(e.key === "." || e.key === " " || /^[a-zA-Z]+$/.test(e.key))
    ) {
      e.preventDefault();
    }
    if (id === "nomorrek") {
      const numericRegex = /^[0-9\b]+$/;
      if (!numericRegex.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (id === "namarek") {
      const trimmedValue = value.trim();
      const alphabeticRegex = /^[a-zA-Z\s]+$/;
      if (trimmedValue && !alphabeticRegex.test(trimmedValue)) {
        Swal.fire({
          icon: 'info',
          title: 'opps',
          text: 'Nama hanya boleh berupa huruf!',
        }).then(() => {
          e.target.value = '';
        });
      }
    }
  };

  const renderSkeleton = () => {
    return (
        <div className="listdatalive skeleton register">
            <div className="loader"></div>
        </div>
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSkeleton(true);

    const setujuElement = document.getElementById("setuju");
    if (setujuElement && !formData.setuju) {
      setujuElement.classList.add("pulse");
    }

    const passwordsMatch = formData.passworduser === formData.ulangisandi;
    const hasError = Object.values(inputMessages).some((message) => message !== "");
    const allConditionsMet = passwordsMatch &&
      Object.values(inputMessages).every((message) => message === "") &&
      formData.username !== "" &&
      formData.passworduser !== "" &&
      formData.ulangisandi !== "" &&
      formData.nomorhp !== "" &&
      formData.email !== "" &&
      formData.namabank !== "" &&
      formData.namarek !== "" &&
      formData.nomorrek !== "" &&
      formData.setuju;

    if (hasError || !allConditionsMet) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Silahkan cek kembali!",
      });
      setShowSkeleton(false);
      const updatedInputMessages = {};
      Object.keys(inputMessages).forEach((key) => {
        if (key === "namabank" && !formData[key]) {
          updatedInputMessages[key] = "Silahkan pilih bank";
        } else if (key === "ulangisandi" && !formData[key]) {
          updatedInputMessages[key] = "Data tidak boleh kosong";
        } else if (key === "ulangisandi" && formData[key] !== formData.passworduser) {
          setConfirmPasswordError("ulangi kata sandi dengan benar");
        } else if (key !== "referral" && !formData[key]) {
          updatedInputMessages[key] = "Data tidak boleh kosong";
        } else {
          updatedInputMessages[key] = inputMessages[key];
        }
      });

      setInputMessages(updatedInputMessages);
      return;
    }

    const {
      username,
      passworduser,
      nomorhp,
      email,
      namabank,
      namarek,
      nomorrek,
    } = formData;

    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();
  
      const response1 = await fetch("/prx/register", {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({
          Username: username,
          Password: passworduser,
          Referral: xreferral,
          ddBankmm: namabank,
          ddNamarekmm: namarek,
          ddNorekmm: nomorrek,
          ddEmailmm: email,
          ddPhonemm: nomorhp,
          ipaddress: ip,
        }),
      });
  
      const responseData1 = await response1.json();
  
      if (responseData1.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Pendaftaran Berhasil",
          html: `
            <div class="textregister">
              <span class="textregister1">Username Anda : <span class="useridregister">${username}</span></span>
              <span class="textregister2">Silahkan Klik "OK" untuk login.</span>
            </div>`,
        }).then(async () => {
          const password = passworduser;
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
              handleRegistrationError(response.message);
            }
          } catch (error) {
            handleRegistrationError("Login failed.");
          }
        });
      } else {
        handleRegistrationError(responseData1.message);
      }
    } catch (error) {
      handleRegistrationError("Registration failed.");
    } finally {
      setShowSkeleton(false);
    }
  };
  
  const handleRegistrationError = (message) => {
    if (message === "Register fail, username already in our database !") {
      setInputMessages((prevState) => ({
        ...prevState,
        username: "Username telah digunakan",
      }));
    } else if (message === "Register fail, rekening number already in our database !") {
      setInputMessages((prevState) => ({
        ...prevState,
        nomorrek: "Nomor rekening telah digunakan",
      }));
    } else if (message === "Register fail, username and rekening already registered !") {
      setInputMessages((prevState) => ({
        ...prevState,
        username: "Username telah digunakan",
        nomorrek: "Nomor rekening telah digunakan",
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const banks = [
    { id: 1, name: "ABA Bank", methode: "bank" },
    { id: 2, name: "bri", methode: "bank" },
    { id: 3, name: "bca", methode: "bank" },
    { id: 4, name: "bca digital", methode: "bank" },
    { id: 5, name: "sakuku", methode: "bank" },
    { id: 6, name: "bni", methode: "bank" },
    { id: 7, name: "mandiri", methode: "bank" },
    { id: 8, name: "permata", methode: "bank" },
    { id: 9, name: "panin", methode: "bank" },
    { id: 10, name: "danamon", methode: "bank" },
    { id: 11, name: "cimb niaga", methode: "bank" },
    { id: 12, name: "bsi", methode: "bank" },
    { id: 13, name: "maybank", methode: "bank" },
    { id: 14, name: "bank jenius", methode: "bank" },
    { id: 15, name: "bank jago", methode: "bank" },
    { id: 16, name: "seabank", methode: "bank" },
    { id: 17, name: "dana", methode: "ewallet" },
    { id: 18, name: "ovo", methode: "ewallet" },
    { id: 19, name: "gopay", methode: "ewallet" },
    { id: 20, name: "linkaja", methode: "ewallet" },
    { id: 21, name: "shopeepay", methode: "ewallet" },
    { id: 22, name: "bank kalbar", methode: "bank" },
    { id: 23, name: "bank bpd aceh", methode: "bank" },
    { id: 24, name: "bank btn", methode: "bank" },
    { id: 25, name: "allobank", methode: "bank" },
    { id: 26, name: "bank btpn", methode: "bank" },
    { id: 27, name: "bpd kalteng", methode: "bank" },
    { id: 28, name: "bpd sulteng", methode: "bank" },
    { id: 29, name: "keb hana", methode: "bank" },
    { id: 30, name: "shinhan bank", methode: "bank" },
    { id: 31, name: "arta graha", methode: "bank" },
    { id: 32, name: "bank aceh", methode: "bank" },
    { id: 33, name: "bank bjb", methode: "bank" },
    { id: 34, name: "bank papua", methode: "bank" },
    { id: 35, name: "bank kalsel", methode: "bank" },
    { id: 36, name: "bpd kaltim", methode: "bank" },
    { id: 37, name: "bank aladin", methode: "bank" },
    { id: 38, name: "bank aladin syariah", methode: "bank" },
    { id: 39, name: "bank bpdm ambon", methode: "bank" },
    { id: 40, name: "bank bukopin", methode: "bank" },
    { id: 41, name: "bank raya", methode: "bank" },
    { id: 42, name: "sumsel babel", methode: "bank" },
    { id: 43, name: "bank kalsel", methode: "bank" },
    { id: 44, name: "canadia bank", methode: "bank" },
    { id: 45, name: "phillip bank", methode: "bank" },
    { id: 46, name: "wing bank", methode: "bank" },
  ];

  return (
    <div className="container">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | Daftar Akun Baru`}
          customDescription={`Daftar akun baru di ${dataProvide.nmwebsite}, situs judi bola terpercaya dan aman untuk taruhan online Anda. Nikmati pengalaman betting terbaik di sini!`}
          customKeywords="daftar akun baru, judi bola, situs taruhan bola, betting bola, judi online terpercaya, taruhan sepak bola, website judi aman"
        />
      ) : (
        <MetaTags
          customTitle="Daftar Akun Baru"
          customDescription="Daftar akun baru di sini, situs judi bola terpercaya dan aman untuk taruhan online Anda. Nikmati pengalaman betting terbaik di sini!"
          customKeywords="daftar akun baru, judi bola, situs taruhan bola, betting bola, judi online terpercaya, taruhan sepak bola, website judi aman"
        />
      )}
      {showSkeleton && renderSkeleton()}
      <Logo />
      <div className="secregister">
        <div className="titlesec">
          <h1>DAFTAR</h1>
          <p>Daftar Akun {dataProvide.nmwebsite}</p>
        </div>
        <form onSubmit={handleSubmit} action="" id="daftar" name="daftar">
          <div className="dataakun">
            <span className="titledaftar">INFO AKUN</span>
            <div className="listregister">
              <label htmlFor="username">
                Username <span className="required">*</span>
              </label>
              <div className="inputform">
                <input
                  type="text"
                  id="username"
                  placeholder="Minimal 6 Digit"
                  autoComplete="username"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {inputMessages.username && (
                  <Icon icon="akar-icons:cross" className="erorinput" />
                )}
              </div>
              <div className="divinformasi"></div>
              <span className="texinformasi">{inputMessages.username}</span>
            </div>
            <div className="listregister">
              <label htmlFor="passworduser">
                Kata Sandi <span className="required">*</span>
              </label>
              <div className="inputform">
                <input
                  type={showPassword ? "text" : "password"}
                  id="passworduser"
                  name="passworduser"
                  placeholder="Minimal 6 digit"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {inputMessages.passworduser && (
                  <Icon icon="akar-icons:cross" className="erorinput" />
                )}
                <Icon
                  icon={showPassword ? "ri:eye-fill" : "ri:eye-off-fill"}
                  onClick={() => togglePasswordVisibility("password")}
                  style={{
                    display: inputMessages.passworduser ? "none" : "block",
                  }}
                />
              </div>
              <div className="divinformasi"></div>
              <span className="texinformasi">{inputMessages.passworduser}</span>
            </div>
            <div className="listregister">
              <label htmlFor="ulangisandi">
                Ulangi Kata Sandi <span className="required">*</span>
              </label>
              <div className="inputform">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="ulangisandi"
                  name="ulangisandi"
                  placeholder="ketik ulang password anda"
                  autoComplete="new-password"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <Icon
                  icon={showConfirmPassword ? "ri:eye-fill" : "ri:eye-off-fill"}
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                />
              </div>
              <div className="divinformasi"></div>
              {confirmPasswordError && !inputMessages.ulangisandi && (
                <span className="texinformasi">{confirmPasswordError}</span>
              )}
              {inputMessages.ulangisandi && !confirmPasswordError && (
                <span className="texinformasi">
                  {inputMessages.ulangisandi}
                </span>
              )}
            </div>
            <div className="listregister">
              <label htmlFor="nomorhp">
                Nomor HP <span className="required">*</span>
              </label>
              <div className="inputform">
                <input
                  type="tel"
                  id="nomorhp"
                  name="nomorhp"
                  placeholder="contoh : 08520000000"
                  autoComplete="tel"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress}
                />
                {inputMessages.nomorhp && (
                  <Icon icon="akar-icons:cross" className="erorinput" />
                )}
              </div>
              <div className="divinformasi"></div>
              <span className="texinformasi">{inputMessages.nomorhp}</span>
            </div>
            <div className="listregister">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <div className="inputform">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="contoh : email@gmail.com"
                  autoComplete="email"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                {inputMessages.email && (
                  <Icon icon="akar-icons:cross" className="erorinput" />
                )}
              </div>
              <div className="divinformasi"></div>
              <span className="texinformasi">{inputMessages.email}</span>
            </div>
            <div className="listregister">
              <label htmlFor="referral">Referral</label>
              <div className="inputform">
                <input
                  type="text"
                  id="referral"
                  name="referral"
                  placeholder=""
                  autoComplete="off"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="dataakun">
            <span className="titledaftar">BANK INFO</span>
            <div className="listregister">
              <label htmlFor="namabank">
                Nama Bank <span className="required">*</span>
              </label>
              <div className="inputform">
                <select
                  id="namabank"
                  name="namabank"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option value="" className="pilihbank">
                    Pilih Bank
                  </option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="divinformasi"></div>
              <span className="texinformasi">{inputMessages.namabank}</span>
            </div>
            <div className="listregister">
              <label htmlFor="namarek">
                Nama Rekening <span className="required">*</span>
              </label>
              <div className="inputform">
                <input
                  type="text"
                  id="namarek"
                  name="namarek"
                  placeholder="isi nama rekening atau nama e-wallet"
                  autoComplete="off"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress}
                  onBlur={handleBlur}
                />
                {inputMessages.namarek && (
                  <Icon icon="akar-icons:cross" className="erorinput" />
                )}
              </div>
              <div className="divinformasi"></div>
              <span className="texinformasi">{inputMessages.namarek}</span>
            </div>
            <div className="listregister">
              <label htmlFor="nomorrek">
                Nomor Rekening <span className="required">*</span>
              </label>
              <div className="inputform">
                <input
                  type="text"
                  id="nomorrek"
                  name="nomorrek"
                  placeholder="isi nomor rekening atau nomor e-wallet"
                  autoComplete="off"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onKeyPress={handleKeyPress}
                />
                {inputMessages.nomorrek && (
                  <Icon icon="akar-icons:cross" className="erorinput" />
                )}
              </div>
              <div className="divinformasi"></div>
              <span className="texinformasi">{inputMessages.nomorrek}</span>
            </div>
          </div>
          <div className="menyetujui">
            <input
              type="checkbox"
              id="setuju"
              name="setuju"
              autoComplete="off"
              onChange={handleChange}
            />
            <span className="sayasetuju">
              Saya setuju dengan <Link to="/peraturanhome">Peraturan</Link> yang
              berlaku
            </span>
          </div>
          <div className="daftarbutton">
            <button
              type="submit"
              id="submitregister"
              name="submitregister"
              className="tombol full primary"
            >
              <span className="textbutton">daftar</span>
            </button>
          </div>
        </form>
        <span className="haveakun">
          Sudah mempunyai akun ?<Link to="/login">MASUK</Link>
        </span>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default RegisterPage;
