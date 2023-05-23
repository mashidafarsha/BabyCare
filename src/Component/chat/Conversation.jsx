import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../constants/constants";
function Conversation({ contacts, changeChat,currentUser }) {
  const [currentSelected, setCurrentSelected] = useState("");
  const [contact, setContacts] = useState([]);
  useEffect(() => {
    setContacts(contacts);
  }, [contacts]);

  const changeCurrentChat = (chat,index) => {
    setCurrentSelected(index);
    changeChat(chat);
  };
  return (
    <div >
      {contact &&
        contact.map((contact,index) => {
          const isSelected = currentSelected === index;
          return (
            <div className={`flex items-center p-3 mt-5 cursor-pointer hover:bg-gray-400  ${
              isSelected ? "bg-white" : ""}`} key={index} onClick={()=>changeCurrentChat(contact,index)}>
              <img
                src={contact.image ? `${BaseUrl}/${contact.image}` : ""}
                alt=""
                className="object-cover w-10 h-10 mr-5 rounded-full"
              />
              <span className="font-medium">Dr.{contact.name}</span>
            </div>
          );
        })}
    </div>
  );
}

export default Conversation;
