import React, { useEffect, useRef, useState } from "react";
import { BaseUrl } from "../../constants/constants";
import MessageSender from "./MessageSender";
import { v4 as uuidv4 } from "uuid";
import { addUserMessage, getMessages } from "../../sevices/userApi";
import moment from "moment"; 
import { Video } from "lucide-react";
import SOSButton from "../SOSButton";

function ChatContainer({ currentChat, currentUser, socket, onVideoCall, sosProps }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg, createdAt: new Date().toISOString() });
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
      const now = new Date().toISOString();
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

      setMessages((prev) => [...prev, { fromSelf: true, message: msg, createdAt: now }]);
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


  let lastDate = null;

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">

      {/* Doctor info banner with SOS button */}
      {currentChat && (
        <div className="flex items-center gap-3 px-6 py-3 bg-white border-b border-slate-100">
          {/* Profile + Name */}
          <div className="relative flex-shrink-0">
            <img
              src={`${BaseUrl}/${currentChat.image}`}
              alt={currentChat.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-grow">
            <p className="text-sm font-bold text-slate-800">Dr. {currentChat.name}</p>
            <p className="text-[10px] text-green-600 font-semibold">Online · {currentChat.department}</p>
          </div>
          {/* SOS Button — right side of banner */}
          {sosProps && (
            <SOSButton
              socket={sosProps.socket}
              doctorId={sosProps.doctorId}
              bookingId={sosProps.bookingId}
              userName={sosProps.userName}
              userId={sosProps.userId}
            />
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide flex flex-col">
        <div className="flex-grow" />
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => {
           
            const msgDate = message.createdAt ? new Date(message.createdAt) : new Date();
            const currentDate = moment(msgDate).format("DD/MM/YYYY");
            const showDateSeparator = currentDate !== lastDate;
            lastDate = currentDate;

          
            const dateLabel = moment(msgDate).calendar(null, {
              sameDay: '[Today]',
              lastDay: '[Yesterday]',
              lastWeek: 'DD/MM/YYYY',
              sameElse: 'DD/MM/YYYY'
            });

            return (
              <React.Fragment key={uuidv4()}>
           
                {showDateSeparator && (
                  <div className="flex justify-center my-4">
                    <span className="bg-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {dateLabel}
                    </span>
                  </div>
                )}

                <div className={`flex items-end gap-2 ${message.fromSelf ? "justify-end" : "justify-start"}`}>
                  {/* Doctor avatar for received messages */}
                  {!message.fromSelf && currentChat && (
                    <div className="relative flex-shrink-0 mb-1">
                      <img
                        src={`${BaseUrl}/${currentChat.image}`}
                        alt={currentChat.name}
                        className="w-8 h-8 rounded-xl object-cover border border-slate-100 shadow-sm"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

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
                      className={`text-[9px] block mt-1 opacity-40 font-bold tracking-tight ${
                        message.fromSelf ? "text-right" : "text-left"
                      }`}
                    >
                      {message.createdAt ? moment(new Date(message.createdAt)).format("hh:mm A") : "Just Now"}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div ref={scrollRef} />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0">
        <MessageSender handleSendMessage={handleSendMessage} onVideoCall={onVideoCall} />
      </div>
    </div>
  );
}

export default ChatContainer;