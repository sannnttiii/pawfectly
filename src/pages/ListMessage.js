import React from "react";
import Navbar from "../components/Navbar";
import RowMessage from "../components/RowMessage";

export default function ListMessage() {
  const dataMessages = [
    {
      id: 1,
      profilePic: "../images/dogpic.jpeg",
      lastMessage: "Hey, how are you?",
      lastMessageTime: "12:34 PM",
    },
    {
      id: 2,
      profilePic: "../images/dogpic2.jpeg",
      lastMessage: "Let's catch up later!",
      lastMessageTime: "11:20 AM",
    },
  ];
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-full pt-0 bg-inherit shadow-md rounded-lg overflow-hidden">
        {dataMessages.map((room) => (
          <RowMessage
            key={room.id}
            profilePic={room.profilePic}
            lastMessage={room.lastMessage}
            lastMessageTime={room.lastMessageTime}
          />
        ))}
      </div>
    </div>
  );
}
