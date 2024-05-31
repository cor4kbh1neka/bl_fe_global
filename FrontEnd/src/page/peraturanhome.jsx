import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";

const PeraturanPage = () => {
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
  
  const peraturanData = [
    "Minimal Anda telah berusia 18 tahun untuk membuat akun dan bermain dalam permainan situs ini.",
    "Setiap player wajib menjaga kerahasiaan akun-nya masing-masing.",
    "Data yang diberikan pada saat mendaftar adalah BENAR dan ASLI.",
    "Pastikan Anda telah melakukan registrasi dengan data yang valid (BENAR dan ASLI). Demi kenyamanan deposit, harap selalu perhatikan rekening yang AKTIF pada MENU DEPOSIT. Untuk lebih mudah mengidentifikasi, gunakanlah nominal unik seperti: Rp 50.079, Rp 100.852, atau Rp 68.451.",
    "Deposit dan Withdraw hanya dapat diproses ke rekening yang terdaftar.",
    "Sebelum melakukan deposit, dimohon selalu melakukan pengecekan nomor rekening yang aktif. Apabila melakukan transfer ke rekening deposit yang tidak aktif lagi, maka dana dianggap hangus.",
    "Betting yang normal adalah saat pasaran betting dibuka. Semua pembelian/betting yang telah dilakukan tidak dapat dibatalkan. Apabila ditemukan transaksi tidak wajar, maka akan dianggap TIDAK SAH dan akan diblokir permanen beserta saldo di dalamnya.",
    "Kami akan melakukan tindakan tegas terhadap yang melakukan penipuan deposit berulang-ulang atau telah dinyatakan melakukan permainan yang tidak wajar. Semua tindakan penipuan atau bentuk apapun yang merugikan pihak kami dan pihak-pihak lainnya akan di-BANNED akun Anda tanpa pengecualian.",
    `Jika melanggar peraturan dan ketentuan yang berlaku, maka akun akan tersuspend secara permanen dari pusat kami. Pengecekan hasil result, silakan kunjungi website resmi di ${dataProvide.nmwebsite}.`,
    ];

  return (
    <div className="container">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | Peraturan Lengkap`}
          customDescription={`${dataProvide.nmwebsite} adalah situs taruhan judi bola yang aman dan terpercaya, menyediakan peraturan lengkap dan layanan terbaik untuk penggemar sepak bola`}
          customKeywords="taruhan judi bola, judi bola aman, judi bola terpercaya, peraturan judi bola, layanan judi bola, taruhan sepak bola"
        />
      ) : (
        <MetaTags
          customTitle="Peraturan Lengkap"
          customDescription="Situs kami adalah situs taruhan judi bola yang aman dan terpercaya, menyediakan peraturan lengkap dan layanan terbaik untuk penggemar sepak bola"
          customKeywords="taruhan judi bola, judi bola aman, judi bola terpercaya, peraturan judi bola, layanan judi bola, taruhan sepak bola"
        />
      )}
      <Logo />
      <div className="secperaturan">
        <div className="grouperaturan">
          <div className="titlesec">
            <h1>PERATURAN</h1>
            <p>Peraturan Lengkap {dataProvide.nmwebsite}</p>
          </div>
          {peraturanData.map((peraturan, index) => (
            <p key={index}>
              <span className="nomor">{index + 1}.</span>
              <span className="textperaturan">{peraturan}</span>
            </p>
          ))}
        </div>
        <div className="daftarbutton">
          <Link to="/register" className="tombol full primary">
            <span className="textbutton">daftar</span>
          </Link>
        </div>
        <span className="haveakun">
          Sudah mempunyai akun ?<Link to="/login">MASUK</Link>
        </span>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default PeraturanPage;
