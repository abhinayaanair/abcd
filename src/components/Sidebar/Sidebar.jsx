import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className="sidebar">
      <div className="top">
        <FontAwesomeIcon
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          icon={faBars}
        />
        <div className="new-chat">
          <img src={assets.dashboard_icon} alt="" />
          {extended ? <p>Dashboard</p> : null}
        </div>
        {/* {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>What is react...</p>
            </div>
          </div>
        ) : null} */}
      </div>
      <div className="bottom">
      
        <div className="bottom-item recent-entry">
          <img className="bottom-img profile"  src={assets.profile_icon} alt="" />
          {extended ? <p>Profile</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img className="bottom-img"  src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
