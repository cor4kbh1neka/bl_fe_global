import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import { MetaTags } from "../component/MetaTags";
import Livechat from "../component/Livechat";
import { getProvide, dataGameslogin } from "../services/api.service";
import { Gamesbar } from "../component/Gamesbar";
import { Logindaftar } from "../fragment/Logindaftar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const GamesHomePage = () => {
    const { games } = useParams();
    const [dataProvide, setDataProvide] = useState(null);
    const [error, setError] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);

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
        const game = dataGameslogin.find(game => game.namagame === games);
        setSelectedGame(game);
    }, [games]);

    const handleMatchClick = () => {
        Swal.fire({
            text: "Silahkan Daftar atau Login!",
            icon: "info",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
    };

    const renderSkeleton = () => {
        return (
          <>
            <div key={index} className="listpopular">
                <div className="loader"></div>
            </div>
          </>
        )
        
      }

    return (
        <div className="container games">
            {selectedGame && (
                <MetaTags
                    customTitle={dataProvide ? `${dataProvide.nmwebsite} | ${selectedGame.title}` : `${selectedGame.title}`}
                    customDescription={dataProvide ? `${dataProvide.nmwebsite} adalah ${selectedGame.description}` : `Situs Kami adalah ${selectedGame.description}`}
                    customKeywords={selectedGame.keyword}
                />
            )}
            <div className="secgameshome">
                <div className="grougameshome">
                    <Logindaftar />
                    <Gamesbar activeGame={games} />
                    {selectedGame && (
                        <div className="groupdataGameslogin">
                            <div className="groupdatabanner">
                                <img className="bannerutamagames" src={selectedGame.gamesimg} alt={`${selectedGame.namagame} games`} />
                                <div className="grouptitlegames">
                                    <h1>{selectedGame.namalabel.toUpperCase()}</h1>
                                    <p>{dataProvide ? `${dataProvide.nmwebsite} adalah penyedia permainan ${selectedGame.namagame} terbaik dengan layanan unggulan untuk penggemar ${selectedGame.namagame}.` : `Situs Kami adalah penyedia permainan ${selectedGame.namagame} terbaik dengan layanan unggulan untuk penggemar ${selectedGame.namagame}.`}</p>
                                </div>
                            </div>
                            <div className="groupdataprovider">
                                {selectedGame.provider.map(provider => (
                                    <div key={provider.id} className="listprovider">
                                        <p className="namaprovider">{provider.nmprovider}</p>
                                        <img src={provider.img} alt={provider.nmprovider} />
                                        {selectedGame.namagame === "slot" ? (
                                            <div className="groubuttongmehome">
                                                <span className="isbt play" onClick={handleMatchClick}>play</span>
                                                <span className="isbt rtp" onClick={handleMatchClick}>RTP SLOT</span>
                                            </div>
                                        ) : (
                                            <span className="isbt play" onClick={handleMatchClick}>play</span>
                                        )}
                                    </div>
                                ))}
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

export default GamesHomePage;
