"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginUser } from "../../lib/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await loginUser(formData.email, formData.password);

    if (response.success) {
      alert("Login Successful!");

     
      if (response.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-2xl w-96 max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          ʟᴏɢɪɴ
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="ᴇᴍᴀɪʟ"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="ᴘᴀꜱꜱᴡᴏʀᴅ"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            ʟᴏɢɪɴ
          </motion.button>
          <p>
            𝗂𝖿 𝗎 𝖼𝖺𝗇'𝗍 𝗋𝖾𝗆𝖾𝗆𝖻𝖾𝗋 𝗍𝗁𝖾𝗇
            <Link href="/forget-password">
              <span className="text-blue-600"> 𝖥𝗈𝗋𝗀𝗈𝗍 𝖯𝖺𝗌𝗌𝗐𝗈𝗋𝖽</span>
            </Link>
          </p>
        </form>

        <p>
          𝖨𝖿 𝖣𝗈𝖾𝗌'𝗍 𝖧𝖺𝗏𝖾 𝖠𝗇 𝖠𝖼𝖼𝗈𝗎𝗇𝗍
          <Link href="/register">
            <span className="text-red-600"> ʀᴇɢɪꜱᴛᴇʀ</span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
