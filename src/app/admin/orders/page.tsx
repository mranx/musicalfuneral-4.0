"use client";

import { useState } from "react";

export default function OrdersPage() {
  // ✅ Dummy Orders Data
  const [orders, setOrders] = useState([
    { id: "ORD123", deceasedName: "John Doe", serviceDate: "2024-02-15", status: "Pending" },
    { id: "ORD124", deceasedName: "Mary Smith", serviceDate: "2024-02-18", status: "Completed" },
    { id: "ORD125", deceasedName: "Robert Johnson", serviceDate: "2024-02-20", status: "In Progress" },
  ]);

  // ✅ State for tracking selected order for editing/uploading video
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; newId: string; video: File | null } | null>(null);
  
  // ✅ State for tracking dropdown visibility per row
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // ✅ Handle Editing Order ID
  const handleEditOrder = (orderId: string) => {
    setSelectedOrder({ id: orderId, newId: orderId, video: null });
    setOpenDropdown(null); // Close dropdown
  };

  // ✅ Handle Updating Order ID
  const handleSubmitOrder = () => {
    if (selectedOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, id: selectedOrder.newId } : order
        )
      );
      setSelectedOrder(null);
      alert("Order updated successfully!");
    }
  };

  // ✅ Handle File Upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && selectedOrder) {
      setSelectedOrder({ ...selectedOrder, video: event.target.files[0] });
    }
  };

  // ✅ Toggle Actions Dropdown
  const toggleDropdown = (orderId: string) => {
    setOpenDropdown(openDropdown === orderId ? null : orderId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      {/* ✅ Orders Table */}
      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Deceased Name</th>
            <th className="p-2 border">Service Date</th>
            <th className="p-2 border">Order Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="border-t relative">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.deceasedName}</td>
                <td className="p-2 border">{new Date(order.serviceDate).toLocaleDateString()}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border relative">
                  {/* ✅ Toggle Actions Button */}
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded focus:outline-none"
                    onClick={() => toggleDropdown(order.id)}
                  >
                    Actions ▼
                  </button>

                  {/* ✅ Actions Dropdown (Only Open for Selected Order) */}
                  {openDropdown === order.id && (
                    <div className="absolute mt-2 right-0 bg-white border shadow-md rounded-md w-40 z-10">
                      <button
                        onClick={() => handleEditOrder(order.id)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Edit Order
                      </button>
                      <label className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Upload Video
                        <input type="file" className="hidden" onChange={handleFileUpload} />
                      </label>
                      <button
                        onClick={handleSubmitOrder}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Submit Order
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-2 text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Edit Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Order</h2>
            <label className="block text-sm font-semibold mb-2">New Order ID</label>
            <input
              type="text"
              value={selectedOrder.newId}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, newId: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
