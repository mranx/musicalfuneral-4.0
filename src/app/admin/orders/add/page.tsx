'use client'

import React, { useState } from 'react';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    deceasedName: '',
    personName: '',
    relation: '',
    serviceDate: '',
    paymentStatus: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Order ID</label>
        <input 
          type="text" 
          name="orderId" 
          value={formData.orderId} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-4" 
          required 
        />

        <label className="block mb-2">Deceased Name</label>
        <input 
          type="text" 
          name="deceasedName" 
          value={formData.deceasedName} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-4" 
          required 
        />

        <label className="block mb-2">Person's Name</label>
        <input 
          type="text" 
          name="personName" 
          value={formData.personName} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-4" 
          required 
        />

        <label className="block mb-2">Relation to Deceased</label>
        <input 
          type="text" 
          name="relation" 
          value={formData.relation} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-4" 
          required 
        />

        <label className="block mb-2">Service Date</label>
        <input 
          type="date" 
          name="serviceDate" 
          value={formData.serviceDate} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-4" 
          required 
        />

        <label className="block mb-2">Payment Status</label>
        <select 
          name="paymentStatus" 
          value={formData.paymentStatus} 
          onChange={handleChange} 
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          
        </select>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >Submit</button>
      </form>
    </div>
  );
};

export default OrderForm;
