
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = Cookies.get("token");
      const role = sessionStorage.getItem("role");

      if (!token || role !== "admin") {
        setError("Access Denied. Admins only.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/payment/my-all-users-bookings",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setBookings(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Order Dashboard
      </h1>
      <div className="flex justify-center mb-6">
        <Link href="/admin/office-management">
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Office Management
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Booking ID: {booking._id}
            </h2>
            <p className="text-gray-700">
              User Email:{" "}
              <span className="font-medium text-blue-600">
                {booking.userId.email}
              </span>
            </p>
            <p className="text-gray-700">
              Total Amount:{" "}
              <span className="font-bold text-green-600">
                Rs {booking.totalAmount.toFixed(2)}
              </span>
            </p>
            <p className="mt-1 font-semibold">
              Payment Status:{" "}
              <span
                className={
                  booking.paymentStatus === "Completed"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {booking.paymentStatus}
              </span>
            </p>
            <p className="text-gray-500">
              Created At: {new Date(booking.createdAt).toLocaleString()}
            </p>
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                Cart Items:
              </h3>
              {booking.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="mt-2 p-4 bg-white shadow-md rounded-lg border border-gray-300"
                >
                  <p className="text-gray-800 font-medium">Plan: {item.plan}</p>
                  <p className="text-gray-700">
                    Price:{" "}
                    <span className="font-semibold text-green-700">
                      Rs {item.price.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Start Date:{" "}
                    <span className="text-blue-600">{item.startDate}</span>
                  </p>
                  <p className="text-gray-600">
                    End Date:{" "}
                    <span className="text-red-600">{item.endDate}</span>
                  </p>
                  <p className="text-gray-600">
                    Time: {item.startTime} - {item.endTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
