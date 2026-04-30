import { useState } from "react";   // FIXED
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONOR",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      const res = await registerUser(formData);

      if (res.status === 201) {

        setSuccess("Registration successful! Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      }

    } catch (err) {

      console.error("Register error:", err.response || err);

      setError(
        err.response?.data?.message || "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 via-blue-500 to-emerald-500 text-white items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-bold mb-6">
            Join MultiDonate
          </h1>
          <p className="text-lg">
            Be part of a transparent and impactful donation ecosystem.
          </p>
        </motion.div>
      </div>

      {/* FORM */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
        >

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h2>

          {error && (
            <div className="text-red-600 text-sm mb-3 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm mb-3 text-center">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            >
              <option value="DONOR">Donor</option>
              <option value="VOLUNTEER">Volunteer</option>
              <option value="NGO">NGO</option>
            </select>

            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </NavLink>
          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Register;