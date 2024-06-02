import React, { useEffect, useState } from "react";
import Logo from "../fragment/Logo";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import { getProvide } from "../services/api.service";

const AboutPage = () => {
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

  return (
    <div className="container">
      {dataProvide ? (
        <MetaTags
          customTitle={`${dataProvide.nmwebsite} | About Us`}
          customDescription={`${dataProvide.nmwebsite} adalah Platform taruhan sepak bola dan olahraga online terpercaya. Bergabunglah dengan kami untuk peluang terbaik, keamanan terjamin, dan dukungan 24/7`}
          customKeywords={`${dataProvide.nmwebsite}, taruhan sepak bola, taruhan olahraga online, betting online, taruhan bola, sportsbook, odds terbaik, platform taruhan, keamanan taruhan, dukungan pelanggan, fair play`}
        />
      ) : (
        <MetaTags
          customTitle="About Us"
          customDescription="Situs kami adalah Platform taruhan sepak bola dan olahraga online terpercaya. Bergabunglah dengan kami untuk peluang terbaik, keamanan terjamin, dan dukungan 24/7."
          customKeywords="taruhan sepak bola, taruhan olahraga online, betting online, taruhan bola, sportsbook, odds terbaik, platform taruhan, keamanan taruhan, dukungan pelanggan, fair play"
        />
      )}
      <Logo />
      <div className="secperaturan">
        <div className="grouperaturan">
          <div className="titlesec">
            <h1>{dataProvide.nmwebsite}</h1>
            <p>Pelajari Tentang {dataProvide.nmwebsite}</p>
          </div>
          <main>
            <section className="aboutmess">
                <h2>Mengapa Memilih {dataProvide.nmwebsite}?</h2>
                <p>{dataProvide.nmwebsite} adalah platform taruhan sepak bola dan olahraga online yang terpercaya dan terkemuka. Kami menawarkan peluang terbaik dan berbagai pilihan taruhan untuk para penggemar olahraga.</p>
            </section>

            <section className="aboutmess">
                <h2>Cara Bergabung dengan {dataProvide.nmwebsite}</h2>
                <p>Untuk mulai bertaruh di {dataProvide.nmwebsite}, ikuti langkah-langkah sederhana berikut:</p>
                <ul>
                    <li><strong>Daftar Akun:</strong> Klik tombol "Daftar" dan isi formulir pendaftaran dengan informasi yang diperlukan.</li>
                    <li><strong>Deposit Dana:</strong> Lakukan deposit menggunakan metode pembayaran yang tersedia.</li>
                    <li><strong>Mulai Bertaruh:</strong> Pilih pertandingan dan jenis taruhan yang diinginkan, lalu pasang taruhan Anda.</li>
                </ul>
            </section>

            <section className="aboutmess">
                <h2>Jenis Taruhan di {dataProvide.nmwebsite}</h2>
                <h3>1. Taruhan Sepak Bola</h3>
                <p>Kami menawarkan berbagai jenis taruhan sepak bola, termasuk:</p>
                <ul>
                    <li><strong>Taruhan 1X2:</strong> Taruhan pada hasil akhir pertandingan (Menang, Seri, Kalah).</li>
                    <li><strong>Over/Under:</strong> Taruhan pada jumlah total gol yang dicetak dalam pertandingan.</li>
                    <li><strong>Handicap Asia:</strong> Taruhan dengan pemberian keuntungan atau kerugian pada salah satu tim.</li>
                    <li><strong>Skor Tepat:</strong> Taruhan pada skor akhir yang tepat dari sebuah pertandingan.</li>
                </ul>

                <h3>2. Taruhan Olahraga Lainnya</h3>
                <p>Selain sepak bola, {dataProvide.nmwebsite} juga menawarkan taruhan pada berbagai olahraga lainnya seperti:</p>
                <ul>
                    <li>Basketball</li>
                    <li>Tenis</li>
                    <li>Rugby</li>
                    <li>Baseball</li>
                    <li>MMA</li>
                </ul>

                <h3>3. Berbagai Fitur Olahraga</h3>
                <p>Situs {dataProvide.nmwebsite} juga menyediakan berbagai fitur olahraga yang dapat Anda gunakan, seperti:</p>
                <ul>
                    <li>Klasemen Liga</li>
                    <li>Livescore</li>
                    <li>Prediksi Pertandingan</li>
                </ul>
            </section>

            <section className="aboutmess">
                <h2>Keamanan dan Fair Play</h2>
                <p>Keamanan dan integritas adalah prioritas utama kami. {dataProvide.nmwebsite} menggunakan teknologi enkripsi terbaru untuk melindungi data pribadi dan transaksi keuangan Anda. Kami juga berkomitmen untuk memastikan fair play dalam setiap taruhan yang ditempatkan di platform kami.</p>
            </section>

            <section className="aboutmess">
                <h2>Dukungan Pelanggan</h2>
                <p>Tim dukungan pelanggan kami siap membantu Anda 24/7. Jika Anda memiliki pertanyaan atau mengalami masalah, jangan ragu untuk menghubungi kami melalui live chat, email, atau Whatsapp.</p>
            </section>
          </main>
        </div>
        
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default AboutPage;
