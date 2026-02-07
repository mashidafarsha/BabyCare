import React, { useState } from "react";
import Picker from 'emoji-picker-react';
import { BsEmojiSmile, BsSendFill } from "react-icons/bs";

function MessageSender({ handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData) => {
    // പുതിയ emoji-picker-react വേർഷനിൽ emojiData.emoji എന്നാണ് ഉപയോഗിക്കുക
    setMsg((prevMsg) => prevMsg + emojiData.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim().length > 0) {
      handleSendMessage(msg);
      setMsg("");
      setShowEmojiPicker(false); // മെസ്സേജ് അയച്ചു കഴിഞ്ഞാൽ പിക്കർ ക്ലോസ് ചെയ്യാം
    }
  };

  return (
    <div className="relative flex items-center w-full gap-2 p-2 bg-white border-t border-slate-100">
      
      {/* Emoji Picker - Absolute positioned to float above */}
      {showEmojiPicker && (
        <div className="absolute left-0 bottom-16 z-[999] shadow-2xl rounded-2xl overflow-hidden">
          <Picker onEmojiClick={handleEmojiClick} theme="light" height={400} width={300} />
        </div>
      )}

      {/* Emoji Icon Button */}
      <button
        type="button"
        onClick={handleEmojiPickerToggle}
        className="p-2 transition-colors rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-600"
      >
        <BsEmojiSmile size={24} />
      </button>

      {/* Message Form */}
      <form onSubmit={sendChat} className="flex flex-grow items-center gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-5 py-3 text-sm font-medium transition-all border-none bg-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-700"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="flex items-center justify-center p-3 text-white transition-all bg-blue-600 rounded-2xl hover:bg-slate-900 active:scale-95 shadow-md shadow-blue-200"
        >
          <BsSendFill size={18} />
        </button>
      </form>
    </div>
  );
}

export default MessageSender;