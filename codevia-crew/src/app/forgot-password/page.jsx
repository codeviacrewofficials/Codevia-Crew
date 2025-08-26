"use client";
import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import Particles from "@/styles/Particles";
import { sendPasswordResetEmail } from "../utils/supabase/forgetpassword";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const { error } = await sendPasswordResetEmail(email);
      if (error) {
        setError(error);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
            {submitted ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MailOutlined className="text-white text-3xl" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Check Your Email
                </h1>
                <p className="text-gray-300">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-indigo-400">{email}</span>.
                </p>
                <div className="mt-6">
                  <Link
                    href="/login"
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    &larr; Back to Sign In
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MailOutlined className="text-white text-3xl" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Forgot Password
                  </h1>
                  <p className="text-gray-300">
                    Enter your email to receive a reset link
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailOutlined className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          error ? "border-red-400" : "border-white/20"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {error && (
                      <p className="mt-1 text-sm text-red-400">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    &larr; Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
