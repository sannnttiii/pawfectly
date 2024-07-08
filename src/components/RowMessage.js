import React from "react";
import { Link } from "react-router-dom";

function RowMessage({ profilePic, lastMessage, lastMessageTime }) {
  return (
    <Link to={"/message"}>
      <div className="flex items-center p-4 border-b">
        <img
          src={profilePic}
          alt="Profile"
          className="w-14 h-14 rounded-full mr-4"
        />
        <div className="flex-grow">
          <p className="text-m text-gray-800">{lastMessage}</p>
          <p className="text-xs text-gray-500">{lastMessageTime}</p>
        </div>
      </div>
    </Link>
  );
}

export default RowMessage;
