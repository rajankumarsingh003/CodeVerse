

// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './Pages/Home';
// import NoPage from './Pages/NoPage';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
// import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
//  import Debugger from "./Pages/Debugger.jsx";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="flex flex-col min-h-screen">
//         <Navbar />

//         <div className="flex-grow">
//           <Routes>
//             {/* Home route: Only accessible if signed in */}
//             <Route
//               path="/"
//               element={
//                 <SignedIn>
//                   <Home />
//                 </SignedIn>
//               }
//             />

//             {/* Redirect to SignIn if not signed in */}
//             <Route
//               path="/"
//               element={
//                 <SignedOut>
//                   <SignIn routing="path" path="/sign-in" />
//                 </SignedOut>
//               }
//             />

//             {/* Sign-in and Sign-up pages */}
//             <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
//             <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

//             {/* Catch-all */}
           
           
           
//             <Route path="*" element={<NoPage />} />


//              <Route path="/debugger" element={<Debugger />} />
//           </Routes>
//         </div>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;


// use the lower code for original professional




import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Debugger from "./Pages/Debugger.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            {/* ✅ Home route (Protected) */}
            <Route
              path="/"
              element={
                <SignedIn>
                  <Home />
                </SignedIn>
              }
            />

            {/* ✅ Sign-in redirect */}
            <Route
              path="/sign-in/*"
              element={<SignIn routing="path" path="/sign-in" />}
            />
            <Route
              path="/sign-up/*"
              element={<SignUp routing="path" path="/sign-up" />}
            />

            {/* ✅ Debugger route */}
            <Route path="/debugger" element={<Debugger />} />

            {/* ✅ Catch-all */}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;


