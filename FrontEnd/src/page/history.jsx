import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Icon } from "@iconify/react";
import { getUsername } from "../services/auth.service";
import { getHistoryDw } from "../services/api.service";
import { renderSkeleton } from "../fragment/Skeleton";
import Livechat from "../component/Livechat";

export const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
  const [username, setUsername] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !username) {
      setUsername(getUsername(token));
    }
  }, []);

  useEffect(() => {
    const access = localStorage.getItem("acme");
    if (username) {
      getHistoryDw(username, access)
        .then((response) => {
          const sortedTransactions = response.data.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
          });
          setTransactionHistory(sortedTransactions.map(transaction => ({
            ...transaction,
            formattedDate: formatDateTime(transaction.updated_at)
          })));
        })
        .catch((error) => {
          console.error("Error fetching history:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [username]);

  useEffect(() => {
    if (transactionHistory.length > 0) {
      updateVisiblePages(currentPage);
    }
  }, [transactionHistory, currentPage, filter, selectedDate]);

  const transactionsPerPage = 20;
  
  const filteredTransactions = transactionHistory.filter(transaction => {
    const matchesFilter = filter === "all" || transaction.status === filter;
    const matchesDate = !selectedDate || transaction.updated_at.startsWith(selectedDate);
    return matchesFilter && matchesDate;
  });

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
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
      1
    );
    const endIndex = Math.min(startIndex + MAX_VISIBLE_PAGES - 1, totalPages);

    setVisiblePages(
      Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i)
    );
  };

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

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  const dataStatus = {
    deposit: "deposit",
    withdraw: "withdraw",
    manual: "manual",
    pemasangan: "pemasangan",
    menang: "menang",
    referral: "referral",
    cashout: "cashout",
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <Lobbynavbar pageTitle="statement" />
      <div className="sechistory">
        <div className="groupsechistory">
          <div className="menuportopolio">
              <div className="listmenuportopolio">
                <label htmlFor="keterangan">Pilih Keterangan</label>
                <select name="keterangan" id="keterangan" onChange={handleFilterChange} value={filter}>
                  <option value="all">Semua Keterangan</option>
                  {Object.values(dataStatus).map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="listmenuportopolio">
                <label htmlFor="tanggal">Pilih Tanggal</label>
                <input type="date" name="tanggal" id="tanggal" onChange={handleDateChange} value={selectedDate} />
              </div>
            </div>
          {isLoading ? renderSkeleton() : null}
          <div className="datasechistory" style={{ display: isLoading ? 'none' : 'block' }}>
            <table>
              <tbody>
                <tr>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Jumlah</th>
                  <th>Saldo</th>
                </tr>
                {!isLoading && currentTransactions.length === 0 && (
                  <tr>
                    <td colSpan="4">Transaksi belum ada</td>
                  </tr>
                )}
                {!isLoading &&
                  currentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.formattedDate}</td>
                      <td>
                        <div className="keterangandana transaksicc" data-value={transaction.status} data-keterangan={transaction.keterangan}>
                          <span>{transaction.status}</span>
                          <span className="ketdana">
                            {transaction.keterangan === "deposit" || transaction.keterangan === "withdraw"
                              ? (transaction.status === "manual" ? `(${transaction.keterangan})` : "")
                              : `(${transaction.keterangan})`}
                          </span>
                        </div>
                      </td>
                      <td>
                          IDR{" "}
                            {parseFloat(
                              transaction.status === "deposit" ? transaction.kredit :
                              transaction.status === "menang" ? transaction.kredit :
                              transaction.status === "referral" ? transaction.kredit :
                              transaction.status === "cashout" ? transaction.kredit :
                              transaction.status === "rollback" || transaction.status === "cancel" ? 
                                (transaction.kredit !== "0.00" ? transaction.kredit : transaction.debit) :
                              transaction.status === "manual" && transaction.keterangan === "deposit" ? transaction.kredit :
                              transaction.debit
                            ).toLocaleString("id-ID", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <span className="nominalakhir" data-value={transaction.balance}>
                          IDR{" "}
                          {parseFloat(transaction.balance).toLocaleString("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="grouppgaination">
              {currentTransactions.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default HistoryPage;
