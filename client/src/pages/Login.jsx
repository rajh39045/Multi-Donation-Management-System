import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {

      const res = await loginUser(formData);

      // ✅ Store user + token
      login(res.data.token, res.data.user);

      // 🔥 FORCE RELOAD (fix role issue)
      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-500 to-emerald-500 text-white items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
          <p>Manage your donations easily.</p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">

        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-600">
              Register
            </NavLink>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;