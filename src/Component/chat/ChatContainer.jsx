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
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (msg) => {
    try {
      const { data } = await addUserMessage({
        from: currentUser._id,
        to: currentChat?._id,
        message: msg,
      });

      socket.current.emit("send-message", {
        to: currentChat?._id,
        from: currentUser?._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({
        fromSelf: true,
        message: msg,
        // time: moment(Date().toLocaleString()).format("LLL"),
      });
      setMessages(msgs);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getAllMessages = async () => {
    let { data } = await getMessages({
      from: currentUser._id,
      to: currentChat?._id,
    });
    console.log(data, "bbbbbbb");
    if (data) {
      setMessages(data);
    }
  };
  return (
    <>
    

      {messages.map((message, index) => {
        return (
          <div
            ref={scrollRef}
            key={uuidv4()}
            className={`chat ${message?.fromSelf ? "chat-end" : "chat-start"}`}
          >
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  src={
                    message?.fromSelf
                      ? `${BaseUrl}/${currentUser.image}`
                      : `${BaseUrl}/${currentChat.image}`
                  }
                />
              </div>
            </div>
            <div class="chat-header">
              {message?.fromSelf
                ? message?.username?.toUpperCase()
                : currentChat?.username?.toUpperCase()}
            </div>
            <div
              className={`chat-bubble ${
                message?.fromSelf ? "chat-bubble-info" : "chat-bubble-success"
              } p-2 rounded-lg max-w-md md:max-w-2xl break-words my-2 md:my-4 font-bold`}
            >
              <p className="text-lg text-white">{message?.message}</p>
            </div>
            {message?.createdAt ? (
              <div className="chat-footer">
                Sent@ {message?.createdAt?.split(",")[0]} <br />
                Time@ {message?.createdAt?.split(",")[1]}
              </div>
            ) : (
              <div className="chat-footer">Just Now</div>
            )}
          </div>

          // <div className="flex flex-col mt-5"  ref={scrollRef}
          // key={uuidv4()}>

          //       <div className="flex ">
          //         {/* <img
          //           src=""
          //           alt=""
          //           className="object-cover w-8 h-8 mr-3 rounded-full "
          //         /> */}
          //         <p className="max-w-xs p-3 rounded-3xl">{message.message}</p>
          //       </div>

          //   <div className="mt-3 text-xs">{message.createdAt}</div>

          // </div>
        );
      })}

<div  style={{ position: "sticky",bottom :0}}>
        <MessageSender handleSendMessage={handleSendMessage} />
      </div>
    </>
  );
}

export default ChatContainer;
