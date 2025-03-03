import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import RoomSelection from "./pages/RoomSelection";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/RoomSelection" element={<RoomSelection />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;