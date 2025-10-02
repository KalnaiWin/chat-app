import React from "react";
import { useAuthStore } from "../store/useAuthStore";

export const ChatPage = () => {
  const { logout } = useAuthStore();

  return (
    <div className="z-2">
      <button onClick={logout} className="btn btn-block">
        Log out
      </button>
    </div>
  );
};
