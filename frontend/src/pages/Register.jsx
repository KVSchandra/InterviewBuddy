import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      const response = await fetch("https://interviewbuddy-5sql.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Response text:", text); // Log the response text

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      navigate("/login"); // Redirect after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-slate-300">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;