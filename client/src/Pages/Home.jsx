// import React, { useState } from 'react'
// import Navbar from '../Components/Navbar.jsx'
// import Select from 'react-select';
// import { BsStars } from 'react-icons/bs';
// import { HiOutlineCode } from 'react-icons/hi';
// import Editor from '@monaco-editor/react';
// import { IoCloseSharp, IoCopy } from 'react-icons/io5';
// import { PiExportBold } from 'react-icons/pi';
// import { ImNewTab } from 'react-icons/im';
// import { FiRefreshCcw } from 'react-icons/fi';
// import { GoogleGenAI } from "@google/genai";
// import { ClipLoader } from 'react-spinners';
// import { toast } from 'react-toastify';

// const Home = () => {
//   const options = [
//     { value: 'html-css', label: 'HTML + CSS' },
//     { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
//     { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
//     { value: 'html-css-js', label: 'HTML + CSS + JS' },
//     { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
//   ];

//   const [outputScreen, setOutputScreen] = useState(false);
//   const [tab, setTab] = useState(1);
//   const [prompt, setPrompt] = useState("");
//   const [frameWork, setFrameWork] = useState(options[0]);
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isNewTabOpen, setIsNewTabOpen] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);

//   function extractCode(response) {
//     const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
//     return match ? match[1].trim() : response.trim();
//   }

//   const ai = new GoogleGenAI({
//     apiKey: import.meta.env.VITE_GOOGLE_API_KEY
//   });

//   async function getResponse() {
//     if (!prompt.trim()) return toast.error("Please describe your component first");
//     try {
//       setLoading(true);
//       const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: `
//      You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

// Now, generate a UI component for: ${prompt}  
// Framework to use: ${frameWork.value}  

// Requirements:  
// - The code must be clean, well-structured, and easy to understand.  
// - Optimize for SEO where applicable.  
// - Focus on creating a modern, animated, and responsive UI design.  
// - Include high-quality hover effects, shadows, animations, colors, and typography.  
// - Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
// - Do NOT include explanations, text, comments, or anything else besides the code.  
// - And give the whole code in a single HTML file.
//       `,
//       });
//       setCode(extractCode(response.text));
//       setOutputScreen(true);
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong while generating code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyCode = async () => {
//     if (!code.trim()) return toast.error("No code to copy");
//     try {
//       await navigator.clipboard.writeText(code);
//       toast.success("Code copied to clipboard");
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//       toast.error("Failed to copy");
//     }
//   };

//   const downnloadFile = () => {
//     if (!code.trim()) return toast.error("No code to download");
//     const fileName = "GenUI-Code.html"
//     const blob = new Blob([code], { type: 'text/plain' });
//     let url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = fileName;
//     link.click();
//     URL.revokeObjectURL(url);
//     toast.success("File downloaded");
//   };

//   return (
//     <>
      

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16">
//         {/* Left Section */}
//         <div className="w-full py-6 rounded-xl bg-[#141319] mt-5 p-5 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
//           <h3 className='text-[25px] font-semibold sp-text'>AI Component Generator</h3>
//           <p className='text-gray-300 mt-2 text-[16px]'>Describe your component and let AI code it for you.</p>

//           <p className='text-[15px] font-[700] mt-4'>Framework</p>
//           <Select
//             className='mt-2'
//             options={options}
//             value={frameWork}
//             styles={{
//               control: (base) => ({
//                 ...base,
//                 backgroundColor: "#111",
//                 borderColor: "#333",
//                 color: "#fff",
//                 boxShadow: "none",
//                 "&:hover": { borderColor: "#555" }
//               }),
//               menu: (base) => ({
//                 ...base,
//                 backgroundColor: "#111",
//                 color: "#fff"
//               }),
//               option: (base, state) => ({
//                 ...base,
//                 backgroundColor: state.isSelected
//                   ? "#333"
//                   : state.isFocused
//                     ? "#222"
//                     : "#111",
//                 color: "#fff",
//                 "&:active": { backgroundColor: "#444" }
//               }),
//               singleValue: (base) => ({ ...base, color: "#fff" }),
//               placeholder: (base) => ({ ...base, color: "#aaa" }),
//               input: (base) => ({ ...base, color: "#fff" })
//             }}
//             onChange={(selected) => setFrameWork(selected)}
//           />

//           <p className='text-[15px] font-[700] mt-5'>Describe your component</p>
//           <textarea
//             onChange={(e) => setPrompt(e.target.value)}
//             value={prompt}
//             className='w-full min-h-[200px] rounded-xl bg-[#09090B] mt-3 p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition-all duration-300 resize-none'
//             placeholder="Describe your component in detail and AI will generate it..."
//           ></textarea>

//           <div className="flex items-center justify-between mt-3">
//             <p className='text-gray-400 text-sm'>Click on generate button to get your code</p>
//             <button
//               onClick={getResponse}
//               className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 px-5 gap-2 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
//             >
//               {loading ? <ClipLoader color='white' size={18} /> : <BsStars />}
//               Generate
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="relative mt-2 w-full h-[80vh] bg-[#141319] rounded-xl overflow-hidden">
//           {!outputScreen ? (
//             <div className="w-full h-full flex items-center flex-col justify-center">
//               <div className="p-5 w-[70px] flex items-center justify-center text-[30px] h-[70px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-transform duration-300 hover:scale-110">
//                 <HiOutlineCode />
//               </div>
//               <p className='text-[16px] text-gray-400 mt-3'>Your component & code will appear here.</p>
//             </div>
//           ) : (
//             <>
//               {/* Tabs */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
//                 <button
//                   onClick={() => setTab(1)}
//                   className={`w-1/2 py-2 rounded-lg transition-all duration-300 ${tab === 1 ? "bg-purple-600 text-white shadow-lg" : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}`}
//                 >
//                   Code
//                 </button>
//                 <button
//                   onClick={() => setTab(2)}
//                   className={`w-1/2 py-2 rounded-lg transition-all duration-300 ${tab === 2 ? "bg-purple-600 text-white shadow-lg" : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}`}
//                 >
//                   Preview
//                 </button>
//               </div>

//               {/* Toolbar */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center justify-between px-4">
//                 <p className='font-bold text-gray-200'>Code Editor</p>
//                 <div className="flex items-center gap-2">
//                   {tab === 1 ? (
//                     <>
//                       <button onClick={copyCode} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333] transition-all duration-300"><IoCopy /></button>
//                       <button onClick={downnloadFile} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333] transition-all duration-300"><PiExportBold /></button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => setIsNewTabOpen(true)} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333] transition-all duration-300"><ImNewTab /></button>
//                       <button onClick={() => setRefreshKey(prev => prev + 1)} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333] transition-all duration-300"><FiRefreshCcw /></button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Editor / Preview */}
//               <div className="h-full">
//                 {tab === 1 ? (
//                   <Editor value={code} height="100%" theme='vs-dark' language="html" />
//                 ) : (
//                   <iframe key={refreshKey} srcDoc={code} className="w-full h-full bg-white text-black transition-opacity duration-500 opacity-100"></iframe>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Fullscreen Preview Overlay */}
//       {isNewTabOpen && (
//         <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto transition-transform duration-500 transform scale-100">
//           <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100">
//             <p className='font-bold'>Preview</p>
//             <button onClick={() => setIsNewTabOpen(false)} className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200 transition-all duration-300">
//               <IoCloseSharp />
//             </button>
//           </div>
//           <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)] transition-opacity duration-500"></iframe>
//         </div>
//       )}
//     </>
//   )
// }

// export default Home


// import React, { useState } from 'react';
// import Navbar from '../Components/Navbar.jsx';
// import Select from 'react-select';
// import { BsStars } from 'react-icons/bs';
// import { HiOutlineCode } from 'react-icons/hi';
// import Editor from '@monaco-editor/react';
// import { IoCloseSharp, IoCopy } from 'react-icons/io5';
// import { PiExportBold } from 'react-icons/pi';
// import { ImNewTab } from 'react-icons/im';
// import { FiRefreshCcw } from 'react-icons/fi';
// import { FaImage } from 'react-icons/fa6';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { ClipLoader } from 'react-spinners';
// import { toast } from 'react-toastify';

// const Home = () => {
//   // ✅ Framework options restored
//   const options = [
//     { value: 'html-css', label: 'HTML + CSS' },
//     { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
//     { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
//     { value: 'html-css-js', label: 'HTML + CSS + JS' },
//     { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
//   ];

//   const [outputScreen, setOutputScreen] = useState(false);
//   const [tab, setTab] = useState(1);
//   const [prompt, setPrompt] = useState('');
//   const [frameWork, setFrameWork] = useState(options[0]);
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isNewTabOpen, setIsNewTabOpen] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [image, setImage] = useState(null);

//   // Gemini setup
//   const ai = new GoogleGenerativeAI({
//     apiKey: import.meta.env.VITE_GOOGLE_API_KEY1,
//   });

//   function extractCode(response) {
//     const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
//     return match ? match[1].trim() : response.trim();
//   }

//   // 🧠 Generate Code
//   async function getResponse() {
//     if (!prompt.trim() && !image) return toast.error('Please describe or upload an image');

//     try {
//       setLoading(true);

//       let content = [
//         {
//           role: 'user',
//           parts: [
//             {
//               text: `
// You are an expert front-end developer. Generate a clean, responsive, modern UI component.

// Prompt: ${prompt}
// Framework: ${frameWork.value}

// Requirements:
// - Fully responsive layout
// - Use animations and hover effects
// - Focus on visual quality
// - Return ONLY HTML/CSS/JS inside Markdown code fences
// `,
//             },
//           ],
//         },
//       ];

//       // 🖼️ If user uploaded image, include it
//       if (image) {
//         content[0].parts.push({
//           inlineData: {
//             data: image.split(',')[1],
//             mimeType: 'image/png',
//           },
//         });
//       }

//       const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
//       const result = await model.generateContent({
//         contents: content,
//       });

//       const response = result.response.text();
//       setCode(extractCode(response));
//       setOutputScreen(true);
//     } catch (err) {
//       console.error(err);
//       toast.error('Error generating code');
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Copy Code
//   const copyCode = async () => {
//     if (!code.trim()) return toast.error('No code to copy');
//     try {
//       await navigator.clipboard.writeText(code);
//       toast.success('Code copied');
//     } catch {
//       toast.error('Copy failed');
//     }
//   };

//   // Download Code
//   const downloadFile = () => {
//     if (!code.trim()) return toast.error('No code to download');
//     const blob = new Blob([code], { type: 'text/html' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'GeneratedComponent.html';
//     link.click();
//     toast.success('File downloaded');
//   };

//   // 🖼️ Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/')) return toast.error('Please upload an image file');
//     const reader = new FileReader();
//     reader.onloadend = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16">
//         {/* Left Panel */}
//         <div className="w-full py-6 rounded-xl bg-[#141319] mt-5 p-5 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
//           <h3 className="text-[25px] font-semibold sp-text">AI Component Generator</h3>
//           <p className="text-gray-300 mt-2 text-[16px]">
//             Describe your component or upload an image.
//           </p>

//           {/* Framework Selector */}
//           <p className="text-[15px] font-[700] mt-4">Framework</p>
//           <Select
//             className="mt-2"
//             options={options}
//             value={frameWork}
//             styles={{
//               control: (base) => ({
//                 ...base,
//                 backgroundColor: '#111',
//                 borderColor: '#333',
//                 color: '#fff',
//               }),
//               menu: (base) => ({ ...base, backgroundColor: '#111', color: '#fff' }),
//               option: (base, state) => ({
//                 ...base,
//                 backgroundColor: state.isFocused ? '#222' : '#111',
//                 color: '#fff',
//               }),
//               singleValue: (base) => ({ ...base, color: '#fff' }),
//             }}
//             onChange={(selected) => setFrameWork(selected)}
//           />

//           {/* Text Prompt */}
//           <p className="text-[15px] font-[700] mt-5">Describe your component</p>
//           <textarea
//             onChange={(e) => setPrompt(e.target.value)}
//             value={prompt}
//             className="w-full min-h-[180px] rounded-xl bg-[#09090B] mt-3 p-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
//             placeholder="Describe your component or UI idea..."
//           ></textarea>

//           {/* Image Upload */}
//           <div className="mt-4 flex items-center gap-3">
//             <label
//               htmlFor="imageUpload"
//               className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded-lg cursor-pointer transition-all"
//             >
//               <FaImage />
//               Upload Image
//             </label>
//             <input
//               type="file"
//               id="imageUpload"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageUpload}
//             />
//             {image && (
//               <img
//                 src={image}
//                 alt="preview"
//                 className="w-14 h-14 rounded-lg border border-gray-600 object-cover"
//               />
//             )}
//           </div>

//           {/* Generate Button */}
//           <div className="flex items-center justify-between mt-5">
//             <p className="text-gray-400 text-sm">Click generate to get your code</p>
//             <button
//               onClick={getResponse}
//               className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 px-5 gap-2 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
//             >
//               {loading ? <ClipLoader color="white" size={18} /> : <BsStars />}
//               Generate
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="relative mt-2 w-full h-[80vh] bg-[#141319] rounded-xl overflow-hidden">
//           {!outputScreen ? (
//             <div className="w-full h-full flex items-center flex-col justify-center">
//               <div className="p-5 w-[70px] flex items-center justify-center text-[30px] h-[70px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700">
//                 <HiOutlineCode />
//               </div>
//               <p className="text-[16px] text-gray-400 mt-3">
//                 Your component & code will appear here.
//               </p>
//             </div>
//           ) : (
//             <>
//               {/* Tabs */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
//                 <button
//                   onClick={() => setTab(1)}
//                   className={`w-1/2 py-2 rounded-lg transition-all duration-300 ${
//                     tab === 1
//                       ? 'bg-purple-600 text-white shadow-lg'
//                       : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
//                   }`}
//                 >
//                   Code
//                 </button>
//                 <button
//                   onClick={() => setTab(2)}
//                   className={`w-1/2 py-2 rounded-lg transition-all duration-300 ${
//                     tab === 2
//                       ? 'bg-purple-600 text-white shadow-lg'
//                       : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
//                   }`}
//                 >
//                   Preview
//                 </button>
//               </div>

//               {/* Toolbar */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center justify-between px-4">
//                 <p className="font-bold text-gray-200">
//                   {tab === 1 ? 'Code Editor' : 'Preview'}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   {tab === 1 ? (
//                     <>
//                       <button
//                         onClick={copyCode}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <IoCopy />
//                       </button>
//                       <button
//                         onClick={downloadFile}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <PiExportBold />
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => setIsNewTabOpen(true)}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <ImNewTab />
//                       </button>
//                       <button
//                         onClick={() => setRefreshKey((k) => k + 1)}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <FiRefreshCcw />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Editor or Preview */}
//               <div className="h-full">
//                 {tab === 1 ? (
//                   <Editor value={code} height="100%" theme="vs-dark" language="html" />
//                 ) : (
//                   <iframe
//                     key={refreshKey}
//                     srcDoc={code}
//                     className="w-full h-full bg-white"
//                   ></iframe>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Fullscreen Preview */}
//       {isNewTabOpen && (
//         <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto">
//           <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100">
//             <p className="font-bold">Preview</p>
//             <button
//               onClick={() => setIsNewTabOpen(false)}
//               className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200"
//             >
//               <IoCloseSharp />
//             </button>
//           </div>
//           <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;



// import React, { useState } from "react";
// import Select from "react-select";
// import { BsStars } from "react-icons/bs";
// import { HiOutlineCode } from "react-icons/hi";
// import Editor from "@monaco-editor/react";
// import { IoCloseSharp, IoCopy } from "react-icons/io5";
// import { PiExportBold } from "react-icons/pi";
// import { ImNewTab } from "react-icons/im";
// import { FiRefreshCcw } from "react-icons/fi";
// import { FaImage } from "react-icons/fa6";
// import { ClipLoader } from "react-spinners";
// import { toast } from "react-toastify";
// import { GoogleGenerativeAI } from "@google/generative-ai";



// const Home = () => {
//   const options = [
//     { value: "html-css", label: "HTML + CSS" },
//     { value: "html-tailwind", label: "HTML + Tailwind CSS" },
//     { value: "html-bootstrap", label: "HTML + Bootstrap" },
//     { value: "html-css-js", label: "HTML + CSS + JS" },
//     { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
//   ];

//   const [outputScreen, setOutputScreen] = useState(false);
//   const [tab, setTab] = useState(1);
//   const [prompt, setPrompt] = useState("");
//   const [frameWork, setFrameWork] = useState(options[0]);
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isNewTabOpen, setIsNewTabOpen] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);

//   // Image states
//   const [imagePreview, setImagePreview] = useState(null); // data URL for thumbnail
//   const [imageBase64, setImageBase64] = useState(null); // pure base64 string (without data: prefix)
//   const [useImage, setUseImage] = useState(false); // whether an image is uploaded

//   // Initialize Gemini SDK (browser-safe)
//   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

//   function extractCode(response) {
//     const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
//     return match ? match[1].trim() : response.trim();
//   }

//   // Handle image upload -> set preview and base64
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image file");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const dataUrl = reader.result; // data:<mime>;base64,AAAA...
//       setImagePreview(dataUrl);
//       // store only base64 payload for inlineData
//       const base64 = dataUrl.split(",")[1];
//       setImageBase64(base64);
//       setUseImage(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   async function getResponse() {
//     if (!prompt.trim() && !useImage) {
//       return toast.error("Please describe your component or upload an image first");
//     }

//     try {
//       setLoading(true);

//       // pick model
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       // Build request contents depending on image presence
//       if (useImage && imageBase64) {
//         // multipart-like content with text + inlineData
//         const contents = [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `Generate a responsive ${frameWork.label} UI that matches the design shown in the image. 
// If a text prompt is provided, use it as additional guidance: "${prompt}".
// Return ONLY a single HTML file inside Markdown fenced code blocks (no explanation).`,
//               },
//               {
//                 inlineData: {
//                   mimeType: "image/png", // acceptable mimeType; if original was jpg this still usually works
//                   data: imageBase64,
//                 },
//               },
//             ],
//           },
//         ];

//         const result = await model.generateContent({ contents });
//         const response = await result.response;
//         const text = response.text();
//         setCode(extractCode(text));
//       } else {
//         // Text-only flow
//         const promptText = `
// You are an expert frontend developer. Generate a modern, responsive component for:
// "${prompt}"
// Framework: ${frameWork.label}

// Rules:
// - Return only code inside Markdown fenced code blocks (no explanation).
// - Include full HTML structure, CSS, and JS if needed.
// - Optimize for modern design, animations, and responsiveness.
// `;
//         const result = await model.generateContent(promptText);
//         const response = await result.response;
//         const text = response.text();
//         setCode(extractCode(text));
//       }

//       setOutputScreen(true);
//       toast.success("Code generated successfully");
//     } catch (err) {
//       console.error(err);
//       // Show different message for common issues
//       if (err?.message?.includes("API key not valid")) {
//         toast.error("API key invalid — check VITE_GOOGLE_API_KEY in .env (use AI Studio key)");
//       } else {
//         toast.error("Error while generating code");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   const copyCode = async () => {
//     if (!code.trim()) return toast.error("No code to copy");
//     try {
//       await navigator.clipboard.writeText(code);
//       toast.success("Code copied to clipboard");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to copy");
//     }
//   };

//   const downloadFile = () => {
//     if (!code.trim()) return toast.error("No code to download");
//     const fileName = "GenUI-Code.html";
//     const blob = new Blob([code], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = fileName;
//     link.click();
//     URL.revokeObjectURL(url);
//     toast.success("File downloaded");
//   };

//   const clearImage = () => {
//     setImagePreview(null);
//     setImageBase64(null);
//     setUseImage(false);
//   };

//   return (
//     <>
//       {/* LEFT: Inputs */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16">
//         <div className="w-full py-6 rounded-xl bg-[#141319] mt-5 p-5 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
//           <h3 className="text-[25px] font-semibold sp-text">AI Component Generator</h3>
//           <p className="text-gray-300 mt-2 text-[16px]">Describe your component or upload a reference image.</p>

//           <p className="text-[15px] font-[700] mt-4">Framework</p>
//           <Select
//             className="mt-2"
//             options={options}
//             value={frameWork}
//             onChange={(selected) => setFrameWork(selected)}
//             styles={{
//               control: (base) => ({ ...base, backgroundColor: "#111", borderColor: "#333", color: "#fff" }),
//               menu: (base) => ({ ...base, backgroundColor: "#111", color: "#fff" }),
//               option: (base, state) => ({ ...base, backgroundColor: state.isFocused ? "#222" : "#111", color: "#fff" }),
//               singleValue: (base) => ({ ...base, color: "#fff" }),
//             }}
//           />

//           <p className="text-[15px] font-[700] mt-5">Describe your component</p>
//           <textarea
//             onChange={(e) => setPrompt(e.target.value)}
//             value={prompt}
//             className="w-full min-h-[160px] rounded-xl bg-[#09090B] mt-3 p-3 text-white placeholder-gray-400 outline-none resize-none"
//             placeholder="Describe your component in detail (optional if you upload an image)..."
//           ></textarea>

//           {/* Image upload */}
//           <div className="flex items-center gap-3 mt-4">
//             <label className="cursor-pointer w-12 h-12 flex items-center justify-center bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300">
//               <FaImage className="text-white text-xl" />
//               <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//             </label>

//             {imagePreview ? (
//               <div className="flex items-center gap-2">
//                 <img src={imagePreview} alt="preview" className="w-14 h-14 object-cover rounded-lg border border-gray-700" />
//                 <button
//                   onClick={clearImage}
//                   className="px-3 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-400 text-sm"> Upload an image — AI will generate matching code.</p>
//             )}
//           </div>

//           <div className="flex items-center justify-between mt-5">
//             <p className="text-gray-400 text-sm">Click generate to get your code</p>
//             <button
//               onClick={getResponse}
//               disabled={loading}
//               className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 px-5 gap-2 transition-transform duration-300 hover:scale-105 disabled:opacity-60"
//             >
//               {loading ? <ClipLoader color="white" size={18} /> : <BsStars />}
//               Generate
//             </button>
//           </div>
//         </div>

//         {/* RIGHT: Editor & Preview */}
//         <div className="relative mt-2 w-full h-[80vh] bg-[#141319] rounded-xl overflow-hidden">
//           {!outputScreen ? (
//             <div className="w-full h-full flex items-center flex-col justify-center">
//               <div className="p-5 w-[70px] h-[70px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
//                 <HiOutlineCode />
//               </div>
//               <p className="text-[16px] text-gray-400 mt-3">Your component & code will appear here.</p>
//             </div>
//           ) : (
//             <>
//               {/* Tabs */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
//                 <button
//                   onClick={() => setTab(1)}
//                   className={`w-1/2 py-2 rounded-lg ${tab === 1 ? "bg-purple-600 text-white shadow-lg" : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}`}
//                 >
//                   Code
//                 </button>
//                 <button
//                   onClick={() => setTab(2)}
//                   className={`w-1/2 py-2 rounded-lg ${tab === 2 ? "bg-purple-600 text-white shadow-lg" : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}`}
//                 >
//                   Preview
//                 </button>
//               </div>

//               {/* Toolbar */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center justify-between px-4">
//                 <p className="font-bold text-gray-200">Code Editor</p>
//                 <div className="flex items-center gap-2">
//                   {tab === 1 ? (
//                     <>
//                       <button onClick={copyCode} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]">
//                         <IoCopy />
//                       </button>
//                       <button onClick={downloadFile} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]">
//                         <PiExportBold />
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => setIsNewTabOpen(true)} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]">
//                         <ImNewTab />
//                       </button>
//                       <button onClick={() => setRefreshKey((p) => p + 1)} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]">
//                         <FiRefreshCcw />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Editor / Preview */}
//               <div className="h-full">
//                 {tab === 1 ? (
//                   <Editor value={code} height="100%" theme="vs-dark" language="html" />
//                 ) : (
//                   <iframe key={refreshKey} srcDoc={code} className="w-full h-full bg-white"></iframe>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Fullscreen Preview */}
//       {isNewTabOpen && (
//         <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto">
//           <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100">
//             <p className="font-bold">Preview</p>
//             <button onClick={() => setIsNewTabOpen(false)} className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200">
//               <IoCloseSharp />
//             </button>
//           </div>
//           <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;



// this uper one to be use as



// for industry level use lower code


// import React, { useState } from "react";
// import Select from "react-select";
// import { BsStars } from "react-icons/bs";
// import { HiOutlineCode } from "react-icons/hi";
// import Editor from "@monaco-editor/react";
// import { IoCloseSharp, IoCopy } from "react-icons/io5";
// import { PiExportBold } from "react-icons/pi";
// import { ImNewTab } from "react-icons/im";
// import { FiRefreshCcw } from "react-icons/fi";
// import { FaImage } from "react-icons/fa6";
// import { ClipLoader } from "react-spinners";
// import { toast } from "react-toastify";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { MdLightMode } from "react-icons/md";

// const Home = () => {
//   // 🚀 Framework options (industry-level)
//   const frameworkOptions = [
//     { value: "html-css", label: "🌐 HTML + CSS" },
//     { value: "html-tailwind", label: "🎨 HTML + Tailwind CSS" },
//     { value: "html-bootstrap", label: "🧱 HTML + Bootstrap" },
//     { value: "html-css-js", label: "⚡ HTML + CSS + JS" },
//     { value: "react", label: "⚛️ React (with Tailwind)" },
//     { value: "nextjs", label: "🚀 Next.js (App Router)" },
//     // { value: "vue", label: "🟢 Vue 3 + Vite" },
//     // { value: "svelte", label: "🔥 SvelteKit" },
//   ];

//   const [outputScreen, setOutputScreen] = useState(false);
//   const [tab, setTab] = useState(1);
//   const [prompt, setPrompt] = useState("");
//   const [frameWork, setFrameWork] = useState(frameworkOptions[0]);
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isNewTabOpen, setIsNewTabOpen] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [lightMode, setLightMode] = useState(false);

//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageBase64, setImageBase64] = useState(null);
//   const [useImage, setUseImage] = useState(false);

//   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

//   // 🔍 Extract clean code from Gemini response
//   function extractCode(response) {
//     const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
//     return match ? match[1].trim() : response.trim();
//   }

//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image file");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const dataUrl = reader.result;
//       setImagePreview(dataUrl);
//       const base64 = dataUrl.split(",")[1];
//       setImageBase64(base64);
//       setUseImage(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   async function getResponse() {
//     if (!prompt.trim() && !useImage)
//       return toast.error("Please describe your component or upload an image first");

//     try {
//       setLoading(true);
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       if (useImage && imageBase64) {
//         const contents = [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `Generate a responsive ${frameWork.label} UI that matches the image design.
// If text prompt is given, use it for additional context: "${prompt}".
// Return ONLY the full working code inside markdown fences.`,
//               },
//               {
//                 inlineData: {
//                   mimeType: "image/png",
//                   data: imageBase64,
//                 },
//               },
//             ],
//           },
//         ];

//         const result = await model.generateContent({ contents });
//         const response = await result.response;
//         const text = response.text();
//         setCode(extractCode(text));
//       } else {
//         const promptText = `
// You are a senior frontend engineer.
// Generate a production-ready ${frameWork.label} component for:
// "${prompt}"

// Guidelines:
// - Use latest ${frameWork.label} best practices.
// - Must be responsive, clean, and modern.
// - Include subtle animations and hover effects.
// - Code should be organized, readable, and ready for production.
// - Return ONLY the code inside markdown code block.
//         `;
//         const result = await model.generateContent(promptText);
//         const response = await result.response;
//         const text = response.text();
//         setCode(extractCode(text));
//       }

//       setOutputScreen(true);
//       toast.success("✅ Code generated successfully!");
//     } catch (err) {
//       console.error(err);
//       if (err?.message?.includes("API key not valid")) {
//         toast.error("API key invalid — check VITE_GOOGLE_API_KEY in .env");
//       } else {
//         toast.error("Error while generating code");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   const copyCode = async () => {
//     if (!code.trim()) return toast.error("No code to copy");
//     await navigator.clipboard.writeText(code);
//     toast.success("Code copied to clipboard");
//   };

//   const downloadFile = () => {
//     if (!code.trim()) return toast.error("No code to download");
//     const blob = new Blob([code], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "Generated-Component.html";
//     link.click();
//     URL.revokeObjectURL(url);
//     toast.success("File downloaded");
//   };

//   const clearImage = () => {
//     setImagePreview(null);
//     setImageBase64(null);
//     setUseImage(false);
//   };

//   const toggleLightMode = () => setLightMode((p) => !p);

//   return (
//     <>
//       {/* 🌞 Light/Dark Toggle */}
//       <div className="fixed top-5 right-5 z-50">
//         <button
//           onClick={toggleLightMode}
//           className="p-2 bg-yellow-400 rounded-full shadow hover:brightness-90 transition"
//           title="Toggle Light/Dark"
//         >
//           <MdLightMode className="text-xl" />
//         </button>
//       </div>

//       {/* Main Layout */}
//       <div
//         className={`grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16 ${
//           lightMode ? "bg-white text-black" : "bg-[#09090B] text-white"
//         }`}
//       >
//         {/* LEFT PANEL */}
//         <div
//           className={`w-full py-6 rounded-xl mt-5 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
//             lightMode ? "bg-gray-100" : "bg-[#141319]"
//           }`}
//         >
//           <h3 className="text-[25px] font-semibold sp-text">
//             AI Component Generator
//           </h3>
//           <p
//             className={`mt-2 text-[16px] ${
//               lightMode ? "text-gray-700" : "text-gray-300"
//             }`}
//           >
//             Describe your component or upload a reference image.
//           </p>

//           <p className="text-[15px] font-[700] mt-4">Framework</p>
//           <Select
//             className="mt-2"
//             options={frameworkOptions}
//             value={frameWork}
//             onChange={(selected) => setFrameWork(selected)}
//             styles={{
//               control: (base) => ({
//                 ...base,
//                 backgroundColor: lightMode ? "#f9fafb" : "#111",
//                 borderColor: lightMode ? "#ccc" : "#333",
//                 color: lightMode ? "#000" : "#fff",
//                 borderRadius: "12px",
//                 boxShadow: "0 0 8px rgba(139, 92, 246, 0.2)",
//                 padding: "4px 6px",
//               }),
//               menu: (base) => ({
//                 ...base,
//                 backgroundColor: lightMode ? "#fff" : "#111",
//                 color: lightMode ? "#000" : "#fff",
//                 borderRadius: "10px",
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//               }),
//               option: (base, state) => ({
//                 ...base,
//                 backgroundColor: state.isFocused
//                   ? lightMode
//                     ? "#e0e7ff"
//                     : "#312e81"
//                   : lightMode
//                   ? "#fff"
//                   : "#111",
//                 color: state.isFocused ? "#4f46e5" : lightMode ? "#000" : "#fff",
//                 borderRadius: "8px",
//                 padding: "10px",
//                 transition: "all 0.2s",
//               }),
//               singleValue: (base) => ({
//                 ...base,
//                 color: lightMode ? "#000" : "#fff",
//                 fontWeight: 600,
//               }),
//             }}
//           />

//           <p className="text-[15px] font-[700] mt-5">Describe your component</p>
//           <textarea
//             onChange={(e) => setPrompt(e.target.value)}
//             value={prompt}
//             className={`w-full min-h-[160px] rounded-xl mt-3 p-3 outline-none resize-none ${
//               lightMode
//                 ? "bg-gray-200 text-black placeholder-gray-500"
//                 : "bg-[#09090B] text-white placeholder-gray-400"
//             }`}
//             placeholder="Describe your component in detail (optional if you upload an image)..."
//           ></textarea>

//           {/* Image Upload */}
//           <div className="flex items-center gap-3 mt-4">
//             <label className="cursor-pointer w-12 h-12 flex items-center justify-center bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300">
//               <FaImage className="text-white text-xl" />
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />
//             </label>

//             {imagePreview ? (
//               <div className="flex items-center gap-2">
//                 <img
//                   src={imagePreview}
//                   alt="preview"
//                   className="w-14 h-14 object-cover rounded-lg border border-gray-700"
//                 />
//                 <button
//                   onClick={clearImage}
//                   className="px-3 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <p
//                 className={`text-sm ${
//                   lightMode ? "text-gray-600" : "text-gray-400"
//                 }`}
//               >
//                 Upload an image — AI will generate matching code.
//               </p>
//             )}
//           </div>

//           <div className="flex items-center justify-between mt-5">
//             <p
//               className={`text-sm ${
//                 lightMode ? "text-gray-700" : "text-gray-400"
//               }`}
//             >
//               Click generate to get your code
//             </p>
//             <button
//               onClick={getResponse}
//               disabled={loading}
//               className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 px-5 gap-2 transition-transform duration-300 hover:scale-105 disabled:opacity-60"
//             >
//               {loading ? <ClipLoader color="white" size={18} /> : <BsStars />}
//               Generate
//             </button>
//           </div>
//         </div>

//         {/* RIGHT PANEL */}
//         <div
//           className={`relative mt-2 w-full h-[80vh] rounded-xl overflow-hidden ${
//             lightMode ? "bg-gray-50 text-black" : "bg-[#141319] text-white"
//           }`}
//         >
//           {!outputScreen ? (
//             <div className="w-full h-full flex items-center flex-col justify-center">
//               <div className="p-5 w-[70px] h-[70px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
//                 <HiOutlineCode />
//               </div>
//               <p
//                 className={`text-[16px] mt-3 ${
//                   lightMode ? "text-gray-700" : "text-gray-400"
//                 }`}
//               >
//                 Your component & code will appear here.
//               </p>
//             </div>
//           ) : (
//             <>
//               {/* Tabs */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
//                 <button
//                   onClick={() => setTab(1)}
//                   className={`w-1/2 py-2 rounded-lg ${
//                     tab === 1
//                       ? "bg-purple-600 text-white shadow-lg"
//                       : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
//                   }`}
//                 >
//                   Code
//                 </button>
//                 <button
//                   onClick={() => setTab(2)}
//                   className={`w-1/2 py-2 rounded-lg ${
//                     tab === 2
//                       ? "bg-purple-600 text-white shadow-lg"
//                       : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
//                   }`}
//                 >
//                   Preview
//                 </button>
//               </div>

//               {/* Toolbar */}
//               <div className="bg-[#17171C] w-full h-[50px] flex items-center justify-between px-4">
//                 <p className="font-bold text-gray-200">Code Editor</p>
//                 <div className="flex items-center gap-2">
//                   {tab === 1 ? (
//                     <>
//                       <button
//                         onClick={copyCode}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <IoCopy />
//                       </button>
//                       <button
//                         onClick={downloadFile}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <PiExportBold />
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => setIsNewTabOpen(true)}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <ImNewTab />
//                       </button>
//                       <button
//                         onClick={() => setRefreshKey((p) => p + 1)}
//                         className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
//                       >
//                         <FiRefreshCcw />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Editor / Preview */}
//               <div className="h-full">
//                 {tab === 1 ? (
//                   <Editor
//                     value={code}
//                     height="100%"
//                     theme={lightMode ? "light" : "vs-dark"}
//                     language="html"
//                   />
//                 ) : (
//                   <iframe
//                     key={refreshKey}
//                     srcDoc={code}
//                     className="w-full h-full bg-white"
//                   ></iframe>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Fullscreen Preview */}
//       {isNewTabOpen && (
//         <div className="absolute inset-0 w-screen h-screen overflow-auto bg-white">
//           <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100">
//             <p className="font-bold">Preview</p>
//             <button
//               onClick={() => setIsNewTabOpen(false)}
//               className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200"
//             >
//               <IoCloseSharp />
//             </button>
//           </div>
//           <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;

































import React, { useState } from "react";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { FaImage } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MdLightMode } from "react-icons/md";

const Home = () => {
  // 🚀 Framework options (industry-level)
  const frameworkOptions = [
    { value: "html-css", label: "🌐 HTML + CSS" },
    { value: "html-tailwind", label: "🎨 HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "🧱 HTML + Bootstrap" },
    { value: "html-css-js", label: "⚡ HTML + CSS + JS" },
    { value: "react", label: "⚛️ React (with Tailwind)" },
    { value: "nextjs", label: "🚀 Next.js (App Router)" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(frameworkOptions[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [useImage, setUseImage] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setImagePreview(dataUrl);
      const base64 = dataUrl.split(",")[1];
      setImageBase64(base64);
      setUseImage(true);
    };
    reader.readAsDataURL(file);
  };

  async function getResponse() {
    if (!prompt.trim() && !useImage)
      return toast.error("Please describe your component or upload an image first");

    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      if (useImage && imageBase64) {
        const contents = [
          {
            role: "user",
            parts: [
              {
                text: `Generate a responsive ${frameWork.label} UI that matches the image design.
If text prompt is given, use it for additional context: "${prompt}".
Return ONLY the full working code inside markdown fences.`,
              },
              {
                inlineData: {
                  mimeType: "image/png",
                  data: imageBase64,
                },
              },
            ],
          },
        ];

        const result = await model.generateContent({ contents });
        const response = await result.response;
        const text = response.text();
        setCode(extractCode(text));
      } else {
        const promptText = `
You are a senior frontend engineer.
Generate a production-ready ${frameWork.label} component for:
"${prompt}"

Guidelines:
- Use latest ${frameWork.label} best practices.
- Must be responsive, clean, and modern.
- Include subtle animations and hover effects.
- Code should be organized, readable, and ready for production.
- Return ONLY the code inside markdown code block.
        `;
        const result = await model.generateContent(promptText);
        const response = await result.response;
        const text = response.text();
        setCode(extractCode(text));
      }

      setOutputScreen(true);
      toast.success("✅ Code generated successfully!");
    } catch (err) {
      console.error(err);
      if (err?.message?.includes("API key not valid")) {
        toast.error("API key invalid — check VITE_GOOGLE_API_KEY in .env");
      } else {
        toast.error("Error while generating code");
      }
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const downloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Generated-Component.html";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded");
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setUseImage(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16 bg-[#09090B] text-white">
      {/* LEFT PANEL */}
      <div className="w-full py-6 rounded-xl mt-5 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-[#141319]">
        <h3 className="text-[25px] font-semibold sp-text">
          AI Component Generator
        </h3>
        <p className="mt-2 text-[16px] text-gray-300">
          Describe your component or upload a reference image.
        </p>

        <p className="text-[15px] font-[700] mt-4">Framework</p>
        <Select
          className="mt-2"
          options={frameworkOptions}
          value={frameWork}
          onChange={(selected) => setFrameWork(selected)}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#111",
              borderColor: "#333",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: "0 0 8px rgba(139, 92, 246, 0.2)",
              padding: "4px 6px",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: "10px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#312e81" : "#111",
              color: state.isFocused ? "#4f46e5" : "#fff",
              borderRadius: "8px",
              padding: "10px",
              transition: "all 0.2s",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#fff",
              fontWeight: 600,
            }),
          }}
        />

        <p className="text-[15px] font-[700] mt-5">Describe your component</p>
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="w-full min-h-[160px] rounded-xl mt-3 p-3 outline-none resize-none bg-[#09090B] text-white placeholder-gray-400"
          placeholder="Describe your component in detail (optional if you upload an image)..."
        ></textarea>

        {/* Image Upload */}
        <div className="flex items-center gap-3 mt-4">
          <label className="cursor-pointer w-12 h-12 flex items-center justify-center bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300">
            <FaImage className="text-white text-xl" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {imagePreview ? (
            <div className="flex items-center gap-2">
              <img
                src={imagePreview}
                alt="preview"
                className="w-14 h-14 object-cover rounded-lg border border-gray-700"
              />
              <button
                onClick={clearImage}
                className="px-3 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Upload an image — AI will generate matching code.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-gray-400">Click generate to get your code</p>
          <button
            onClick={getResponse}
            disabled={loading}
            className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 px-5 gap-2 transition-transform duration-300 hover:scale-105 disabled:opacity-60"
          >
            {loading ? <ClipLoader color="white" size={18} /> : <BsStars />}
            Generate
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative mt-2 w-full h-[80vh] rounded-xl overflow-hidden bg-[#141319] text-white">
        {!outputScreen ? (
          <div className="w-full h-full flex items-center flex-col justify-center">
            <div className="p-5 w-[70px] h-[70px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
              <HiOutlineCode />
            </div>
            <p className="text-[16px] mt-3 text-gray-400">
              Your component & code will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="bg-[#17171C] w-full h-[50px] flex items-center gap-3 px-3">
              <button
                onClick={() => setTab(1)}
                className={`w-1/2 py-2 rounded-lg ${
                  tab === 1
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setTab(2)}
                className={`w-1/2 py-2 rounded-lg ${
                  tab === 2
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
              >
                Preview
              </button>
            </div>

            {/* Toolbar */}
            <div className="bg-[#17171C] w-full h-[50px] flex items-center justify-between px-4">
              <p className="font-bold text-gray-200">Code Editor</p>
              <div className="flex items-center gap-2">
                {tab === 1 ? (
                  <>
                    <button
                      onClick={copyCode}
                      className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
                    >
                      <IoCopy />
                    </button>
                    <button
                      onClick={downloadFile}
                      className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
                    >
                      <PiExportBold />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsNewTabOpen(true)}
                      className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
                    >
                      <ImNewTab />
                    </button>
                    <button
                      onClick={() => setRefreshKey((p) => p + 1)}
                      className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-[#333]"
                    >
                      <FiRefreshCcw />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Editor / Preview */}
            <div className="h-full">
              {tab === 1 ? (
                <Editor value={code} height="100%" theme="vs-dark" language="html" />
              ) : (
                <iframe key={refreshKey} srcDoc={code} className="w-full h-full bg-white"></iframe>
              )}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Preview */}
      {isNewTabOpen && (
        <div className="absolute inset-0 w-screen h-screen overflow-auto bg-white">
          <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-gray-100">
            <p className="font-bold">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 rounded-xl border border-zinc-300 flex items-center justify-center hover:bg-gray-200"
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)]"></iframe>
        </div>
      )}
    </div>
  );
};

export default Home;
