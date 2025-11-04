import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Cards from "../Cards";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Header({searchQuery, setSearchQuery}) {
  const navigate = useNavigate();
  const { isLoggedIn, Logout } = useAuthContext();
  const onClearSearch = () => {
    setSearchQuery("");
  };

  const onLogout = () => {
    Logout();
    localStorage.removeItem("userName"); 
    navigate("/login");
  };
  const userName = localStorage.getItem("userName") || "";

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-2xl">
      <h2 className="text-xl font-medium text-gray-900 py-2"><a href="/">Notes</a></h2>

      {isLoggedIn ? (
        <>
         <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClearSearch={() => setSearchQuery("")}
      />
          <Cards onLogout={onLogout} name={userName} />
        </>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
