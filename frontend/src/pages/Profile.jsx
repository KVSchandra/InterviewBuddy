import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    // API CALL to update user details (to be implemented in userApi.js)
    setMessage("Profile Updated Successfully!");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        {message && <p className="text-green-500 text-center">{message}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Update Profile
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
