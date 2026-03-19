import React, { useEffect, useRef, useState } from "react";
import { PhoneOff, Video, Mic, MicOff, VideoOff } from "lucide-react";

function VideoCall({ socket, currentUser, currentChat, onClose, isReceivingParam = false, incomingSignal = null, callerId = null }) {
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [permissionError, setPermissionError] = useState(null);

  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef(null);

  useEffect(() => {
    // 1. Get local media
    const getMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }

        if (isReceivingParam && incomingSignal) {
          answerCall(currentStream, incomingSignal);
        } else {
          callUser(currentStream);
        }
      } catch (err) {
        console.error("CRITICAL: Failed to get local stream", err);
        setPermissionError(err.name);
        
        // If it's a specific "NotAllowedError", the user likely clicked "Block"
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          // Keep the component open to show the "How to fix" UI
        } else {
          // For other errors (like "NotFoundError" for missing hardware), we might try fallback
          try {
             // Try just audio if video fails
             const audioOnlyStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
             setStream(audioOnlyStream);
             if (isReceivingParam && incomingSignal) {
                answerCall(audioOnlyStream, incomingSignal);
             } else {
                callUser(audioOnlyStream);
             }
             setPermissionError(null); // Clear error if fallback works
          } catch (audioErr) {
             console.error("Fallback to audio failed", audioErr);
             // Both failed
          }
        }
      }
    };

    getMedia();

    // 2. Listen for socket events
    if (socket?.current) {
      socket.current.on("callAccepted", (signal) => {
        setCallAccepted(true);
        if (connectionRef.current) {
          connectionRef.current.setRemoteDescription(new RTCSessionDescription(signal));
        }
      });

      socket.current.on("callEnded", () => {
        setCallEnded(true);
        cleanup();
        onClose();
      });

      socket.current.on("ice-candidate", (candidate) => {
        if (connectionRef.current && candidate) {
          console.log("[WebRTC] Adding received ICE candidate");
          connectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
            .catch(e => console.error("Error adding ice candidate", e));
        }
      });
    }

    return () => {
      cleanup();
    };
    // eslint-disable-next-line
  }, []);

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:global.stun.twilio.com:3478" }
      ] // standard free STUN servers
    });

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("[WebRTC] Sending ICE Candidate");
        socket.current.emit("ice-candidate", {
          candidate: event.candidate,
          to: callerId || currentChat?._id
        });
      }
    };

    peer.ontrack = (event) => {
      if (userVideo.current) {
        userVideo.current.srcObject = event.streams[0];
      }
    };

    return peer;
  };

  const callUser = async (currentStream) => {
    const peer = createPeer();
    currentStream.getTracks().forEach(track => peer.addTrack(track, currentStream));
    
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.current.emit("callUser", {
        userToCall: currentChat?._id,
        signalData: peer.localDescription,
        from: currentUser?._id,
        name: currentUser.name
    });

    connectionRef.current = peer;
  };

  const answerCall = async (currentStream, callerSignal) => {
    setCallAccepted(true);
    const peer = createPeer();
    currentStream.getTracks().forEach(track => peer.addTrack(track, currentStream));

    await peer.setRemoteDescription(new RTCSessionDescription(callerSignal));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socket.current.emit("answerCall", {
        signal: peer.localDescription,
        to: callerId || currentChat?._id // the caller
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.current.emit("endCall", { to: currentChat._id });
    cleanup();
    onClose();
  };

  const cleanup = () => {
    if (connectionRef.current) {
      connectionRef.current.close();
      connectionRef.current = null;
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
    }
  };

  if (permissionError) {
    return (
      <div className="fixed inset-0 z-[110] bg-slate-900 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <VideoOff size={40} />
          </div>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic mb-2">Permission Required</h2>
          <p className="text-slate-500 text-sm font-medium mb-8">
            {permissionError === 'NotAllowedError' 
              ? "You've blocked camera/mic access. Please click the Lock icon in your browser's address bar and set Camera & Mic to 'Allow'."
              : "We couldn't find a camera or microphone. Please check your hardware connections and try again."}
          </p>
          <div className="flex gap-4">
            <button 
                onClick={() => window.location.reload()} 
                className="flex-1 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-900 transition-all shadow-lg"
            >
              Reload Page
            </button>
            <button 
                onClick={onClose} 
                className="flex-1 py-4 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-200 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-8 text-center">
        <h2 className="text-white text-2xl font-black italic uppercase tracking-widest">
          {callAccepted && !callEnded ? `Talking to ${currentChat.name}` : `Calling ${currentChat.name}...`}
        </h2>
        <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-xs">
          End-to-End Encrypted
        </p>
      </div>

      {/* Video Grid */}
      <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10">
        
        {/* Remote Video (Full Screen) */}
        {callAccepted && !callEnded ? (
          <video
            playsInline
            ref={userVideo}
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 flex-col">
            <span className="w-20 h-20 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin mb-6"></span>
            <p className="font-bold uppercase tracking-widest">{isReceivingParam ? "Connecting..." : "Ringing..."}</p>
          </div>
        )}

        {/* Local Video (Picture in Picture) */}
        <div className="absolute bottom-6 right-6 w-48 aspect-video rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800 z-10 transition-transform hover:scale-105 cursor-pointer">
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            className={`w-full h-full object-cover ${!videoOn && "hidden"}`}
          />
          {!videoOn && (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
              <VideoOff size={32} />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 flex items-center gap-6 bg-slate-800/80 p-4 px-8 rounded-[2rem] backdrop-blur-md border border-white/10 shadow-2xl">
        <button 
          onClick={toggleMic}
          className={`p-4 rounded-full transition-all ${micOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
        >
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>
        
        <button 
          onClick={leaveCall}
          className="p-5 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all transform active:scale-90 shadow-lg shadow-red-900/50"
        >
          <PhoneOff size={28} />
        </button>

        <button 
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-all ${videoOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}`}
        >
          {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
