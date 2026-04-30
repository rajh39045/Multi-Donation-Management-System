import { useEffect, useState } from "react";
import API from "../api/axiosInstance";

function Requests() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    const fetchRequests = async () => {
      const res = await API.get("/requests");
      setRequests(res.data);
    };

    fetchRequests();

  }, []);

  const handleApprove = async (id) => {

    try {
      await API.patch(`/requests/${id}/approve`);
      alert("Approved!");
      window.location.reload();
    } catch {
      alert("Error");
    }

  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Donation Requests
      </h2>

      {requests.map((req) => (
        <div key={req._id} className="bg-white p-4 shadow mb-4 rounded">

          <p><b>Donation:</b> {req.donation.type}</p>
          <p><b>Requested By:</b> {req.requestedBy.name}</p>
          <p><b>Status:</b> {req.status}</p>

          {req.status === "PENDING" && (
            <button
              onClick={() => handleApprove(req._id)}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default Requests;