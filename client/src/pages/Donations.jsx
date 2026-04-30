import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

function Donations() {

  const [donations, setDonations] = useState([]);

  useEffect(() => {

    const fetchDonations = async () => {
      const res = await API.get("/donations");
      setDonations(res.data);
    };

    fetchDonations();

  }, []);

  const handleRequest = async (id) => {

    try {
      await API.post("/requests", { donationId: id });
      alert("Request sent!");
    } catch (err) {
      alert("Error sending request");
    }

  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Available Donations
      </h2>

      {donations.map((donation) => (
        <div key={donation._id} className="bg-white p-4 shadow mb-4 rounded">

          <p><b>Type:</b> {donation.type}</p>
          <p><b>Location:</b> {donation.location}</p>

          <button
            onClick={() => handleRequest(donation._id)}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Request
          </button>

        </div>
      ))}

    </div>
  );
}

export default Donations;