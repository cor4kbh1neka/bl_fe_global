import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { getUsername, getCoinxx } from "../services/auth.service";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { banking, fetchGroupbank } from "../services/auth.service";
import Livechat from "../component/Livechat";
import { handleClick } from "../services/api.service";

export const DepositPage = () => {
  const [username, setUsername] = useState("");
  const [accesstoken, setAccesstoken] = useState("");
  const [balance, setBalance] = useState("");
  const [rawBalance, setRawBalance] = useState(0);
  const [arrowRotation, setArrowRotation] = useState({
    bank: false,
    eWallet: false,
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [nominalDeposit, setNominalDeposit] = useState("");
  const [bankData, setBankData] = useState([]);
  const [groupBankData, setGroupBankData] = useState(null);
  const [showTransaksiDiproses, setShowTransaksiDiproses] = useState(false);
  const [initialStatus, setInitialStatus] = useState(null);
  const [isConfirmDepositVisible, setIsConfirmDepositVisible] = useState(false);
  const [dataStatusBank, setDataStatusBank] = useState(null);
  const [dataMinMax, setDataMinMax] = useState(null);

  const iseco = JSON.parse(localStorage.getItem("iseco"));

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const access = localStorage.getItem("acme");
      const broker = localStorage.getItem("broker");
  
      if (token && access) {
        const fetchedUsername = getUsername(token);
        setUsername(fetchedUsername);
        setAccesstoken(access);
        
        if (broker) {
          const groupData = await fetchGroupbank(broker);
          if (groupData && groupData.status === "success") {
            const masterData = groupData.data[broker] || [];
            setGroupBankData(masterData);
            setBankData(broker);
          }
        } else {
          const { status, databank } = await banking(token, access);
          if (status) {
            setBankData(databank);
            const grpBank = databank.group;
            localStorage.setItem("broker", grpBank);
            const groupData = await fetchGroupbank(grpBank);
            if (groupData && groupData.status === "success") {
              const masterData = groupData.data[grpBank] || [];
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

  const fetchDataBank = async () => {
    try {
      const response = await fetch("/banks/master", {
        headers: {
          'Content-Type': 'application/json',
          'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
        }
      });
      const responseData = await response.json();
      setDataStatusBank(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchDataBank();
  }, []);

  const typeBank = [];
  const typeEwallet = [];

  if (dataStatusBank && dataStatusBank.data) {
      for (const bankName in groupBankData) {
          const bank = groupBankData[bankName];
          bank.data_bank.forEach(data => {
              const item = {
                  bank: bankName,
                  ...data
              };
              const bankStatus = dataStatusBank.data.find(bankData => bankData.bnkmstrxyxyx === bankName);
              if (bankStatus) {
                  if (data.yyxxmethod === "bank") {
                      typeBank.push({
                          ...item,
                          statusxxyy: bankStatus.statusxyxyy
                      });
                  } else if (data.yyxxmethod === "ewallet") {
                      typeEwallet.push({
                          ...item,
                          statusxxyy: bankStatus.statusxyxyy
                      });
                  }
              } else {
                  console.warn(`Data status bank tidak ditemukan untuk ${bankName}`);
              }
          });
      }
    }

  useEffect(() => {
    if (username && accesstoken) {
      getCoinxx(username, accesstoken)
        .then((response) => {
          if (response) {
            const rawBalanceValue = parseFloat(response.balance);
            setRawBalance(rawBalanceValue);
            setBalance(rawBalanceValue.toLocaleString('id-ID', { minimumFractionDigits: 2 }));
          }
        })
        .catch((error) => console.error(error));
    }
  }, [username, accesstoken]);
  
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
                jenis : "DP",
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
            } else if (data.status === "Fail" && data.message === "Deposit gagal diproses!") {
              setShowTransaksiDiproses(false);
              setIsConfirmDepositVisible(true);
              setInitialStatus("Fail");
              Swal.fire({
                icon: "info",
                title: "Deposit Ditolak",
                text: data.message || "Deposit gagal diproses!",
                confirmButtonText: "OK",
              });
            } else if (data.status === "Fail" && data.is_maintenance === true ) {
              setShowTransaksiDiproses(true);
              setInitialStatus("Maintenance");
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
  
  useEffect(() => {
    if (bankData && bankData.length > 0) {
      const grpBank = bankData;
      if (grpBank) {
        fetchDataMinMax(grpBank);
      }
    }
  }, [bankData]);  

  const ketentuandeposit = [
    {
      keterangan_deposit: [
        "Deposit minimal Rp 10.000",
        "Untuk transfer antar bank / transfer beda mesin atm. Mohon gunakan nominal unik. Contoh : transfer sejumlah 25.779 lalu isi kolom Nonimal Deposit sejumlah 25 dan isi kolom Keterangan dengan angka 779",
      ],
    },
  ];

  const nominalValues = [10, 25, 50, 75, 100];

  const getStatusClassName = (statusxxyy) => {
    switch (statusxxyy) {
      case 2:
        return "offline";
      case 1:
        return "online";
      case 3:
        return "gangguan";
      default:
        return "";
    }
  };

  const renderList = (items) => {
    return items.map((item, index) => (
      <div
        className="listdatabanktransfer"
        key={index}
        onClick={() => handlePaymentSelection(item)}
      >
        <span className="textbanktf">{item.namebankxxyy}</span>
        <div className={`dot ${getStatusClassName(item.statusxxyy)}`}></div>
      </div>
    ));
  };
  

  const handleGroupClick = (index) => {
    const groupElements = document.querySelectorAll(".groupdatabanktransfer");
    groupElements.forEach((element, idx) => {
      if (idx !== index) {
        element.classList.remove("show");
      }
    });
    setArrowRotation({
      ...arrowRotation,
      [index === 0 ? "bank" : "eWallet"]:
        !arrowRotation[index === 0 ? "bank" : "eWallet"],
    });
  };

  const toggleShow = (index) => {
    const element = document.getElementsByClassName("groupdatabanktransfer")[
      index
    ];
    const rotateElements = document.querySelectorAll(
      ".listbuttondeposit .arrowdown",
    );
    rotateElements.forEach((el) => el.classList.remove("rotate"));

    element.classList.toggle("show");
    handleGroupClick(index);
  };

  const formatCurrency = (amount) => {
    const amountString = amount % 1 === 0 ? `${amount}.00` : amount.toString();
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "code",
      minimumFractionDigits: 2,
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

  const handlePaymentSelection = (payment) => {
    if (payment.statusxxyy === 2) {
      Swal.fire({
        title: `${payment.namebankxxyy.toUpperCase()} OFFLINE`,
        text: "Silahkan pilih metode pembayaran lainnya",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (payment.statusxxyy === 3) {
      Swal.fire({
        title: `${payment.namebankxxyy.toUpperCase()} GANGGUAN`,
        text: "Silahkan pilih metode pembayaran lainnya",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    setSelectedPayment(payment);
    setSelectedPaymentType(
      payment.yyxxmethod === "bank" ? "Bank Account" : "E-Wallet",
    );

    const listButtonDeposits = document.querySelectorAll(".listbuttondeposit");
    listButtonDeposits.forEach((button) => {
      button.classList.remove("info");
    });

    const listShowDataBank = document.querySelector(".groupkonfirmasideposit");
    listShowDataBank.classList.add("data");
  };

  const renderBarcodeGroupClass = (payment) => {
    return payment && payment.zwzwshowbarcode
      ? "groupbarcode download"
      : "groupbarcode";
  };

  const handleNominalChange = (event) => {
    const value = event.target.value;
    const { max_dp } = dataMinMax || {};

    const formattedMaxDeposit = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(max_dp * 1000);

    if (value >= 0 && value <= max_dp) {
      setNominalDeposit(value);
    } else if (value === "") {
      setNominalDeposit("");
    } else {
      Swal.fire({
        title: "Opps",
        text: `Maksimal Deposit ${formattedMaxDeposit}`,
        icon: "info",
        confirmButtonText: "OK",
      });
      setNominalDeposit("");
    }
  };

  const handleNominalClick = (value) => {
    if (nominalDeposit !== "") {
      setNominalDeposit(parseInt(nominalDeposit) + value);
    } else {
      setNominalDeposit(value);
    }

    if (document.getElementById("nominaldeposit").classList.contains("info")) {
      document.getElementById("nominaldeposit").classList.remove("info");
    }
  };

  const convertToRupiah = () => {
    if (!nominalDeposit) return "";
    const hasilKonversi = parseInt(nominalDeposit) * 1000;
    return hasilKonversi.toLocaleString("id-ID");
  };

  useEffect(() => {
    const inputElement = document.getElementById("nominaldeposit");
    if (inputElement) {
      const handleInputChange = () => {
        if (nominalDeposit && inputElement.classList.contains("info")) {
          inputElement.classList.remove("info");
        }
      };

      inputElement.addEventListener("input", handleInputChange);

      return () => {
        inputElement.removeEventListener("input", handleInputChange);
      };
    }
  }, [nominalDeposit]);

  useEffect(() => {
    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      const inputLength = inputValue.trim().length; 
      if (inputLength > 20) {
        Swal.fire({
          title: "Karakter Berlebih",
          text: "Anda melebihi batas 20 karakter pada keterangan",
          icon: "info",
          confirmButtonText: "OK",
        });
        document.getElementById("keterangandeposit").value =
          inputValue.slice(0, 20);
      }
  
      if (inputValue.startsWith(" ")) {
        document.getElementById("keterangandeposit").value = inputValue.trim();
      }
    };
  
    const inputElement = document.getElementById("keterangandeposit");
    inputElement.addEventListener("input", handleInputChange);
  
    return () => {
      inputElement.removeEventListener("input", handleInputChange);
    };
  }, []);  

  useEffect(() => {
    const handleInputAfterAlert = (event) => {
      const inputLength = event.target.value.length;
      if (inputLength > 20) {
        Swal.fire({
          title: "Error",
          text: "Anda melebihi batas karakter pada keterangan",
          icon: "error",
          confirmButtonText: "OK",
        });
        document.getElementById("keterangandeposit").value =
          event.target.value.slice(0, 20);
      }
    };

    const inputElement = document.getElementById("keterangandeposit");
    inputElement.addEventListener("input", handleInputAfterAlert);

    return () => {
      inputElement.removeEventListener("input", handleInputAfterAlert);
    };
  }, []);

  const handleDownloadBarcode = () => {
    const barcodeImage = document.querySelector(".listbarcode.left img");
    const barcodeUrl = barcodeImage.src;
    const bankName = document.getElementById("pilihanbank").value;
    const accountName = document.querySelector(
      ".valuedatarekening.narek",
    ).innerText;
    const accountNumber = document.querySelector(
      ".valuedatarekening.norek",
    ).innerText;
    const fileName = `${bankName}-${accountName}-${accountNumber}.png`;

    fetch(barcodeUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        Swal.fire({
          icon: "success",
          title: "Download Berhasil!",
          text: "File berhasil didownload.",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "info",
          title: "URL ERROR",
          text: "URL barcode tidak valid, hubungi admin",
        });
      });
  };

  const handleCopyRekening = () => {
    const nomorRekeningElement = document.querySelector(".valuedatarekening.norek");

    if (!nomorRekeningElement) {
      console.error("Element nomor rekening tidak ditemukan.");
      return;
    }

    const nomorRekening = nomorRekeningElement.getAttribute("data-norek");

    if (!nomorRekening) {
      Swal.fire({
        title: "Pilih Pembayaran",
        text: "Silahkan pilih metode pembayaran terlebih dahulu.",
        icon: "warning",
        confirmButtonText: "OK",
      });
  
      const listButtonDeposits = document.querySelectorAll(".listbuttondeposit");
      listButtonDeposits.forEach((button) => {
        button.classList.add("info");
      });
  
      return;
    }

    navigator.clipboard
      .writeText(nomorRekening)
      .then(() => {
        Swal.fire({
          title: "Copy",
          text: "Nomor rekening berhasil disalin.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        Swal.fire({
          title: "Error",
          text: "Gagal menyalin nomor rekening.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };  

  const transaksiDiprosesElement = (
    <div className="transaksidiproses">
      <span className="diproses">Deposit diproses</span>
      <span className="textdiproses">
        Deposit anda sedang dalam proses, mohon ditunggu beberapa saat lagi.
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
  );

  const akunSuspended = (
    <div className="transaksidiproses">
      <span className="diproses">Akun Suspend</span>
      <span className="textdiproses">
        Akun Anda sedang di suspend, silahkan hubungi admin.
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
  );

  const akunMaintenance = (
    <div className="transaksidiproses">
      <span className="diproses">Sedang Maintenance</span>
      <span className="textdiproses">
        Sistem sedang dalam perbaikan, silahkan hubungi admin.
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
  );

  const handleDepositSubmit = async () => {
    if (!nominalDeposit) {
      Swal.fire({
        title: "Nominal Transfer",
        text: "Silahkan isi nominal transfer",
        icon: "info",
        confirmButtonText: "OK",
      });
      document.getElementById("nominaldeposit").classList.add("info");
      return;
    }
  
    const { min_dp } = dataMinMax || {};
    const formattedMinDeposit = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(min_dp * 1000);
    if (nominalDeposit < min_dp) {
      Swal.fire({
        title: "Error",
        text: `Minimal deposit ${formattedMinDeposit}`,
        icon: "info",
        confirmButtonText: "OK",
      });
      document.getElementById("nominaldeposit").classList.add("info");
      return;
    }
  
    const selectedBank = document.getElementById("pilihanbank").value;
    if (!selectedBank) {
      Swal.fire({
        title: "Error",
        text: "Silahkan pilih metode pembayaran",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  
    const checkLastTransactionResponse = await fetch("/prx/checkLastTransaction", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
        Authorization: `Bearer ${accesstoken}`,
        'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
      },
      body: JSON.stringify(
        {
          jenis: "DP",
          username: username
        }
      ),
    });
  
    if (checkLastTransactionResponse.ok) {
      const data = await checkLastTransactionResponse.json();
      if (data.status === "Waiting") {
        Swal.fire({
          title: "Deposit Masih Diproses",
          text: "Deposit anda masih dalam proses",
          icon: "info",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
        return;
      }
    } else {
      console.error('Error checking last transaction');
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat mengecek transaksi terakhir",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  
    const xbalance = rawBalance;
    const dusername = username;
    const dbankname = selectedPayment ? selectedPayment.namebankxxyy : "";
    const dbanknamarek = selectedPayment ? selectedPayment.xynamarekx : "";
    const dbanknorek = selectedPayment ? selectedPayment.norekxyxy : "";
    const dmbank = iseco ? iseco.bank : '';
    const dnamarek = iseco ? iseco.narek : '';
    const dnorek = iseco ? iseco.norek : '';
    const dnominal = nominalDeposit;
    const dketerangan = document.getElementById("keterangandeposit").value;
  
    const dataToSend = {
      username: dusername,
      amount: dnominal,
      keterangan: dketerangan,
      bank: dbankname,
      namarek: dbanknamarek,
      norek: dbanknorek,
      mbank: dmbank,
      mnamarek: dnamarek,
      mnorek: dnorek,
      balance: xbalance,
    };
  
    fetch("/prx/data/de", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
        Authorization: `Bearer ${accesstoken}`,
        'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        title: data.status === 'Success' ? "Deposit Diproses" : "Error",
        text: "Terima kasih, Dana anda sedang dalam proses.",
        icon: data.status === 'Success' ? "success" : "error",
        confirmButtonText: "OK",
      });
  
      if (data.status === 'Success') {
        setShowTransaksiDiproses(true);
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Terjadi kesalahan saat melakukan deposit",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat melakukan deposit",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
  };  

  let renderComponent;
if (showTransaksiDiproses || initialStatus === "Waiting") {
  renderComponent = transaksiDiprosesElement;
} else if (showTransaksiDiproses || initialStatus === "Suspend") {
  renderComponent = akunSuspended;
} else if (showTransaksiDiproses || initialStatus === "Maintenance") {
  renderComponent = akunMaintenance;
} else {
  renderComponent = (
    <form
      action=""
      className={`konfirmasideposit ${isConfirmDepositVisible ? '' : 'hidden'}`}
    >
          <span className="titleformdeposit">Pilih Metode Pembayaran</span>
          <div className="groupbuttondeposit">
            <div
              className="listbuttondeposit"
              onClick={() => toggleShow(0)}
            >
              <span className="btnleft">
                {selectedPaymentType === "Bank Account"
                  ? selectedPayment?.namebankxxyy
                  : "Bank Account"}
              </span>
              <Icon
                icon="mingcute:down-fill"
                className={`arrowdown ${arrowRotation.bank ? "rotate" : ""}`}
              />
              <div className="groupdatabanktransfer">
              {renderList(typeBank)}
              </div>
            </div>
            <div
              className="listbuttondeposit"
              onClick={() => toggleShow(1)}
            >
              <span className="btnright">
                {selectedPaymentType === "E-Wallet"
                  ? selectedPayment?.namebankxxyy
                  : "E-Wallet"}
              </span>
              <Icon
                icon="mingcute:down-fill"
                className={`arrowdown ${arrowRotation.eWallet ? "rotate" : ""}`}
              />
              <div className="groupdatabanktransfer">
              {renderList(typeEwallet)}
              </div>
            </div>
          </div>
          <div className="listshowdatabank">
            <div className="groupshowdatabank">
              <div className="listvaluedatabank">
                <label htmlFor="pilihanbank" className="labeldatarekening">
                  Nama Bank
                </label>
                <span className="titikdua">:</span>
                <input
                  className="valuedatarekening bank"
                  id="pilihanbank"
                  name="pilihanbank"
                  readOnly
                  value={selectedPayment ? selectedPayment.namebankxxyy : ""}
                  onChange={(e) =>
                    setSelectedPayment({
                      ...selectedPayment,
                      namebankxxyy: e.target.value,
                    })
                  }
                />
              </div>
              <div className="listvaluedatabank">
                <span className="labeldatarekening">Nama Rekening</span>
                <span className="titikdua">:</span>
                <span className="valuedatarekening narek">
                  {selectedPayment ? selectedPayment.xynamarekx : ""}
                </span>
              </div>
              <div className="listvaluedatabank">
                <span className="labeldatarekening">Nomor Rekening</span>
                <span className="titikdua">:</span>
                <span
                  className="valuedatarekening norek"
                  data-norek={selectedPayment ? selectedPayment.norekxyxy : ""}
                >
                  {formatAccountNumber(
                    selectedPayment ? selectedPayment.norekxyxy : "",
                  )}
                </span>
              </div>
              <div className="copynorek" onClick={handleCopyRekening}>
                <Icon icon="ion:copy-outline" />
                <span className="copy">copy</span>
              </div>
            </div>
            <div className={renderBarcodeGroupClass(selectedPayment)}>
              <div className="listbarcode left">
                <img
                  src={selectedPayment ? selectedPayment.barcodexrxr : ""}
                  alt="image barcode"
                />
              </div>
              <div
                className="listbarcode right"
                onClick={handleDownloadBarcode}
              >
                <div className="downloadbarcode">
                  <Icon icon="ic:twotone-downloading" />
                  <span className="textdownload">Download</span>
                </div>
              </div>
            </div>
            <div className="groupkonfirmasideposit">
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
                <label htmlFor="nominaldeposit">Nominal Deposit</label>
                <div className="inputform">
                  <input
                    type="number"
                    id="nominaldeposit"
                    name="nominaldeposit"
                    placeholder="Silahkan isi Nominal Deposit"
                    value={nominalDeposit}
                    onChange={handleNominalChange}
                  />
                </div>
                <div className="valueconvert">
                  <span className="textcredit">Nominal Transfer : Rp</span>
                  <span className="hasilconver">{convertToRupiah()}</span>
                </div>
              </div>
              <div className="groupketerangandeposit">
                <label htmlFor="keterangandeposit">Keterangan</label>
                <div className="inputform">
                  <input
                    type="text"
                    id="keterangandeposit"
                    name="keterangandeposit"
                    placeholder="isi nominal unik, kode SN Pulsa, atau kosongkan saja"
                  />
                </div>
              </div>
              <button
                type="button"
                id="submitdeposit"
                className="tombol full green"
                onClick={handleDepositSubmit}
              >
                deposit
              </button>
            </div>
          </div>
        </form>
    );
  }

  return (
    <div className="container">
      <Lobbynavbar pageTitle="deposit" />
      <div className="secdeposit">
        <div className="dataaccount">
          <div className="groupdataaccout">
            <div className="titleuseraccount">
              <Icon icon="tabler:user-star" />
              <div className="datatitleuseraccount">
                <span className="accusername">{username}</span>
                <span className="usernametext">username</span>
              </div>
            </div>
            <div className="groupaccdataacount">
              <div className="baserekening">
                <div className="accrekening">
                  <span className="textaccrek">Balance</span>
                  <span className="datarekening textbalance">
                    IDR {balance}
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
          </div>
        </div>
        <div className="pilihandeposit">
          <div className="grouppilihandeposit">
          {dataStatusBank && showTransaksiDiproses && initialStatus === "Maintenance" && (
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
          )}
          {dataStatusBank && showTransaksiDiproses && initialStatus === "Waiting" && (
            <div className="transaksidiproses">
              <span className="diproses">Deposit dalam proses</span>
              <span className="textdiproses">Deposit anda sedang dalam proses, Silahkan cek saldo anda beberapa saat lagi.</span>
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
          )}
          {dataStatusBank && showTransaksiDiproses && initialStatus === "Suspend" && (
            <div className="transaksidiproses">
              <span className="diproses">Akun Suspend</span>
              <span className="textdiproses">Akun Anda sedang di suspend, silahkan hubungi admin</span>
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
          )}
          {!showTransaksiDiproses && renderComponent}
            <div className="groupketentuandeposit">
              {ketentuandeposit.map((item, index) => (
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
          </div>
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default DepositPage;
