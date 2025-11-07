// import React, { useEffect, useRef, useState } from "react";

// const JarvisVoice = ({ onWake, onQuestion }) => {
//   const [status, setStatus] = useState("idle");
//   const [active, setActive] = useState(false);

//   const recRef = useRef(null);
//   const running = useRef(false);
//   const speaking = useRef(false);
//   const currentUtter = useRef(null);
//   const wakeWord = "jarvis";
//   const restartTimer = useRef(null);
//   const voicesLoaded = useRef(false);

//   /** === Utility: Delay Helper === */
//   const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//   /** === Start Recognition === */
//   const startRecognition = async () => {
//     if (!recRef.current || running.current || speaking.current) return;
//     try {
//       recRef.current.start();
//       running.current = true;
//       console.log("🎙️ Recognition started");
//     } catch (e) {
//       console.warn("Start failed:", e.message);
//     }
//   };

//   /** === Stop Recognition === */
//   const stopRecognition = () => {
//     if (!recRef.current || !running.current) return;
//     try {
//       recRef.current.stop();
//       running.current = false;
//       console.log("🛑 Recognition stopped");
//     } catch {}
//   };

//   /** === Speak Function (Improved) === */
//   const speak = async (text) => {
//     if (!text || !window.speechSynthesis) return;

//     // Wait for voices if not yet loaded
//     if (!voicesLoaded.current) {
//       await new Promise((resolve) => {
//         const interval = setInterval(() => {
//           const v = window.speechSynthesis.getVoices();
//           if (v.length > 0) {
//             voicesLoaded.current = true;
//             clearInterval(interval);
//             resolve();
//           }
//         }, 100);
//       });
//     }

//     // Cancel any ongoing speech before new one
//     window.speechSynthesis.cancel();
//     currentUtter.current = null;
//     speaking.current = true;

//     const utter = new SpeechSynthesisUtterance(text);
//     currentUtter.current = utter;
//     utter.lang = "en-US";
//     utter.rate = 0.95; // Slightly slower = clearer
//     utter.pitch = 1.05;

//     // Prefer male voice
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice =
//       voices.find((v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//       ) || voices[0];
//     if (maleVoice) utter.voice = maleVoice;

//     utter.onstart = () => {
//       speaking.current = true;
//       stopRecognition();
//       setStatus("speaking");
//     };

//     utter.onend = async () => {
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");

//       // Delay before resuming listening to avoid overlap
//       await sleep(400);
//       startRecognition();
//     };

//     window.speechSynthesis.speak(utter);
//   };

//   /** === Stop Speaking (Manual) === */
//   const stopSpeaking = () => {
//     if (speaking.current) {
//       window.speechSynthesis.cancel();
//       speaking.current = false;
//       currentUtter.current = null;
//       console.log("🛑 Speech stopped manually");
//       setStatus("idle");
//       startRecognition();
//     }
//   };

//   /** === Process Commands === */
//   const processCommand = (text) => {
//     if (!text) return;
//     console.log("🗣️ Heard:", text);

//     // Stop speech if asked
//     if (text.includes("stop")) {
//       stopSpeaking();
//       return;
//     }

//     // Wake word logic
//     if (!active && text.includes(wakeWord)) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//       onWake?.();
//       return;
//     }

//     // Handle question when active
//     if (active && !text.includes(wakeWord)) {
//       onQuestion?.(text);
//       speak("Got it.");
//       setTimeout(() => setActive(false), 1500);
//     }
//   };

//   /** === Setup Speech Recognition === */
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser!");
//       return;
//     }

//     const rec = new SpeechRecognition();
//     rec.continuous = true;
//     rec.interimResults = false;
//     rec.lang = "en-US";
//     recRef.current = rec;

//     rec.onstart = () => {
//       running.current = true;
//       setStatus("listening");
//     };

//     rec.onend = () => {
//       running.current = false;
//       if (!speaking.current) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 700); // Slight delay prevents echo restarts
//       }
//     };

//     rec.onerror = (event) => {
//       console.warn("⚠️ SpeechRecognition error:", event.error);
//       running.current = false;
//       if (["aborted", "network", "no-speech"].includes(event.error)) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 800);
//       }
//     };

//     rec.onresult = (event) => {
//       const text = Array.from(event.results)
//         .map((r) => r[0].transcript)
//         .join("")
//         .toLowerCase()
//         .trim();
//       processCommand(text);
//     };

//     // Ensure voices load
//     window.speechSynthesis.onvoiceschanged = () => {
//       voicesLoaded.current = true;
//       startRecognition();
//     };

//     startRecognition();

//     return () => {
//       clearTimeout(restartTimer.current);
//       stopRecognition();
//       stopSpeaking();
//     };
//   }, [onWake, onQuestion]);

//   /** === Manual Wake Click === */
//   const handleManualStart = () => {
//     if (!active) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//     }
//   };

//   return (
//     <div
//       onClick={handleManualStart}
//       style={{
//         position: "fixed",
//         bottom: 20,
//         right: 20,
//         background: active
//           ? "linear-gradient(135deg, #007bff, #00c6ff)"
//           : "#222",
//         color: "white",
//         padding: "14px 22px",
//         borderRadius: "14px",
//         cursor: "pointer",
//         boxShadow: active
//           ? "0 0 20px rgba(0, 174, 255, 0.7)"
//           : "0 0 10px rgba(0,0,0,0.4)",
//         transition: "all 0.3s ease",
//         userSelect: "none",
//         fontFamily: "Inter, sans-serif",
//         fontSize: "15px",
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//       }}
//     >
//       {status === "speaking"
//         ? "🗣️ Speaking..."
//         : status === "listening"
//         ? "🎙️ Listening..."
//         : "🧠 Activate Jarvis"}
//     </div>
//   );
// };

// export default JarvisVoice;


// import React, { useEffect, useRef, useState } from "react";

// const JarvisVoice = ({ onWake, onQuestion }) => {
//   const [status, setStatus] = useState("idle");
//   const [active, setActive] = useState(false);

//   const recRef = useRef(null);
//   const running = useRef(false);
//   const speaking = useRef(false);
//   const currentUtter = useRef(null);
//   const wakeWord = "jarvis";
//   const restartTimer = useRef(null);
//   const voicesLoaded = useRef(false);

//   /** Delay Helper */
//   const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//   /** Start Recognition */
//   const startRecognition = async () => {
//     if (!recRef.current || running.current || speaking.current) return;
//     try {
//       recRef.current.start();
//       running.current = true;
//       console.log("🎙️ Recognition started");
//     } catch (e) {
//       console.warn("Start failed:", e.message);
//     }
//   };

//   /** Stop Recognition */
//   const stopRecognition = () => {
//     if (!recRef.current || !running.current) return;
//     try {
//       recRef.current.stop();
//       running.current = false;
//       console.log("🛑 Recognition stopped");
//     } catch {}
//   };

//   /** Speak Function (Improved) */
//   const speak = async (text) => {
//     if (!text || !window.speechSynthesis) return;

//     // stop any overlapping voice
//     window.speechSynthesis.cancel();

//     // wait for voices if not yet loaded
//     if (!voicesLoaded.current) {
//       await new Promise((resolve) => {
//         const interval = setInterval(() => {
//           const v = window.speechSynthesis.getVoices();
//           if (v.length > 0) {
//             voicesLoaded.current = true;
//             clearInterval(interval);
//             resolve();
//           }
//         }, 100);
//       });
//     }

//     currentUtter.current = null;
//     speaking.current = true;

//     const utter = new SpeechSynthesisUtterance(text);
//     currentUtter.current = utter;
//     utter.lang = "en-US";
//     utter.rate = 0.95; // smoother
//     utter.pitch = 1.05;

//     // Prefer male voice
//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice =
//       voices.find((v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//       ) || voices[0];
//     if (maleVoice) utter.voice = maleVoice;

//     utter.onstart = () => {
//       speaking.current = true;
//       stopRecognition();
//       setStatus("speaking");
//     };

//     utter.onend = async () => {
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");

//       // Delay before resuming listening
//       await sleep(400);
//       startRecognition();
//     };

//     window.speechSynthesis.speak(utter);
//   };

//   /** Stop Speaking Manually */
//   const stopSpeaking = () => {
//     if (speaking.current) {
//       window.speechSynthesis.cancel();
//       speaking.current = false;
//       currentUtter.current = null;
//       console.log("🛑 Speech stopped manually");
//       setStatus("idle");
//       startRecognition();
//     }
//   };

//   /** Process Commands */
//   const processCommand = (text) => {
//     if (!text) return;
//     console.log("🗣️ Heard:", text);

//     // stop speech
//     if (text.includes("stop")) {
//       stopSpeaking();
//       return;
//     }

//     // wake word logic
//     if (!active && text.includes(wakeWord)) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//       onWake?.();
//       return;
//     }

//     // handle question when active
//     if (active && !text.includes(wakeWord)) {
//       // 👇 tell ChatModal it’s a voice question
//       onQuestion?.(text, true);
//       speak("Got it.");
//       setTimeout(() => setActive(false), 1500);
//     }
//   };

//   /** Setup Speech Recognition */
//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser!");
//       return;
//     }

//     const rec = new SpeechRecognition();
//     rec.continuous = true;
//     rec.interimResults = false;
//     rec.lang = "en-US";
//     recRef.current = rec;

//     rec.onstart = () => {
//       running.current = true;
//       setStatus("listening");
//     };

//     rec.onend = () => {
//       running.current = false;
//       if (!speaking.current) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 700);
//       }
//     };

//     rec.onerror = (event) => {
//       console.warn("⚠️ SpeechRecognition error:", event.error);
//       running.current = false;
//       if (["aborted", "network", "no-speech"].includes(event.error)) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 800);
//       }
//     };

//     rec.onresult = (event) => {
//       const text = Array.from(event.results)
//         .map((r) => r[0].transcript)
//         .join("")
//         .toLowerCase()
//         .trim();
//       processCommand(text);
//     };

//     // ensure voices load
//     window.speechSynthesis.onvoiceschanged = () => {
//       voicesLoaded.current = true;
//       startRecognition();
//     };

//     startRecognition();

//     return () => {
//       clearTimeout(restartTimer.current);
//       stopRecognition();
//       stopSpeaking();
//     };
//   }, [onWake, onQuestion]);

//   /** Manual Wake */
//   const handleManualStart = () => {
//     if (!active) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//     }
//   };

//   return (
//     <div
//       onClick={handleManualStart}
//       style={{
//         position: "fixed",
//         bottom: 20,
//         right: 20,
//         background: active
//           ? "linear-gradient(135deg, #007bff, #00c6ff)"
//           : "#222",
//         color: "white",
//         padding: "14px 22px",
//         borderRadius: "14px",
//         cursor: "pointer",
//         boxShadow: active
//           ? "0 0 20px rgba(0, 174, 255, 0.7)"
//           : "0 0 10px rgba(0,0,0,0.4)",
//         transition: "all 0.3s ease",
//         userSelect: "none",
//         fontFamily: "Inter, sans-serif",
//         fontSize: "15px",
//         display: "flex",
//         alignItems: "center",
//         gap: "8px",
//       }}
//     >
//       {status === "speaking"
//         ? "🗣️ Speaking..."
//         : status === "listening"
//         ? "🎙️ Listening..."
//         : "🧠 Activate Jarvis"}
//     </div>
//   );
// };

// export default JarvisVoice;












// import React, { useEffect, useRef, useState } from "react";

// const JarvisVoice = ({ onWake, onQuestion }) => {
//   const [status, setStatus] = useState("idle");
//   const [active, setActive] = useState(false);
//   const [listeningEnabled, setListeningEnabled] = useState(true); // 👈 new toggle state

//   const recRef = useRef(null);
//   const running = useRef(false);
//   const speaking = useRef(false);
//   const currentUtter = useRef(null);
//   const wakeWord = "jarvis";
//   const restartTimer = useRef(null);
//   const voicesLoaded = useRef(false);

//   const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//   /** === Start Recognition === */
//   const startRecognition = async () => {
//     if (!recRef.current || running.current || speaking.current || !listeningEnabled) return;
//     try {
//       recRef.current.start();
//       running.current = true;
//       console.log("🎙️ Recognition started");
//     } catch (e) {
//       console.warn("Start failed:", e.message);
//     }
//   };

//   /** === Stop Recognition === */
//   const stopRecognition = () => {
//     if (!recRef.current || !running.current) return;
//     try {
//       recRef.current.stop();
//       running.current = false;
//       console.log("🛑 Recognition stopped");
//     } catch {}
//   };

//   /** === Speak Function === */
//   const speak = async (text) => {
//     if (!text || !window.speechSynthesis) return;

//     window.speechSynthesis.cancel();

//     if (!voicesLoaded.current) {
//       await new Promise((resolve) => {
//         const interval = setInterval(() => {
//           const v = window.speechSynthesis.getVoices();
//           if (v.length > 0) {
//             voicesLoaded.current = true;
//             clearInterval(interval);
//             resolve();
//           }
//         }, 100);
//       });
//     }

//     currentUtter.current = null;
//     speaking.current = true;

//     const utter = new SpeechSynthesisUtterance(text);
//     currentUtter.current = utter;
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;

//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice =
//       voices.find((v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//       ) || voices[0];
//     if (maleVoice) utter.voice = maleVoice;

//     utter.onstart = () => {
//       speaking.current = true;
//       stopRecognition();
//       setStatus("speaking");
//     };

//     utter.onend = async () => {
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");
//       await sleep(400);
//       startRecognition();
//     };

//     window.speechSynthesis.speak(utter);
//   };

//   /** === Stop Speaking === */
//   const stopSpeaking = () => {
//     if (speaking.current) {
//       window.speechSynthesis.cancel();
//       speaking.current = false;
//       currentUtter.current = null;
//       console.log("🛑 Speech stopped manually");
//       setStatus("idle");
//       startRecognition();
//     }
//   };

//   /** === Process Commands === */
//   const processCommand = (text) => {
//     if (!text) return;
//     console.log("🗣️ Heard:", text);

//     if (text.includes("stop")) {
//       stopSpeaking();
//       return;
//     }

//     if (!active && text.includes(wakeWord)) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//       onWake?.();
//       return;
//     }

//     if (active && !text.includes(wakeWord)) {
//       onQuestion?.(text, true);
//       speak("Got it.");
//       setTimeout(() => setActive(false), 1500);
//     }
//   };

//   /** === Setup Speech Recognition === */
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser!");
//       return;
//     }

//     const rec = new SpeechRecognition();
//     rec.continuous = true;
//     rec.interimResults = false;
//     rec.lang = "en-US";
//     recRef.current = rec;

//     rec.onstart = () => {
//       running.current = true;
//       setStatus("listening");
//     };

//     rec.onend = () => {
//       running.current = false;
//       if (!speaking.current && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 700);
//       }
//     };

//     rec.onerror = (event) => {
//       console.warn("⚠️ SpeechRecognition error:", event.error);
//       running.current = false;
//       if (["aborted", "network", "no-speech"].includes(event.error) && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 800);
//       }
//     };

//     rec.onresult = (event) => {
//       const text = Array.from(event.results)
//         .map((r) => r[0].transcript)
//         .join("")
//         .toLowerCase()
//         .trim();
//       processCommand(text);
//     };

//     window.speechSynthesis.onvoiceschanged = () => {
//       voicesLoaded.current = true;
//       startRecognition();
//     };

//     if (listeningEnabled) startRecognition();

//     return () => {
//       clearTimeout(restartTimer.current);
//       stopRecognition();
//       stopSpeaking();
//     };
//   }, [onWake, onQuestion, listeningEnabled]);

//   /** === Manual Wake Click === */
//   const handleManualStart = () => {
//     if (!active) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//     }
//   };

//   /** === Toggle Listening Button === */
//   const toggleListening = () => {
//     setListeningEnabled((prev) => {
//       const newState = !prev;
//       if (!newState) {
//         stopRecognition();
//         setStatus("disabled");
//         speak("Jarvis deactivated.");
//       } else {
//         speak("Jarvis is back online.");
//         setTimeout(() => startRecognition(), 800);
//       }
//       return newState;
//     });
//   };

//   return (
//     <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
//       {/* Power Button */}
//       <button
//         onClick={toggleListening}
//         style={{
//           background: listeningEnabled ? "#f44336" : "#4caf50",
//           color: "white",
//           border: "none",
//           padding: "10px 14px",
//           borderRadius: "50%",
//           cursor: "pointer",
//           boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//           fontSize: "18px",
//           transition: "0.3s ease",
//         }}
//         title={listeningEnabled ? "Turn Off Jarvis" : "Turn On Jarvis"}
//       >
//         {listeningEnabled ? "🔴" : "🟢"}
//       </button>

//       {/* Main Jarvis Status Bubble */}
//       <div
//         onClick={handleManualStart}
//         style={{
//           background: active
//             ? "linear-gradient(135deg, #007bff, #00c6ff)"
//             : "#222",
//           color: "white",
//           padding: "14px 22px",
//           borderRadius: "14px",
//           cursor: "pointer",
//           boxShadow: active
//             ? "0 0 20px rgba(0, 174, 255, 0.7)"
//             : "0 0 10px rgba(0,0,0,0.4)",
//           transition: "all 0.3s ease",
//           userSelect: "none",
//           fontFamily: "Inter, sans-serif",
//           fontSize: "15px",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//         }}
//       >
//         {status === "disabled"
//           ? "🛑 Jarvis Off"
//           : status === "speaking"
//           ? "🗣️ Speaking..."
//           : status === "listening"
//           ? "🎙️ Listening..."
//           : "🧠 Activate Jarvis"}
//       </div>
//     </div>
//   );
// };

// export default JarvisVoice;






// import React, { useEffect, useRef, useState } from "react";

// const JarvisVoice = ({ onWake, onQuestion }) => {
//   const [status, setStatus] = useState("idle");
//   const [active, setActive] = useState(false);
//   const [listeningEnabled, setListeningEnabled] = useState(true);

//   const recRef = useRef(null);
//   const running = useRef(false);
//   const speaking = useRef(false);
//   const currentUtter = useRef(null);
//   const restartTimer = useRef(null);
//   const voicesLoaded = useRef(false);
//   const wakeWord = "jarvis";

//   const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//   /** START VOICE RECOGNITION */
//   const startRecognition = async () => {
//     if (!recRef.current || running.current || speaking.current || !listeningEnabled) return;
//     try {
//       recRef.current.start();
//       running.current = true;
//       console.log("🎙️ Recognition started");
//     } catch (e) {
//       console.warn("Recognition start failed:", e.message);
//     }
//   };

//   const stopRecognition = () => {
//     if (recRef.current && running.current) {
//       try {
//         recRef.current.stop();
//         running.current = false;
//         console.log("🛑 Recognition stopped");
//       } catch {}
//     }
//   };

//   /** SPEAK FUNCTION */
//   const speak = async (text) => {
//     if (!text || !window.speechSynthesis) return;

//     window.speechSynthesis.cancel();

//     if (!voicesLoaded.current) {
//       await new Promise((resolve) => {
//         const interval = setInterval(() => {
//           const v = window.speechSynthesis.getVoices();
//           if (v.length > 0) {
//             voicesLoaded.current = true;
//             clearInterval(interval);
//             resolve();
//           }
//         }, 100);
//       });
//     }

//     speaking.current = true;
//     const utter = new SpeechSynthesisUtterance(text);
//     currentUtter.current = utter;
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;

//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice =
//       voices.find((v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//       ) || voices[0];
//     if (maleVoice) utter.voice = maleVoice;

//     utter.onstart = () => {
//       speaking.current = true;
//       stopRecognition();
//       setStatus("speaking");
//     };

//     utter.onend = async () => {
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");
//       await sleep(400);
//       startRecognition();
//     };

//     window.speechSynthesis.speak(utter);
//   };

//   const stopSpeaking = () => {
//     if (speaking.current) {
//       window.speechSynthesis.cancel();
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");
//       startRecognition();
//     }
//   };

//   /** PROCESS COMMAND */
//   const processCommand = (text) => {
//     if (!text) return;
//     console.log("🗣️ Heard:", text);

//     if (text.includes("stop")) {
//       stopSpeaking();
//       return;
//     }

//     if (!active && text.includes(wakeWord)) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//       onWake?.();
//       return;
//     }

//     if (active && !text.includes(wakeWord)) {
//       onQuestion?.(text, true);
//       speak("Got it.");
//       setTimeout(() => setActive(false), 1500);
//     }
//   };

//   /** SETUP RECOGNITION */
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");

//     const rec = new SpeechRecognition();
//     rec.continuous = true;
//     rec.interimResults = false;
//     rec.lang = "en-US";

//     rec.onstart = () => {
//       running.current = true;
//       setStatus("listening");
//     };
//     rec.onend = () => {
//       running.current = false;
//       if (!speaking.current && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 700);
//       }
//     };
//     rec.onerror = (e) => {
//       running.current = false;
//       console.warn("SpeechRecognition error:", e.error);
//       if (["aborted", "network", "no-speech"].includes(e.error) && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 800);
//       }
//     };
//     rec.onresult = (event) => {
//       const text = Array.from(event.results).map((r) => r[0].transcript).join("").toLowerCase().trim();
//       processCommand(text);
//     };

//     recRef.current = rec;

//     window.speechSynthesis.onvoiceschanged = () => {
//       voicesLoaded.current = true;
//       startRecognition();
//     };

//     if (listeningEnabled) startRecognition();

//     return () => {
//       clearTimeout(restartTimer.current);
//       stopRecognition();
//       stopSpeaking();
//     };
//   }, [onWake, onQuestion, listeningEnabled]);

//   const handleManualStart = () => {
//     if (!active) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//     }
//   };

//   const toggleListening = () => {
//     setListeningEnabled((prev) => {
//       const newState = !prev;
//       if (!newState) {
//         stopRecognition();
//         setStatus("disabled");
//         speak("Jarvis deactivated.");
//       } else {
//         speak("Jarvis is back online.");
//         setTimeout(() => startRecognition(), 800);
//       }
//       return newState;
//     });
//   };

//   return (
//     <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
//       <button
//         onClick={toggleListening}
//         style={{
//           background: listeningEnabled ? "#f44336" : "#4caf50",
//           color: "white",
//           border: "none",
//           padding: "10px 14px",
//           borderRadius: "50%",
//           cursor: "pointer",
//           fontSize: "18px",
//           boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//           transition: "0.3s ease",
//         }}
//         title={listeningEnabled ? "Turn Off Jarvis" : "Turn On Jarvis"}
//       >
//         {listeningEnabled ? "🔴" : "🟢"}
//       </button>

//       <div
//         onClick={handleManualStart}
//         style={{
//           background: active ? "linear-gradient(135deg, #007bff, #00c6ff)" : "#222",
//           color: "white",
//           padding: "14px 22px",
//           borderRadius: "14px",
//           cursor: "pointer",
//           boxShadow: active ? "0 0 20px rgba(0, 174, 255,0.7)" : "0 0 10px rgba(0,0,0,0.4)",
//           transition: "all 0.3s ease",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//           fontFamily: "Inter, sans-serif",
//           fontSize: "15px",
//         }}
//       >
//         {status === "disabled" ? "🛑 Jarvis Off" : status === "speaking" ? "🗣️ Speaking..." : status === "listening" ? "🎙️ Listening..." : "🧠 Activate Jarvis"}
//       </div>
//     </div>
//   );
// };

// export default JarvisVoice;







// lower code will work professionaly

// import React, { useEffect, useRef, useState } from "react";

// const JarvisVoice = ({ onWake, onQuestion }) => {
//   const [status, setStatus] = useState("idle");
//   const [active, setActive] = useState(false);
//   const [listeningEnabled, setListeningEnabled] = useState(true);

//   const recRef = useRef(null);
//   const running = useRef(false);
//   const speaking = useRef(false);
//   const currentUtter = useRef(null);
//   const restartTimer = useRef(null);
//   const voicesLoaded = useRef(false);
//   const wakeWord = "jarvis";

//   const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//   /** START VOICE RECOGNITION */
//   const startRecognition = async () => {
//     if (!recRef.current || running.current || speaking.current || !listeningEnabled) return;
//     try {
//       recRef.current.start();
//       running.current = true;
//       console.log("🎙️ Recognition started");
//     } catch (e) {
//       console.warn("Recognition start failed:", e.message);
//     }
//   };

//   const stopRecognition = () => {
//     if (recRef.current && running.current) {
//       try {
//         recRef.current.stop();
//         running.current = false;
//         console.log("🛑 Recognition stopped");
//       } catch {}
//     }
//   };

//   /** SPEAK FUNCTION */
//   const speak = async (text) => {
//     if (!text || !window.speechSynthesis) return;

//     window.speechSynthesis.cancel();

//     if (!voicesLoaded.current) {
//       await new Promise((resolve) => {
//         const interval = setInterval(() => {
//           const v = window.speechSynthesis.getVoices();
//           if (v.length > 0) {
//             voicesLoaded.current = true;
//             clearInterval(interval);
//             resolve();
//           }
//         }, 100);
//       });
//     }

//     speaking.current = true;
//     const utter = new SpeechSynthesisUtterance(text);
//     currentUtter.current = utter;
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;

//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice =
//       voices.find((v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//       ) || voices[0];
//     if (maleVoice) utter.voice = maleVoice;

//     utter.onstart = () => {
//       speaking.current = true;
//       stopRecognition();
//       setStatus("speaking");
//     };

//     utter.onend = async () => {
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");
//       await sleep(400);
//       startRecognition();
//     };

//     window.speechSynthesis.speak(utter);
//   };

//   const stopSpeaking = () => {
//     if (speaking.current) {
//       window.speechSynthesis.cancel();
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");
//       startRecognition();
//     }
//   };

//   /** PROCESS COMMAND */
//   const processCommand = (text) => {
//     if (!text) return;
//     console.log("🗣️ Heard:", text);

//     if (text.includes("stop")) {
//       stopSpeaking();
//       return;
//     }

//     if (!active && text.includes(wakeWord)) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//       onWake?.();
//       return;
//     }

//     if (active && !text.includes(wakeWord)) {
//       onQuestion?.(text, true); // ✅ fromVoice = true
//       speak("Got it.");
//       setTimeout(() => setActive(false), 1500);
//     }
//   };

//   /** SETUP RECOGNITION */
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");

//     const rec = new SpeechRecognition();
//     rec.continuous = true;
//     rec.interimResults = false;
//     rec.lang = "en-US";

//     rec.onstart = () => {
//       running.current = true;
//       setStatus("listening");
//     };
//     rec.onend = () => {
//       running.current = false;
//       if (!speaking.current && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 700);
//       }
//     };
//     rec.onerror = (e) => {
//       running.current = false;
//       console.warn("SpeechRecognition error:", e.error);
//       if (["aborted", "network", "no-speech"].includes(e.error) && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 800);
//       }
//     };
//     rec.onresult = (event) => {
//       const text = Array.from(event.results).map((r) => r[0].transcript).join("").toLowerCase().trim();
//       processCommand(text);
//     };

//     recRef.current = rec;

//     window.speechSynthesis.onvoiceschanged = () => {
//       voicesLoaded.current = true;
//       startRecognition();
//     };

//     if (listeningEnabled) startRecognition();

//     return () => {
//       clearTimeout(restartTimer.current);
//       stopRecognition();
//       stopSpeaking();
//     };
//   }, [onWake, onQuestion, listeningEnabled]);

//   const handleManualStart = () => {
//     if (!active) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//     }
//   };

//   const toggleListening = () => {
//     setListeningEnabled((prev) => {
//       const newState = !prev;
//       if (!newState) {
//         stopRecognition();
//         setStatus("disabled");
//         speak("Jarvis deactivated.");
//       } else {
//         speak("Jarvis is back online.");
//         setTimeout(() => startRecognition(), 800);
//       }
//       return newState;
//     });
//   };

//   return (
//     <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
//       <button
//         onClick={toggleListening}
//         style={{
//           background: listeningEnabled ? "#f44336" : "#4caf50",
//           color: "white",
//           border: "none",
//           padding: "10px 14px",
//           borderRadius: "50%",
//           cursor: "pointer",
//           fontSize: "18px",
//           boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//           transition: "0.3s ease",
//         }}
//         title={listeningEnabled ? "Turn Off Jarvis" : "Turn On Jarvis"}
//       >
//         {listeningEnabled ? "🔴" : "🟢"}
//       </button>

//       <div
//         onClick={handleManualStart}
//         style={{
//           background: active ? "linear-gradient(135deg, #007bff, #00c6ff)" : "#222",
//           color: "white",
//           padding: "14px 22px",
//           borderRadius: "14px",
//           cursor: "pointer",
//           boxShadow: active ? "0 0 20px rgba(0, 174, 255,0.7)" : "0 0 10px rgba(0,0,0,0.4)",
//           transition: "all 0.3s ease",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//           fontFamily: "Inter, sans-serif",
//           fontSize: "15px",
//         }}
//       >
//         {status === "disabled" ? "🛑 Jarvis Off" : status === "speaking" ? "🗣️ Speaking..." : status === "listening" ? "🎙️ Listening..." : "🧠 Activate Jarvis"}
//       </div>
//     </div>
//   );
// };

// export default JarvisVoice;




import React, { useEffect, useRef, useState } from "react";

const JarvisVoice = ({ onWake, onQuestion }) => {
  const [status, setStatus] = useState("idle");
  const [active, setActive] = useState(false);
  const [listeningEnabled, setListeningEnabled] = useState(true);

  const recRef = useRef(null);
  const running = useRef(false);
  const speaking = useRef(false);
  const currentUtter = useRef(null);
  const restartTimer = useRef(null);
  const voicesLoaded = useRef(false);
  const wakeWord = "jarvis";

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const startRecognition = async () => {
    if (!recRef.current || running.current || speaking.current || !listeningEnabled) return;
    try {
      recRef.current.start();
      running.current = true;
      console.log("🎙️ Recognition started");
    } catch (e) {
      console.warn("Recognition start failed:", e.message);
    }
  };

  const stopRecognition = () => {
    if (recRef.current && running.current) {
      try {
        recRef.current.stop();
        running.current = false;
        console.log("🛑 Recognition stopped");
      } catch {}
    }
  };

  const speak = async (text) => {
    if (!text || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (!voicesLoaded.current) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          const v = window.speechSynthesis.getVoices();
          if (v.length > 0) {
            voicesLoaded.current = true;
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    }

    speaking.current = true;
    const utter = new SpeechSynthesisUtterance(text);
    currentUtter.current = utter;
    utter.lang = "en-US";
    utter.rate = 0.95;
    utter.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const maleVoice =
      voices.find((v) =>
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("mark") ||
        v.name.toLowerCase().includes("male")
      ) || voices[0];
    if (maleVoice) utter.voice = maleVoice;

    utter.onstart = () => {
      speaking.current = true;
      stopRecognition();
      setStatus("speaking");
    };

    utter.onend = async () => {
      speaking.current = false;
      currentUtter.current = null;
      setStatus("idle");
      await sleep(400);
      startRecognition();
    };

    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    if (speaking.current) {
      window.speechSynthesis.cancel();
      speaking.current = false;
      currentUtter.current = null;
      setStatus("idle");
      startRecognition();
    }
  };

  const processCommand = (text) => {
    if (!text) return;

    if (text.includes("stop")) {
      stopSpeaking();
      return;
    }

    if (!active && text.includes(wakeWord)) {
      setActive(true);
      speak("Yes, I’m listening.");
      onWake?.();
      return;
    }

    if (active && !text.includes(wakeWord)) {
      onQuestion?.(text, true);
      speak("Got it.");
      setTimeout(() => setActive(false), 1500);
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported!");

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "en-US";

    rec.onstart = () => {
      running.current = true;
      setStatus("listening");
    };
    rec.onend = () => {
      running.current = false;
      if (!speaking.current && listeningEnabled) {
        clearTimeout(restartTimer.current);
        restartTimer.current = setTimeout(startRecognition, 700);
      }
    };
    rec.onerror = (e) => {
      running.current = false;
      if (["aborted", "network", "no-speech"].includes(e.error) && listeningEnabled) {
        clearTimeout(restartTimer.current);
        restartTimer.current = setTimeout(startRecognition, 800);
      }
    };
    rec.onresult = (event) => {
      const text = Array.from(event.results).map((r) => r[0].transcript).join("").toLowerCase().trim();
      processCommand(text);
    };

    recRef.current = rec;

    window.speechSynthesis.onvoiceschanged = () => {
      voicesLoaded.current = true;
      startRecognition();
    };

    if (listeningEnabled) startRecognition();

    return () => {
      clearTimeout(restartTimer.current);
      stopRecognition();
      stopSpeaking();
    };
  }, [onWake, onQuestion, listeningEnabled]);

  const handleManualStart = () => {
    if (!active) {
      setActive(true);
      speak("Yes, I’m listening.");
    }
  };

  const toggleListening = () => {
    setListeningEnabled((prev) => {
      const newState = !prev;
      if (!newState) {
        stopRecognition();
        setStatus("disabled");
        speak("Jarvis deactivated.");
      } else {
        speak("Jarvis is back online.");
        setTimeout(() => startRecognition(), 800);
      }
      return newState;
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2 z-50">

      {/* 🔴 / 🟢 Smaller On-Off Button for all screens */}
      <button
        onClick={toggleListening}
        className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all duration-300 
          ${listeningEnabled ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"}`}
        title={listeningEnabled ? "Turn Off Jarvis" : "Turn On Jarvis"}
      >
        {listeningEnabled ? "🔴" : "🟢"}
      </button>

      {/* Status Card */}
      <div
        onClick={handleManualStart}
        className={`cursor-pointer px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-lg text-white font-medium shadow-md transition-all duration-300 
          ${active ? "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_15px_rgba(0,174,255,0.7)]" : "bg-[#222] shadow-[0_0_8px_rgba(0,0,0,0.4)]"}
          flex items-center gap-2 text-[10px] sm:text-xs md:text-sm`}
      >
        {status === "disabled"
          ? "🛑 Jarvis Off"
          : status === "speaking"
          ? "🗣️ Speaking..."
          : status === "listening"
          ? "🎙️ Listening..."
          : "🧠 Activate Jarvis"}
      </div>
    </div>
  );
};

export default JarvisVoice;



// import React, { useEffect, useRef, useState } from "react";

// const JarvisVoice = ({ onWake, onQuestion, onLightToggle }) => { // Added onLightToggle
//   const [status, setStatus] = useState("idle");
//   const [active, setActive] = useState(false);
//   const [listeningEnabled, setListeningEnabled] = useState(true);

//   const recRef = useRef(null);
//   const running = useRef(false);
//   const speaking = useRef(false);
//   const currentUtter = useRef(null);
//   const restartTimer = useRef(null);
//   const voicesLoaded = useRef(false);
//   const wakeWord = "jarvis";

//   const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

//   const startRecognition = async () => {
//     if (!recRef.current || running.current || speaking.current || !listeningEnabled) return;
//     try {
//       recRef.current.start();
//       running.current = true;
//       console.log("🎙️ Recognition started");
//     } catch (e) {
//       console.warn("Recognition start failed:", e.message);
//     }
//   };

//   const stopRecognition = () => {
//     if (recRef.current && running.current) {
//       try {
//         recRef.current.stop();
//         running.current = false;
//         console.log("🛑 Recognition stopped");
//       } catch {}
//     }
//   };

//   const speak = async (text) => {
//     if (!text || !window.speechSynthesis) return;

//     window.speechSynthesis.cancel();

//     if (!voicesLoaded.current) {
//       await new Promise((resolve) => {
//         const interval = setInterval(() => {
//           const v = window.speechSynthesis.getVoices();
//           if (v.length > 0) {
//             voicesLoaded.current = true;
//             clearInterval(interval);
//             resolve();
//           }
//         }, 100);
//       });
//     }

//     speaking.current = true;
//     const utter = new SpeechSynthesisUtterance(text);
//     currentUtter.current = utter;
//     utter.lang = "en-US";
//     utter.rate = 0.95;
//     utter.pitch = 1.05;

//     const voices = window.speechSynthesis.getVoices();
//     const maleVoice =
//       voices.find((v) =>
//         v.name.toLowerCase().includes("david") ||
//         v.name.toLowerCase().includes("mark") ||
//         v.name.toLowerCase().includes("male")
//       ) || voices[0];
//     if (maleVoice) utter.voice = maleVoice;

//     utter.onstart = () => {
//       speaking.current = true;
//       stopRecognition();
//       setStatus("speaking");
//     };

//     utter.onend = async () => {
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");
//       await sleep(400);
//       startRecognition();
//     };

//     window.speechSynthesis.speak(utter);
//   };

//   const stopSpeaking = () => {
//     if (speaking.current) {
//       window.speechSynthesis.cancel();
//       speaking.current = false;
//       currentUtter.current = null;
//       setStatus("idle");
//       startRecognition();
//     }
//   };

//   /** PROCESS COMMAND */
//   const processCommand = (text) => {
//     if (!text) return;
//     console.log("🗣️ Heard:", text);

//     if (text.includes("stop")) {
//       stopSpeaking();
//       return;
//     }

//     if (!active && text.includes(wakeWord)) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//       onWake?.();
//       return;
//     }

//     if (active && !text.includes(wakeWord)) {
//       // Trigger normal command callback
//       onQuestion?.(text, true);

//       // **Light mode voice toggle**
//       const cmd = text.toLowerCase();
//       if (cmd.includes("turn on light mode")) {
//         onLightToggle?.(true);
//         speak("Light mode activated.");
//       }
//       if (cmd.includes("turn off light mode")) {
//         onLightToggle?.(false);
//         speak("Light mode deactivated.");
//       }

//       speak("Got it.");
//       setTimeout(() => setActive(false), 1500);
//     }
//   };

//   /** SETUP RECOGNITION */
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) return alert("Speech recognition not supported!");

//     const rec = new SpeechRecognition();
//     rec.continuous = true;
//     rec.interimResults = false;
//     rec.lang = "en-US";

//     rec.onstart = () => {
//       running.current = true;
//       setStatus("listening");
//     };
//     rec.onend = () => {
//       running.current = false;
//       if (!speaking.current && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 700);
//       }
//     };
//     rec.onerror = (e) => {
//       running.current = false;
//       console.warn("SpeechRecognition error:", e.error);
//       if (["aborted", "network", "no-speech"].includes(e.error) && listeningEnabled) {
//         clearTimeout(restartTimer.current);
//         restartTimer.current = setTimeout(startRecognition, 800);
//       }
//     };
//     rec.onresult = (event) => {
//       const text = Array.from(event.results).map((r) => r[0].transcript).join("").toLowerCase().trim();
//       processCommand(text);
//     };

//     recRef.current = rec;

//     window.speechSynthesis.onvoiceschanged = () => {
//       voicesLoaded.current = true;
//       startRecognition();
//     };

//     if (listeningEnabled) startRecognition();

//     return () => {
//       clearTimeout(restartTimer.current);
//       stopRecognition();
//       stopSpeaking();
//     };
//   }, [onWake, onQuestion, listeningEnabled, onLightToggle]);

//   const handleManualStart = () => {
//     if (!active) {
//       setActive(true);
//       speak("Yes, I’m listening.");
//     }
//   };

//   const toggleListening = () => {
//     setListeningEnabled((prev) => {
//       const newState = !prev;
//       if (!newState) {
//         stopRecognition();
//         setStatus("disabled");
//         speak("Jarvis deactivated.");
//       } else {
//         speak("Jarvis is back online.");
//         setTimeout(() => startRecognition(), 800);
//       }
//       return newState;
//     });
//   };

//   return (
//     <div style={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
//       <button
//         onClick={toggleListening}
//         style={{
//           background: listeningEnabled ? "#f44336" : "#4caf50",
//           color: "white",
//           border: "none",
//           padding: "10px 14px",
//           borderRadius: "50%",
//           cursor: "pointer",
//           fontSize: "18px",
//           boxShadow: "0 0 10px rgba(0,0,0,0.3)",
//           transition: "0.3s ease",
//         }}
//         title={listeningEnabled ? "Turn Off Jarvis" : "Turn On Jarvis"}
//       >
//         {listeningEnabled ? "🔴" : "🟢"}
//       </button>

//       <div
//         onClick={handleManualStart}
//         style={{
//           background: active ? "linear-gradient(135deg, #007bff, #00c6ff)" : "#222",
//           color: "white",
//           padding: "14px 22px",
//           borderRadius: "14px",
//           cursor: "pointer",
//           boxShadow: active ? "0 0 20px rgba(0, 174, 255,0.7)" : "0 0 10px rgba(0,0,0,0.4)",
//           transition: "all 0.3s ease",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//           fontFamily: "Inter, sans-serif",
//           fontSize: "15px",
//         }}
//       >
//         {status === "disabled" ? "🛑 Jarvis Off" : status === "speaking" ? "🗣️ Speaking..." : status === "listening" ? "🎙️ Listening..." : "🧠 Activate Jarvis"}
//       </div>
//     </div>
//   );
// };

// export default JarvisVoice;
