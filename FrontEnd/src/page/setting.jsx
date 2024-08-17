import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { login, getUsername, uptPassword, getHistoryuser } from "../services/auth.service";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import Livechat from "../component/Livechat";

export const PengaturanPage = () => {
  const [username, setUsername] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [accesstoken, setAccesstoken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [filterJenis, setFilterJenis] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const togglePasswordVisibility = (field) => {
    if (field === "oldpassword") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "newpassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "retypepassword") {
      setShowRetypePassword(!showRetypePassword);
    }
  };

  const renderSkeletonone = () => {
    return (
      <div className="listdatalive skeleton">
        <div className="loader"></div>
      </div>
    );
  };

  const fetchHistoryData = async (fetchedUsername, access) => {
    const historyResponse = await getHistoryuser(fetchedUsername, access);
    setHistoryData(historyResponse || []);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const access = localStorage.getItem("acme");

      if (token && access) {
        const fetchedUsername = await getUsername(token);
        setUsername(fetchedUsername);
        setAccesstoken(access);
        fetchHistoryData(fetchedUsername, access);
      } else {
        window.location.href = "/";
      }
    };

    fetchData();
  }, []);

  const handlePassword = async () => {
    const usernameInput = username;
    const passwordInput = document.getElementById("oldpassword").value.trim();

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
        document.getElementById("submitubahpassword").removeAttribute("disabled");
      } else {
        Swal.fire({
          text: "Password Salah",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
        setIsPasswordValid(false);
        document.getElementById("submitubahpassword").setAttribute("disabled", "disabled");
      }
    }
  };

  const handleSubmit = async () => {
    if (!isPasswordValid) {
      Swal.fire({
        text: "Silahkan konfirmasi password lama Anda terlebih dahulu.",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    const newpassword = document.getElementById("newpassword").value.trim();
    const retypepassword = document.getElementById("retypepassword").value.trim();

    if (newpassword !== retypepassword) {
      Swal.fire({
        text: "Password baru dan konfirmasi password tidak cocok.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
      return;
    }

    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipaddress = ipData.ip;

    const response = await uptPassword(username, accesstoken, ipaddress, newpassword);

    if (response) {
      Swal.fire({
        icon: "success",
        text: "Password berhasil diubah.",
      }).then(() => {
        setIsLoading(true);
        fetchHistoryData(username, accesstoken);
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Gagal mengubah password. Silakan coba lagi.",
      });
    }
  };

  const formatOrderTime = (orderTime) => {
    const date = new Date(orderTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const transactionsPerPage = 10;
  const filteredHistoryData = filterJenis === "all" ? historyData : historyData.filter(entry => entry.jenis === filterJenis);
  const totalPages = Math.ceil(filteredHistoryData.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentHiss = filteredHistoryData.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisiblePages(pageNumber);
  };

  const updateVisiblePages = (pageNumber) => {
    const MAX_VISIBLE_PAGES = 5;

    if (totalPages <= MAX_VISIBLE_PAGES) {
      setVisiblePages(Array.from({ length: totalPages }, (_, i) => i + 1));
      return;
    }
    const startIndex = Math.max(
      Math.min(pageNumber - 1, totalPages - MAX_VISIBLE_PAGES + 1),
      1,
    );
    const endIndex = Math.min(startIndex + MAX_VISIBLE_PAGES - 1, totalPages);

    setVisiblePages(
      Array.from(
        { length: endIndex - startIndex + 1 },
        (_, i) => startIndex + i,
      ),
    );
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filterJenis, totalPages]);

  const renderPaginationNumbers = () => {
    return visiblePages.map((pageNumber) => (
      <span
        key={pageNumber}
        className={`numberpage ${pageNumber === currentPage ? "active" : ""}`}
        onClick={() => paginate(pageNumber)}
      >
        {pageNumber}
      </span>
    ));
  };

  return (
    <div className="container">
      <Lobbynavbar pageTitle="pengaturan akun" />
      <div className="secsetting">
        <div className="groupsecsetting">
          <div className="groupkemanan">
            <div className="groupdataverif">
              <h3>Ubah Password Akun</h3>
              <div className="groupkemanancc">
                <div className="groupasswordbb">
                  <div className="inputform">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="oldpassword"
                      name="oldpassword"
                      placeholder="Password lama"
                      autoComplete="off"
                    />
                    <Icon
                      icon={showOldPassword ? "ri:eye-fill" : "ri:eye-off-fill"}
                      onClick={() => togglePasswordVisibility("oldpassword")}
                    />
                  </div>
                  <span className="tombol full green" onClick={handlePassword}>Cek Password</span>
                </div>
                <div className="inputform">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newpassword"
                    name="newpassword"
                    placeholder="Password baru"
                    autoComplete="off"
                  />
                  <Icon
                    icon={showNewPassword ? "ri:eye-fill" : "ri:eye-off-fill"}
                    onClick={() => togglePasswordVisibility("newpassword")}
                  />
                </div>
                <div className="inputform">
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    id="retypepassword"
                    name="retypepassword"
                    placeholder="Ketik ulang password baru"
                    autoComplete="off"
                  />
                  <Icon
                    icon={showRetypePassword ? "ri:eye-fill" : "ri:eye-off-fill"}
                    onClick={() => togglePasswordVisibility("retypepassword")}
                  />
                </div>
              </div>
            </div>
            <div className="settingubahpassword">
              <button
                type="submit"
                id="submitubahpassword"
                name="submitubahpassword"
                className="tombol full primary"
                onClick={handleSubmit}
                disabled={!isPasswordValid}
              >
                <span className="textbutton">ubah password</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grouphistoryuser">
          <h4>Aktifitas Akun</h4>
          <div className="filterhiss">
            <select name="jenis" id="jenis" onChange={(e) => setFilterJenis(e.target.value)}>
              <option value="all">Tampilkan Semua</option>
              <option value="login">Login</option>
              <option value="ubah password">Ubah Password</option>
            </select>
          </div>
          <div className="datatable">
            {isLoading ? (
              renderSkeletonone()
            ) : (
              <>
                <table>
                  <tbody>
                    <tr>
                      <th>Username</th>
                      <th>Jenis</th>
                      <th>Ipaddress</th>
                      <th>Tanggal</th>
                    </tr>
                    {currentHiss.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.username}</td>
                        <td>{entry.jenis}</td>
                        <td>
                          <a className="linkip" href={`https://ipinfo.io/${entry.ipaddress}`} target="_blank" rel="noopener noreferrer">
                            {entry.ipaddress}
                            <Icon icon="fluent-mdl2:open-in-new-tab" />
                          </a>
                        </td>
                        <td>{formatOrderTime(entry.updated_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="grouppgaination">
                  <div className="grouppgainationcc">
                    <Icon
                      icon="teenyicons:left-solid"
                      className="pag left"
                      onClick={() => {
                        const newPage = Math.max(currentPage - 1, 1);
                        setCurrentPage(newPage);
                        updateVisiblePages(newPage);
                      }}
                    />
                    <Icon
                      icon="teenyicons:right-solid"
                      className="pag right"
                      onClick={() => {
                        const newPage = Math.min(currentPage + 1, totalPages);
                        setCurrentPage(newPage);
                        updateVisiblePages(newPage);
                      }}
                    />
                    {renderPaginationNumbers()}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default PengaturanPage;
