import React, { useState } from "react";
import Picker from 'emoji-picker-react';

import { BsFillEmojiSmileFill } from "react-icons/bs";
function MessageSender({handleSendMessage}) {
  const [showImogiPicker,setShowImogiPicker]=useState(false)
  const[msg,setMsg]=useState("")

  const handleImogiPickerHideAndShow=()=>{
    setShowImogiPicker(!showImogiPicker)
  }

  const handleEmogiClick=(emoji)=>{
    console.log(emoji);
let message = msg
message += emoji.emoji
setMsg(message)
  }

 

  const sendChat=(event)=>{
event.preventDefault()
if(msg.length>0){
  handleSendMessage(msg)
  setMsg("")
}
  }
  return (
    <>
     
     
      <div
        className="flex items-center justify-center w-full mt-1"
        id="chatboxbottom"
      >
        <div className="w-6 ">
        < BsFillEmojiSmileFill onClick={handleImogiPickerHideAndShow}/>
        {showImogiPicker && <Picker  onEmojiClick={handleEmogiClick} />}
        </div>
      <form onSubmit={(e)=>sendChat(e)} className="flex items-center input-group">
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
    </>
  );
}

export default MessageSender;
