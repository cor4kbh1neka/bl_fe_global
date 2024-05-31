import React, { useEffect, useState } from 'react';
import { getMeta } from '../services/api.service';
import { LiveChatWidget } from "@livechat/widget-react";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { Icon } from '@iconify/react/dist/iconify.js';

export const Livechat = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [datascrptlvc, setDataScrptlvc] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [widgetId, setWidgetId] = useState('');
  const [bubbleText, setBubbleText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const typingText = "Opps, Livechat sedang gangguan, silahkan hubungi kami melalui WhatsApp atau Telegram!";

  useEffect(() => {
    const fetchMetaData = async () => {
      const metaData = await getMeta();
      if (metaData && metaData.data && metaData.data.scrptlvc) {
        setDataScrptlvc(metaData.data.scrptlvc);

        if (!/^\d+$/.test(metaData.data.scrptlvc)) {
          const [property, widget] = metaData.data.scrptlvc.split('/');
          setPropertyId(property);
          setWidgetId(widget);
        }

        localStorage.setItem('dataMetas', JSON.stringify(metaData.data));
        localStorage.setItem('timeMetas', Date.now().toString());
      } else {
        console.error('scrptlvc not found in response:', metaData);
      }
    };

    const loadMetaData = async () => {
      const storedData = localStorage.getItem('dataMetas');
      const storedTime = localStorage.getItem('timeMetas');

      if (!storedData || !storedTime || Date.now() - parseInt(storedTime) > 1800000) {
        await fetchMetaData();
      } else {
        const data = JSON.parse(storedData);
        setDataScrptlvc(data.scrptlvc);

        if (!/^\d+$/.test(data.scrptlvc)) {
          const [property, widget] = data.scrptlvc.split('/');
          setPropertyId(property);
          setWidgetId(widget);
        }
      }
    };

    loadMetaData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (typingIndex < typingText.length) {
      const timeoutId = setTimeout(() => {
        setBubbleText(prev => prev + typingText[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [typingIndex]);

  if (!datascrptlvc) {
    return <div>Loading...</div>;
  }

  if (windowWidth < 425) {
    return null;
  }

  return (
    <>
      { /^\d+$/.test(datascrptlvc) ? (
        <LiveChatWidget license={datascrptlvc} />
      ) : (
        propertyId && widgetId ? (
          <TawkMessengerReact
            propertyId={propertyId}
            widgetId={widgetId}
          />
        ) : (
          <div className="dummychat">
            <div className="grroupdummy">
              <Icon icon="logos:rocket-chat-icon" />
              <span className="bubbletext">{bubbleText}</span>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Livechat;
