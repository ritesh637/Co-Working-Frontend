
"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { AiOutlineShoppingCart, AiOutlineDelete } from "react-icons/ai";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const authToken = Cookies.get("token") || localStorage.getItem("token");
    if (authToken) setToken(authToken);
  }, []);

  const getDurationInDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const timeDiff = endDate - startDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 *24 * 24)) 
    return days > 0 ? days : 1;
  };

  const subtotal = cart.reduce((total, item) => {
    const days = getDurationInDays(item.startDate, item.endDate);
    return total + item.price * days;
  }, 0);

  const discountedSubtotal = subtotal - (subtotal * discount) / 100;
  const gst = discountedSubtotal * 0.18;
  const totalPrice = discountedSubtotal + gst;

  const handleApplyPromo = () => {
    if (promoCode === "SAVE10") setDiscount(10);
    else if (promoCode === "SAVE20") setDiscount(20);
    else setDiscount(0);
  };

  const handlePayment = async () => {
    if (!token) {
      alert("You need to log in before proceeding to payment!");
      return;
    }

    setLoading(true);
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.id;

      if (!userId) throw new Error("Invalid token");

      const response = await fetch(
        "https://co-working-backend.onrender.com/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            userId,
            cartItems: cart,
            totalAmount: totalPrice.toFixed(2),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create order!");

      processPayment(data.order);
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment.");
    } finally {
      setLoading(false);
    }
  };

  const processPayment = (order) => {
    const options = {
      key: "rzp_test_vRsGNtpLKKFI66",
      amount: order.amount,
      currency: "INR",
      name: "Your Website",
      description: "Purchase",
      order_id: order.id,
      handler: async (response) => {
        await verifyPayment(response);
      },
      prefill: { email: "user@example.com", contact: "9999999999" },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (paymentResponse) => {
    if (!token) {
      alert("You need to log in before proceeding to verification!");
      return;
    }

    try {
      const response = await fetch(
        "https://co-working-backend.onrender.com/api/payment/verify-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(paymentResponse),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Payment verification failed!");
      toast.success("Payment successful! Order placed.");
      alert("Payment successful!");
      setTimeout(() => {
        window.location.href = "/my-bookings";
      }, 1000);
    } catch (error) {
      console.error("Payment verification failed:", error);
      alert("Payment verification failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🛒 Items In Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center">
            <AiOutlineShoppingCart className="text-9xl text-gray-400 mb-4" />
            <p className="text-lg text-gray-600">
              Your cart is currently empty!
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              {cart.map((item, index) => {
                const days = getDurationInDays(item.startDate, item.endDate);
                const totalForItem = item.price * days;

                return (
                  <div
                    key={item.id || `cart-item-${index}`}
                    className="flex flex-wrap items-center justify-between border-b py-4 hover:bg-gray-50 transition duration-200"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-red-500">
                        {item.plan}
                      </h4>
                      <p className="text-sm text-black">
                        ₹{item.price.toFixed(2)} x {days} day
                        {days > 1 ? "s" : ""} = ₹{totalForItem.toFixed(2)}
                      </p>
                      <p className="text-sm text-black">
                        Date: {item.startDate} - {item.endDate}
                      </p>
                      <p className="text-sm text-black">
                        Time: {item.startTime || "N/A"} -{" "}
                        {item.endTime || "N/A"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-black hover:text-red-500 transition transform hover:scale-150"
                    >
                      <AiOutlineDelete className="text-2xl" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-6">
                Order Summary
              </h2>
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Discount ({discount}%):</span>
                <span>-₹{((subtotal * discount) / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>GST (18%):</span> <span>₹{gst.toFixed(2)}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span> <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter Promo Code"
                className="w-full border rounded-lg px-4 py-2 mt-4 mb-2 focus:ring focus:ring-blue-200"
              />
              <button
                onClick={handleApplyPromo}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:scale-105 transition-transform"
              >
                Apply Promo Code
              </button>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg hover:scale-105 transition-transform disabled:bg-gray-500"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
