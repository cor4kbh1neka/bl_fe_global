import React, { useEffect, useState } from 'react';
import { getMeta } from '../services/api.service';

export const MetaTags = ({ customTitle, customDescription, customKeywords }) => {
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

  useEffect(() => {
    if (metaData && metaData.mttag) {
      const oldMetaTags = document.querySelectorAll('meta[data-dynamic-meta], title[data-dynamic-title], link[data-dynamic-link]');
      oldMetaTags.forEach(tag => tag.remove());

      const metaContainer = document.createElement('div');
      metaContainer.innerHTML = metaData.mttag;

      Array.from(metaContainer.children).forEach(child => {
        if (child.tagName.toLowerCase() === 'meta') {
          const existingTag = document.querySelector(`meta[name="${child.getAttribute('name')}"]`);
          if (existingTag) {
            existingTag.remove();
          }
          if (child.getAttribute('name') === 'description' && customDescription) {
            child.setAttribute('content', customDescription);
          } else if (child.getAttribute('name') === 'keywords' && customKeywords) {
            child.setAttribute('content', customKeywords);
          }
          if (child.getAttribute('name') !== 'google-site-verification') {
            child.setAttribute('data-dynamic-meta', 'true');
          }
          document.head.appendChild(child);
        } else if (child.tagName.toLowerCase() === 'title') {
          const existingTitle = document.querySelector('title[data-dynamic-title]');
          if (existingTitle) {
            existingTitle.remove();
          }
          const titleTag = document.createElement('title');
          titleTag.setAttribute('data-dynamic-title', 'true');
          titleTag.textContent = customTitle || child.textContent;
          document.head.appendChild(titleTag);
        } else if (child.tagName.toLowerCase() === 'link' && child.getAttribute('rel') === 'canonical') {
          const existingLink = document.querySelector('link[rel="canonical"]');
          if (existingLink) {
            existingLink.remove();
          }
          child.setAttribute('data-dynamic-link', 'true');
          const currentUrl = window.location.href;
          const url = new URL(currentUrl);
          if (url.pathname !== '/') {
            child.setAttribute('href', currentUrl);
          }
          document.head.appendChild(child);
        }
      });
    }
  }, [metaData, customTitle, customDescription, customKeywords]);

  return null;
};