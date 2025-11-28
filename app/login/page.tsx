"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api"; 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = async () => {
    try {
      await api.post("/auth/login", { email, phone });
      
      // Redirect to bookings page after successful login
      router.push("/bookings");
    } catch (err) {
      alert("Invalid email or phone.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Customer Login</h1>

      <input
        className="border p-2 block my-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 block my-2"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
