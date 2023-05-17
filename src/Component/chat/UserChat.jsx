import React from 'react'

import Conversation from './conversation'
import Message from './message'
import Footer from '../userFooter/Footer'

function UserChat() {
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto w-full pt-16 bg-[#d4d8f0] overflow-x-hidden">
   
   
      <div>
      
          <div className="flex flex-col flex-grow md:h-96 md:flex-row">
            <div className="flex flex-col p-3 overflow-y-auto bg-slate-300 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-slate-700 ">
              <p className="p-3 text-lg font-bold text-center border-b-2">
                Recent conversations
              </p>
             
             
                <div>
               
                    <div>
                    
                        <div>
                          <Conversation
                          
                          />
                        </div>
                   
                    </div>
               
                    <div className="my-10">
                      <p className="font-semibold text-center text-black cursor-default">
                        There is no conversations
                      </p>{" "}
                    </div>
                 
                </div>
          
            </div>

            <div className="flex-grow ">
              <div
                className="flex flex-col h-full border-0 border-l-0 md:border-l-4"
                id="chatBoxWrapper"
              >
              
                  <>
                    <div className="w-full h-16 bg-[#19376D] flex flex-row items-center justify-start">
                      <div className="mx-4 border-2 border-white rounded-full">
                        <img
                         src=''
                          className="w-10 h-10 rounded-full "
                          alt="img"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-white">
                         tutorname
                        </p>
                      </div>
                    </div>
                 
                      <>
                        <div
                          id="chatbox top"
                          className="flex-grow p-3 overflow-x-hidden overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                        >
                         
                            <div >
                              <Message
                              
                              />
                            </div>
                        
                        </div>
                        <div
                          className="flex items-center justify-center w-full mt-1"
                          id="chatboxbottom"
                        >
                          <textarea
                            placeholder="Write something"
                            className="w-10/12 h-12 p-3 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300"
                         
                           
                          ></textarea>
                          <button
                            className="w-2/12 h-12 text-white bg-teal-800 border-none cursor-pointer"
                            
                          >
                            Send
                          </button>
                        </div>
                      </>
                  
                  </>
               
                  <span className="my-20 text-xl font-bold text-center">
                    Open a conversation to start a chat
                  </span>
            
              </div>
            </div>
          </div>
      
          <div className="flex flex-col items-center h-52">
            <p className="mt-10 text-2xl font-bold text-center">
              You are not subscribed to access chat
            </p>
            <button
              className="bg-[#eebbc3] p-2 rounded-lg uppercase mt-4 font-bold"
             
            >
              check plans
            </button>
          </div>
    
      </div>
 
    <div className="mt-1">
      <Footer />
    </div>
  </div>
  )
}

export default UserChat