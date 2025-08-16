"use client";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/supabase/login";
import {Supabase} from "../utils/supabase/client.js";
const supabase = Supabase;

const BlogSubmitPage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await getCurrentUser();
      if (data) {
        setUser(data);
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.id).single();
        setRole(profile?.role || "");
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  if (role !== "admin") {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Access denied. Admins only.</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("blogs").insert({
      title: formData.title,
      content: formData.content,
      image: formData.image,
      author_id: user.id,
      created_at: new Date().toISOString(),
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Blog submitted successfully!");
      setFormData({ title: "", content: "", image: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Submit New Blog</h2>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Content</label>
          <textarea name="content" value={formData.content} onChange={handleChange} className="w-full p-2 border rounded" rows={6} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? "Submitting..." : "Submit Blog"}</button>
      </form>
    </div>
  );
};

export default BlogSubmitPage;