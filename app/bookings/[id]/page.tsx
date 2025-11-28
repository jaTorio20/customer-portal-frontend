"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/app/lib/api";

export default function BookingDetailsPage() {
  const params = useParams();
  const id = params?.id; // <-- dynamic route parameter

  const [booking, setBooking] = useState<any>(null);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id) return;

    api.get(`/bookings/${id}`).then((res) => setBooking(res.data));
    api.get(`/bookings/${id}/attachments`).then((res) => setAttachments(res.data));
    api.get(`/messages/${id}`).then((res) => setMessages(res.data));
  }, [id]);

  const sendMessage = async () => {
    if (!id) return;
    const res = await api.post(`/messages/${id}`, { message: text });
    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{booking.job_title || "Booking Details"}</h1>

      <h2 className="font-semibold mt-4">Attachments:</h2>
      <ul className="list-disc ml-5">
        {attachments.map((a) => (
          <li key={a.uuid}>{a.filename}</li>
        ))}
      </ul>

      <h2 className="font-semibold mt-4">Messages:</h2>
      <div className="mb-2">
        {messages.map((m) => (
          <p key={m._id} className="border p-2 rounded mb-1">
            {m.message}
          </p>
        ))}
      </div>

      <input
        className="border p-2 w-full mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message..."
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
