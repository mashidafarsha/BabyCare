import React, { useEffect, useRef, useState } from "react";
import { getDoctorsData, checkUserAnyPlan } from "../../sevices/userApi";
import ChatContainer from "./ChatContainer";
import Conversation from "./Conversation";
import { io } from "socket.io-client";
import { BaseUrl } from "../../constants/constants";
import Welcome from "./welcome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserChat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [plan, setPlan] = useState(false);
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    checkUserPlan();
    getAllDoctors();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(BaseUrl);
      socket.current.emit("add-user", currentUser._id);
    }
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
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 overflow-hidden">
      {plan ? (
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar: Recent Conversations */}
          <div className={`flex-col bg-white border-r border-slate-200 transition-all duration-300 md:flex md:w-80 lg:w-96 ${currentChat ? 'hidden md:flex' : 'flex w-full'}`}>
            <div className="p-6 border-b border-slate-100 bg-white">
              <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase italic">Messages</h1>
              <div className="h-1 w-12 bg-blue-600 rounded-full mt-1"></div>
            </div>
            
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
              <Conversation
                contacts={contacts}
                currentUser={currentUser}
                changeChat={handleChatChange}
              />
            </div>
          </div>

          {/* Main Chat Area */}
          <div className={`flex-grow flex flex-col bg-slate-50 transition-all duration-300 ${!currentChat ? 'hidden md:flex' : 'flex'}`}>
            {currentChat ? (
              <>
                {/* Chat Header */}
                <div className="h-20 bg-white border-b border-slate-100 flex items-center px-6 justify-between shadow-sm z-10">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setCurrentChat("")} className="md:hidden p-2 hover:bg-slate-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm">
                      <img className="w-full h-full object-cover" src={`${BaseUrl}/${currentChat.image}`} alt={currentChat.name} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 leading-none tracking-tight">Dr. {currentChat.name}</h3>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1 inline-block">Online</span>
                    </div>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="flex-grow overflow-y-auto p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                  <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center bg-slate-50">
                <Welcome />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* No Plan Message */
        <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-md w-full">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m10-5V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h4" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic mb-2">Access Restricted</h2>
            <p className="text-slate-500 text-sm font-medium mb-8">
              You don't have an active chat plan. Please purchase a subscription to start consulting with our doctors.
            </p>
            <Link to={'/plans'} className="inline-block w-full py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg">
              View Plans
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserChat;