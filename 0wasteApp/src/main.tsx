import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// import App from './App.tsx'
// import React from "react";
// import './index.css'
// import ReactDOM from "react-dom/client";
// import { AuthProvider } from "./contexts/AuthContext";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>
// );
