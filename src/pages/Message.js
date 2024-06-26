import React from "react";
import NavMessage from "../components/NavMessage";
import BubbleMessage from "../components/BubbleMessage";
import NavMessageBottom from "../components/NavMessageBottom";

const messages = [
  { message: "Hello! ", isOwn: false },
  {
    message:
      "Hi there! just found out that maybe our dog can be friends. I'm based on Surabaya, can we meet?  ",
    isOwn: true,
  },
  { message: "Sounds great!", isOwn: false },
];
function Message() {
  return (
    <div>
      <NavMessage />
      <div className="flex-grow overflow-y-auto px-4 pt-20 pb-20">
        {messages.map((message, index) => (
          <BubbleMessage
            key={index}
            message={message.message}
            isOwn={message.isOwn}
          />
        ))}
      </div>
      <NavMessageBottom />
    </div>
  );
}

export default Message;
