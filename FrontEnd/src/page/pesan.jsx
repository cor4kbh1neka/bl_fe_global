import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Livechat from "../component/Livechat";

export const PesanPage = () => {
  const { id } = useParams();
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const storedMemo = localStorage.getItem("sumMemo");

    if (!storedMemo) {
      console.log("Data tidak tersedia di localStorage");
      return;
    }

    try {
      const memoArray = JSON.parse(storedMemo);
      const message = memoArray.find((message) => message.idmemo === parseInt(id));

      if (!message) {
        console.log("Pesan tidak ditemukan");
      } else {
        setSelectedMessage(message);
      }
    } catch (error) {
      console.error("Gagal memproses data dari localStorage:", error);
    }
  }, [id]);

  if (!selectedMessage) {
    return <div>Pesan tidak ditemukan</div>;
  }

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

  return (
    <div className="container">
      <Lobbynavbar pageTitle="pesan" />
      <div className="secpesan">
        <div className="grouppesan">
          <Link to="/pagememo" className="backhandler listnavigasi parlay">
            <Icon icon="icon-park-outline:back" />
            <span>Kembali</span>
          </Link>
          <div className="listdatapesan">
            <span className="label">subject</span>
            <span className="pemisah">:</span>
            <span className="valuedata">{selectedMessage.subject}</span>
          </div>
          <div className="datapesan">
            <span className="labeldatapesan">Pesan :</span>
            <div className="valuedatapesan">
              <p>{selectedMessage.memo}</p>
            </div>
            <div className="datatanggal">
              <span className="titletanggal">Tanggal :</span>
              <span className="tanggal">{formatOrderTime(selectedMessage.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default PesanPage;