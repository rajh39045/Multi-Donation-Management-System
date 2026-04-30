import { useState } from "react";
import { motion } from "framer-motion";
import { createDonation } from "../api/donationApi";

function CreateDonation() {

  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    quantity: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle input change (with reset logic)
  const handleChange = (e) => {

    const { name, value } = e.target;

    // Reset amount & quantity when type changes
    if (name === "type") {
      setFormData({
        ...formData,
        type: value,
        amount: "",
        quantity: ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {

      // Validation
      if (formData.type === "MONEY" && !formData.amount) {
        throw new Error("Amount is required for money donation");
      }

      if (
        (formData.type === "FOOD" || formData.type === "CLOTHES") &&
        !formData.quantity
      ) {
        throw new Error("Quantity is required");
      }

      const res = await createDonation(formData);

      if (res.status === 201) {

        setSuccess("Donation created successfully!");

        setFormData({
          type: "",
          amount: "",
          quantity: "",
          location: ""
        });

      }

    } catch (err) {

      setError(
        err.response?.data?.message || err.message || "Failed to create donation"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl"
      >

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Donation
        </h2>

        {error && (
          <div className="text-red-600 mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Donation Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Donation Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select type</option>
              <option value="FOOD">Food</option>
              <option value="MONEY">Money</option>
              <option value="CLOTHES">Clothes</option>
            </select>
          </div>

          {/* ✅ Amount (Only for MONEY) */}
          {formData.type === "MONEY" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount (₹)
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* ✅ Quantity (Only for FOOD & CLOTHES) */}
          {(formData.type === "FOOD" || formData.type === "CLOTHES") && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Submitting..." : "Submit Donation"}
          </button>

        </form>

      </motion.div>

    </div>
  );
}

export default CreateDonation;