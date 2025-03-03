"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterAdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", role: "admin" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ✅ Check if user is a Super Admin

        

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         // Ensure Super Admin authorization
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register admin");
      }

      setSuccess("Admin registered successfully!");
      setFormData({ email: "", password: "", role: "admin" });

      // Redirect to admin list after 1.5s
      setTimeout(() => {
        router.push("/admin/admin-users");
      }, 1500);
    } catch (err) {
      setError("Error registering admin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Register New Admin</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* ✅ Email Input */}
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* ✅ Password Input */}
        <div>
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* ✅ Role Selection */}
        <div>
          <label className="block text-sm font-semibold">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          {loading ? "Registering..." : "Register Admin"}
        </button>
      </form>
    </div>
  );
}
