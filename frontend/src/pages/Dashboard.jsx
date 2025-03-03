import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <motion.div
        className="bg-blue-600 text-white p-6 rounded-lg shadow-lg text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username || "User"}! 🚀
        </h1>
        <p className="text-lg opacity-80">Your real-time collaboration dashboard</p>
      </motion.div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-bold mb-2">👤 Profile</h2>
          <p className="text-gray-600">{user?.email}</p>
          <Link to="/profile" className="text-blue-500 mt-2 inline-block">
            View Profile →
          </Link>
        </motion.div>

        {/* Collaboration Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-bold mb-2">📝 Active Sessions</h2>
          <p className="text-gray-600">Join or start a real-time collaboration session.</p>
          <Link to="/editor" className="text-blue-500 mt-2 inline-block">
            Start Now →
          </Link>
        </motion.div>

        {/* Settings Card */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-bold mb-2">⚙️ Settings</h2>
          <p className="text-gray-600">Manage your preferences and account settings.</p>
          <Link to="/settings" className="text-blue-500 mt-2 inline-block">
            Go to Settings →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
