import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard.jsx"; 
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  return (
    <BrowserRouter>
     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
