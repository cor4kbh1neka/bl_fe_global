import React, { useEffect, useState } from 'react';
import { getMeta } from '../services/api.service';
import { LiveChatWidget } from "@livechat/widget-react";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

export const Livechat = () => {
  const [datascrptlvc, setDataScrptlvc] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [widgetId, setWidgetId] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      } else {
        console.error('scrptlvc not found in response:', metaData);
      }
    };

    fetchMetaData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <TawkMessengerReact
          propertyId={propertyId}
          widgetId={widgetId}
        />
      )}
    </>
  );
};

export default Livechat;
