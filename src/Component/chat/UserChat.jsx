import React, { useEffect, useRef, useState } from "react";
import { getDoctorsData, checkUserAnyPlan } from "../../sevices/userApi";
import ChatContainer from "./chatContainer";
import Conversation from "./conversation";
import { io } from "socket.io-client";
import { BaseUrl } from "../../constants/constants";
import Welcome from "./welcome";
import Footer from "../userFooter/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function UserChat() {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [plan, setPlan] = useState("");
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
    if (data.success) {
      setPlan(data.success);
    } else {
      setPlan(data.success);
    }
  };

  const getAllDoctors = async () => {
    try {
      let { data } = await getDoctorsData();
      console.log(data);
      if (data.success) {
        setContacts(data.doctorData);
      }
    } catch {}
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
      {plan === true ? (
        <div>
          <div className="flex flex-col flex-grow md:h-96 md:flex-row">
            <div className="flex flex-col p-3 overflow-y-auto bg-slate-300 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-slate-700 ">
              <p className="p-3 text-lg font-bold text-center border-b-2">
                Recent conversations
              </p>

              <div>
                <div>
                  <Conversation
                    contacts={contacts}
                    currentUser={currentUser}
                    changeChat={handleChatChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex-grow ">
              <div
                className="flex flex-col h-full border-0 border-l-0 md:border-l-4"
                id="chatBoxWrapper"
              >
                <>
                  {currentChat ? (
                    <div className="flex items-center justify-start gap-1 bg-blue-300">
                      <div className="flex items-center justify-end w-4/12 gap-1">
                        <div className="w-12 h-10 overflow-hidden rounded-full md:h-16 md:w-16">
                          <img
                            className="object-cover w-full h-full"
                            src={
                              currentChat
                                ? `${BaseUrl}/${currentChat.image}`
                                : ""
                            }
                            alt=""
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold md:text-2xl">
                            {currentChat.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    id="chatbox top"
                    className="flex-grow p-3 overflow-x-hidden overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                  >
                    <div>
                      {currentChat === "" ? (
                        <Welcome />
                      ) : (
                        <ChatContainer
                          currentChat={currentChat}
                          currentUser={currentUser}
                          socket={socket}
                        />
                      )}
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center mb-48 overflow-hidden">
            <p className="font-semibold text-center text-black cursor-default">
              You Don't Have Permission To Chat,Please Purchase Any Plans
            </p>
            <button className="btn btn-success"><Link to={'/plans'}>Click here</Link></button>
          </div>
        </div>
      )}
      <div className="mt-1">
     <Footer />
   </div>
    </div>
    
   </>
  );
}

export default UserChat;
