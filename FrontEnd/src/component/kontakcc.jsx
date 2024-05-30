import React from 'react'
import { handleClick } from '../services/api.service'
import { Icon } from '@iconify/react/dist/iconify.js'

export const Kontakcc = () => {
  return (
    <>
        <div className="seccontact">
          <div className="listcontact" onClick={() => handleClick(11, "Live Chat", "Whatsapp 1")}>
            <Icon icon="fluent-mdl2:chat-solid" style={{ color: "#e59f26" }} />
            <span>live chat</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(1, "Whatsapp 1", "livechat")}>
            <Icon icon="ic:baseline-whatsapp" style={{ color: "#25d366" }} />
            <span>whatsapp 1</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(2, "Whatsapp 2", "Whatsapp 1")}>
            <Icon icon="ic:baseline-whatsapp" style={{ color: "#25d366" }} />
            <span>whatsapp 2</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(3, "Telegram", "livechat")}>
            <Icon icon="mingcute:telegram-fill" style={{ color: "#2AABEE" }} />
            <span>telegram</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(4, "Line", "livechat")}>
            <Icon icon="fa6-brands:line" style={{ color: "#06c655" }} />
            <span>line</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(5, "Facebook", "livechat")}>
            <Icon icon="ri:facebook-fill" style={{ color: "#4267B2" }} />
            <span>facebook</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(6, "Instagram", "livechat")}>
            <Icon icon="skill-icons:instagram" />
            <span>instagram</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(7, "Tiktok", "livechat")}>
            <Icon icon="logos:tiktok-icon" />
            <span>tiktok</span>
          </div>
          <div className="listcontact" onClick={() => handleClick(12, "Keluhan", "livechat")}>
            <Icon icon="material-symbols:feedback" style={{ color: "var(--primary-color)" }} />
            <span>keluhan</span>
          </div>
        </div>
    </>
  )
}
