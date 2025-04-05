"use client";
import { useState } from "react";

const OTPPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateOTP = async () => {
    const res = await fetch("http://localhost:4000/api/user/generateotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleVerifyOTP = async () => {
    const res = await fetch("http://localhost:4000/api/user/verifyotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  const handleResetPassword = async () => {
    const res = await fetch("https://co-working-backend.onrender.com/api/user/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleGenerateOTP}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Generate OTP
      </button>

      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full p-2 border rounded"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        onClick={handleVerifyOTP}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Verify OTP
      </button>

      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 border rounded"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        onClick={handleResetPassword}
        className="w-full bg-red-500 text-white p-2 rounded"
      >
        Reset Password
      </button>

      {message && <p className="text-center text-red-500">{message}</p>}
    </div>
  );
};

export default OTPPage;
