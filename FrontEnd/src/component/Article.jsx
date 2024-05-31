import React, { useEffect, useState } from "react";
import { getMeta } from "../services/api.service";

const Article = () => {
  const [expanded, setExpanded] = useState(false);
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMeta();
      setMetaData(data.data);
      localStorage.setItem('dataMetas', JSON.stringify(data.data));
      localStorage.setItem('timeMetas', Date.now().toString());
    };

    const loadData = async () => {
      const storedData = localStorage.getItem('dataMetas');
      const storedTime = localStorage.getItem('timeMetas');
      if (!storedData || !storedTime || Date.now() - parseInt(storedTime) > 1800000) {
        await fetchData();
      } else {
        setMetaData(JSON.parse(storedData));
      }
    };

    loadData();
  }, []);

  const handleShowArticleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="secartikel">
      {metaData ? (
        <>
          <article
            className={expanded ? "expanded" : ""}
            dangerouslySetInnerHTML={{ __html: metaData.artcl }}
          />
          <div className="shadowshow">
            <span className="showartikel" onClick={handleShowArticleClick}>
              {expanded ? "Tutup" : "Selengkapnya"}
            </span>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Article;
