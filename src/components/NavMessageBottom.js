import React from "react";
import { Link } from "react-router-dom";

export default function NavMessageBottom() {
  const [message, setMessage] = React.useState(""); // State for message text

  const handleSendMessage = (e) => {
    e.preventDefault();
    // logic send msg to BubbleMessage
    setMessage(""); // clear after send
  };

  return (
    <div>
      <nav className="fixed bottom-0 flex w-full h-20 flex-wrap items-center justify-between py-2 shadow-md bg-gray-100 lg:py-4">
        <form onSubmit={handleSendMessage} className="flex w-full px-4 ">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-grow rounded-lg px-4 py-2  text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 mr-2"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-orange-400 text-white hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-yellow-600"
          >
            Send
          </button>
        </form>
      </nav>
    </div>
  );
}
