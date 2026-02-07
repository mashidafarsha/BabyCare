import React, { useEffect, useState, useRef } from "react";
import Welcome from "./welcome";
import { BaseUrl } from "../../constants/constants";
import { getPlanChatUser, addDoctorMessage, getMessages } from "../../sevices/doctorApi";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { Send, Search, User, MoreVertical, CheckCheck } from "lucide-react";
import moment from "moment";

function DoctorChat() {
  const socket = useRef();
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [planUser, setPlanUser] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [msg, setMsg] = useState("");
  
  let { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    getChatUser();
    setCurrentDoctor(doctor);
  }, [doctor]);

  useEffect(() => {
    if (currentDoctor) {
      socket.current = io(BaseUrl);
      socket.current.emit("add-user", doctor._id);
    }
  }, [currentDoctor]);

  useEffect(() => {
    if (currentChat) {
      getAllMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getChatUser = async () => {
    let { data } = await getPlanChatUser();
    if (data.success) {
      setPlanUser(data.UserDetails);
    }
  };

  const changeCurrentChat = (chat, index) => {
    setCurrentSelected(index);
    setCurrentChat(chat);
  };

  const sendChat = async (event) => {
    event.preventDefault();
    if (msg.trim().length > 0) {
      await addDoctorMessage({
        from: currentDoctor._id,
        to: currentChat?._id,
        message: msg,
      });

      socket.current.emit("send-message", {
        to: currentChat?._id,
        from: currentDoctor?._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
      setMsg("");
    }
  };

  const getAllMessages = async () => {
    let { data } = await getMessages({
      from: currentDoctor._id,
      to: currentChat?._id,
    });
    if (data) {
      setMessages(data);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar: Patient List */}
      <div className="w-80 md:w-96 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-50 bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic mb-5">
            Consultations
          </h2>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-4 focus:ring-blue-600/5 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-3 space-y-2">
          {planUser && planUser.map((user, index) => {
            const isSelected = currentSelected === index;
            return (
              <div
                key={index}
                onClick={() => changeCurrentChat(user, index)}
                className={`flex items-center gap-4 p-4 rounded-[1.5rem] cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? "bg-slate-900 shadow-xl shadow-slate-200 text-white translate-x-1" 
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="relative">
                  <img
                    src={user.image ? `${BaseUrl}/${user.image}` : ""}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                    alt={user.name}
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-bold text-sm truncate uppercase tracking-tight">{user.name}</h4>
                  </div>
                  <p className={`text-[10px] font-medium uppercase tracking-widest truncate opacity-60`}>
                    Patient ID: #{user._id.slice(-5)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col relative bg-[#F8FAFC]">
        {currentChat ? (
          <>
            {/* Active Header */}
            <div className="bg-white/80 backdrop-blur-md p-4 px-8 border-b border-slate-100 flex items-center justify-between shadow-sm sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.1em]">{currentChat.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Active Consultation</span>
                  </div>
                </div>
              </div>
              <button className="text-slate-300 hover:text-slate-600 transition-colors bg-slate-50 p-2 rounded-xl">
                <MoreVertical size={20}/>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 md:px-12 space-y-6">
              {messages.map((message, index) => (
                <div 
                  key={uuidv4()} 
                  ref={scrollRef} 
                  className={`flex items-end gap-3 ${message?.fromSelf ? "justify-end" : "justify-start"}`}
                >
                  {!message?.fromSelf && (
                    <img src={`${BaseUrl}/${currentChat.image}`} className="w-8 h-8 rounded-lg object-cover mb-1 shadow-sm" alt="" />
                  )}
                  <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${message?.fromSelf ? "items-end" : "items-start"}`}>
                    <div className={`p-4 text-sm font-semibold shadow-sm transition-all duration-300 ${
                      message?.fromSelf 
                        ? "bg-blue-600 text-white rounded-2xl rounded-tr-none shadow-blue-100" 
                        : "bg-white text-slate-700 rounded-2xl rounded-tl-none border border-slate-100"
                    }`}>
                      {message?.message}
                    </div>
                    
                    <div className="flex items-center gap-1.5 mt-1.5 px-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                        {message?.createdAt ? moment(message.createdAt).format("hh:mm A") : "Just now"}
                      </span>
                      {message?.fromSelf && <CheckCheck size={12} className="text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-6 bg-white border-t border-slate-100">
              <form 
                onSubmit={sendChat} 
                className="max-w-4xl mx-auto flex items-center gap-3 bg-slate-50 p-2 rounded-[2rem] border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all"
              >
                <input
                  type="text"
                  placeholder="Type clinical advice or message..."
                  className="flex-grow bg-transparent border-none px-6 py-3 text-sm focus:ring-0 outline-none text-slate-700 placeholder:text-slate-400 font-medium"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!msg.trim()}
                  className="bg-blue-600 text-white p-4 rounded-full hover:bg-slate-900 transition-all shadow-lg shadow-blue-200 active:scale-90 disabled:opacity-30 disabled:scale-100"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center p-12">
            <Welcome />
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorChat;