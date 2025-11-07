
// import React, { useState } from 'react';
// import axios from 'axios';

// const API = 'http://localhost:3000';

// const ChatModal = ({ username, onClose }) => {
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question, username });
//       setResponse(res.data.response);
//       setQuestion('');
//     } catch (err) {
//       console.error(err);
//       setResponse('Error fetching response');
//     }
//   };

//   const speakHandler = () => {
//     const utterance = new SpeechSynthesisUtterance(response);
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div className="fixed top-10 right-10 w-96 md:w-1/2 h-[80vh] bg-[#141319] p-6 shadow-2xl z-50 border border-gray-700 rounded-2xl flex flex-col">
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-white">AskGenie</h2>
//         <button 
//           onClick={onClose} 
//           className="text-red-500 font-bold text-lg hover:text-red-400 transition-colors"
//         >
//           X
//         </button>
//       </div>

//       {/* Response area */}
//       <div className="flex-grow overflow-y-auto bg-gray-900 p-4 rounded-lg mb-4 text-white">
//         {response ? <p>{response}</p> : <p className="text-gray-400">Your responses will appear here...</p>}
//       </div>

//       {/* Input form */}
//       <form onSubmit={submitHandler} className="flex flex-col gap-3">
//         <textarea
//           className="w-full h-28 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex-grow transition-all duration-300">
//             Send
//           </button>
//           <button 
//             type="button" 
//             onClick={speakHandler} 
//             className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-all duration-300"
//           >
//             Speak
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatModal;









// import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
// import axios from "axios";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";

//     // Male voice
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(
//       (v) =>
//         v.name.toLowerCase().includes("male") ||
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark")
//     );
//     if (maleVoice) utter.voice = maleVoice;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   const formatResponse = (text) => {
//     if (!text) return "";
//     return text
//       .split("\n")
//       .map(line => line.charAt(0).toUpperCase() + line.slice(1))
//       .join("\n\n");
//   };

//   const handleQuestion = async (q) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);
//       speak(formatted);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response at this time.";
//       setResponse(errorMsg);
//       speak(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({
//     askByVoice: (q) => handleQuestion(q),
//   }));

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await handleQuestion(question);
//   };

//   return (
//     <div className="fixed top-10 right-10 w-96 md:w-1/2 h-[80vh] bg-[#141319] p-6 shadow-2xl z-50 border border-gray-700 rounded-2xl flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-white">AskGemini</h2>
//         <button
//           onClick={onClose}
//           className="text-red-500 font-bold text-lg hover:text-red-400 transition-colors"
//         >
//           X
//         </button>
//       </div>

//       <div className="flex-grow overflow-y-auto bg-gray-900 p-4 rounded-lg mb-4 text-white">
//         {loading ? (
//           <p className="text-gray-400 animate-pulse">Processing your question...</p>
//         ) : response ? (
//           response.split("\n\n").map((para, idx) => <p key={idx} className="mb-2">{para}</p>)
//         ) : (
//           <p className="text-gray-400">Your responses will appear here...</p>
//         )}
//       </div>

//       <form onSubmit={submitHandler} className="flex flex-col gap-3">
//         <textarea
//           className="w-full h-28 p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex-grow transition-all duration-300">
//             Send
//           </button>
//           <button
//             type="button"
//             onClick={() => speak(response)}
//             className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition-all duration-300"
//           >
//             Speak
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;



// import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
// import axios from "axios";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";

//     // Male voice
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(
//       (v) =>
//         v.name.toLowerCase().includes("male") ||
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark")
//     );
//     if (maleVoice) utter.voice = maleVoice;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   const formatResponse = (text) => {
//     if (!text) return "";
//     // Split response into key points and other text
//     // We'll treat lines starting with "-" or "*" as key points
//     return text
//       .split("\n")
//       .map(line => line.trim())
//       .filter(line => line.length > 0);
//   };

//   const handleQuestion = async (q) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);
//       speak(res.data.response);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response at this time.";
//       setResponse([errorMsg]);
//       speak(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({
//     askByVoice: (q) => handleQuestion(q),
//   }));

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await handleQuestion(question);
//   };

//   return (
//     <div className="fixed top-10 right-10 w-96 md:w-1/2 h-[80vh] bg-[#1e1e2f] p-6 shadow-2xl z-50 border border-gray-700 rounded-2xl flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-[#f5f5f5]">AskGemini</h2>
//         <button
//           onClick={onClose}
//           className="text-red-500 font-bold text-lg hover:text-red-400 transition-colors"
//         >
//           X
//         </button>
//       </div>

//       {/* Response Area */}
//       <div className="flex-grow overflow-y-auto bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] p-4 rounded-lg mb-4">
//         {loading ? (
//           <p className="text-white-400 animate-pulse">Processing your question...</p>
//         ) : response.length > 0 ? (
//           response.map((line, idx) => {
//             const isKeyPoint = line.startsWith("-") || line.startsWith("*");
//             return (
//               <p
//                 key={idx}
//                 className={`mb-2 leading-relaxed ${isKeyPoint ? "text-white font-semibold" : "text-[#a0e0ff]"}`}
//               >
//                 {line}
//               </p>
//             );
//           })
//         ) : (
//           <p className="text-gray-400">Your responses will appear here...</p>
//         )}
//       </div>

//       {/* Input Area */}
//       <form onSubmit={submitHandler} className="flex flex-col gap-3">
//         <textarea
//           className="w-full h-28 p-3 rounded-lg bg-[#2b2b3d] text-[#ffffff] placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg flex-grow text-white font-semibold transition-all duration-300">
//             Send
//           </button>
//           <button
//             type="button"
//             onClick={() => speak(response.join("\n"))}
//             className="bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white font-semibold transition-all duration-300"
//           >
//             Speak
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;




// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
// import axios from "axios";
// import { FiRefreshCw } from "react-icons/fi"; // Import reset icon

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const idleTimer = useRef(null);
// const genuineQuestions = [
//   "Hey Rajan... lagta hai aaj kuch puchne ka mood nahi hai?",
//   "Rajan, mood thoda down lag raha hai kya? Thoda share karo na.",
//   "Girlfriend se baat nahi ho rahi kya? Chalo baat karte hain.",
//   "Chalo kuch interesting explore karte hain. Kya seekhna hai aaj?",
//   "Aaj ka din kaisa ja raha hai? Kuch naya try karne ka plan hai?",
//   "Rajan, thoda relax karte hain... kuch mazedaar baat karein?",
//   "Kya soch rahe ho? Ek random fact sunna chahoge?",
//   "Aaj kaafi shaant lag rahe ho... ek fun question karu?"
// ];

//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";

//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(
//       (v) =>
//         v.name.toLowerCase().includes("male") ||
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark")
//     );
//     if (maleVoice) utter.voice = maleVoice;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   const formatResponse = (text) => {
//     if (!text) return [];
//     return text
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line.length > 0);
//   };

//   const handleQuestion = async (q) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     clearTimeout(idleTimer.current);
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);
//       speak(res.data.response);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response at this time.";
//       setResponse([errorMsg]);
//       speak(errorMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//     }
//   };

//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const randomIndex = Math.floor(Math.random() * genuineQuestions.length);
//       const prompt = genuineQuestions[randomIndex];
//       setResponse((prev) => [...prev, prompt]);
//       speak(prompt);
//     }, 14000);
//   };

//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({
//     askByVoice: (q) => handleQuestion(q),
//   }));

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await handleQuestion(question);
//   };

//   // Clear both question input and response
//   const resetChat = () => {
//     setQuestion("");
//     setResponse([]);
//   };

//   return (
//     <div className="fixed top-10 right-10 w-96 md:w-1/2 h-[80vh] bg-[#1e1e2f] p-6 shadow-2xl z-50 border border-gray-700 rounded-2xl flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-[#f5f5f5]">AskGemini</h2>
//         <div className="flex gap-3 items-center">
//           <button
//             onClick={resetChat}
//             title="Reset Chat"
//             className="text-cyan-400 hover:text-cyan-200 transition-colors text-xl"
//           >
//             <FiRefreshCw />
//           </button>
//           <button
//             onClick={onClose}
//             className="text-red-500 font-bold text-lg hover:text-red-400 transition-colors"
//           >
//             X
//           </button>
//         </div>
//       </div>

//       {/* Response Area */}
//       <div className="flex-grow overflow-y-auto bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] p-4 rounded-lg mb-4 flex flex-col gap-2">
//         {loading ? (
//           <p className="text-gray-400 animate-pulse">Processing your question...</p>
//         ) : response.length > 0 ? (
//           response.map((line, idx) => (
//             <p key={idx} className="mb-2 leading-relaxed text-white">
//               {line}
//             </p>
//           ))
//         ) : (
//           <p className="text-gray-400">Your responses will appear here...</p>
//         )}
//       </div>

//       {/* Input Area */}
//       <form onSubmit={submitHandler} className="flex flex-col gap-3">
//         <textarea
//           className="w-full h-28 p-3 rounded-lg bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg flex-grow text-white font-semibold transition-all duration-300">
//             Send
//           </button>
//           <button
//             type="button"
//             onClick={() => speak(response.join("\n"))}
//             className="bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white font-semibold transition-all duration-300"
//           >
//             Speak
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;






// import React, {
//   useState,
//   useEffect,
//   forwardRef,
//   useImperativeHandle,
//   useRef,
// } from "react";
// import axios from "axios";
// import { FiRefreshCw } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fromVoice, setFromVoice] = useState(false); // 🔹 track if question came from mic
//   const idleTimer = useRef(null);
//   const recognitionRef = useRef(null);

//   const genuineQuestions = [
//     "Hey Rajan... lagta hai aaj kuch puchne ka mood nahi hai?",
//     "Rajan, mood thoda down lag raha hai kya? Thoda share karo na.",
//     "Girlfriend se baat nahi ho rahi kya? Chalo baat karte hain.",
//     "Chalo kuch interesting explore karte hain. Kya seekhna hai aaj?",
//     "Aaj ka din kaisa ja raha hai? Kuch naya try karne ka plan hai?",
//     "Rajan, thoda relax karte hain... kuch mazedaar baat karein?",
//     "Kya soch rahe ho? Ek random fact sunna chahoge?",
//     "Aaj kaafi shaant lag rahe ho... ek fun question karu?",
//   ];

//   /** 🎤 SPEECH SYNTHESIS **/
//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;

//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(
//       (v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//     );
//     if (maleVoice) utter.voice = maleVoice;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   /** 📜 FORMAT RESPONSE **/
//   const formatResponse = (text) => {
//     if (!text) return [];
//     return text
//       .split("\n")
//       .map((line) => line.trim())
//       .filter((line) => line.length > 0);
//   };

//   /** 🚀 HANDLE QUESTION **/
//   const handleQuestion = async (q, voiceMode = false) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     clearTimeout(idleTimer.current);
//     setFromVoice(voiceMode);

//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);

//       // 🔹 Speak only if question was via voice or Jarvis
//       if (voiceMode || fromVoice) speak(res.data.response);

//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response at this time.";
//       setResponse([errorMsg]);
//       if (voiceMode || fromVoice) speak(errorMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//       setFromVoice(false);
//     }
//   };

//   /** 💬 IDLE CHATTER **/
//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const prompt =
//         genuineQuestions[Math.floor(Math.random() * genuineQuestions.length)];
//       setResponse((prev) => [...prev, prompt]);
//       speak(prompt);
//     }, 14000);
//   };

//   /** 🎧 VOICE INPUT HANDLER **/
//   const startVoiceInput = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser!");
//       return;
//     }

//     if (recognitionRef.current) recognitionRef.current.stop();

//     const rec = new SpeechRecognition();
//     rec.lang = "en-US";
//     rec.interimResults = false;
//     rec.continuous = false;

//     rec.onstart = () => console.log("🎙️ Listening for question...");
//     rec.onerror = (e) => console.warn("Speech error:", e.error);
//     rec.onresult = (e) => {
//       const transcript = Array.from(e.results)
//         .map((r) => r[0].transcript)
//         .join("")
//         .trim();
//       console.log("🗣️ Heard question:", transcript);
//       setQuestion(transcript);
//       handleQuestion(transcript, true); // 🔹 true => voice mode
//     };

//     recognitionRef.current = rec;
//     rec.start();
//   };

//   /** 🧠 INITIALIZE **/
//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion, true);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({
//     askByVoice: (q) => handleQuestion(q, true),
//   }));

//   /** ✉️ FORM SUBMIT **/
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     await handleQuestion(question, false);
//   };

//   /** ♻️ RESET **/
//   const resetChat = () => {
//     setQuestion("");
//     setResponse([]);
//   };

//   /** 🧩 UI **/
//   return (
//     <div className="fixed top-10 right-10 w-96 md:w-1/2 h-[80vh] bg-[#1e1e2f] p-6 shadow-2xl z-50 border border-gray-700 rounded-2xl flex flex-col">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-cyan-400">AskGemini</h2>
//         <div className="flex gap-3 items-center">
//           <button
//             onClick={resetChat}
//             title="Reset Chat"
//             className="text-cyan-400 hover:text-cyan-200 transition-colors text-xl"
//           >
//             <FiRefreshCw />
//           </button>
//           <button
//             onClick={onClose}
//             className="text-red-500 font-bold text-lg hover:text-red-400 transition-colors"
//           >
//             X
//           </button>
//         </div>
//       </div>

//       {/* Response Area */}
//       <div className="flex-grow overflow-y-auto bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] p-4 rounded-lg mb-4 flex flex-col gap-2">
//         {loading ? (
//           <p className="text-gray-400 animate-pulse">Processing your question...</p>
//         ) : response.length > 0 ? (
//           response.map((line, idx) => (
//             <p key={idx} className="mb-2 leading-relaxed text-white">
//               {line}
//             </p>
//           ))
//         ) : (
//           <p className="text-gray-400">Your responses will appear here...</p>
//         )}
//       </div>

//       {/* Input Area */}
//       <form onSubmit={submitHandler} className="flex flex-col gap-3">
//         <textarea
//           className="w-full h-28 p-3 rounded-lg bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={startVoiceInput}
//             className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
//           >
//             <FaMicrophone /> Speak
//           </button>
//           <button
//             type="submit"
//             className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg flex-grow text-white font-semibold transition-all duration-300"
//           >
//             Send
//           </button>
//           <button
//             type="button"
//             onClick={() => speak(response.join("\n"))}
//             className="bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white font-semibold transition-all duration-300"
//           >
//             🔊
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;




// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
// import axios from "axios";
// import { FiRefreshCw } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const idleTimer = useRef(null);
//   const recognitionRef = useRef(null);
//   const voiceTimeout = useRef(null);

//   const genuineQuestions = [
//     "Hey Rajan... lagta hai aaj kuch puchne ka mood nahi hai?",
//     "Rajan, mood thoda down lag raha hai kya? Thoda share karo na.",
//     "Girlfriend se baat nahi ho rahi kya? Chalo baat karte hain.",
//     "Chalo kuch interesting explore karte hain. Kya seekhna hai aaj?",
//     "Aaj ka din kaisa ja raha hai? Kuch naya try karne ka plan hai?",
//     "Rajan, thoda relax karte hain... kuch mazedaar baat karein?",
//     "Kya soch rahe ho? Ek random fact sunna chahoge?",
//     "Aaj kaafi shaant lag rahe ho... ek fun question karu?",
//   ];

//   /** 🗣️ SPEAK **/
//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;

//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;

//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(
//       (v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//     );
//     if (maleVoice) utter.voice = maleVoice;

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   /** 📜 FORMAT RESPONSE **/
//   const formatResponse = (text) => text?.split("\n").map(line => line.trim()).filter(line => line.length > 0) || [];

//   /** 🚀 HANDLE QUESTION **/
//   const handleQuestion = async (q) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     clearTimeout(idleTimer.current);
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);
//       speak(res.data.response);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response right now.";
//       setResponse([errorMsg]);
//       speak(errorMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//     }
//   };

//   /** 💬 IDLE CHAT **/
//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const prompt = genuineQuestions[Math.floor(Math.random() * genuineQuestions.length)];
//       setResponse(prev => [...prev, prompt]);
//       speak(prompt);
//     }, 14000);
//   };

//   /** 🎤 VOICE INPUT (Speak button) **/
//   const startVoiceInput = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");

//     // Stop any old recognition session
//     if (recognitionRef.current) recognitionRef.current.stop();

//     const rec = new SpeechRecognition();
//     rec.lang = "en-US";
//     rec.continuous = true;      // ✅ continuous for better input
//     rec.interimResults = true;   // ✅ show partial transcript
//     rec.maxAlternatives = 1;

//     rec.onresult = (e) => {
//       let transcript = "";
//       for (let i = e.resultIndex; i < e.results.length; ++i) {
//         transcript += e.results[i][0].transcript;
//       }
//       transcript = transcript.trim();
//       setQuestion(transcript);

//       // Auto-send 1 second after user stops speaking
//       if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
//       voiceTimeout.current = setTimeout(() => handleQuestion(transcript), 1000);
//     };

//     rec.onerror = (e) => console.warn("SpeechRecognition error:", e.error);
//     rec.onend = () => {
//       // Stop after recognition ended
//       recognitionRef.current = null;
//     };

//     recognitionRef.current = rec;
//     rec.start();
//   };

//   /** 🧠 INITIALIZE **/
//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({
//     askByVoice: (q) => handleQuestion(q),
//   }));

//   const submitHandler = async (e) => { e.preventDefault(); await handleQuestion(question); };
//   const resetChat = () => { setQuestion(""); setResponse([]); };

//   return (
//     <div className="fixed top-10 right-10 w-96 md:w-1/2 h-[80vh] bg-[#1e1e2f] p-6 shadow-2xl z-50 border border-gray-700 rounded-2xl flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-cyan-400">AskGemini</h2>
//         <div className="flex gap-3 items-center">
//           <button onClick={resetChat} title="Reset Chat" className="text-cyan-400 hover:text-cyan-200 transition-colors text-xl">
//             <FiRefreshCw />
//           </button>
//           <button onClick={onClose} className="text-red-500 font-bold text-lg hover:text-red-400 transition-colors">X</button>
//         </div>
//       </div>

//       <div className="flex-grow overflow-y-auto bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] p-4 rounded-lg mb-4 flex flex-col gap-2">
//         {loading ? <p className="text-gray-400 animate-pulse">Processing your question...</p> :
//           response.length > 0 ? response.map((line, idx) => <p key={idx} className="mb-2 leading-relaxed text-white">{line}</p>) :
//           <p className="text-gray-400">Your responses will appear here...</p>}
//       </div>

//       <form onSubmit={submitHandler} className="flex flex-col gap-3">
//         <textarea
//           className="w-full h-28 p-3 rounded-lg bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={e => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button type="button" onClick={startVoiceInput} className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2">
//             <FaMicrophone /> Speak
//           </button>
//           <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 p-3 rounded-lg flex-grow text-white font-semibold transition-all duration-300">Send</button>
//           <button type="button" onClick={() => speak(response.join("\n"))} className="bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white font-semibold transition-all duration-300">🔊</button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;






// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
// import axios from "axios";
// import { FiRefreshCw } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const idleTimer = useRef(null);
//   const recognitionRef = useRef(null);
//   const voiceTimeout = useRef(null);

//   const genuineQuestions = [
//     "Hey Rajan... lagta hai aaj kuch puchne ka mood nahi hai?",
//     "Rajan, mood thoda down lag raha hai kya? Thoda share karo na.",
//     "Girlfriend se baat nahi ho rahi kya? Chalo baat karte hain.",
//     "Chalo kuch interesting explore karte hain. Kya seekhna hai aaj?",
//     "Aaj ka din kaisa ja raha hai? Kuch naya try karne ka plan hai?",
//     "Rajan, thoda relax karte hain... kuch mazedaar baat karein?",
//     "Kya soch rahe ho? Ek random fact sunna chahoge?",
//     "Aaj kaafi shaant lag rahe ho... ek fun question karu?",
//   ];

//   /** SPEAK **/
//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(v => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("mark"));
//     if (maleVoice) utter.voice = maleVoice;
//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   const formatResponse = (text) => text?.split("\n").map(line => line.trim()).filter(line => line.length > 0) || [];

//   /** HANDLE QUESTION **/
//   const handleQuestion = async (q) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     clearTimeout(idleTimer.current);
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);
//       speak(res.data.response);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response right now.";
//       setResponse([errorMsg]);
//       speak(errorMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//     }
//   };

//   /** IDLE CHAT **/
//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const prompt = genuineQuestions[Math.floor(Math.random() * genuineQuestions.length)];
//       setResponse(prev => [...prev, prompt]);
//       speak(prompt);
//     }, 14000);
//   };

//   /** VOICE INPUT **/
//   const startVoiceInput = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");
//     if (recognitionRef.current) recognitionRef.current.stop();

//     const rec = new SpeechRecognition();
//     rec.lang = "en-US";
//     rec.continuous = true;
//     rec.interimResults = true;

//     rec.onresult = (e) => {
//       let transcript = "";
//       for (let i = e.resultIndex; i < e.results.length; ++i) {
//         transcript += e.results[i][0].transcript;
//       }
//       transcript = transcript.trim();
//       setQuestion(transcript);

//       if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
//       voiceTimeout.current = setTimeout(() => handleQuestion(transcript), 1000);
//     };

//     rec.onerror = (e) => console.warn("SpeechRecognition error:", e.error);
//     rec.onend = () => { recognitionRef.current = null; };
//     recognitionRef.current = rec;
//     rec.start();
//   };

//   /** INITIALIZE **/
//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({ askByVoice: (q) => handleQuestion(q) }));

//   const submitHandler = async (e) => { e.preventDefault(); await handleQuestion(question); };
//   const resetChat = () => { setQuestion(""); setResponse([]); };

//   return (
//     <div className="fixed top-8 right-8 w-[550px] md:w-[700px] h-[85vh] bg-[#1e1e2f] p-6 shadow-2xl z-50 border border-gray-700 rounded-3xl flex flex-col">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-3xl font-bold text-cyan-400">AskGemini</h2>
//         <div className="flex gap-4 items-center">
//           <button onClick={resetChat} title="Reset Chat" className="text-cyan-400 hover:text-cyan-200 text-2xl"><FiRefreshCw /></button>
//           <button onClick={onClose} className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
//         </div>
//       </div>

//       <div className="flex-grow overflow-y-auto bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] p-5 rounded-2xl mb-5 flex flex-col gap-3">
//         {loading ? <p className="text-gray-400 animate-pulse">Processing your question...</p> :
//           response.length > 0 ? response.map((line, idx) => <p key={idx} className="mb-2 leading-relaxed text-white text-lg">{line}</p>) :
//           <p className="text-gray-400 text-lg">Your responses will appear here...</p>}
//       </div>

//       <form onSubmit={submitHandler} className="flex flex-col gap-4">
//         <textarea
//           className="w-full h-36 p-4 rounded-xl bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner text-lg"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={e => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-4">
//           <button type="button" onClick={startVoiceInput} className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 text-lg"><FaMicrophone /> Speak</button>
//           <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 p-4 rounded-xl flex-grow text-white font-semibold text-lg">Send</button>
//           <button type="button" onClick={() => speak(response.join("\n"))} className="bg-green-600 hover:bg-green-700 p-4 rounded-xl text-white font-semibold text-lg">🔊</button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;












// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
// import axios from "axios";
// import { FiRefreshCw } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const idleTimer = useRef(null);
//   const recognitionRef = useRef(null);
//   const voiceTimeout = useRef(null);

//   const genuineQuestions = [
//     "Hey Rajan... lagta hai aaj kuch puchne ka mood nahi hai?",
//     "Rajan, mood thoda down lag raha hai kya? Thoda share karo na.",
//     "Girlfriend se baat nahi ho rahi kya? Chalo baat karte hain.",
//     "Chalo kuch interesting explore karte hain. Kya seekhna hai aaj?",
//     "Aaj ka din kaisa ja raha hai? Kuch naya try karne ka plan hai?",
//     "Rajan, thoda relax karte hain... kuch mazedaar baat karein?",
//     "Kya soch rahe ho? Ek random fact sunna chahoge?",
//     "Aaj kaafi shaant lag rahe ho... ek fun question karu?",
//   ];

//   /** SPEAK **/
//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(v => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("mark"));
//     if (maleVoice) utter.voice = maleVoice;
//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   const formatResponse = (text) => text?.split("\n").map(line => line.trim()).filter(line => line.length > 0) || [];

//   /** HANDLE QUESTION **/
//   const handleQuestion = async (q, fromVoice = false) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     clearTimeout(idleTimer.current);
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);

//       // ✅ Only speak if this came from voice
//       if (fromVoice) speak(res.data.response);

//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response right now.";
//       setResponse([errorMsg]);
//       if (fromVoice) speak(errorMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//     }
//   };

//   /** IDLE CHAT **/
//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const prompt = genuineQuestions[Math.floor(Math.random() * genuineQuestions.length)];
//       setResponse(prev => [...prev, prompt]);
//       speak(prompt);
//     }, 30000);
//   };

//   /** VOICE INPUT **/
//   const startVoiceInput = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");
//     if (recognitionRef.current) recognitionRef.current.stop();

//     const rec = new SpeechRecognition();
//     rec.lang = "en-US";
//     rec.continuous = true;
//     rec.interimResults = true;

//     rec.onresult = (e) => {
//       let transcript = "";
//       for (let i = e.resultIndex; i < e.results.length; ++i) {
//         transcript += e.results[i][0].transcript;
//       }
//       transcript = transcript.trim();
//       setQuestion(transcript);

//       if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
//       voiceTimeout.current = setTimeout(() => handleQuestion(transcript, true), 1000); // fromVoice=true
//     };

//     rec.onerror = (e) => console.warn("SpeechRecognition error:", e.error);
//     rec.onend = () => { recognitionRef.current = null; };
//     recognitionRef.current = rec;
//     rec.start();
//   };

//   /** INITIALIZE **/
//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion, false);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({ askByVoice: (q) => handleQuestion(q, true) }));

//   const submitHandler = async (e) => { e.preventDefault(); await handleQuestion(question, false); }; // typing → no speech
//   const resetChat = () => { setQuestion(""); setResponse([]); };

//   return (
//     <div className="fixed top-8 right-8 w-[550px] md:w-[700px] h-[85vh] bg-[#1e1e2f] p-6 shadow-2xl z-50 border border-gray-700 rounded-3xl flex flex-col">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-3xl font-bold text-cyan-400">AskGemini</h2>
//         <div className="flex gap-4 items-center">
//           <button onClick={resetChat} title="Reset Chat" className="text-cyan-400 hover:text-cyan-200 text-2xl"><FiRefreshCw /></button>
//           <button onClick={onClose} className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
//         </div>
//       </div>

//       <div className="flex-grow overflow-y-auto bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] p-5 rounded-2xl mb-5 flex flex-col gap-3">
//         {loading ? <p className="text-gray-400 animate-pulse">Processing your question...</p> :
//           response.length > 0 ? response.map((line, idx) => <p key={idx} className="mb-2 leading-relaxed text-white text-lg">{line}</p>) :
//           <p className="text-gray-400 text-lg">Your responses will appear here...</p>}
//       </div>

//       <form onSubmit={submitHandler} className="flex flex-col gap-4">
//         <textarea
//           className="w-full h-36 p-4 rounded-xl bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner text-lg"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={e => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-4">
//           <button type="button" onClick={startVoiceInput} className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 text-lg"><FaMicrophone /> Speak</button>
//           <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 p-4 rounded-xl flex-grow text-white font-semibold text-lg">Send</button>
//           <button type="button" onClick={() => speak(response.join("\n"))} className="bg-green-600 hover:bg-green-700 p-4 rounded-xl text-white font-semibold text-lg">🔊</button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;






// use the lower code for industry level


// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
// import axios from "axios";
// import { FiRefreshCw } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [question, setQuestion] = useState(initialVoiceQuestion);
//   const [response, setResponse] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const idleTimer = useRef(null);
//   const recognitionRef = useRef(null);
//   const voiceTimeout = useRef(null);

//   const genuineQuestions = [
//     "Hey Rajan... lagta hai aaj kuch puchne ka mood nahi hai?",
//     "Rajan, mood thoda down lag raha hai kya? Thoda share karo na.",
//     "Girlfriend se baat nahi ho rahi kya? Chalo baat karte hain.",
//     "Chalo kuch interesting explore karte hain. Kya seekhna hai aaj?",
//     "Aaj ka din kaisa ja raha hai? Kuch naya try karne ka plan hai?",
//     "Rajan, thoda relax karte hain... kuch mazedaar baat karein?",
//     "Kya soch rahe ho? Ek random fact sunna chahoge?",
//     "Aaj kaafi shaant lag rahe ho... ek fun question karu?",
//   ];

//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(v => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("mark"));
//     if (maleVoice) utter.voice = maleVoice;
//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   const formatResponse = (text) => text?.split("\n").map(line => line.trim()).filter(line => line.length > 0) || [];

//   const handleQuestion = async (q, fromVoice = false) => {
//     if (!q?.trim()) return;
//     setLoading(true);
//     clearTimeout(idleTimer.current);
//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: q, username });
//       const formatted = formatResponse(res.data.response);
//       setResponse(formatted);

//       if (fromVoice) speak(res.data.response);

//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       const errorMsg = "Sorry, I could not fetch a response right now.";
//       setResponse([errorMsg]);
//       if (fromVoice) speak(errorMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//     }
//   };

//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const prompt = genuineQuestions[Math.floor(Math.random() * genuineQuestions.length)];
//       setResponse(prev => [...prev, prompt]);
//       speak(prompt);
//     }, 30000);
//   };

//   const startVoiceInput = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");
//     if (recognitionRef.current) recognitionRef.current.stop();

//     const rec = new SpeechRecognition();
//     rec.lang = "en-US";
//     rec.continuous = true;
//     rec.interimResults = true;

//     rec.onresult = (e) => {
//       let transcript = "";
//       for (let i = e.resultIndex; i < e.results.length; ++i) {
//         transcript += e.results[i][0].transcript;
//       }
//       transcript = transcript.trim();
//       setQuestion(transcript);

//       if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
//       voiceTimeout.current = setTimeout(() => handleQuestion(transcript, true), 1000);
//     };

//     rec.onerror = (e) => console.warn("SpeechRecognition error:", e.error);
//     rec.onend = () => { recognitionRef.current = null; };
//     recognitionRef.current = rec;
//     rec.start();
//   };

//   useEffect(() => {
//     if (initialVoiceQuestion) handleQuestion(initialVoiceQuestion, false);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({ askByVoice: (q) => handleQuestion(q, true) }));

//   const submitHandler = async (e) => { e.preventDefault(); await handleQuestion(question, false); };
//   const resetChat = () => { setQuestion(""); setResponse([]); };

//   return (
//     <div className="fixed top-8 right-8 w-[550px] md:w-[700px] h-[85vh] bg-[#1e1e2f] p-6 shadow-2xl z-50 border border-gray-700 rounded-3xl flex flex-col">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-3xl font-bold text-cyan-400">AskGemini</h2>
//         <div className="flex gap-4 items-center">
//           <button onClick={resetChat} title="Reset Chat" className="text-cyan-400 hover:text-cyan-200 text-2xl"><FiRefreshCw /></button>
//           <button onClick={onClose} className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
//         </div>
//       </div>

//       <div className="flex-grow overflow-y-auto bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] p-5 rounded-2xl mb-5 flex flex-col gap-3">
//         {loading ? <p className="text-gray-400 animate-pulse">Processing your question...</p> :
//           response.length > 0 ? response.map((line, idx) => <p key={idx} className="mb-2 leading-relaxed text-white text-lg">{line}</p>) :
//           <p className="text-gray-400 text-lg">Your responses will appear here...</p>}
//       </div>

//       <form onSubmit={submitHandler} className="flex flex-col gap-4">
//         <textarea
//           className="w-full h-36 p-4 rounded-xl bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner text-lg"
//           placeholder="Ask your question..."
//           value={question}
//           onChange={e => setQuestion(e.target.value)}
//         />
//         <div className="flex gap-4">
//           <button type="button" onClick={startVoiceInput} className="bg-purple-600 hover:bg-purple-700 p-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 text-lg"><FaMicrophone /> Speak</button>
//           <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 p-4 rounded-xl flex-grow text-white font-semibold text-lg">Send</button>
//           <button type="button" onClick={() => speak(response.join("\n"))} className="bg-green-600 hover:bg-green-700 p-4 rounded-xl text-white font-semibold text-lg">🔊</button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;




// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
// import axios from "axios";
// import { FaMicrophone, FaCopy, FaTrash } from "react-icons/fa";
// import { FiRefreshCw } from "react-icons/fi";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [messages, setMessages] = useState([]); // {sender: 'user'|'ai', text: ''}
//   const [input, setInput] = useState(initialVoiceQuestion);
//   const [loading, setLoading] = useState(false);
//   const idleTimer = useRef(null);
//   const recognitionRef = useRef(null);
//   const voiceTimeout = useRef(null);
//   const chatEndRef = useRef(null);

//   // ====== Speech Synthesis ======
//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(v => /male|david|mark/i.test(v.name));
//     if (maleVoice) utter.voice = maleVoice;
//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   // ====== Append Message ======
//   const appendMessage = (sender, text) => {
//     setMessages(prev => [...prev, { sender, text }]);
//     scrollToBottom();
//   };

//   const scrollToBottom = () => {
//     setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
//   };

//   // ====== Idle Prompts ======
//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const prompts = [
//         "Hey there! Anything you want to ask me?",
//         "Need some coding help or tips?",
//         "Let's chat! What do you want to do today?",
//       ];
//       const prompt = prompts[Math.floor(Math.random() * prompts.length)];
//       appendMessage("ai", prompt);
//       speak(prompt);
//     }, 45000); // 45s idle
//   };

//   // ====== Send Message ======
//   const handleSend = async (text, fromVoice = false) => {
//     if (!text.trim()) return;
//     appendMessage("user", text);
//     setInput("");
//     setLoading(true);
//     clearTimeout(idleTimer.current);

//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: text, username });
//       const aiText = res.data.response || "Sorry, I didn't understand that.";
//       appendMessage("ai", aiText);
//       if (fromVoice) speak(aiText);
//     } catch (err) {
//       console.error(err);
//       const errMsg = "❌ Something went wrong. Try again!";
//       appendMessage("ai", errMsg);
//       if (fromVoice) speak(errMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//     }
//   };

//   // ====== Voice Input ======
//   const startVoiceInput = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");
//     if (recognitionRef.current) recognitionRef.current.stop();

//     const rec = new SpeechRecognition();
//     rec.lang = "en-US";
//     rec.continuous = true;
//     rec.interimResults = true;

//     rec.onresult = (e) => {
//       let transcript = "";
//       for (let i = e.resultIndex; i < e.results.length; i++) {
//         transcript += e.results[i][0].transcript;
//       }
//       setInput(transcript.trim());
//       if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
//       voiceTimeout.current = setTimeout(() => handleSend(transcript.trim(), true), 1000);
//     };

//     rec.onerror = (e) => console.warn("SpeechRecognition error:", e.error);
//     rec.onend = () => recognitionRef.current = null;
//     recognitionRef.current = rec;
//     rec.start();
//   };

//   // ====== Lifecycle ======
//   useEffect(() => {
//     if (initialVoiceQuestion) handleSend(initialVoiceQuestion);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({ askByVoice: (q) => handleSend(q, true) }));

//   const resetChat = () => setMessages([]);

//   // ====== Render ======
//   return (
//     <div className="fixed top-5 right-5 w-[90vw] md:w-[700px] h-[85vh] bg-gradient-to-br from-[#1e1e2f] to-[#2c2c45] p-5 shadow-2xl z-50 border border-gray-700 rounded-3xl flex flex-col">
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-3xl font-bold text-cyan-400">AskDev</h2>
//         <div className="flex gap-3 items-center">
//           <button onClick={resetChat} title="Reset Chat" className="text-cyan-400 hover:text-cyan-200 text-2xl"><FiRefreshCw /></button>
//           <button onClick={onClose} className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] rounded-2xl flex flex-col gap-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-700">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-[75%] p-3 rounded-xl text-lg ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-white"} shadow-md relative`}>
//               {msg.text}
//               <div className="flex justify-end gap-1 mt-1 absolute bottom-1 right-2">
//                 <button onClick={() => navigator.clipboard.writeText(msg.text)} className="text-xs text-gray-300 hover:text-white"><FaCopy /></button>
//                 <button onClick={() => setMessages(prev => prev.filter((_, i) => i !== idx))} className="text-xs text-gray-300 hover:text-white"><FaTrash /></button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {loading && <p className="text-gray-300 animate-pulse">AI is typing...</p>}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Input + Action Buttons */}
//       <form onSubmit={e => { e.preventDefault(); handleSend(input); }} className="flex flex-col gap-3 mt-3">
//         <textarea
//           className="w-full h-28 p-4 rounded-xl bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner text-lg"
//           placeholder="Ask anything..."
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleSend(input); } }}
//         />

//         <div className="flex gap-3">
//           {/* Speak Question */}
//           <button
//             type="button"
//             onClick={startVoiceInput}
//             className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white 
//                        bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 
//                        shadow-lg hover:scale-105 transition-transform duration-300"
//             title="Speak your question"
//           >
//             <FaMicrophone className="text-lg" /> Speak Question
//           </button>

//           {/* Send */}
//           <button
//             type="submit"
//             className="flex-grow px-5 py-3 rounded-xl font-semibold text-white 
//                        bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 
//                        shadow-lg hover:scale-105 transition-transform duration-300"
//           >
//             Send
//           </button>

//           {/* Listen / Speak All Responses */}
//           <button
//             type="button"
//             onClick={() => speak(messages.map(m => m.text).join("\n"))}
//             className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white 
//                        bg-gradient-to-r from-green-500 via-lime-500 to-emerald-600 
//                        shadow-lg hover:scale-105 transition-transform duration-300"
//             title="Listen to all responses"
//           >
//             🔊 Listen
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;


// ChatModal.jsx


// down code work for professional

// import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
// import axios from "axios";
// import { FaMicrophone, FaCopy, FaTrash } from "react-icons/fa";
// import { FiRefreshCw } from "react-icons/fi";

// const API = "http://localhost:3000";

// const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState(initialVoiceQuestion);
//   const [loading, setLoading] = useState(false);
//   const idleTimer = useRef(null);
//   const recognitionRef = useRef(null);
//   const voiceTimeout = useRef(null);
//   const chatEndRef = useRef(null);

//   // ====== Speech Synthesis ======
//   const speak = (text) => {
//     if (!text || !window.speechSynthesis) return;
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice = voices.find(v => /male|david|mark/i.test(v.name));
//     if (maleVoice) utter.voice = maleVoice;
//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   // ====== Append Message ======
//   const appendMessage = (sender, text) => {
//     setMessages(prev => [...prev, { sender, text }]);
//     scrollToBottom();
//   };

//   const scrollToBottom = () => {
//     setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
//   };

//   // ====== Idle Prompts ======
//   const startIdleTimer = () => {
//     clearTimeout(idleTimer.current);
//     idleTimer.current = setTimeout(() => {
//       const prompts = [
//         "Hey there! Anything you want to ask me?",
//         "Need some coding help or tips?",
//         "Let's chat! What do you want to do today?",
//       ];
//       const prompt = prompts[Math.floor(Math.random() * prompts.length)];
//       appendMessage("ai", prompt);
//       speak(prompt);
//     }, 45000);
//   };

//   // ====== Send Message ======
//   const handleSend = async (text, fromVoice = false) => {
//     if (!text.trim()) return;
//     appendMessage("user", text);
//     setInput("");
//     setLoading(true);
//     clearTimeout(idleTimer.current);

//     try {
//       const res = await axios.post(`${API}/getResponse`, { question: text, username });
//       const aiText = res.data.response || "Sorry, I didn't understand that.";
//       appendMessage("ai", aiText);
//       if (fromVoice) speak(aiText);
//     } catch (err) {
//       console.error(err);
//       const errMsg = "❌ Something went wrong. Try again!";
//       appendMessage("ai", errMsg);
//       if (fromVoice) speak(errMsg);
//     } finally {
//       setLoading(false);
//       startIdleTimer();
//     }
//   };

//   // ====== Voice Input ======
//   const startVoiceInput = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");
//     if (recognitionRef.current) recognitionRef.current.stop();

//     const rec = new SpeechRecognition();
//     rec.lang = "en-US";
//     rec.continuous = true;
//     rec.interimResults = true;

//     rec.onresult = (e) => {
//       let transcript = "";
//       for (let i = e.resultIndex; i < e.results.length; i++) {
//         transcript += e.results[i][0].transcript;
//       }
//       setInput(transcript.trim());
//       if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
//       voiceTimeout.current = setTimeout(() => handleSend(transcript.trim(), true), 1000);
//     };

//     rec.onerror = (e) => console.warn("SpeechRecognition error:", e.error);
//     rec.onend = () => recognitionRef.current = null;
//     recognitionRef.current = rec;
//     rec.start();
//   };

//   // ====== Lifecycle ======
//   useEffect(() => {
//     if (initialVoiceQuestion) handleSend(initialVoiceQuestion);
//     startIdleTimer();
//     return () => clearTimeout(idleTimer.current);
//   }, [initialVoiceQuestion]);

//   useImperativeHandle(ref, () => ({ askByVoice: (q) => handleSend(q, true) }));

//   const resetChat = () => setMessages([]);

//   // ====== Render ======
//   return (
//     <div className="fixed top-5 right-5 w-[90vw] md:w-[700px] h-[85vh] bg-gradient-to-br from-[#1e1e2f] to-[#2c2c45] p-5 shadow-2xl z-50 border border-gray-700 rounded-3xl flex flex-col">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-extrabold tracking-wide">
//           <span className="text-cyan-400 transition-transform hover:scale-110">Ask </span>
//           {/* <span className="text-purple-500 transition-transform hover:scale-110"></span> */}
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 transition-transform hover:scale-110">DEV</span>
//         </h2>

//         <div className="flex gap-3 items-center">
//           <button onClick={resetChat} title="Reset Chat" className="text-cyan-400 hover:text-cyan-200 text-2xl"><FiRefreshCw /></button>
//           <button onClick={onClose} className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
//         </div>
//       </div>

//       {/* Chat Window */}
//       <div className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] rounded-2xl flex flex-col gap-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-700">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-[75%] p-3 rounded-xl text-lg ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-white"} shadow-md relative`}>
//               {msg.text}
//               <div className="flex justify-end gap-1 mt-1 absolute bottom-1 right-2">
//                 <button onClick={() => navigator.clipboard.writeText(msg.text)} className="text-xs text-gray-300 hover:text-white"><FaCopy /></button>
//                 <button onClick={() => setMessages(prev => prev.filter((_, i) => i !== idx))} className="text-xs text-gray-300 hover:text-white"><FaTrash /></button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {loading && <p className="text-gray-300 animate-pulse">AI is typing...</p>}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Input + Actions */}
//       <form onSubmit={e => { e.preventDefault(); handleSend(input); }} className="flex flex-col gap-3 mt-3">
//         <textarea
//           className="w-full h-28 p-4 rounded-xl bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner text-lg"
//           placeholder="Ask anything..."
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleSend(input); } }}
//         />

//         <div className="flex gap-3">
//           {/* Speak Question */}
//           <button
//             type="button"
//             onClick={startVoiceInput}
//             className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white 
//                        bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 
//                        shadow-lg hover:scale-105 transition-transform duration-300"
//             title="Speak your question"
//           >
//             <FaMicrophone className="text-lg" /> Speak Question
//           </button>

//           {/* Send */}
//           <button
//             type="submit"
//             className="flex-grow px-5 py-3 rounded-xl font-semibold text-white 
//                        bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 
//                        shadow-lg hover:scale-105 transition-transform duration-300"
//           >
//             Send
//           </button>

//           {/* Listen / Speak All */}
//           <button
//             type="button"
//             onClick={() => speak(messages.map(m => m.text).join("\n"))}
//             className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white 
//                        bg-gradient-to-r from-green-500 via-lime-500 to-emerald-600 
//                        shadow-lg hover:scale-105 transition-transform duration-300"
//             title="Listen to all responses"
//           >
//             🔊 Listen
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default ChatModal;




import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import axios from "axios";
import { FaMicrophone, FaCopy, FaTrash } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

// const API =import.meta.env.BACKEND_URL

const API = import.meta.env.VITE_BACKEND_URL;

const ChatModal = forwardRef(({ username, onClose, initialVoiceQuestion = "" }, ref) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(initialVoiceQuestion);
  const [loading, setLoading] = useState(false);
  const idleTimer = useRef(null);
  const recognitionRef = useRef(null);
  const voiceTimeout = useRef(null);
  const chatEndRef = useRef(null);

  const speak = (text) => {
    if (!text || !window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => /male|david|mark/i.test(v.name));
    if (maleVoice) utter.voice = maleVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const appendMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const startIdleTimer = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      const prompts = [
        "Hey! Any coding questions today?",
        "Need some help or advice?",
        "Let's chat! What do you want to explore?"
      ];
      const prompt = prompts[Math.floor(Math.random() * prompts.length)];
      appendMessage("ai", prompt);
      speak(prompt);
    }, 45000);
  };

  const handleSend = async (text, fromVoice = false) => {
    if (!text.trim()) return;
    appendMessage("user", text);
    setInput("");
    setLoading(true);
    clearTimeout(idleTimer.current);

    try {
      const res = await axios.post(`${API}/getResponse`, { question: text, username });
      const aiText = res.data.response || "Sorry, I didn't understand that.";
      appendMessage("ai", aiText);
      if (fromVoice) speak(aiText);
    } catch (err) {
      console.error(err);
      const errMsg = "❌ Something went wrong. Try again!";
      appendMessage("ai", errMsg);
      if (fromVoice) speak(errMsg);
    } finally {
      setLoading(false);
      startIdleTimer();
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported!");
    if (recognitionRef.current) recognitionRef.current.stop();

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (e) => {
      let transcript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript.trim());
      if (voiceTimeout.current) clearTimeout(voiceTimeout.current);
      voiceTimeout.current = setTimeout(() => handleSend(transcript.trim(), true), 1000);
    };

    rec.onerror = (e) => console.warn("SpeechRecognition error:", e.error);
    rec.onend = () => recognitionRef.current = null;
    recognitionRef.current = rec;
    rec.start();
  };

  useEffect(() => {
    if (initialVoiceQuestion) handleSend(initialVoiceQuestion);
    startIdleTimer();
    return () => clearTimeout(idleTimer.current);
  }, [initialVoiceQuestion]);

  useImperativeHandle(ref, () => ({ askByVoice: (q) => handleSend(q, true) }));

  const resetChat = () => setMessages([]);

  return (
    <div className="fixed inset-4 md:inset-10 bg-gradient-to-br from-[#1e1e2f] to-[#2c2c45] p-5 shadow-2xl z-50 border border-gray-700 rounded-3xl flex flex-col max-w-3xl mx-auto h-[85vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold tracking-wide text-white">
          <span className="text-cyan-400 hover:scale-110 transition-transform">Ask </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 hover:scale-110 transition-transform">CodeVerse</span>
        </h2>
        <div className="flex gap-3 items-center">
          <button onClick={resetChat} title="Reset Chat" className="text-cyan-400 hover:text-cyan-200 text-2xl"><FiRefreshCw /></button>
          <button onClick={onClose} className="text-red-500 font-bold text-xl hover:text-red-400">X</button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-[#2c2c3e] to-[#1a1a28] rounded-2xl flex flex-col gap-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-700">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] p-3 rounded-xl text-lg ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-white"} shadow-md relative`}>
              {msg.text}
              <div className="flex justify-end gap-1 mt-1 absolute bottom-1 right-2">
                <button onClick={() => navigator.clipboard.writeText(msg.text)} className="text-xs text-gray-300 hover:text-white"><FaCopy /></button>
                <button onClick={() => setMessages(prev => prev.filter((_, i) => i !== idx))} className="text-xs text-gray-300 hover:text-white"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-300 animate-pulse">AI is typing...</p>}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input + Actions */}
      <form onSubmit={e => { e.preventDefault(); handleSend(input); }} className="flex flex-col gap-3 mt-3">
        <textarea
          className="w-full h-28 p-4 rounded-xl bg-[#2b2b3d] text-white placeholder-[#9ca3af] outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none shadow-inner text-lg"
          placeholder="Ask anything..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); handleSend(input); } }}
        />
        <div className="flex gap-3 flex-wrap">
          <button type="button" onClick={startVoiceInput} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 shadow-lg hover:scale-105 transition-transform duration-300">
            <FaMicrophone className="text-lg" /> Speak Question
          </button>
          <button type="submit" className="flex-grow px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 shadow-lg hover:scale-105 transition-transform duration-300">
            Send
          </button>
          <button type="button" onClick={() => speak(messages.map(m => m.text).join("\n"))} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 via-lime-500 to-emerald-600 shadow-lg hover:scale-105 transition-transform duration-300">
            🔊 Listen
          </button>
        </div>
      </form>
    </div>
  );
});

export default ChatModal;
