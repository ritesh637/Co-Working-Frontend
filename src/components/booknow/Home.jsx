
"use client";

import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

export default function Home() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/office/")
      .then((res) => res.json())
      .then((data) => {
        setOffices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching offices:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white p-40">
      <h1 className="text-4xl font-bold text-center mb-2">Mumbai</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {offices.map((office) => (
            <BookingCard key={office.id} office={office} />
          ))}
        </div>
      )}
    </div>
  );
}
