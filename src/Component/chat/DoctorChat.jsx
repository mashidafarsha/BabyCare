import React, { useEffect, useState, useRef } from "react";
import Welcome from "./welcome";

import { BaseUrl } from "../../constants/constants";
import { getPlanChatUser } from "../../sevices/doctorApi";
import { addDoctorMessage, getMessages } from "../../sevices/doctorApi";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Footer from "../userFooter/Footer";
function DoctorChat() {
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [planUser, setPlanUser] = useState([]);
  const [currentSelected, setCurrentSelected] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [currentDoctor, setCurrentDoctor] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [msg, setMsg] = useState("");
  const scrollRef = useRef();
  let { doctor } = useSelector((state) => state.doctor);
  useEffect(() => {
    getChatUser();

    setCurrentDoctor(doctor);
  }, []);
  useEffect(() => {
    if (currentDoctor) {
      socket.current = io(BaseUrl);
      socket.current.emit("add-user", doctor._id);
    }
  }, [currentDoctor]);
  useEffect(() => {
    if (currentDoctor) {
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
    console.log(data);
    if (data.success) {
      setPlanUser(data.UserDetails);
    }
  };
  const changeCurrentChat = (chat, index) => {
    setCurrentSelected(index);
    setCurrentChat(chat);
  };

  const sendChat = async (event) => {
    console.log("helllooooooo");
    event.preventDefault();
    if (msg.length > 0) {
      let { data } = await addDoctorMessage({
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
      msgs.push({
        fromSelf: true,
        message: msg,
        // time: moment(Date().toLocaleString()).format("LLL"),
      });
      setMessages(msgs);
      setMsg("");
    }
  };

  const getAllMessages = async () => {
    let { data } = await getMessages({
      from: currentDoctor._id,
      to: currentChat?._id,
    });
    console.log(data, "bbbbbbb");
    if (data) {
      setMessages(data);
    }
  };

  return (
    <div className="w-full mx-auto overflow-x-hidden max-w-screen-2xl">
      <div className="bg-green-200">
        {currentChat ? (
          <div className="flex items-center justify-start gap-1 ">
            <div className="flex items-center justify-end w-5/12 gap-1">
              <div className="w-12 h-10 overflow-hidden rounded-full md:h-16 md:w-16">
                <img
                  src={currentChat ? `${BaseUrl}/${currentChat.image}` : ""}
                  className="object-cover w-full h-full"
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
      </div>
      <div>
        <div className="flex flex-col flex-grow h-screen md:flex-row">
          <div className="flex flex-col p-3 overflow-y-auto bg-green-200 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-slate-700">
            <p className="p-3 text-lg font-bold text-center border-b-2">
              Recent conversations
            </p>

            <div >
              {planUser &&
                planUser.map((user, index) => {
                  const isSelected = currentSelected === index;
                  return (
                    <div
                      className={`flex items-center p-3 mt-5 cursor-pointer hover:bg-gray-400 ${
                        isSelected ? "bg-white" : ""
                      }`}
                      key={index}
                      onClick={() => changeCurrentChat(user, index)}
                    >
                      <div className="flex items-center p-3 mt-5 cursor-pointer hover:bg-gray-400">
                        <img
                          src={user.image ? `${BaseUrl}/${user.image}` : ""}
                          alt=""
                          className="object-cover w-10 h-10 mr-5 rounded-full"
                        />
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="flex-grow ">
            <div
              className="flex flex-col h-full border-0 border-l-0 md:border-l-4"
              id="chatBoxWrapper"
            >
              <>
                <div
                  id="chatbox top"
                  className="flex-grow p-3 overflow-x-hidden overflow-y-auto md:h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                >
                  {currentChat === "" ? (
                    <Welcome />
                  ) : (
                    <div>
                      <div>
                        <div>
                          {messages.map((message, index) => {
                            return (
                              <div
                                ref={scrollRef}
                                key={uuidv4()}
                                className={`chat ${
                                  message?.fromSelf ? "chat-end" : "chat-start"
                                }`}
                              >
                                <div class="chat-image avatar">
                                  <div class="w-10 rounded-full">
                                    <img
                                      src={
                                        message?.fromSelf
                                          ? `${BaseUrl}/${currentDoctor.image}`
                                          : `${BaseUrl}/${currentChat.image}`
                                      }
                                    />
                                  </div>
                                </div>

                                <div
                                  className={`chat-bubble ${
                                    message?.fromSelf
                                      ? "chat-bubble-info"
                                      : "chat-bubble-success"
                                  } p-2 rounded-lg max-w-md md:max-w-2xl break-words my-2 md:my-4 font-bold`}
                                >
                                  <p className="text-lg text-white">
                                    {message?.message}
                                  </p>
                                </div>
                                {message?.createdAt ? (
                                  <div className="chat-footer">
                                    Sent@ {message?.createdAt?.split(",")[0]}{" "}
                                    <br />
                                    Time@ {message?.createdAt?.split(",")[1]}
                                  </div>
                                ) : (
                                  <div className="chat-footer">Just Now</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div style={{ position: "sticky", bottom: 0 }}>
                        <div
                          className="flex items-center justify-center w-full mt-1"
                          id="chatboxbottom"
                        >
                          <form
                            className="flex items-center input-group"
                            onSubmit={(e) => sendChat(e)}
                          >
                            <input
                              placeholder="Write something"
                              className="w-full text-white bg-gray-700 rounded-full input input-sm md:input-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              value={msg}
                              onChange={(e) => setMsg(e.target.value)}
                            />
                            <button
                              type="submit"
                              className="w-2/12 h-12 text-white bg-teal-800 border-none cursor-pointer"
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default DoctorChat;
