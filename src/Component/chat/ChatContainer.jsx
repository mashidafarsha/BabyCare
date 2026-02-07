import React, { useEffect, useRef, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import MessageSender from "./MessageSender";
import { v4 as uuidv4 } from "uuid";
import { addUserMessage, getMessages } from "../../sevices/userApi";

function ChatContainer({ currentChat, currentUser, socket }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  
  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  
  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (msg) => {
    try {
      await addUserMessage({
        from: currentUser._id,
        to: currentChat?._id,
        message: msg,
      });

      socket.current.emit("send-message", {
        to: currentChat?._id,
        from: currentUser?._id,
        message: msg,
      });

      setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getAllMessages = async () => {
    let { data } = await getMessages({
      from: currentUser._id,
      to: currentChat?._id,
    });
    if (data) setMessages(data);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
   
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide flex flex-col">
      
        <div className="flex-grow" /> 
        
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={uuidv4()}
              className={`flex ${message.fromSelf ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] md:max-w-[60%] px-4 py-2.5 shadow-sm transition-all ${
                  message.fromSelf
                    ? "bg-slate-900 text-white rounded-2xl rounded-tr-none shadow-blue-100"
                    : "bg-white text-slate-800 rounded-2xl rounded-tl-none border border-slate-100 shadow-slate-100"
                }`}
              >
                <p className="text-[14px] leading-relaxed break-words">
                  {message.message}
                </p>
                <span
                  className={`text-[9px] block mt-1 opacity-40 font-black tracking-tighter uppercase ${
                    message.fromSelf ? "text-right" : "text-left"
                  }`}
                >
                  {message.createdAt ? message.createdAt.split(",")[1] : "Just Now"}
                </span>
              </div>
            </div>
          ))}
        
          <div ref={scrollRef} />
        </div>
      </div>

    
      <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0">
        <MessageSender handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatContainer;