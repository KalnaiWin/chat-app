import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { NoChatFound } from "../components/NoChatFound";
import { UserLoadingSkeleton } from "../components/UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { SearchInput } from "../components/SearchInput";

export const ChatList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;

  const filterChat = chats.filter((chat) =>
    chat.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search input */}
      <div className="mb-4">
        <SearchInput
          search={"Search your friends"}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        {filterChat.map((chat) => {
          return (
            <div
              key={chat._id}
              className="bg-[#F27059]/10 p-4 rounded-lg cursor-pointer hoevr:bg-[#F27059]/20 transition-colors"
              onClick={() => setSelectedUser(chat)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`avatar ${
                    onlineUsers.includes(chat._id)
                      ? "avatar-online"
                      : "avatar-offline"
                  }`}
                >
                  <div className="size-12 rounded-full">
                    <img
                      src={chat.profilePic || "assets/avatar.png"}
                      alt={chat.fullName}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-slate-200 font-medium truncate">
                    {chat.fullName}
                  </h4>
                  <p
                    className={` text-xs ${
                      onlineUsers.includes(chat._id)
                        ? "text-green-500"
                        : "text-slate-200"
                    }`}
                  >
                    {onlineUsers.includes(chat._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
