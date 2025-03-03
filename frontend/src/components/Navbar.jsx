import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
        InterviewBuddy
      </Link>

      <div className="relative">
        <motion.img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          whileTap={{ scale: 0.9 }}
        />

        {dropdownOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 transition">
              Home
            </Link>
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 transition">
              Dashboard
            </Link>
            {user ? (
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 transition">
                  Login
                </Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-100 transition">
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;