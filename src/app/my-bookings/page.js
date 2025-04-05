"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = Cookies.get("token");

      if (!token) {
        setError("Unauthorized: Login First ");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://co-working-backend.onrender.com/api/payment/my-bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold h-screen flex items-center justify-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg h-screen flex items-center justify-center">{error}</p>;

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">My Bookings</h2>

      {/* Table for Large Screens */}
      <div className="hidden md:flex flex-1">
        <div className="overflow-x-auto w-full rounded-lg shadow-lg bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6">Plan</th>
                <th className="py-3 px-6">Start Date</th>
                <th className="py-3 px-6">End Date</th>
                <th className="py-3 px-6">Start Time</th>
                <th className="py-3 px-6">End Time</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Payment Status</th>
                <th className="py-3 px-6">Order ID</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {bookings.map((booking) =>
                booking.cartItems.map((item, index) => (
                  <tr key={booking._id + index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                    <td className="py-4 px-6">{item.plan}</td>
                    <td className="py-4 px-6">{item.startDate}</td>
                    <td className="py-4 px-6">{item.endDate}</td>
                    <td className="py-4 px-6">{item.startTime}</td>
                    <td className="py-4 px-6">{item.endTime}</td>
                    <td className="py-4 px-6 font-semibold text-blue-600">₹{booking.totalAmount}</td>
                    <td
                      className={`py-4 px-6 font-semibold ${
                        booking.paymentStatus === "Completed" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {booking.paymentStatus}
                    </td>
                    <td className="py-4 px-6 text-gray-500">{booking.razorpayOrderId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      
      <div className="block md:hidden h-auto">
        {bookings.map((booking) =>
          booking.cartItems.map((item, index) => (
            <div key={booking._id + index} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{item.plan}</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Start:</span> {item.startDate} | {item.startTime}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">End:</span> {item.endDate} | {item.endTime}
              </p>
              <p className="text-blue-600 font-bold text-lg">₹{booking.totalAmount}</p>
              <p
                className={`mt-1 font-semibold ${
                  booking.paymentStatus === "Completed" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {booking.paymentStatus}
              </p>
              <p className="text-gray-500 text-sm">Order ID: {booking.razorpayOrderId}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
