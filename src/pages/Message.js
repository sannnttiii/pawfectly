import React, { useEffect, useState } from "react";
import NavMessage from "../components/NavMessage";
import BubbleMessage from "../components/BubbleMessage";
import NavMessageBottom from "../components/NavMessageBottom";
import { useLocation } from "react-router-dom";

// const messages = [
//   { message: "Hello! ", isOwn: false },
//   {
//     message:
//       "Hi there! just found out that maybe our dog can be friends. I'm based on Surabaya, can we meet?  ",
//     isOwn: true,
//   },
//   { message: "Sounds great!", isOwn: false },
// ];
function Message() {
  const [messages, setMessages] = useState([]);
  const idLogin = parseInt(localStorage.getItem("userID"));
  const location = useLocation();
  const { idUserChoosen, matchesId } = location.state || {};

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8082/api/messages?matchesId=${matchesId}`
        );
        const data = await response.json();
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [matchesId]);

  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]); // Update messages state with new message
  };

  return (
    <div>
      <NavMessage />
      <div className="flex-grow overflow-y-auto px-4 pt-20 pb-20">
        {messages.map((message, index) => (
          <BubbleMessage
            key={index}
            message={message.message}
            isOwn={message.senderId === idLogin}
          />
        ))}
      </div>
      <NavMessageBottom onNewMessage={handleNewMessage} />
    </div>
  );
}

export default Message;
