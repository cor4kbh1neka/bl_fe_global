import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import Livechat from "../component/Livechat";

export const PengaturanPage = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [activeTab, setActiveTab] = useState("verifikasi");

  const togglePasswordVisibility = (field) => {
    if (field === "oldpassword") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "newpassword") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "retypepassword") {
      setShowRetypePassword(!showRetypePassword);
    }
  };

  const handleMatchClick = () => {
    Swal.fire({
      text: "Fitur akan segera hadir!",
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="container">
      <Lobbynavbar pageTitle="pengaturan akun" />
      <div className="secsetting">
        <div className="groupsecsetting">
          <div className="togglelivescore">
            <div
              className={`listtogglelivescore ${activeTab === "verifikasi" ? "active" : ""}`}
              onClick={() => setActiveTab("verifikasi")}
            >
              <span className="texttoggle">VERIFIKASI</span>
            </div>
            <div
              className={`listtogglelivescore ${activeTab === "keamanan" ? "active" : ""}`}
              onClick={() => setActiveTab("keamanan")}
            >
              <span className="texttoggle">KEAMANAN</span>
            </div>
          </div>
          {activeTab === "verifikasi" && (
            <div className="groupverifikasi">
              <div className="groupdataverif">
                <label htmlFor="nomorhp">Verifikasi Nomor HP Kamu</label>
                <div className="inputform">
                  <input
                    type="tel"
                    id="nomorhp"
                    name="nomorhp"
                    placeholder="Masukkan nomor hp kamu"
                  />
                </div>
              </div>
              <div className="menyetujui">
                <input
                  type="checkbox"
                  id="setuju"
                  name="setuju"
                  autoComplete="off"
                />
                <span className="sayasetuju">
                  Saya setuju dengan <Link to="/peraturanhome">Peraturan</Link>{" "}
                  yang berlaku
                </span>
              </div>
              <div className="settingkirim">
                <button
                  type="submit"
                  id="submitverifnumber"
                  name="submitverifnumber"
                  className="tombol full primary"
                  onClick={handleMatchClick}
                >
                  <span className="textbutton">kirim</span>
                </button>
              </div>
            </div>
          )}
          {activeTab === "keamanan" && (
            <div className="groupkemanan">
              <div className="groupdataverif">
                <span className="labelvarif" htmlFor="nomorhp">
                  Ubah Password Akun
                </span>
                <div className="groupkemanancc">
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
                      icon={
                        showRetypePassword ? "ri:eye-fill" : "ri:eye-off-fill"
                      }
                      onClick={() => togglePasswordVisibility("retypepassword")}
                    />
                  </div>
                </div>
              </div>
              <div className="settingkirim">
                <button
                  type="submit"
                  id="submitkeamanan"
                  name="submitkeamanan"
                  className="tombol full primary"
                  onClick={handleMatchClick}
                >
                  <span className="textbutton">kirim</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default PengaturanPage;
