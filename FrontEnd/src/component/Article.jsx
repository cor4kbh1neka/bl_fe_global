import React, { useEffect, useState } from "react";
import { getMeta } from "../services/api.service";

const Article = () => {
  const [expanded, setExpanded] = useState(false);
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMeta();
      setMetaData(data.data);
    };

    fetchData();
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
