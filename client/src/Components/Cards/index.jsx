import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Cards({ onLogout }) {
  const { token, isLoggedIn } = useAuthContext();
  const name = localStorage.getItem("userName") || "";

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  if (!isLoggedIn) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-gray-900 flex bg-gray-200 w-12 h-12 items-center justify-center font-medium rounded-full">
        {initials}
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-bold text-gray-900">{name}</p>
        <button
          onClick={onLogout}
          className="text-sm underline cursor-pointer text-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

