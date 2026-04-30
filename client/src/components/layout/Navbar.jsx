import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const baseStyle =
    "px-4 py-2 rounded-lg text-sm font-medium transition duration-300";

  const activeStyle =
    "bg-blue-600 text-white shadow-md";

  const inactiveStyle =
    "text-gray-700 hover:bg-blue-100";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* 🔥 Animated Gradient Logo */}
        <NavLink to="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-extrabold gradient-text tracking-wide">
            MultiDonate
          </span>
          <span className="text-xs text-gray-500 tracking-widest">
            Coordination System
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            Dashboard
          </NavLink>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col px-6 pb-4 gap-2 bg-white shadow-md"
          >

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Register
            </NavLink>

            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Dashboard
            </NavLink>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;