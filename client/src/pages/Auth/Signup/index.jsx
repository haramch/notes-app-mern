import React, { useState } from "react";
import Header from "../../../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import axios from "axios";

const initialState = { userName: "", email: "", password: "" };

export default function Signup() {
  const [signup, setSignup] = useState(initialState);
  const [message, setMessage] = useState("");
  const { storeToken } = useAuthContext();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    setSignup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { userName, email, password } = signup;

    if (!userName || !email || !password) {
      setMessage("Fill all required fields");
      return;
    }

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_HOST}/api/auth/signup`,
        { userName, email, password },
        { withCredentials: true }
      );

      console.log("Signup response:", result.data);

      if (result.data.message.toLowerCase().includes("success")) {
        setMessage("Signup successful");

        setTimeout(() => navigate("/login"), 500);
      } else {
        setMessage(result.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-2.5 sm:p-7">
        <form
          onSubmit={handleSubmit}
          className="max-w-[500px] w-full rounded-2xl px-6 py-4 shadow justify-center flex flex-col bg-white gap-3"
        >
          <h4 className="text-gray-900 font-bold">Sign up</h4>
          <p className="text-gray-800">Create an Account</p>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 font-bold text-sm">Name</label>
              <input
                type="text"
                placeholder="Enter your username"
                name="userName"
                value={signup.userName}
                className="border border-gray-300 w-full p-2"
                onChange={handleSignup}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 font-bold text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={signup.email}
                className="border border-gray-300 w-full p-2"
                onChange={handleSignup}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-900 font-bold text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={signup.password}
                className="border border-gray-300 w-full p-2"
                onChange={handleSignup}
              />
            </div>
            {message && (
              <div className="text-red-600 font-semibold text-sm text-center">
                {message}
              </div>
            )}
            <button
              type="submit"
              className="text-white font-bold bg-blue-700 px-2 py-2 w-full rounded-md"
            >
              Signup
            </button>
            <p className="text-gray-800 text-center my-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold underline">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
