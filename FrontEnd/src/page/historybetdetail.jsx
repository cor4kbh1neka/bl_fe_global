import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Link, useParams } from "react-router-dom";
import { getDetailbet } from "../services/api.service";
import { Icon } from "@iconify/react/dist/iconify.js";

export const HistorybetdetailPage = () => {
  const { invoice, portopolio } = useParams();
  const [detailBet, setDetailBet] = useState(null);
  
  useEffect(() => {
    const access = localStorage.getItem("acme");
    const fetchData = async () => {
      const response = await getDetailbet(invoice, portopolio, access);
      setDetailBet(response.result[0]);
    };

    fetchData();
  }, [invoice, portopolio]);

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
      <Lobbynavbar pageTitle="detail bet" />
      <div className="sechistorybetdetail">
        <div className="secdetailbet">
            <div className="groupdetailhistorygameds">
                <div className="headdetailhistorygameds">
                    <Link to="/historybet" className="backhandler listnavigasi parlay">
                      <Icon icon="icon-park-outline:back" />
                      <span>Kembali</span>
                    </Link>
                    <div className="listheaddetail">
                        <span className="label">Nomor Invoice</span>
                        <span className="gap">:</span>
                        <span className="value refNo">{detailBet?.refNo}</span>
                    </div>
                    <div className="listheaddetail">
                        <span className="label">Username</span>
                        <span className="gap">:</span>
                        <span className="value username">{detailBet?.username}</span>
                    </div>
                    <div className="listheaddetail">
                        <span className="label">Date/Time Bet</span>
                        <span className="gap">:</span>
                        <span className="value orderTime">{detailBet ? formatOrderTime(detailBet.orderTime) : ""}</span>
                    </div>
                    <div className="listheaddetail">
                        <span className="label">Game Type</span>
                        <span className="gap">:</span>
                        <span className="value sportsType">{portopolio === 'Games' ? detailBet?.productType : portopolio === 'VirtualSports' ? detailBet?.productType : portopolio === 'SeamlessGame' ? detailBet?.gameType : detailBet?.sportsType}</span>
                    </div>
                    <div className="listheaddetail">
                        <span className="label">{portopolio === 'Games' ? 'Game ID' : 'Odds Type'}</span>
                        <span className="gap">:</span>
                        <span className="value oddsStyle">{portopolio === 'Games' ? detailBet?.gameId : detailBet?.oddsStyle}</span>
                    </div>
                    <div className="listheaddetail">
                        <span className="label">{portopolio === 'Games' ? 'Game Name' : 'Odds Bet'}</span>
                        <span className="gap">:</span>
                        <span className="value odds" data-value={detailBet?.odds}>{portopolio === 'Games' ? detailBet?.gameName : detailBet?.odds}</span>
                    </div>
                    <div className="listheaddetail">
                        <span className="label">Nominal Bet(IDR)</span>
                        <span className="gap">:</span>
                        <span className="valuenominal stake" data-stake={detailBet?.stake}>{detailBet?.stake}</span>
                    </div>
                    <div className="listheaddetail">
                        <span className="label">Win/Lose(IDR)</span>
                        <span className="gap">:</span>
                        <div className="grouphasilpertandingan" data-status={detailBet?.status}>
                            <span className="valuenominal winLost" data-winlost={detailBet?.winLost === 0 ? '' : detailBet?.winLost}>{detailBet?.winLost === 0 ? '' : detailBet?.winLost}</span>
                            <span className="statusgame status" data-status={detailBet?.status}>{detailBet?.status}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table_detailhistorygameds">
                <table>
                    <tbody>
                    {detailBet?.subBet && detailBet.subBet.map((item, index) => (
                        <tr key={index}>
                            <td className="bagnomor">{index + 1}</td>
                            <td>
                                <div className="groupdetailmatch">
                                    <span className="namaliga subBet-league">{item.league}</span>
                                    <span className="pertandingan subBet-match">{item.match}</span>
                                    <div className="allscore">
                                        <div className="listscore">
                                            <span className="labelscore">HT</span>
                                            <span className="valuescore subBet-htScore">{item.htScore}</span>
                                        </div>
                                        <div className="listscore">
                                            <span className="labelscore">FT</span>
                                            <span className="valuescore subBet-ftScore">{item.ftScore}</span>
                                        </div>
                                    </div>
                                    <span className="detailbetting">detail bet : <span className={`htft ${item.isHalfWonLose ? 'isHalfWonLose' : ''}`}>{item.isHalfWonLose ? 'HALF TIME' : 'FULL TIME'}</span></span>
                                    <div className="listdetailbettting">
                                        <div className="dddetailbetting">
                                            <span className="labelbet">type :</span>
                                            <span className="valuebet subBet-marketType_sportType">{item.marketType} ({portopolio === 'VirtualSports' ? detailBet?.productType : detailBet?.sportsType})</span>
                                        </div>
                                        <div className="dddetailbetting">
                                            <span className="labelbet">odds :</span>
                                            <span className="valuebet subBet-odds" data-valueodds={item.odds}>{item.odds}</span>
                                        </div>
                                    </div>
                                    <div className="listdetailbettting">
                                        <div className="dddetailbetting">
                                            <span className="labelbet">pilihan :</span>
                                            <span className="valuebet subBet-betOption">{item.betOption} <span className="subBet-hdp" data-hdp={item.hdp}>({item.hdp})</span></span>
                                        </div>
                                        <div className="dddetailbetting">
                                            <span className="labelbet">status :</span>
                                            <span className="valuebet subBet status" data-statusbet={item.status}>{item.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistorybetdetailPage;
