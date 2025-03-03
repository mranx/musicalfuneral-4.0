"use client";

import { useState } from "react";

export default function SettingsPage() {
  // ✅ Dummy State for Settings
  const [settings, setSettings] = useState({
    siteTitle: "Funeral Service",
    logo: "logo.png",
    contactEmail: "support@funeralservice.com",
    enableNotifications: true,
    enableDarkMode: false,
  });

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  // ✅ Handle File Upload (Logo Change)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSettings({ ...settings, logo: e.target.files[0].name });
    }
  };

  // ✅ Handle Checkbox Toggle
  const handleToggle = (field: keyof typeof settings) => {
    setSettings({ ...settings, [field]: !settings[field] });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <p className="mb-6">Configure your admin panel settings here.</p>

      {/* ✅ Change Site Title */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Site Title</label>
        <input
          type="text"
          name="siteTitle"
          value={settings.siteTitle}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* ✅ Change Logo */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Change Logo</label>
        <input type="file" onChange={handleFileUpload} className="mb-2" />
        <p className="text-sm text-gray-600">Current Logo: {settings.logo}</p>
      </div>

      {/* ✅ Change Contact Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={settings.contactEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* ✅ Enable Notifications */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={settings.enableNotifications}
          onChange={() => handleToggle("enableNotifications")}
          className="mr-2"
        />
        <label className="text-sm">Enable Email Notifications</label>
      </div>

      {/* ✅ Enable Dark Mode */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={settings.enableDarkMode}
          onChange={() => handleToggle("enableDarkMode")}
          className="mr-2"
        />
        <label className="text-sm">Enable Dark Mode</label>
      </div>

      {/* ✅ Save Settings Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => alert("Settings saved successfully!")}
      >
        Save Settings
      </button>
    </div>
  );
}
