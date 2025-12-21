"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TimelineForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  
  const [formData, setFormData] = useState({
    eventDate: "",
    entitle: "",
    zntitle: "",
    endescription: "",
    zndescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/timeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMsg("✅ Event added successfully!");
      // Reset form
      setFormData({
        eventDate: "",
        entitle: "",
        zntitle: "",
        endescription: "",
        zndescription: "",
      });
      router.refresh();
      
    } catch (error) {
      setMsg(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 space-y-6">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Add Timeline Event</h2>

      {/* Date Input */}
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-neutral-300">Event Date</label>
        <input
          type="date"
          name="eventDate"
          required
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* English Section */}
        <div className="space-y-4">
          <h3 className="text-blue-600 font-semibold text-sm uppercase tracking-wider">English (EN)</h3>
          <input
            type="text"
            name="entitle"
            placeholder="Title (e.g., Project Launch)"
            required
            maxLength={100}
            value={formData.entitle}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-blue-500 outline-none"
          />
          <textarea
            name="endescription"
            placeholder="Description..."
            required
            maxLength={300}
            rows={4}
            value={formData.endescription}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-blue-500 outline-none resize-none"
          />
        </div>

        {/* Chinese Section */}
        <div className="space-y-4">
          <h3 className="text-red-600 font-semibold text-sm uppercase tracking-wider">Chinese (ZN)</h3>
          <input
            type="text"
            name="zntitle"
            placeholder="标题 (e.g., 项目启动)"
            required
            maxLength={100}
            value={formData.zntitle}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-red-500 outline-none"
          />
          <textarea
            name="zndescription"
            placeholder="描述..."
            required
            maxLength={300}
            rows={4}
            value={formData.zndescription}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-red-500 outline-none resize-none"
          />
        </div>
      </div>

      {msg && <p className="text-sm font-medium animate-pulse">{msg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Publish Event"}
      </button>
    </form>
  );
}