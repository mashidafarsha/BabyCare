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
    <div className="p-2 space-y-1">
    {contacts && contacts.map((contact, index) => (
      <div 
        key={index}
        onClick={() => changeChat(contact, index)}
        className={`flex items-center gap-4 p-4 cursor-pointer rounded-2xl transition-all duration-200 ${
          currentSelected === index 
            ? "bg-blue-50 border-l-4 border-blue-600 shadow-sm" 
            : "hover:bg-slate-50 border-l-4 border-transparent"
        }`}
      >
        <div className="relative">
          <img 
            src={contact.image ? `${BaseUrl}/${contact.image}` : ""} 
            className="w-12 h-12 rounded-2xl object-cover" 
            alt="doctor" 
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div className="flex-grow">
          <h3 className={`font-bold text-sm ${currentSelected === index ? "text-blue-600" : "text-slate-800"}`}>
            Dr. {contact.name}
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Available Now</p>
        </div>
      </div>
    ))}
  </div>
  );
}

export default Conversation;
