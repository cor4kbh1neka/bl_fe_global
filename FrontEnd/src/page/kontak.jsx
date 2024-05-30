import React, { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { Icon } from "@iconify/react";
import { getMediaSosial } from "../services/api.service";
import Livechat from "../component/Livechat";

export const KontakPage = () => {
  const [mediaSosialData, setMediaSosialData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMediaSosial();
      setMediaSosialData(response.data);
    };

    fetchData();
  }, []);

  const getContactData = (id) => {
    const contact = mediaSosialData.find(item => item.idctscmed === id);
    return contact ? contact.trgturctscmed : "";
  };

  const contacts = [
    {
      label: "Hubungi kami melalui livechat",
      icon: "simple-icons:livechat",
      className: "lc",
      isUrl: true,
      data: getContactData(11),
      status: mediaSosialData.find(item => item.idctscmed === 11)?.statusctscmed,
    },
    {
      label: "Hubungi kami melalui Whatsapp 1",
      icon: "ic:baseline-whatsapp",
      className: "wa",
      isUrl: true,
      data: getContactData(1),
      status: mediaSosialData.find(item => item.idctscmed === 1)?.statusctscmed,
    },
    {
      label: "Hubungi kami melalui Whatsapp 2",
      icon: "ic:baseline-whatsapp",
      className: "wa",
      isUrl: true,
      data: getContactData(2),
      status: mediaSosialData.find(item => item.idctscmed === 2)?.statusctscmed,
    },
    {
      label: "Hubungi kami melalui Telegram",
      icon: "arcticons:telegram",
      className: "tl",
      isUrl: true,
      data: getContactData(3),
      status: mediaSosialData.find(item => item.idctscmed === 3)?.statusctscmed,
    },
    {
      label: "Hubungi kami melalui Line",
      icon: "fa6-brands:line",
      className: "ln",
      isUrl: true,
      data: getContactData(4),
      status: mediaSosialData.find(item => item.idctscmed === 4)?.statusctscmed,
    },
    {
      label: "Hubungi kami melalui Email",
      icon: "arcticons:mail",
      className: "em",
      isUrl: false,
      data: getContactData(10),
      status: mediaSosialData.find(item => item.idctscmed === 10)?.statusctscmed,
    },
    {
      label: "Hubungi kami melalui Skype",
      icon: "uit:skype-alt",
      className: "sk",
      isUrl: true,
      data: getContactData(9),
      status: mediaSosialData.find(item => item.idctscmed === 9)?.statusctscmed,
    },
  ];

  return (
    <div className="container">
      <Lobbynavbar pageTitle="kontak" />
      <div className="seckontak">
        <div className="groupkontak">
          {contacts
            .filter(contact => contact.status === "1")
            .map((contact, index) => (
              <a 
                href={contact.isUrl ? contact.data : `mailto:${contact.data}`}
                className="listkontakcc" 
                key={index}
              >
                <span className={`labelkontak ${contact.className}`}>
                  {contact.label}
                </span>
                <div className="groupdatakontakcc">
                  <Icon
                    icon={contact.icon}
                    className={`iconkontakcc ${contact.className}`}
                  />
                  <span className="datakontakcc">{contact.data}</span>
                  <Icon
                    icon="mingcute:right-fill"
                    className="arrowkanankontakcc"
                  />
                </div>
              </a>
            ))}
        </div>
      </div>
      <Footer />
      <Livechat />
    </div>
  );
};

export default KontakPage;
