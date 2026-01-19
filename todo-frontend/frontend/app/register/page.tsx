"use client";

import { useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await api.post("/auth/register", { email, password });
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 border rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={register}
            className="bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition"
          >
            Register
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
