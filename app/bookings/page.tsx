"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../lib/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    api.get("/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>
      {bookings.map((b) => (
        <Link
          key={b.uuid}
          href={`/bookings/${b.uuid}`}
          className="block p-2 border mb-2 rounded hover:bg-gray-100"
        >
          {b.job_title || "No title"}
        </Link>
      ))}
    </div>
  );
}
