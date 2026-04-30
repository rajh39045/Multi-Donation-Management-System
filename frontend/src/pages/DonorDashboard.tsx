import { useEffect, useState } from "react";
import { Donation } from '@/types';
import { useAuth } from "@/contexts/AuthContext";
import { getDonations, createDonation, acceptDonation } from "@/api";

export default function DonorDashboard() {
  const { user, refreshUser } = useAuth();

  const [donations, setDonations] = useState<Donation[]>([]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("food");
  const [extra, setExtra] = useState<Record<string, string>>({});

  const fetchDonations = async () => {
    try {
      const data = await getDonations();
      setDonations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await createDonation({
        category,
        quantity: Number(quantity),
        details: {
          title: title || "Donation",
          ...extra
        }
      });

      if (res?.donation) {
        alert("Created!");
        setTitle("");
        setQuantity("");
        setExtra({});
        fetchDonations();
      } else {
        alert("Failed");
      }

    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-3xl font-bold">Donor Dashboard</h1>

      {/* Category Selection */}
      <div className="flex gap-2">
        {["food", "clothes", "books"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg ${
              category === cat
                ? "bg-purple-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {cat === "food" && "🍎 Food"}
            {cat === "clothes" && "👕 Clothes"}
            {cat === "books" && "📚 Books"}
          </button>
        ))}
      </div>

      {/* Create Donation */}
      <div className="space-y-3">

        {/* Common Inputs */}
        <div className="flex gap-3">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 rounded-lg bg-black/40 border border-gray-600 flex-1"
          />

          <input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-3 rounded-lg bg-black/40 border border-gray-600 w-32"
          />
        </div>

        {/* Dynamic Fields */}
        {category === "food" && (
          <input
            placeholder="Freshness (e.g. 2 days)"
            onChange={(e) =>
              setExtra({ ...extra, freshness: e.target.value })
            }
            className="p-3 rounded-lg bg-black/40 border border-gray-600 w-full"
          />
        )}

        {category === "clothes" && (
          <div className="flex gap-2">
            <input
              placeholder="Size"
              onChange={(e) =>
                setExtra({ ...extra, size: e.target.value })
              }
              className="p-3 rounded-lg bg-black/40 border border-gray-600"
            />
            <input
              placeholder="Gender"
              onChange={(e) =>
                setExtra({ ...extra, gender: e.target.value })
              }
              className="p-3 rounded-lg bg-black/40 border border-gray-600"
            />
          </div>
        )}

        {category === "books" && (
          <input
            placeholder="Type (Academic / Story)"
            onChange={(e) =>
              setExtra({ ...extra, type: e.target.value })
            }
            className="p-3 rounded-lg bg-black/40 border border-gray-600 w-full"
          />
        )}

        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
        >
          Create Donation
        </button>
      </div>

      {/* Donations */}
      <div className="mb-4 flex gap-4">
        <div className="p-3 bg-black/20 rounded-lg">
          <p className="text-xs text-gray-400">Total donations</p>
          <p className="text-lg font-bold">{donations.length}</p>
        </div>
        <div className="p-3 bg-black/20 rounded-lg">
          <p className="text-xs text-gray-400">Completed</p>
          <p className="text-lg font-bold">{donations.filter((d) => d.status === 'completed').length}</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">My Donations</h2>

        {donations.length === 0 && (
          <p className="text-gray-400">No donations yet</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donations.map((d: Donation) => (
            <div
              key={d._id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 shadow"
            >
              <h3 className="text-lg font-semibold">
                {d.details?.title || "Donation"}
              </h3>

              <p className="text-sm text-gray-400">
                Quantity: {d.quantity}
              </p>

              {/* Extra Details */}
              <p className="text-xs text-gray-500 mt-1">
                {d.details?.freshness && `Freshness: ${d.details.freshness}`}
                {d.details?.size && ` | Size: ${d.details.size}`}
                {d.details?.gender && ` | Gender: ${d.details.gender}`}
                {d.details?.type && ` | Type: ${d.details.type}`}
              </p>

              <p className="text-xs mt-2 text-gray-500">Status: {d.status}</p>

              {(d.status === 'requested' || d.status === 'pending') && d.requests?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {d.requests.map((org: { _id: string; name: string }) => (
                    <button
                      key={org._id}
                      onClick={async () => {
                        try {
                          const res = await acceptDonation(d._id, org._id);
                          if (res.message) {
                            alert('Organization accepted');
                            await fetchDonations();
                            refreshUser();
                          } else {
                            alert(res.message || 'Failed to accept');
                          }
                        } catch (err) {
                          console.error(err);
                          alert('Error accepting request');
                        }
                      }}
                      className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs"
                    >
                      Accept {org.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}