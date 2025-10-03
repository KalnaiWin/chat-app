import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { USerLoadingSkeleton } from "../components/USerLoadingSkeleton";
import { NoChatFound } from "../components/NoChatFound";

export const ChatList = () => {
  const { getMyChatPartners, chats, isUsersLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <USerLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-[#F27059]/10 p-4 rounded-lg cursor-pointer hoevr:bg-[#F27059]/20 transition-colors"
          onClick={() => selectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar avatar-online`}>
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || "assets/avatar.png"}
                  alt={chat.fullName}
                />
              </div>
              <h4 className="text-slate-200 font-medium truncate">
                {chat.fullName}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
