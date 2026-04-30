import { useEffect, useState } from "react";
import { getMyDonations } from "../api/donationApi";

function MyDonations() {

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusColor = (status) => {
    if (status === "COMPLETED") return "bg-green-100 text-green-600";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-600";
    return "bg-blue-100 text-blue-600";
  };

  useEffect(() => {

    const fetchDonations = async () => {

      try {

        const res = await getMyDonations();

        setDonations(res.data);

      } catch (err) {

        setError(
          err.response?.data?.message || "Failed to load donations"
        );

      } finally {
        setLoading(false);
      }

    };

    fetchDonations();

  }, []);

  if (loading) {
    return <p>Loading donations...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        My Donations
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="border-t">

                <td className="p-4">{donation.type}</td>

                <td className="p-4">
                  {donation.amount ? `₹${donation.amount}` : "-"}
                </td>

                <td className="p-4">
                  {donation.quantity || "-"}
                </td>

                <td className="p-4">{donation.location}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(donation.status)}`}
                  >
                    {donation.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">

        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white shadow rounded-xl p-4"
          >

            <p className="font-semibold">
              {donation.type}
            </p>

            <p className="text-sm text-gray-600">
              Amount: {donation.amount ? `₹${donation.amount}` : "-"}
            </p>

            <p className="text-sm text-gray-600">
              Quantity: {donation.quantity || "-"}
            </p>

            <p className="text-sm text-gray-600">
              Location: {donation.location}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${statusColor(donation.status)}`}
            >
              {donation.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyDonations;