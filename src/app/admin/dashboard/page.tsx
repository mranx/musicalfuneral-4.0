"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [ongoingOrders] = useState<number>(Math.floor(Math.random() * (10 - 5 + 1)) + 5); // Dummy: 5-10
  const [completedOrders] = useState<number>(Math.floor(Math.random() * (50 - 20 + 1)) + 20); // Dummy: 20-50

  // ✅ Fetch Users Count
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await fetch("/api/user/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setTotalUsers(data.users.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersCount();
  }, []);

  // ✅ Chart Data
  const data = {
    labels: ["Users Registered", "Ongoing Orders", "Completed Orders"],
    datasets: [
      {
        label: "Total Count",
        data: [totalUsers, ongoingOrders, completedOrders],
        backgroundColor: ["#3B82F6", "#F59E0B", "#10B981"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ✅ 3 Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* 🔵 Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-500">{totalUsers}</p>
        </div>

        {/* 🟠 Ongoing Orders */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold text-gray-700">Ongoing Orders</h2>
          <p className="text-4xl font-bold text-yellow-500">{ongoingOrders}</p>
        </div>

        {/* 🟢 Completed Orders */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold text-gray-700">Completed Orders</h2>
          <p className="text-4xl font-bold text-green-500">{completedOrders}</p>
        </div>
      </div>

      {/* 📊 Graph */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">User & Order Statistics</h2>
        <Bar data={data} />
      </div>
    </div>
  );
}
