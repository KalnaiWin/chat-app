import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { ChatHeader } from "../components/ChatHeader";
import { NoChatHistory } from "../components/NoChatHistory";
import { MessageInput } from "../components/MessageInput";
import { MessageLoadingSkeleton } from "../components/MessageLoadingSkeleton";

export const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } =
    useChatStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat chat-bubble relative ${
                    message.senderId === authUser._id
                      ? "bg-[#F25C54] text-white"
                      : "bg-[#F7B267] text-slate-200"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared"
                      className="rounded-lg object-cover"
                    />
                  )}
                  {message.text && <p className="mt-2">{message.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistory name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};
