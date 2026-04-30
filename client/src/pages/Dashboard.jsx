import { FaDonate, FaCheckCircle, FaCertificate } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Track your donations and activities
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Donations</p>
            <h2 className="text-2xl font-bold text-blue-600 mt-1">₹7500</h2>
          </div>
          <FaDonate className="text-blue-600 text-xl" />
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Completed Cases</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">5</h2>
          </div>
          <FaCheckCircle className="text-green-600 text-xl" />
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Certificates</p>
            <h2 className="text-2xl font-bold text-purple-600 mt-1">1</h2>
          </div>
          <FaCertificate className="text-purple-600 text-xl" />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;