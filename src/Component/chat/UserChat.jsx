import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getDoctorsData, checkUserAnyPlan } from "../../sevices/userApi";
import ChatContainer from "./ChatContainer";
import Conversation from "./Conversation";
import { io } from "socket.io-client";
import { BaseUrl } from "../../constants/constants";
import Welcome from "./welcome";
import { addUserMessage, getMessages } from "../../sevices/userApi";
import SOSButton from "../SOSButton";
import { useSelector } from "react-redux";
import { Video, PhoneIncoming, X, Shield, Search, Info, MoreHorizontal } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import VideoCall from "./VideoCall"; // Ensure this is imported correctly

function UserChat() {
  const socket = useRef();
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [plan, setPlan] = useState(false);

  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerData, setCallerData] = useState(null);

  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    checkUserPlan();
    getAllDoctors();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(BaseUrl, { transports: ['websocket'] });
      socket.current.emit("add-user", currentUser._id);
      
      socket.current.on("callUser", (data) => {
        setReceivingCall(true);
        setCallerData(data);
      });
    }
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, [currentUser]);

  const checkUserPlan = async () => {
    let { data } = await checkUserAnyPlan();
    setPlan(data.success);
  };

  const getAllDoctors = async () => {
    try {
      let { data } = await getDoctorsData();
      if (data.success) setContacts(data.doctorData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
      {plan ? (
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <div className={`flex-col bg-white border-r border-slate-200 transition-all duration-300 md:flex md:w-80 lg:w-96 ${currentChat ? 'hidden md:flex' : 'flex w-full'}`}>
            <div className="p-8 border-b border-slate-100">
              <h1 className="text-xl font-bold text-slate-900 mb-6">Consultations</h1>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search specialists..." 
                  className="w-full bg-slate-100 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scrollbar">
              <Conversation
                contacts={contacts}
                currentUser={currentUser}
                changeChat={handleChatChange}
              />
            </div>

            {/* Emergency Support */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 italic">
               <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                     <Info size={16} />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Emergency Service</p>
                     <p className="text-xs font-bold text-slate-700">24/7 Support Available</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className={`flex-grow flex flex-col bg-white transition-all duration-300 ${!currentChat ? 'hidden md:flex' : 'flex'}`}>
            {currentChat ? (
              <>
                {/* Chat Header */}
                <div className="h-20 border-b border-slate-100 flex items-center px-6 lg:px-10 justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentChat("")} className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                       <X size={20} />
                    </button>
                    <div className="relative">
                       <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                         <img className="w-full h-full object-cover" src={`${BaseUrl}/${currentChat.image}`} alt={currentChat.name} />
                       </div>
                       <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-none mb-1">Dr. {currentChat.name}</h3>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{currentChat.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsVideoCallOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-100 active:scale-95"
                    >
                      <Video size={18} />
                      <span className="hidden sm:block">Video Call</span>
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                       <MoreHorizontal size={20}/>
                    </button>
                  </div>
                </div>

                {/* Video Call Interface */}
                {isVideoCallOpen && (
                  <VideoCall 
                    socket={socket}
                    currentUser={currentUser}
                    currentChat={currentChat}
                    onClose={() => setIsVideoCallOpen(false)}
                    isReceivingParam={receivingCall}
                    incomingSignal={receivingCall ? callerData?.signal : null}
                    callerId={callerData?.from}
                  />
                )}

                {/* Incoming Call Notification */}
                {receivingCall && callerData && !isVideoCallOpen && (
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-white p-5 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center animate-pulse">
                        <PhoneIncoming size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1 italic">Incoming Video Call</p>
                      <h4 className="font-bold text-slate-900">Dr. {callerData.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={() => {
                          setReceivingCall(false);
                          setIsVideoCallOpen(true);
                        }}
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => setReceivingCall(false)}
                        className="bg-slate-100 text-slate-500 p-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex-grow overflow-hidden">
                   <ChatContainer 
                     currentChat={currentChat} 
                     currentUser={currentUser} 
                     socket={socket} 
                     onVideoCall={() => setIsVideoCallOpen(true)}
                     sosProps={{
                       socket: socket.current,
                       doctorId: currentChat._id,
                       bookingId: location.state?.bookingId,
                       userName: user.name,
                       userId: user._id,
                     }}
                   />
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center bg-white">
                <Welcome />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center bg-slate-50 p-6">
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
               <Shield size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Consultation Access Required</h2>
            <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed px-4">
              You need an active health plan to access real-time specialist consultations. Please upgrade your plan to continue.
            </p>
            <Link to={'/plans'} className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-100 active:scale-95">
               View Health Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserChat;