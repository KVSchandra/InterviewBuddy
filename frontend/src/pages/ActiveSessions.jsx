import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ActiveSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error("Error fetching sessions:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📝 Active Collaboration Sessions</h1>

      <motion.div className="grid gap-4">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <motion.div
              key={session.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-bold">{session.title}</h2>
              <p className="text-gray-600">Host: {session.host}</p>
              <Link to={`/editor/${session.id}`} className="text-blue-500 mt-2 inline-block">
                Join Session →
              </Link>
            </motion.div>
          ))
        ) : (
          <p>No active sessions available.</p>
        )}
      </motion.div>
    </div>
  );
};

export default ActiveSessions;
