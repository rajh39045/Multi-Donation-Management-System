import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function Layout() {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">

      <Sidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col md:ml-64 w-full">

        <main className="p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;