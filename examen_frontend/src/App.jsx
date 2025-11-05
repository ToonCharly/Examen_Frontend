import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard"; // 👈 importa tu dashboard

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard /> {/* 👈 renderiza tu dashboard */}
    </div>
  );
}

export default App;
