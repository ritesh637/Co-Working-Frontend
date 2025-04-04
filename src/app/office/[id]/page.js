
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiBuilding } from "react-icons/bi";
import { useCart } from "@/lib/CartContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function OfficeDetailsPage() {
  const params = useParams();
  const { id } = params;

  const [office, setOffice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/office/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOffice(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching office details:", error);
        setLoading(false);
      });
  }, [id]);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const { addToCart } = useCart();

  const convertTo12Hour = (dateObj) => {
    if (!dateObj) return "";
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return "";
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  };

  const handleAddToCart = () => {
    if (!selectedPlan || !startDateTime || !endDateTime) return;

    const now = new Date();
    if (startDateTime < now) {
      alert("Start time cannot be in the past.");
      return;
    }

    if (endDateTime <= startDateTime) {
      alert("End time must be after start time.");
      return;
    }

    const planPrice = parseInt(
      office.pricing[selectedPlan]
        .replace("₹", "")
        .replace("/Hr", "")
        .replace("/Day", "")
    );

    addToCart({
      plan: selectedPlan,
      price: planPrice,
      startDate: formatDate(startDateTime),
      endDate: formatDate(endDateTime),
      startTime: convertTo12Hour(startDateTime),
      endTime: convertTo12Hour(endDateTime),
    });
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading office details...</p>
    );
  }

  if (!office) {
    return <p className="text-center text-red-500">Office not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 bg-white p-6 sm:p-8 shadow-lg rounded-2xl">
          <motion.img
            src={office.image}
            alt={office.name}
            className="w-full h-90 object-cover rounded-xl shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <h1 className="text-3xl font-extrabold mt-6 text-black">
            {office.name}
          </h1>
          <p className="text-gray-600 mt-4 text-lg">{office.description}</p>
        </div>

        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-black">
            💼 Choose Your Plan
          </h3>
          <select
            className="w-full p-3 border rounded-lg text-lg"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="">Select Plan</option>
            {office.pricing &&
              Object.entries(office.pricing).map(([key, price]) => (
                <option key={key} value={key}>
                  {key.replace("_", " ")} - {price}
                </option>
              ))}
          </select>

          {/* 📅 Start DateTime Picker */}
          <div className="mt-6">
            <label className="block font-medium text-black mb-2">
              Start Date & Time:
            </label>
            <DatePicker
              selected={startDateTime}
              onChange={(date) => setStartDateTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="dd/MM/yyyy h:mm aa"
              minDate={new Date()}
              className="w-full p-3 border rounded-lg text-lg"
              placeholderText="Select start date & time"
            />
          </div>

          {/* 📅 End DateTime Picker */}
          <div className="mt-6">
            <label className="block font-medium text-black mb-2">
              End Date & Time:
            </label>
            <DatePicker
              selected={endDateTime}
              onChange={(date) => setEndDateTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="dd/MM/yyyy h:mm aa"
              minDate={startDateTime || new Date()}
              className="w-full p-3 border rounded-lg text-lg"
              placeholderText="Select end date & time"
            />
          </div>

          <div className="text-md text-gray-700 mt-6">
            <p>🔹 Refunds available within 30 mins of booking.</p>
            <p>🔹 KYC is mandatory before using the premises.</p>
            <p>
              🔹 Flexible seating available on a first-come, first-served basis.
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition mt-10"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>

      {/* Location Section (unchanged) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 bg-white p-6 sm:p-8 shadow-lg rounded-2xl"
      >
        <motion.h2
          className="text-2xl font-bold mb-4 flex items-center gap-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BiBuilding className="text-blue-600" /> Office Location
        </motion.h2>

        <motion.p
          className="text-black text-lg flex items-center gap-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          📍 <strong>Address:</strong>{" "}
          {office.address ||
            "1910, Kamdhenu Commerz, next to Raghunath Vihar, Block J, Sector 14, Kharghar, Navi Mumbai"}
        </motion.p>

        <motion.p
          className="text-black text-lg mt-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          ⏰ Operating Hours: {office.operatingHours || "9 AM - 9 PM"}
        </motion.p>
      </motion.div>
    </div>
  );
}
