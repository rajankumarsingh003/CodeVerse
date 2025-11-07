



// import React, { useState } from 'react';
// import { UserButton, useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
// import ChatModal from './chatModel';        // keep this as your file is named
// import HistoryModal from './HistoryModal';
// import logo from '../assets/logo1.png'; // keep your logo path
// // using simple emoji for icon to avoid adding new dependency
// const Navbar = () => {
//   const { user } = useUser();
//   const username = user?.email || 'guest';
//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);

//   return (
//     <>
//       <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-800 bg-[#141319]">
//         {/* Left: Logo */}
//         <div className="logo flex items-center">
//           <img 
//             src={logo} 
//             alt="SmartAI Logo" 
//             className="h-24 w-auto" 
//           />
//         </div>

//         {/* Right: AskGenie + History + User */}
//         <div className="icons flex items-center gap-[15px]">
//           <SignedIn>
//             <div
//               className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700"
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//               AskGenie
//             </div>

//             <div
//               className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700 flex items-center gap-2"
//               onClick={() => setHistoryOpen(!historyOpen)}
//             >
//               <span className="text-lg">  ☰</span>
//               <span></span>
//             </div>

//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       {/* Modals */}
//       {chatOpen && <ChatModal username={username} onClose={() => setChatOpen(false)} />}
//       {historyOpen && <HistoryModal username={username} onClose={() => setHistoryOpen(false)} />}
//     </>
//   );
// };

// export default Navbar;




// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   UserButton,
//   useUser,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
// } from "@clerk/clerk-react";
// import ChatModal from "./chatModel";
// import HistoryModal from "./HistoryModal";
// import JarvisVoice from "./Jarvis.jsx";
// import logo from "../assets/logo1.png";

// const Navbar = () => {
//   const { user } = useUser();
//   const username = user?.email?.split("@")[0] || "Guest";

//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
//   const chatRef = useRef(null);

//   const handleWake = useCallback(() => {
//     setChatOpen(true);
//   }, []);

//   const handleVoiceQuestion = useCallback((q) => {
//     console.log("🎙️ Jarvis recognized question:", q);
//     if (!chatOpen) {
//       setPendingVoiceQuestion(q);
//       setChatOpen(true);
//     } else {
//       chatRef.current?.askByVoice(q);
//     }
//   }, [chatOpen]);

//   useEffect(() => {
//     if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
//       chatRef.current.askByVoice(pendingVoiceQuestion);
//       setPendingVoiceQuestion(null);
//     }
//   }, [chatOpen, pendingVoiceQuestion]);

//   return (
//     <>
//       <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b border-gray-800 bg-[#141319]">
//         <div className="logo flex items-center">
//           <img src={logo} alt="SmartAI Logo" className="h-24 w-auto" />
//         </div>

//         <div className="icons flex items-center gap-[15px]">
//           <SignedIn>
//             <div
//               className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700"
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//               AskGemini
//             </div>

//             <div
//               className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700 flex items-center gap-2"
//               onClick={() => setHistoryOpen(!historyOpen)}
//             >
//               <span className="text-lg">☰</span>
//             </div>

//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

//       {chatOpen && (
//         <ChatModal
//           username={username}
//           onClose={() => setChatOpen(false)}
//           ref={chatRef}
//         />
//       )}

//       {historyOpen && (
//         <HistoryModal
//           username={username}
//           onClose={() => setHistoryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;







// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   UserButton,
//   useUser,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
// } from "@clerk/clerk-react";
// import ChatModal from "./chatModel";
// import HistoryModal from "./HistoryModal";
// import JarvisVoice from "./Jarvis.jsx";
// import logo from "../assets/logo1.png";

// const Navbar = () => {
//   const { user } = useUser();
//   const username = user?.email?.split("@")[0] || "Guest";

//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
//   const chatRef = useRef(null);

//   const handleWake = useCallback(() => {
//     setChatOpen(true);
//   }, []);

//   const handleVoiceQuestion = useCallback(
//     (q) => {
//       console.log("🎙️ Jarvis recognized question:", q);
//       if (!chatOpen) {
//         setPendingVoiceQuestion(q);
//         setChatOpen(true);
//       } else {
//         chatRef.current?.askByVoice(q);
//       }
//     },
//     [chatOpen]
//   );

//   useEffect(() => {
//     if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
//       chatRef.current.askByVoice(pendingVoiceQuestion);
//       setPendingVoiceQuestion(null);
//     }
//   }, [chatOpen, pendingVoiceQuestion]);

//   return (
//     <>
//       <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b border-gray-800 bg-[#141319]">
//         {/* ✅ Animated Logo (No Tooltip) */}
//         <div className="logo flex items-center group">
//           <img
//             src={logo}
//             alt="SmartAI Logo"
//             className="h-24 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:drop-shadow-[0_0_12px_#00c6ff]"
//           />
//         </div>

//         {/* Buttons Section */}
//         <div className="icons flex items-center gap-[20px] relative">
//           <SignedIn>
//             {/* AskGemini (no tooltip) */}
//             <div
//               className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700"
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//               AskGemini
//             </div>

//             {/* History with Tooltip */}
//             <div className="relative group">
//               <div
//                 className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700 flex items-center gap-2"
//                 onClick={() => setHistoryOpen(!historyOpen)}
//               >
//                 <span className="text-lg">☰</span>
//               </div>
//               <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-sm bg-gray-800 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-cyan-400">
//                 View Chat History
//               </span>
//             </div>

//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       {/* Jarvis Voice Assistant */}
//       <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

//       {/* Chat Modal */}
//       {chatOpen && (
//         <ChatModal
//           username={username}
//           onClose={() => setChatOpen(false)}
//           ref={chatRef}
//         />
//       )}

//       {/* History Modal */}
//       {historyOpen && (
//         <HistoryModal
//           username={username}
//           onClose={() => setHistoryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;

// upper wala code real hai




// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   UserButton,
//   useUser,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
// } from "@clerk/clerk-react";
// import ChatModal from "./chatModel";
// import HistoryModal from "./HistoryModal";
// import JarvisVoice from "./Jarvis.jsx";
// import logo from "../assets/logoR.png";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const username = user?.email?.split("@")[0] || "Guest";

//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
//   const chatRef = useRef(null);

//   const handleWake = useCallback(() => setChatOpen(true), []);
//   const handleVoiceQuestion = useCallback(
//     (q) => {
//       console.log("🎙️ Jarvis recognized question:", q);
//       if (!chatOpen) {
//         setPendingVoiceQuestion(q);
//         setChatOpen(true);
//       } else {
//         chatRef.current?.askByVoice(q);
//       }
//     },
//     [chatOpen]
//   );

//   useEffect(() => {
//     if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
//       chatRef.current.askByVoice(pendingVoiceQuestion);
//       setPendingVoiceQuestion(null);
//     }
//   }, [chatOpen, pendingVoiceQuestion]);

//   return (
//     <>
//       <div className="nav flex items-center justify-between px-[100px] h-[95px] border-b border-gray-800 bg-[#141319] shadow-[0_0_10px_#00c6ff40]">
//         {/* 🔹 Logo Section */}
//         <div className="logo flex items-center group">
//           <img
//             src={logo}
//             alt="smart ai"
//             className="h-28 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:drop-shadow-[0_0_20px_#00c6ff]"
//           />
//           <span className="ml-3 text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text tracking-wide">
//             {/* R-Dev */}
//           </span>
//         </div>

//         {/* 🔹 Icons / Buttons Section */}
//         <div className="icons flex items-center gap-[20px] relative">
//           <SignedIn>
//             <div
//               className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700"
//               onClick={() => navigate("/debugger")}
//             >
//               Debugger
//             </div>

//             <div
//               className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700"
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//               AskGemini
//             </div>

//             <div className="relative group">
//               <div
//                 className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-700 flex items-center gap-2"
//                 onClick={() => setHistoryOpen(!historyOpen)}
//               >
//                 <span className="text-lg">☰</span>
//               </div>
//               <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-sm bg-gray-800 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-cyan-400">
//                 View Chat History
//               </span>
//             </div>

//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       {/* 🔹 Jarvis Voice Assistant */}
//       <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

//       {/* 🔹 Chat Modal */}
//       {chatOpen && (
//         <ChatModal
//           username={username}
//           onClose={() => setChatOpen(false)}
//           ref={chatRef}
//         />
//       )}

//       {/* 🔹 History Modal */}
//       {historyOpen && (
//         <HistoryModal
//           username={username}
//           onClose={() => setHistoryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;


// use the lower one for professional




// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   UserButton,
//   useUser,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
// } from "@clerk/clerk-react";
// import ChatModal from "./chatModel";
// import HistoryModal from "./HistoryModal";
// import JarvisVoice from "./Jarvis.jsx";
// import logo from "../assets/logoR.png";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const username = user?.email?.split("@")[0] || "Guest";

//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
//   const chatRef = useRef(null);

//   const handleWake = useCallback(() => setChatOpen(true), []);
//   const handleVoiceQuestion = useCallback(
//     (q) => {
//       console.log("🎙️ Jarvis recognized question:", q);
//       if (!chatOpen) {
//         setPendingVoiceQuestion(q);
//         setChatOpen(true);
//       } else {
//         chatRef.current?.askByVoice(q);
//       }
//     },
//     [chatOpen]
//   );

//   useEffect(() => {
//     if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
//       chatRef.current.askByVoice(pendingVoiceQuestion);
//       setPendingVoiceQuestion(null);
//     }
//   }, [chatOpen, pendingVoiceQuestion]);

//   return (
//     <>
//       <div className="nav flex items-center justify-between px-[100px] h-[95px] border-b border-gray-800 bg-[#141319] shadow-[0_0_10px_#00c6ff40]">
//         {/* 🔹 Logo Section */}
//         <div className="logo flex items-center group">
//           <img
//             src={logo}
//             alt="R-Dev Logo"
//             className="h-28 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:drop-shadow-[0_0_20px_#00c6ff]"
//           />
//           <span className="ml-3 text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text tracking-wide">
//             {/* R-Dev */}
//           </span>
//         </div>

//         {/* 🔹 Icons / Buttons Section */}
//         <div className="icons flex items-center gap-[20px] relative">
//           <SignedIn>
//             {/* 🧠 Debugger Button (Glassmorphic) */}
//             <div
//               className="relative cursor-pointer text-white font-semibold text-lg px-5 py-2 rounded-xl 
//               bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-cyan-400/30 
//               shadow-[0_0_10px_#00c6ff50] hover:shadow-[0_0_25px_#00c6ff80] 
//               transition-all duration-500"
//               onClick={() => navigate("/debugger")}
//             >
//                Code Insight
//             </div>

//             {/* 🤖 Ask Gemini Button (Animated Gradient) */}
//             <div
//               className="cursor-pointer font-bold text-white text-lg px-6 py-2 rounded-xl
//               bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-[length:200%_200%]
//               animate-gradientMove shadow-[0_0_15px_#00c6ff80] hover:scale-105 
//               transition-transform duration-500"
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//                Ask Dev
//             </div>

//             {/* ☰ History Button */}
//             <div className="relative group">
//               <div
//                 className="cursor-pointer text-white font-bold text-lg px-4 py-2 rounded-lg 
//                 transition-all duration-300 hover:bg-gray-700 flex items-center gap-2"
//                 onClick={() => setHistoryOpen(!historyOpen)}
//               >
//                 <span className="text-lg">☰</span>
//               </div>
//               <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-sm bg-gray-800 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-cyan-400">
//                 View Chat History
//               </span>
//             </div>

//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       {/* 🔹 Jarvis Voice Assistant */}
//       <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

//       {/* 🔹 Chat Modal */}
//       {chatOpen && (
//         <ChatModal
//           username={username}
//           onClose={() => setChatOpen(false)}
//           ref={chatRef}
//         />
//       )}

//       {/* 🔹 History Modal */}
//       {historyOpen && (
//         <HistoryModal
//           username={username}
//           onClose={() => setHistoryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;





// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   UserButton,
//   useUser,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
// } from "@clerk/clerk-react";
// import ChatModal from "./chatModel";
// import HistoryModal from "./HistoryModal";
// import JarvisVoice from "./Jarvis.jsx";
// import logo from "../assets/g2.png";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const username = user?.email?.split("@")[0] || "Guest";

//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
//   const chatRef = useRef(null);

//   const handleWake = useCallback(() => setChatOpen(true), []);
//   const handleVoiceQuestion = useCallback(
//     (q) => {
//       console.log("🎙️ Jarvis recognized question:", q);
//       if (!chatOpen) {
//         setPendingVoiceQuestion(q);
//         setChatOpen(true);
//       } else {
//         chatRef.current?.askByVoice(q);
//       }
//     },
//     [chatOpen]
//   );

//   useEffect(() => {
//     if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
//       chatRef.current.askByVoice(pendingVoiceQuestion);
//       setPendingVoiceQuestion(null);
//     }
//   }, [chatOpen, pendingVoiceQuestion]);

//   return (
//     <>
//      <div className="nav flex flex-col md:flex-row items-center justify-between px-6 md:px-[100px] h-auto md:h-[95px] border-b border-gray-800 bg-[#141319] shadow-[0_0_10px_#00c6ff40] py-4 md:py-0">
//         {/* 🔹 Logo Section */}
//         <div className="logo flex items-center group mb-4 md:mb-0">
//           <img
//             src={logo}
//             alt="R-Dev Logo"
//             className="h-20 md:h-28 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:drop-shadow-[0_0_20px_#00c6ff]"
//           />
//           <span className="ml-3 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text tracking-wide">
//             {/* R-Dev */}
//           </span>
//         </div>

//         {/* 🔹 Icons / Buttons Section */}
//         <div className="icons flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-[20px] w-full md:w-auto justify-center md:justify-end">
//           <SignedIn>
//             {/* 🧠 Debugger Button (Glassmorphic) */}
//             <div
//               className="relative cursor-pointer text-white font-semibold text-sm md:text-lg px-3 md:px-5 py-2 rounded-xl 
//               bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-cyan-400/30 
//               shadow-[0_0_10px_#00c6ff50] hover:shadow-[0_0_25px_#00c6ff80] 
//               transition-all duration-500 text-center"
//               onClick={() => navigate("/debugger")}
//             >
//               Code Insight
//             </div>

//             {/* 🤖 Ask Gemini Button (Animated Gradient) */}
//             <div
//               className="cursor-pointer font-bold text-white text-sm md:text-lg px-4 md:px-6 py-2 rounded-xl
//               bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-[length:200%_200%]
//               animate-gradientMove shadow-[0_0_15px_#00c6ff80] hover:scale-105 
//               transition-transform duration-500 text-center"
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//               Ask Dev
//             </div>

//             {/* ☰ History Button */}
//             <div className="relative group">
//               <div
//                 className="cursor-pointer text-white font-bold text-sm md:text-lg px-3 md:px-4 py-2 rounded-lg 
//                 transition-all duration-300 hover:bg-gray-700 flex items-center gap-2 justify-center"
//                 onClick={() => setHistoryOpen(!historyOpen)}
//               >
//                 <span className="text-lg">☰</span>
//               </div>
//               <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-xs md:text-sm bg-gray-800 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-cyan-400">
//                 View Chat History
//               </span>
//             </div>

//             {/* 👤 User Button */}
//             <UserButton afterSignOutUrl="/" className="ml-2" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       {/* 🔹 Jarvis Voice Assistant */}
//       <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

//       {/* 🔹 Chat Modal */}
//       {chatOpen && (
//         <ChatModal
//           username={username}
//           onClose={() => setChatOpen(false)}
//           ref={chatRef}
//         />
//       )}

//       {/* 🔹 History Modal */}
//       {historyOpen && (
//         <HistoryModal
//           username={username}
//           onClose={() => setHistoryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;



// uper one will work perfect


import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  UserButton,
  useUser,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import ChatModal from "./chatModel";
import HistoryModal from "./HistoryModal";
import JarvisVoice from "./Jarvis.jsx";
import logo from "../assets/g2.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const username = user?.email?.split("@")[0] || "Guest";

  const [chatOpen, setChatOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
  const chatRef = useRef(null);

  const handleWake = useCallback(() => setChatOpen(true), []);
  const handleVoiceQuestion = useCallback(
    (q) => {
      console.log("🎙️ Jarvis recognized question:", q);
      if (!chatOpen) {
        setPendingVoiceQuestion(q);
        setChatOpen(true);
      } else {
        chatRef.current?.askByVoice(q);
      }
    },
    [chatOpen]
  );

  useEffect(() => {
    if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
      chatRef.current.askByVoice(pendingVoiceQuestion);
      setPendingVoiceQuestion(null);
    }
  }, [chatOpen, pendingVoiceQuestion]);

  return (
    <>
      {/* 🔹 Navbar - Fixed at Top */}
      <div
        className="fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row 
        items-center justify-between px-6 md:px-[100px] h-auto md:h-[95px] 
        border-b border-gray-800 bg-[#141319]/95 backdrop-blur-md 
        shadow-[0_0_10px_#00c6ff40] py-4 md:py-0"
      >
        {/* 🔹 Logo Section */}
        <div className="logo flex items-center group mb-4 md:mb-0">
          <img
            src={logo}
            alt="R-Dev Logo"
            className="h-14 md:h-20 w-auto transition-all duration-500 ease-in-out 
            group-hover:drop-shadow-[0_0_20px_#00c6ff] mix-blend-screen brightness-200 contrast-125"
          />
          <span className="ml-3 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text tracking-wide"></span>
        </div>

        {/* 🔹 Icons / Buttons Section */}
        <div className="icons flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-[20px] w-full md:w-auto justify-center md:justify-end">
          <SignedIn>
            {/* 🧠 Code Insight Button */}
            <div
              className="relative cursor-pointer text-white font-semibold text-sm md:text-lg px-3 md:px-5 py-2 rounded-xl 
              bg-[rgba(255,255,255,0.05)] backdrop-blur-md border border-cyan-400/30 
              shadow-[0_0_10px_#00c6ff50] hover:shadow-[0_0_25px_#00c6ff80] 
              transition-all duration-500 text-center"
              onClick={() => navigate("/debugger")}
            >
              Code Insight
            </div>

            {/* 🤖 Ask CV Button */}
            <div
              className="cursor-pointer font-bold text-white text-sm md:text-lg px-4 md:px-6 py-2 rounded-xl
              bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-[length:200%_200%]
              animate-gradientMove shadow-[0_0_15px_#00c6ff80] hover:scale-105 
              transition-transform duration-500 text-center"
              onClick={() => setChatOpen(!chatOpen)}
            >
              Ask CV
            </div>

            {/* ☰ History Button */}
            <div className="relative group">
              <div
                className="cursor-pointer text-white font-bold text-sm md:text-lg px-3 md:px-4 py-2 rounded-lg 
                transition-all duration-300 hover:bg-gray-700 flex items-center gap-2 justify-center"
                onClick={() => setHistoryOpen(!historyOpen)}
              >
                <span className="text-lg">☰</span>
              </div>
              <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-xs md:text-sm bg-gray-800 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg border border-cyan-400">
                View Chat History
              </span>
            </div>

            {/* 👤 User Button */}
            <UserButton afterSignOutUrl="/" className="ml-2" />
          </SignedIn>

          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </div>
      </div>

      {/* 🔹 Add Padding on Top to Avoid Content Overlap */}
      <div className="pt-[110px] md:pt-[100px]"></div>

      {/* 🔹 Jarvis Voice Assistant */}
      <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

      {/* 🔹 Chat Modal */}
      {chatOpen && (
        <ChatModal
          username={username}
          onClose={() => setChatOpen(false)}
          ref={chatRef}
        />
      )}

      {/* 🔹 History Modal */}
      {historyOpen && (
        <HistoryModal
          username={username}
          onClose={() => setHistoryOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;






// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   UserButton,
//   useUser,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
// } from "@clerk/clerk-react";
// import ChatModal from "./chatModel";
// import HistoryModal from "./HistoryModal";
// import JarvisVoice from "./Jarvis.jsx";
// import logo from "../assets/logo1.png";
// import { useTheme } from "../context/ThemeContext";

// const Navbar = () => {
//   const { user } = useUser();
//   const username = user?.email?.split("@")[0] || "Guest";

//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
//   const chatRef = useRef(null);

//   const { darkMode, toggleTheme, setDarkMode } = useTheme();

//   const handleWake = useCallback(() => {
//     setChatOpen(true);
//   }, []);

//   const handleVoiceQuestion = useCallback(
//     (q) => {
//       console.log("🎙️ Jarvis recognized question:", q);

//       // 🌙 Voice Commands for theme
//       if (q.includes("turn on dark mode")) {
//         setDarkMode(true);
//         return;
//       }
//       if (q.includes("turn off dark mode") || q.includes("light mode")) {
//         setDarkMode(false);
//         return;
//       }

//       if (!chatOpen) {
//         setPendingVoiceQuestion(q);
//         setChatOpen(true);
//       } else {
//         chatRef.current?.askByVoice(q);
//       }
//     },
//     [chatOpen, setDarkMode]
//   );

//   useEffect(() => {
//     if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
//       chatRef.current.askByVoice(pendingVoiceQuestion);
//       setPendingVoiceQuestion(null);
//     }
//   }, [chatOpen, pendingVoiceQuestion]);

//   return (
//     <>
//       {/* 🌟 Always Light Navbar */}
//       <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b bg-white border-gray-300 text-gray-900 shadow-sm">

//         {/* Logo */}
//         <div className="logo flex items-center group">
//           <img
//             src={logo}
//             alt="SmartAI Logo"
//             className="h-24 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
//           />
//         </div>

//         {/* Buttons Section */}
//         <div className="icons flex items-center gap-[20px] relative">
//           <SignedIn>
//             {/* Ask Gemini */}
//             <div
//               className="cursor-pointer font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 text-gray-900 hover:bg-gray-200"
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//               AskGemini
//             </div>

//             {/* 🌓 Toggle Theme Button (works globally, affects Home etc.) */}
//             <button
//               onClick={toggleTheme}
//               className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
//                 darkMode
//                   ? "bg-yellow-400 text-black hover:bg-yellow-300"
//                   : "bg-gray-800 text-white hover:bg-gray-900"
//               }`}
//             >
//               {darkMode ? "☀️ Light" : "🌙 Dark"}
//             </button>

//             {/* History Button */}
//             <div className="relative group">
//               <div
//                 className="cursor-pointer font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 text-gray-900 hover:bg-gray-200"
//                 onClick={() => setHistoryOpen(!historyOpen)}
//               >
//                 ☰
//               </div>
//               <span
//                 className="absolute left-1/2 -bottom-10 -translate-x-1/2 text-sm px-3 py-1 rounded-md transition-opacity duration-300 shadow-lg border bg-white text-gray-900 border-gray-400 opacity-0 group-hover:opacity-100"
//               >
//                 View Chat History
//               </span>
//             </div>

//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       {/* Jarvis */}
//       <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

//       {/* Chat & History Modals */}
//       {chatOpen && (
//         <ChatModal
//           username={username}
//           onClose={() => setChatOpen(false)}
//           ref={chatRef}
//         />
//       )}

//       {historyOpen && (
//         <HistoryModal
//           username={username}
//           onClose={() => setHistoryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;







// import React, { useState, useRef, useCallback, useEffect } from "react";
// import {
//   UserButton,
//   useUser,
//   SignedIn,
//   SignedOut,
//   RedirectToSignIn,
// } from "@clerk/clerk-react";
// import ChatModal from "./chatModel";
// import HistoryModal from "./HistoryModal";
// import JarvisVoice from "./Jarvis.jsx";
// import logo from "../assets/logo1.png";
// import { useTheme } from "../context/ThemeContext";


// const Navbar = () => {
//   const { user } = useUser();
//   const username = user?.email?.split("@")[0] || "Guest";

//   const [chatOpen, setChatOpen] = useState(false);
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [pendingVoiceQuestion, setPendingVoiceQuestion] = useState(null);
//   const chatRef = useRef(null);

//   const { darkMode, toggleTheme, setDarkMode } = useTheme();

//   const handleWake = useCallback(() => {
//     setChatOpen(true);
//   }, []);

//   const handleVoiceQuestion = useCallback(
//     (q) => {
//       console.log("🎙️ Jarvis recognized question:", q);

//       // 🌙 Voice Commands for theme
//       if (q.includes("turn on dark mode")) {
//         setDarkMode(true);
//         return;
//       }
//       if (q.includes("turn off dark mode") || q.includes("light mode")) {
//         setDarkMode(false);
//         return;
//       }

//       if (!chatOpen) {
//         setPendingVoiceQuestion(q);
//         setChatOpen(true);
//       } else {
//         chatRef.current?.askByVoice(q);
//       }
//     },
//     [chatOpen, setDarkMode]
//   );

//   useEffect(() => {
//     if (chatOpen && pendingVoiceQuestion && chatRef.current?.askByVoice) {
//       chatRef.current.askByVoice(pendingVoiceQuestion);
//       setPendingVoiceQuestion(null);
//     }
//   }, [chatOpen, pendingVoiceQuestion]);

//   return (
//     <>
//       <div
//         className={`nav flex items-center justify-between px-[100px] h-[90px] border-b 
//         ${darkMode ? "bg-[#141319] border-gray-800" : "bg-gray-100 border-gray-300"}`}
//       >
//         {/* Logo */}
//         <div className="logo flex items-center group">
//           <img
//             src={logo}
//             alt="SmartAI Logo"
//             className="h-24 w-auto transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
//           />
//         </div>

//         {/* Buttons Section */}
//         <div className="icons flex items-center gap-[20px] relative">
//           <SignedIn>
//             {/* 🌙 Theme Toggle Button */}
//             <button
//               onClick={toggleTheme}
//               className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
//                 darkMode
//                   ? "bg-yellow-400 text-black hover:bg-yellow-300"
//                   : "bg-gray-800 text-white hover:bg-gray-900"
//               }`}
//             >
//               {darkMode ? "☀️ Light" : "🌙 Dark"}
//             </button>

//             {/* AskGemini */}
//             <div
//               className={`cursor-pointer font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
//                 darkMode
//                   ? "text-white hover:bg-gray-700"
//                   : "text-black hover:bg-gray-300"
//               }`}
//               onClick={() => setChatOpen(!chatOpen)}
//             >
//               AskGemini
//             </div>

//             {/* History Button */}
//             <div className="relative group">
//               <div
//                 className={`cursor-pointer font-bold text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
//                   darkMode
//                     ? "text-white hover:bg-gray-700"
//                     : "text-black hover:bg-gray-300"
//                 }`}
//                 onClick={() => setHistoryOpen(!historyOpen)}
//               >
//                 ☰
//               </div>
//               <span
//                 className={`absolute left-1/2 -bottom-10 -translate-x-1/2 text-sm px-3 py-1 rounded-md transition-opacity duration-300 shadow-lg border ${
//                   darkMode
//                     ? "bg-gray-800 text-white border-cyan-400"
//                     : "bg-white text-black border-gray-400"
//                 } opacity-0 group-hover:opacity-100`}
//               >
//                 View Chat History
//               </span>
//             </div>

//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>

//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </div>
//       </div>

//       {/* Jarvis */}
//       <JarvisVoice onWake={handleWake} onQuestion={handleVoiceQuestion} />

//       {/* Chat & History Modals */}
//       {chatOpen && (
//         <ChatModal
//           username={username}
//           onClose={() => setChatOpen(false)}
//           ref={chatRef}
//         />
//       )}

//       {historyOpen && (
//         <HistoryModal
//           username={username}
//           onClose={() => setHistoryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Navbar;
