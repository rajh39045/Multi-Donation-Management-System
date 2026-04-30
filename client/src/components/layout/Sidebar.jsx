import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaList,
  FaHandsHelping,
  FaCertificate,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {

  const navigate = useNavigate();
  const { logout, user } = useAuth();

  if (!user || !user.role) return null;

  const role = user.role.toUpperCase();

  const base = "flex items-center gap-3 p-3 rounded-lg";
  const active = "bg-blue-600 text-white";
  const inactive = "hover:bg-blue-100";

  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-6 fixed">

      <h2 className="text-xl font-bold text-blue-600 mb-8">
        MultiDonate
      </h2>

      <nav className="flex flex-col gap-2">

        <NavLink to="/dashboard" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
          <FaHome /> Dashboard
        </NavLink>

        {role === "DONOR" && (
          <>
            <NavLink to="/dashboard/create-donation" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
              <FaPlus /> Create Donation
            </NavLink>

            <NavLink to="/dashboard/my-donations" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
              <FaList /> My Donations
            </NavLink>
          </>
        )}

        {(role === "NGO" || role === "VOLUNTEER") && (
          <NavLink to="/dashboard/donations" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
            <FaHandsHelping /> Donations
          </NavLink>
        )}

        <NavLink to="/dashboard/profile" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
          <FaUser /> Profile
        </NavLink>

      </nav>

      <button
        onClick={() => {
          logout();
          window.location.href = "/login";
        }}
        className="mt-6 text-red-500"
      >
        <FaSignOutAlt /> Logout
      </button>

    </aside>
  );
}

export default Sidebar;