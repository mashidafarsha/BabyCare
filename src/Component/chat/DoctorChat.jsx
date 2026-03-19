import React, { useEffect, useState, useRef } from "react";
import Welcome from "./welcome";
import GeneratePrescription from "../doctor/GeneratePrescription";
import VideoCall from "./VideoCall";
import { BaseUrl } from "../../constants/constants";
import { getPlanChatUser, addDoctorMessage, getMessages } from "../../sevices/doctorApi";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { Send, Search, User, MoreVertical, CheckCheck, Video, PhoneIncoming, X, Calendar, Clock, Phone, AlertCircle, Siren, Hash, Activity, MessageSquare, ShieldCheck, Zap } from "lucide-react";
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
  const [sosAlert, setSosAlert] = useState(null);
  const [msg, setMsg] = useState("");
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerData, setCallerData] = useState(null);
  
  let { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    getChatUser();
    setCurrentDoctor(doctor);
  }, [doctor]);

  useEffect(() => {
    if (currentDoctor) {
      socket.current = io(BaseUrl, { transports: ['websocket'] });
      socket.current.emit("add-user", doctor._id);

      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });

      socket.current.on("callUser", (data) => {
        setReceivingCall(true);
        setCallerData(data);
      });

      socket.current.on("sos-alert", (data) => {
        setSosAlert(data);
      });
    }
  }, [currentDoctor]);

  useEffect(() => {
    if (currentChat) {
      getAllMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getChatUser = async () => {
    setIsSyncing(true);
    try {
      let { data } = await getPlanChatUser();
      if (data.success) {
        setPlanUser(data.UserDetails);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
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
    try {
      let { data } = await getMessages({
        from: currentDoctor._id,
        to: currentChat?._id,
      });
      if (data) {
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#F8FAFC] overflow-hidden font-sans group/chat">
      {/* Sidebar: Clinical Triage List */}
      <div className="w-80 md:w-[22rem] bg-white border-r border-slate-100 flex flex-col shadow-sm relative z-20">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Consultations</h2>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Live Clinical Feed</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
               <Activity size={18} />
            </div>
          </div>
          
          <div className="relative group/search">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Query Registry..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-blue-600/5 transition-all outline-none placeholder:text-slate-300 uppercase tracking-widest"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar px-4 space-y-2 pb-8">
          {planUser && planUser.map((user, index) => {
            const isSelected = currentSelected === index;
            return (
              <button
                key={index}
                onClick={() => changeCurrentChat(user, index)}
                className={`w-full flex items-center gap-4 p-5 rounded-[2rem] cursor-pointer transition-all duration-500 relative group/user text-left
                  ${isSelected 
                    ? "bg-slate-900 shadow-2xl shadow-slate-200 text-white translate-x-2" 
                    : "hover:bg-blue-50 text-slate-700"}`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`absolute -inset-1 bg-blue-600 rounded-2xl blur opacity-0 group-hover/user:opacity-20 transition-opacity ${isSelected ? "opacity-30" : ""}`}></div>
                  <img
                    src={user.image ? `${BaseUrl}/${user.image}` : "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md relative z-10"
                    alt={user.name}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white z-20 ${isSelected ? "bg-blue-400 animate-pulse" : "bg-green-500"}`}></div>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`font-black text-sm truncate uppercase tracking-tight italic ${isSelected ? "text-white" : "text-slate-900"}`}>{user.name}</h4>
                    {isSelected && <Zap size={10} className="text-blue-400" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash size={10} className={isSelected ? "text-slate-500" : "text-slate-300"} />
                    <p className={`text-[9px] font-black uppercase tracking-widest truncate ${isSelected ? "text-slate-400" : "text-slate-400"}`}>
                      REG-{user._id.slice(-5).toUpperCase()}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Perspective: Communication Grid */}
      <div className="flex-grow flex flex-col relative bg-[#F8FAFC]">
        {currentChat ? (
          <>
            {/* Clinical Controller Header */}
            <div className="bg-white/80 backdrop-blur-xl p-6 px-10 border-b border-slate-100 flex items-center justify-between shadow-sm sticky top-0 z-30">
              <div className="flex items-center gap-6">
                <div className="relative">
                   <div className="absolute -inset-2 bg-blue-600 rounded-full blur opacity-5"></div>
                   <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg relative z-10">
                      <User size={24} />
                   </div>
                </div>
                <div>
                   <h3 className="font-black text-slate-900 uppercase text-sm tracking-tighter italic leading-none">{currentChat.name}</h3>
                   <div className="flex items-center gap-2 mt-2">
                     <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                     </span>
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Interactive Consultation Active</span>
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end mr-4">
                   <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Session ID</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase italic">CS-{uuidv4().slice(0, 8).toUpperCase()}</p>
                </div>
                
                <button 
                  onClick={() => setIsVideoCallOpen(true)}
                  className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 group/vcall active:scale-95"
                  title="Initialize WebRTC Telemetry"
                >
                  <Video size={20} className="group-hover/vcall:scale-110 transition-transform" />
                </button>
                
                <button 
                  onClick={() => setShowPrescriptionModal(true)}
                  className="bg-white border border-slate-100 text-slate-900 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2 active:scale-95"
                >
                  <MessageSquare size={14} /> + Prescription
                </button>
                
                <button className="text-slate-300 hover:text-slate-900 transition-colors p-3 rounded-xl hover:bg-slate-50">
                  <MoreVertical size={20}/>
                </button>
              </div>
            </div>

            {/* Visual Telemetry Interface (Video Call) */}
            {isVideoCallOpen && (
              <VideoCall 
                socket={socket}
                currentUser={currentDoctor}
                currentChat={currentChat}
                onClose={() => setIsVideoCallOpen(false)}
                isReceivingParam={receivingCall}
                incomingSignal={receivingCall ? callerData?.signal : null}
                callerId={callerData?.from}
              />
            )}

            {/* High-Priority Incoming Interrupt */}
            {receivingCall && callerData && !isVideoCallOpen && (
              <div className="absolute top-28 left-1/2 -translate-x-1/2 z-[60] bg-white p-6 px-10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-blue-100 flex items-center gap-8 animate-in slide-in-from-top-12 duration-500">
                <div className="relative">
                   <div className="w-14 h-14 bg-green-500 text-white rounded-[1.5rem] flex items-center justify-center animate-pulse shadow-lg shadow-green-100">
                      <PhoneIncoming size={28} />
                   </div>
                </div>
                <div>
                  <p className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em] mb-1 italic">Incoming Telemetry Request</p>
                  <h4 className="font-black text-slate-900 uppercase italic tracking-tighter text-lg">{callerData.name}</h4>
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <button 
                    onClick={() => {
                      setReceivingCall(false);
                      setIsVideoCallOpen(true);
                    }}
                    className="bg-slate-900 text-white px-8 py-4 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all active:scale-95"
                  >
                    Establish
                  </button>
                  <button 
                    onClick={() => setReceivingCall(false)}
                    className="bg-slate-50 text-slate-400 p-4 rounded-[1.2rem] hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Clinical Scripting Overlay (Prescription) */}
            {showPrescriptionModal && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
                <div className="w-full max-w-2xl transform animate-in zoom-in-95 duration-300">
                  <GeneratePrescription 
                    userId={currentChat._id} 
                    onClose={() => setShowPrescriptionModal(false)}
                  />
                </div>
              </div>
            )}

            {/* Conversation Flow Terminal */}
            <div className="flex-grow overflow-y-auto p-10 md:px-20 space-y-8 custom-scrollbar">
              <div className="flex flex-col items-center py-10 opacity-20">
                 <div className="w-px h-20 bg-gradient-to-b from-transparent to-slate-400"></div>
                 <p className="text-[9px] font-black uppercase tracking-[0.5em] italic my-4 text-slate-500">Consulation Record Initiation</p>
                 <div className="w-px h-20 bg-gradient-to-t from-transparent to-slate-400"></div>
              </div>

              {messages.map((message, index) => (
                <div 
                  key={uuidv4()} 
                  ref={index === messages.length - 1 ? scrollRef : null} 
                  className={`flex items-end gap-5 ${message?.fromSelf ? "justify-end" : "justify-start"}`}
                >
                  {!message?.fromSelf && (
                    <div className="relative mb-2">
                       <img src={currentChat.image ? `${BaseUrl}/${currentChat.image}` : "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"} className="w-10 h-10 rounded-2xl object-cover shadow-md border-2 border-white" alt="" />
                       <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                  <div className={`max-w-[75%] md:max-w-[55%] flex flex-col ${message?.fromSelf ? "items-end" : "items-start"}`}>
                    <div className={`p-6 text-sm font-bold shadow-2xl transition-all duration-300 relative ${
                      message?.fromSelf 
                        ? "bg-blue-600 text-white rounded-[2.5rem] rounded-tr-none shadow-blue-900/10" 
                        : "bg-white text-slate-700 rounded-[2.5rem] rounded-tl-none border border-slate-50 shadow-slate-200/50"
                    }`}>
                      {message?.message}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3 px-2">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic translate-y-px">
                        {message?.createdAt ? moment(message.createdAt).format("hh:mm A") : "Synchronizing..."}
                      </span>
                      {message?.fromSelf && <CheckCheck size={14} className="text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Input Module */}
            <div className="p-10 bg-white/50 backdrop-blur-md border-t border-slate-100">
              <form 
                onSubmit={sendChat} 
                className="max-w-5xl mx-auto relative group/form"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-0 group-focus-within/form:opacity-10 transition duration-1000"></div>
                <div className="relative flex items-center gap-4 bg-white p-3 pl-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 focus-within:border-blue-400 transition-all">
                   <div className="p-2 text-slate-300">
                      <MessageSquare size={20} />
                   </div>
                   <input
                     type="text"
                     placeholder="Enter clinical assessment or message..."
                     className="flex-grow bg-transparent border-none py-4 text-sm focus:ring-0 outline-none text-slate-800 placeholder:text-slate-300 font-bold uppercase tracking-tight"
                     value={msg}
                     onChange={(e) => setMsg(e.target.value)}
                   />
                   <button 
                     type="submit"
                     disabled={!msg.trim()}
                     className="bg-slate-900 text-white p-5 rounded-full hover:bg-blue-600 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-90 disabled:opacity-20 disabled:grayscale"
                   >
                     <Send size={20} />
                   </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center p-12">
            <Welcome />
          </div>
        )}

        {/* SOS EMERGENCY PROTOCOL: Cinematic Overlay */}
        {sosAlert && (
          <div className="fixed inset-0 z-[200] bg-red-600/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="bg-white w-full max-w-xl rounded-[4rem] p-12 text-center shadow-[0_50px_150px_rgba(0,0,0,0.3)] relative overflow-hidden transform animate-in zoom-in-95 duration-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-white to-red-600 animate-shimmer"></div>
                
                <div className="mx-auto w-32 h-32 bg-red-600 rounded-[3rem] flex items-center justify-center border-8 border-red-50 shadow-2xl shadow-red-200 animate-bounce mb-10">
                    <Siren size={56} className="text-white" />
                </div>
                
                <div className="space-y-2 mb-10">
                    <h2 className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em] italic">Critical Alert Protocol</h2>
                    <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">Emergency SOS Active</h3>
                </div>

                <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 mb-10 relative group">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full">Patient Identity</div>
                    <p className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-2">{sosAlert.fromName}</p>
                    <div className="flex items-center justify-center gap-2">
                       <Activity size={14} className="text-red-500 animate-pulse" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Biometric Distress Detected</span>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => {
                            setSosAlert(null);
                            setIsVideoCallOpen(true);
                        }}
                        className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-2xl shadow-red-200 active:scale-95 flex items-center justify-center gap-4 group"
                    >
                        Establish Visual Link <Video size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button 
                        onClick={() => setSosAlert(null)}
                        className="w-full py-4 text-slate-400 font-black text-[9px] uppercase tracking-[0.4em] hover:text-slate-900 transition-all italic"
                    >
                        Bypass Protocol
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50">
                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed px-12">
                      Legal Compliance: Emergency responses are logged for clinical verification and audit procedures.
                   </p>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorChat;