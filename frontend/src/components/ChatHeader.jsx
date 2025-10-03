import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-[#151515] border border-[#393939] p-3 w-full flex-1">
      <div className="flex items-center space-x-3">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/assets/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400">Online</p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};
