import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home_Icon  from "../assets/home_image.jpg";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-slate-300">
      <div className="flex flex-col items-start justify-center w-full md:w-1/2 h-full p-8 text-left">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-black mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to InterviewBuddy
        </motion.h1>
        <motion.p
          className="text-black text-lg mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Real-time collaboration made easy.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            to="/register"
            className="bg-black text-green-400 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-black text-green-400 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Login
          </Link>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2 h-full">
        <img
          src={Home_Icon}
          alt="Collaboration"
          className="object-cover w-full h-full rounded-t-full md:rounded-l-full md:rounded-t-none"
        />
      </div>
    </div>
  );
};

export default Home;