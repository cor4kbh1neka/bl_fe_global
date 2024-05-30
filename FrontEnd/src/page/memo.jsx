import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Icon } from "@iconify/react";
import { getMemo } from "../services/api.service";
import { renderSkeleton } from "../fragment/Skeleton";
import { useNavigate } from "react-router-dom";
import Livechat from "../component/Livechat";

export const MemoPage = () => {
  const [xMemo, setxMemo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const fetchData = async () => {
        const isVerified = localStorage.getItem("dataVerified");
        const memostatus = isVerified === "true" ? "/1" : "";
        try {
          const memoData = await getMemo(memostatus);
          if (memoData && memoData.data) {
            const memoWithReadColumn = memoData.data.map(memo => ({ ...memo, read: "false" }));
            const storedMemo = localStorage.getItem("sumMemo");
            if (storedMemo) {
              const parsedStoredMemo = JSON.parse(storedMemo);
              const newMemoData = memoWithReadColumn.filter(memo => !parsedStoredMemo.some(storedMemo => storedMemo.idmemo === memo.idmemo));
              const updatedMemoData = [...parsedStoredMemo, ...newMemoData];
              updatedMemoData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
              localStorage.setItem("sumMemo", JSON.stringify(updatedMemoData));
              setxMemo(updatedMemoData);
            } else {
              localStorage.setItem("sumMemo", JSON.stringify(memoWithReadColumn));
              setxMemo(memoWithReadColumn);
            }
          } else {
            console.error("Failed to fetch data from API: Data property not found");
          }
        } catch (error) {
          console.error("Failed to fetch data from API", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }
  }, [isLoading]);  
  

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [currentPage, xMemo]);
  

  const transactionsPerPage = 20;
  const totalPages = Math.ceil(xMemo.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentMemo = xMemo.slice(
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
  }, []);

  const handleMemoClick = (memoId) => {
    const updatedMemo = xMemo.map(memo => {
      if (memo.idmemo === memoId) {
        return { ...memo, read: "true" };
      }
      return memo;
    });

    localStorage.setItem("sumMemo", JSON.stringify(updatedMemo));
    setxMemo(updatedMemo);
    navigate(`/pesan/${memoId}`); // Navigate to memo page without refreshing
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
      <Lobbynavbar pageTitle="memo" />
      <div className="sechistory">
        <div className="groupsechistory">
          {isLoading ? renderSkeleton() : (
            <div className="datasechistory">
              {xMemo.length === 0 ? (
                <div>Belum ada pesan apapun</div>
              ) : (
                <>
                  <table>
                    <tbody>
                      <tr className="hover">
                        <th className="bgnos">#</th>
                        <th className="bgtanggal">tanggal</th>
                        <th>subject</th>
                      </tr>
                      {currentMemo.map((memo, index) => (
                        <tr
                          key={index}
                          className={`hovered ${memo.read === "false" ? "unread" : ""}`}
                          onClick={() => handleMemoClick(memo.idmemo)}
                        >
                          <td>{index + 1}</td>
                          <td>{formatOrderTime(memo.created_at)}</td>
                          <td>
                            <div className="bodysubject">
                              <span className="subjectmemo">{memo.subject}</span>
                            </div>
                          </td>
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
          )}
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default MemoPage;
