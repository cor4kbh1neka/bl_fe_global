import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Icon } from "@iconify/react";
import { getReferral, getUsername } from "../services/auth.service";
import Swal from "sweetalert2";
import { renderSkeleton } from "../fragment/Skeleton";
import Livechat from "../component/Livechat";

export const ReferralPage = () => {
  const [username, setUsername] = useState("");
  const [referralCurrentPage, setReferralCurrentPage] = useState(1);
  const [referralVisiblePages, setReferralVisiblePages] = useState([]);
  const [totalKomisiAmount, setTotalKomisiAmount] = useState("");
  const [referralData, setReferralData] = useState({ dataReferral: [], dataKomisi: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const access = localStorage.getItem("acme");
    if (token) {
      const username = getUsername(token);
      setUsername(username);
      getReferral(username, access)
        .then((response) => {
          setReferralData(response || { dataReferral: [], dataKomisi: [] });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching referral data:", error);
          setLoading(false);
        });
    } else {
      window.location.href = "/";
    }
  }, []);

  const currentURL = `${window.location.origin}/register/${username}`;

  const referralTransactionsPerPage = 10;
  const referralTotalPages = Math.ceil(
    (referralData.dataReferral?.length || 0) / referralTransactionsPerPage
  );

  useEffect(() => {
    if (referralTotalPages > 0) {
      updateVisibleReferralPages(referralCurrentPage);
    }
  }, [referralData]);

  const renderReferralPaginationNumbers = () => {
    return referralVisiblePages.map((pageNumber) => (
      <span
        key={pageNumber}
        className={`numberpage ${pageNumber === referralCurrentPage ? "active" : ""}`}
        onClick={() => paginateReferral(pageNumber)}
      >
        {pageNumber}
      </span>
    ));
  };

  const paginateReferral = (pageNumber) => {
    setReferralCurrentPage(pageNumber);
    updateVisibleReferralPages(pageNumber);
  };

  const updateVisibleReferralPages = (pageNumber) => {
    const MAX_VISIBLE_PAGES = 5;

    if (referralTotalPages <= MAX_VISIBLE_PAGES) {
      setReferralVisiblePages(
        Array.from({ length: referralTotalPages }, (_, i) => i + 1)
      );
      return;
    }

    const startIndex = Math.max(
      Math.min(pageNumber - 1, referralTotalPages - MAX_VISIBLE_PAGES + 1),
      1
    );
    const endIndex = Math.min(
      startIndex + MAX_VISIBLE_PAGES - 1,
      referralTotalPages
    );

    setReferralVisiblePages(
      Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i)
    );
  };

  useEffect(() => {
    updateVisibleReferralPages(referralCurrentPage);
  }, [referralCurrentPage]);

  const referralStartIndex =
    (referralCurrentPage - 1) * referralTransactionsPerPage;
  const referralEndIndex = referralStartIndex + referralTransactionsPerPage;
  const currentReferralTransactions = referralData.dataReferral.slice(
    referralStartIndex,
    referralEndIndex
  );

  const handleCopyLink = () => {
    const copyText = document.querySelector(".urllinkreff");
    const textToCopy = copyText.getAttribute("data-copy");

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Link Referral di Copy",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  useEffect(() => {
    const totalKomisi = referralData.totalKomisi;
    const totalAmount = totalKomisi * 1000;
    const formattedTotalAmount = totalAmount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      currencyDisplay: "narrowSymbol",
    });
    const formattedTotalAmountWithoutDecimal = formattedTotalAmount.replace(
      /,\d{2}$/,
      ""
    );
    setTotalKomisiAmount(formattedTotalAmountWithoutDecimal);
  }, [referralData.dataReferral]);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  return (
    <div className="container">
      <Lobbynavbar pageTitle="referral" />
      <div className="sechistory">
        <div className="groupsechistory">
          <div className="groupheadreffcc">
            <div className="groupheadreff">
              <span className="titleheadreff">Bagikan Link Kamu</span>
              <div className="groupsharelink">
                <div className="linkrefferal">
                  <span className="urllinkreff" data-copy={currentURL}>
                    {currentURL}
                  </span>
                  <Icon
                    icon="ion:copy-outline"
                    style={{ color: "#07A6FF" }}
                    className="copyreff"
                    onClick={handleCopyLink}
                  />
                </div>
                <Icon
                  icon="material-symbols:share"
                  className="shareme"
                  style={{ color: "#07A6FF" }}
                />
              </div>
            </div>
          </div>
          <div className="groupdatarefferal">
            <div className="listdatarefferal reff">
              <span className="titledatarefferal">Referral Kamu</span>
              <div className="listccreff">
                <Icon icon="ci:users-group" className="iconreff reffcc" />
                <span className="countdatareff">{referralData.totalReferral}</span>
              </div>
            </div>
            <div className="listdatarefferal komisi">
              <span className="titledatarefferal">Komisi Kamu</span>
              <div className="listccreff">
                <span className="iconreff rupiahcc">IDR</span>
                <span className="countdatareff">
                  {referralData.totalKomisi}
                </span>
              </div>
            </div>
            <div></div>
            <span className="samadengan">Sama dengan {totalKomisiAmount}</span>
          </div>
          <div className="datasechistory">
            {loading ? (
              renderSkeleton()
            ) : currentReferralTransactions.length === 0 ? (
              <span className="referralkosong">Anda belum mendapatkan bonus referral saat ini. Bagikan link referral kamu di media sosial.</span>
            ) : (
              <>
                <span className="titletable">Data Referral Anda</span>
                <table>
                  <tbody>
                    <tr>
                      <th width="10">No.</th>
                      <th>Username</th>
                      <th>Tanggal Daftar</th>
                      <th>Total Komisi (IDR)</th>
                    </tr>

                    {currentReferralTransactions.map((referral, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{referral.downline}</td>
                        <td>{formatDateTime(referral.created_at)}</td>
                        <td>{referral.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="grouppgaination">
                  <div className="grouppgainationcc">
                    <Icon
                      icon="teenyicons:left-solid"
                      className={`pag left ${referralCurrentPage === 1 ? "disabled" : ""}`}
                      onClick={() => {
                        const newPage = Math.max(referralCurrentPage - 1, 1);
                        setReferralCurrentPage(newPage);
                        updateVisibleReferralPages(newPage);
                      }}
                    />
                    <Icon
                      icon="teenyicons:right-solid"
                      className={`pag right ${referralCurrentPage === referralTotalPages ? "disabled" : ""}`}
                      onClick={() => {
                        const newPage = Math.min(
                          referralCurrentPage + 1,
                          referralTotalPages
                        );
                        setReferralCurrentPage(newPage);
                        updateVisibleReferralPages(newPage);
                      }}
                    />
                    {renderReferralPaginationNumbers()}
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

export default ReferralPage;