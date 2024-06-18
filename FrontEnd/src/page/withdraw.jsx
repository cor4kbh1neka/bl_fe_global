import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { login, getUsername, getCoinxx, fetchGroupbankwd } from "../services/auth.service";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import Bankinfo from "../component/Bankinfo";
import { banking } from "../services/auth.service";
import { handleClick } from "../services/api.service";
import Livechat from "../component/Livechat";

export const WithdrawPage = () => {
  const [username, setUsername] = useState("");
  const [accesstoken, setAccesstoken] = useState("");
  const [balance, setBalance] = useState("");
  const [nominalWithdraw, setNominalWithdraw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isNominalValid, setIsNominalValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [groupBankData, setGroupBankData] = useState(null);
  const [showTransaksiDiproses, setShowTransaksiDiproses] = useState(false);
  const [initialStatus, setInitialStatus] = useState(null);
  const [isConfirmDepositVisible, setIsConfirmDepositVisible] = useState(false);
  const [reloadNavbar, setReloadNavbar] = useState(false);
  const [dataMinMax, setDataMinMax] = useState(null);

  const iseco = JSON.parse(localStorage.getItem("iseco"));

  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const access = localStorage.getItem("acme");
    let brokerwd = localStorage.getItem("brokerwd");

    if (token && access) {
      const fetchedUsername = await getUsername(token);
      setUsername(fetchedUsername);
      setAccesstoken(access);

      if (brokerwd) {
        setBankData({ groupwd: brokerwd });
        const groupData = await fetchGroupbankwd(brokerwd);
        if (groupData && groupData.status === "success") {
          const masterData = groupData.data || [];
          setGroupBankData(masterData);
        }
      } else {
        const { status, databank } = await banking(token, access);
        if (status) {
          setBankData(databank);
          brokerwd = databank.groupwd;
          localStorage.setItem("brokerwd", brokerwd);
          const groupData = await fetchGroupbankwd(brokerwd);
          if (groupData && groupData.status === "success") {
            const masterData = groupData.data || [];
            setGroupBankData(masterData);
          }
        }
      }
    } else {
      window.location.href = "/";
    }
  };

  fetchData();
}, []);
  

  useEffect(() => {
    if (username) {
      const checkLastTransaction = async () => {
        try {
          const response = await fetch("/prx/checkLastTransaction", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
              Authorization: `Bearer ${accesstoken}`,
              'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
            },
            body: JSON.stringify(
              {
                jenis : "WD",
                username : username
              }
            ),
          });
  
          if (response.ok) {
            const data = await response.json();
            if (data.status === "Waiting") {
              setShowTransaksiDiproses(true);
              setInitialStatus("Waiting");
            } else if (data.status === "Fail" && data.is_suspend === true) {
              setShowTransaksiDiproses(true);
              setInitialStatus("Suspend");
            } else if (data.status === "Fail" && data.is_maintenance === true) {
              setShowTransaksiDiproses(true);
              setInitialStatus("Maintenance");
            } else if (data.status === "Fail") {
              setShowTransaksiDiproses(false);
              setIsConfirmDepositVisible(true);
              setInitialStatus("Fail");
              Swal.fire({
                icon: "info",
                title: "Withdraw Ditolak",
                text: data.message || "Withdraw gagal diproses!",
                confirmButtonText: "OK",
              });
            } else {
              setShowTransaksiDiproses(false);
              setIsConfirmDepositVisible(true);
              setInitialStatus("Success");
            }
          }
        } catch (error) {
          console.error('Error checking last transaction:', error);
        }
      };
      checkLastTransaction();
    }
  }, [username]);

  const updateBalance = () => {
    if (username && accesstoken) {
      getCoinxx(username, accesstoken)
        .then((response) => {
          if (response) {
            setBalance(parseFloat(response.balance));
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    if (username && accesstoken) {
      getCoinxx(username, accesstoken)
        .then((response) => {
          if (response) {
            setBalance(parseFloat(response.balance));
          }
        })
        .catch((error) => console.error(error));
    }
  }, [username]);

  const formatCurrency = (amount) => {
    const amountString = amount % 1 === 0 ? `${amount}.00` : amount.toString();
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "code",
      minimumFractionDigits: 2,
    }).format(amountString);
  };

  const balanceAfterFormat = formatCurrency(balance);

  const formatCurrencyRp = (amount) => {
    const amountString =
      amount % 1 === 0 ? amount.toString() : amount.toFixed(2);
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
    }).format(amountString);
  };

  const formatAccountNumber = (number) => {
    return number.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const hideLastDigits = (number) => {
    if (typeof number === "undefined") {
      return "";
    }
    const visibleDigits = number.slice(0, -4);
    const hiddenDigits = number.slice(-4).replace(/\d/g, "*");
    const formattedNumber =
      visibleDigits.replace(/(\d{4})(?=\d)/g, "$1-") + hiddenDigits;
    return formattedNumber;
  };

  useEffect(() => {
    if (bankData && bankData.groupwd) {
      fetchDataMinMax(bankData.groupwd);
    }
  }, [bankData]);
  
  const fetchDataMinMax = async (grpBank) => {
    try {
      if (!grpBank) {
        console.error('No group bank specified');
        return;
      }
    
      const response = await fetch("/banks/group", {
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        }
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const responseData = await response.json();
    
      if (responseData.data && responseData.data[grpBank]) {
        const filteredData = responseData.data[grpBank];
        setDataMinMax(filteredData);
      } else {
        console.error(`No data found for group ${grpBank}`);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }    
  };

  const ketentuanwithdraw = [
    {
      keterangan_deposit: [
        "Minimal withdraw sebesar Rp 30.000",
        "Kami tidak melakukan pengiriman dana saat bank sedang gangguan/offline. Silahkan konfirmasi ke admin untuk informasi lebih lanjut.",
      ],
    },
  ];

  const convertToRupiah = () => {
    if (!nominalWithdraw) return "";
    const hasilKonversi = parseInt(nominalWithdraw) * 1000;
    return hasilKonversi.toLocaleString("id-ID");
  };

  const nominalValues = dataMinMax ? [dataMinMax.min_wd, 50, 100, 150, 200] : [];

  const handleNominalClick = (value) => {
    if (parseFloat(nominalWithdraw) + value > parseFloat(balance)) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        html: `<div class="grousaldoanda">
          <span>Saldo tidak cukup!</span>
          <span>Balance : <span class="sisasaldotext">${balanceAfterFormat}</span></span>
        </div>`,
      });
      setNominalWithdraw("");
      setIsNominalValid(false);
      document.getElementById("submitwithdraw").setAttribute("disabled", "disabled");
    } else if (nominalWithdraw !== "") {
      setNominalWithdraw(parseFloat(nominalWithdraw) + value);
    } else {
      document.getElementById("submitwithdraw").removeAttribute("disabled");
      setNominalWithdraw(value);
      setIsNominalValid(true);
    }
  
    if (document.getElementById("nominalwithdraw").classList.contains("info")) {
      document.getElementById("nominalwithdraw").classList.remove("info");
    }
  };
  

  const handleNominalwd = () => {
    if (!nominalWithdraw) {
      document.getElementById("submitwithdraw").setAttribute("disabled", "disabled");
      return;
    }
  
    const minrealWithdraw = dataMinMax ? dataMinMax.min_wd : 0;
    const maxrealWithdraw = dataMinMax ? dataMinMax.max_wd : Infinity;
    const minWithdraw = dataMinMax ? dataMinMax.min_wd * 1000 : 0;
    const maxWithdraw = dataMinMax ? dataMinMax.max_wd * 1000 : Infinity;
  
    if (parseInt(nominalWithdraw) < minrealWithdraw) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: `Minimal withdraw ${formatCurrencyRp(minWithdraw)}`,
      });
      setNominalWithdraw("");
      setIsNominalValid(false);
      return;
    } else if (parseFloat(nominalWithdraw) > parseFloat(balance)) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        html: `<div class="grousaldoanda">
          <span>Saldo tidak cukup!</span>
          <span>Balance : <span class="sisasaldotext">${balanceAfterFormat}</span></span>
        </div>`,
      });
      setNominalWithdraw("");
      setIsNominalValid(false);
      return;
    } else if (parseFloat(nominalWithdraw) > maxrealWithdraw) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: `Maksimal withdraw ${formatCurrencyRp(dataMinMax.max_wd * 1000)}`,
      });
      setNominalWithdraw("");
      setIsNominalValid(false);
      return;
    } else {
      setIsNominalValid(true);
    }
  };  

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handlePassword = async () => {
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
  
    if (usernameInput && passwordInput) {
      const data = {
        username: usernameInput,
        password: passwordInput,
      };
  
      const { status } = await login(data);
  
      if (status) {
        Swal.fire({
          icon: "success",
          text: "Password Benar",
        });
        setIsPasswordValid(true);
        document.getElementById("submitwithdraw").removeAttribute("disabled");
      } else {
        Swal.fire({
          text: "Password Salah",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        setIsPasswordValid(false);
        document.getElementById("submitwithdraw").setAttribute("disabled", "disabled");
      }
    }
  };  

  useEffect(() => {
    if (isNominalValid && isPasswordValid) {
      document.getElementById("submitwithdraw").removeAttribute("disabled");
    } else {
      document
        .getElementById("submitwithdraw")
        .setAttribute("disabled", "disabled");
    }
  }, [isNominalValid, isPasswordValid]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const getBankName = (mbank) => {
    if (!groupBankData) return '';

    const bankDataArray = Object.values(groupBankData).map(obj => obj[mbank]).filter(Boolean);
    const matchedBank = bankDataArray[0];
  
    if (matchedBank && matchedBank.data_bank && matchedBank.data_bank.length > 0) {
      const bankDetails = matchedBank.data_bank[0];
      return {
        namebankxxyy: bankDetails.namebankxxyy,
        xynamarekx: bankDetails.xynamarekx,
        norekxyxy: bankDetails.norekxyxy
      };
    } else {
      return { namebankxxyy: mbank };
    }
  };


  const wbalance = balance;
  const wusername = username;
  const wamount = nominalWithdraw;
  const wmbank = iseco ? iseco.bank : '';
  const wmnamarek = iseco ? iseco.narek : '';
  const wmnorek = iseco ? iseco.norek : '';

  const bankDetails = getBankName(wmbank);

  const wnamabank = bankDetails.namebankxxyy || '';
  const wnamarek = bankDetails.xynamarekx || '';
  const wnorek = bankDetails.norekxyxy || '';

  const handleSubmitWithdraw = async () => {
    const nominalWithdrawInput = document.getElementById("nominalwithdraw").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    if (!nominalWithdrawInput || !passwordInput) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "Mohon lengkapi nilai Nominal Withdraw dan Password sebelum melakukan penarikan.",
      });
      document.getElementById("submitwithdraw").setAttribute("disabled", "disabled");
      return;
    }
  
    if (parseFloat(nominalWithdrawInput) > parseFloat(balance)) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        html: `<div class="grousaldoanda">
          <span>Saldo tidak cukup!</span>
          <span>Balance : <span class="sisasaldotext">${balanceAfterFormat}</span></span>
        </div>`,
      });
      setNominalWithdraw("");
      setIsNominalValid(false);
      document.getElementById("submitwithdraw").setAttribute("disabled", "disabled");
      return;
    }
  
    handleNominalwd();
    
    if (!isNominalValid) {
      return;
    }
    
    try {
      const checkResponse = await fetch("/prx/checkLastTransaction", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify({
          jenis: "WD",
          username: username
        }),
      });
  
      if (checkResponse.ok) {
        const data = await checkResponse.json();
        if (data.status === "Waitting") {
          Swal.fire({
            icon: "info",
            title: "Transaksi Sedang Diproses",
            text: "Transaksi withdraw anda masih dalam proses.",
          });
          window.location.reload();
          return;
        }
      } else {
        console.error('Failed to check last transaction status');
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error checking last transaction:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat memeriksa status transaksi terakhir'
      });
      return;
    }
  
    const withdrawalData = {
      username: wusername,
      amount: wamount,
      bank: wnamabank,
      namarek: wnamarek,
      norek: wnorek,
      mbank: wmbank,
      mnamarek: wmnamarek,
      mnorek: wmnorek,
      balance: wbalance,
    };
  
    try {
      const response = await fetch("/prx/data/wi", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
          Authorization: `Bearer ${accesstoken}`,
          'x-customblhdrs' : import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        },
        body: JSON.stringify(withdrawalData)
      });
  
      if (response.ok) {
        setShowTransaksiDiproses(true);
        Swal.fire({
          icon: "success",
          title: "Withdrawal Diproses",
          text: "Terima kasih, Dana anda sedang dalam proses."
        }).then(() => {
          window.location.reload();
        });
        setReloadNavbar(true);
        updateBalance();
      } else {
        console.error('Withdrawal failed with status:', response.status);
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat memproses withdrawal'
      });
    }
  };  

  return (
    <div className="container">
      <Lobbynavbar key={reloadNavbar ? 'withdraw_reload' : 'withdraw'} pageTitle="withdraw" />
      <div className="secdeposit withdraw">
        <div className="dataaccount">
          <div className="groupdataaccout">
            <div className="titleuseraccount">
              <Icon icon="tabler:user-star" />
              <div className="datatitleuseraccount">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  className="accusername"
                  autoComplete="off"
                  readOnly
                />
                <span className="usernametext">username</span>
              </div>
            </div>
            <div className="groupaccdataacount">
              <div className="baserekening">
                <div className="accrekening">
                  <span className="textaccrek">Balance</span>
                  <span className="datarekening textbalance">
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>
              <div className="accrekening right">
                <span className="textaccrek">Bank Info</span>
                <div className="datarekening right">
                  <span className="batastextrr">{iseco ? iseco.bank : ''}</span>
                  <span className="batastextrr">{iseco ? iseco.narek : ''}</span>
                  <span className="accnomorrek">
                    {formatAccountNumber(hideLastDigits(iseco ? iseco.norek : ''))}
                  </span>
                </div>
              </div>
            </div>
            {showTransaksiDiproses && initialStatus === "Waiting" ? (
              <div className="transaksidiproses">
                <span className="diproses">Withdraw dalam proses</span>
                <span className="textdiproses">
                  Permintaan penarikan sudah diterima oleh kami. Dana akan diproses paling lambat dalam waktu 1x24 jam. Rata-rata waktu proses penarikan adalah 2 menit per transaksi.
                </span>
                <div className="groupbtnadmin">
                  <span className="tombol full green" onClick={() => handleClick(1, "Whatsapp 1", "livechat")}>
                    <Icon icon="cib:whatsapp" />
                    Whatsapp
                  </span>
                  <span className="tombol full primary" onClick={() => handleClick(11, "Live Chat", "Whatsapp 1")}>
                    <Icon icon="simple-icons:livechat" />
                    Livechat
                  </span>
                </div>
              </div>
            ) : (
              <form className={`formwithdraw ${isConfirmDepositVisible ? '' : 'hidden'}`}>
                <div className="groupfillnominal">
                  {nominalValues.map((value, index) => (
                    <div
                      className="listfillnominal"
                      key={index}
                      onClick={() => handleNominalClick(value)}
                    >
                      <span className="valuenominal">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="groupnominaldeposit">
                  <label htmlFor="nominalwithdraw">Nominal Withdraw</label>
                  <div className="inputform">
                    <input
                      type="number"
                      id="nominalwithdraw"
                      name="nominalwithdraw"
                      autoComplete="off"
                      placeholder="Silahkan isi nominal withdraw"
                      value={nominalWithdraw}
                      onChange={(e) => setNominalWithdraw(e.target.value)}
                      onBlur={handleNominalwd}
                    />
                  </div>
                  <div className="valueconvert">
                    <span className="textcredit">
                      Nominal masuk rekening : Rp
                    </span>
                    <span className="hasilconver">{convertToRupiah()}</span>
                  </div>
                </div>
                <div className="grouppassword">
                  <label htmlFor="password">Password</label>
                  <div className="groupasswordbb">
                    <div className="inputform">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Masukkan password username anda"
                        onKeyDown={handleKeyDown}
                      />
                      <Icon
                        icon={showPassword ? "ri:eye-fill" : "ri:eye-off-fill"}
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                    <span className="tombol full green" onClick={handlePassword}>Cek Password</span>
                  </div>
                </div>
                <button
                  type="button"
                  id="submitwithdraw"
                  className="tombol full primary"
                  onClick={handleSubmitWithdraw}
                >
                  Withdraw
                </button>
              </form>
            )}
            {showTransaksiDiproses && initialStatus === "Suspend" ? (
              <div className="transaksidiproses">
                <span className="diproses">Akun Suspend</span>
                <span className="textdiproses">Akun Anda sedang di suspend, silahkan hubungi admin.</span>
                <div className="groupbtnadmin">
                  <span className="tombol full green" onClick={() => handleClick(1, "Whatsapp 1", "livechat")}>
                    <Icon icon="cib:whatsapp" />
                    Whatsapp
                  </span>
                  <span className="tombol full primary" onClick={() => handleClick(11, "Live Chat", "Whatsapp 1")}>
                    <Icon icon="simple-icons:livechat" />
                    Livechat
                  </span>
                </div>
              </div>
            ) : null}
            {showTransaksiDiproses && initialStatus === "Maintenance" ? (
              <div className="transaksidiproses">
                <span className="diproses">Sedang Maintenance</span>
                <span className="textdiproses">Sistem sedang dalam perbaikan, silahkan hubungi admin.</span>
                <div className="groupbtnadmin">
                  <span className="tombol full green" onClick={() => handleClick(1, "Whatsapp 1", "livechat")}>
                    <Icon icon="cib:whatsapp" />
                    Whatsapp
                  </span>
                  <span className="tombol full primary" onClick={() => handleClick(11, "Live Chat", "Whatsapp 1")}>
                    <Icon icon="simple-icons:livechat" />
                    Livechat
                  </span>
                </div>
              </div>
            ) : null }
            <div className="groupketentuandeposit">
              {ketentuanwithdraw.map((item, index) => (
                <div key={index}>
                  {item.keterangan_deposit.map((keterangan, idx) => (
                    <div className="listketerangandeposit" key={idx}>
                      <div className="titik"></div>
                      <span className="textketerangandeposit">
                        {keterangan}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Bankinfo />
          </div>
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );  
};

export default WithdrawPage;
