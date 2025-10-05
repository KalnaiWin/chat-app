import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { NoChatFound } from "../components/NoChatFound";
import { UserLoadingSkeleton } from "../components/UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

export const ChatList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;

  return (
    <>
      {chats.map((chat) => (
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
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};
