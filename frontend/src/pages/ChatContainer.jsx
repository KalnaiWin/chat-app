import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { ChatHeader } from "../components/ChatHeader";
import { NoChatHistory } from "../components/NoChatHistory";
import { MessageInput } from "../components/MessageInput";
import { MessageLoadingSkeleton } from "../components/MessageLoadingSkeleton";
import { EllipsisVertical, XIcon } from "lucide-react";
import { DeleteMessage } from "../components/DeleteMessage";

export const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessage,
    unSubscribeFromMessage,
    setReplyTo,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const deleteScreenRef = useRef(null); // Add ref for delete screen
  const menuRefs = useRef({}); // Add ref for menus

  const [showMenu, setShowMenu] = useState(null);
  const [deleteScreen, setDeleteScreen] = useState(false);
  const [deleteMessageId, setDeleteMessageId] = useState(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && menuRefs.current[showMenu]) {
        if (!menuRefs.current[showMenu].contains(event.target)) {
          setShowMenu(null);
        }
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Close delete screen when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteScreenRef.current &&
        !deleteScreenRef.current.contains(event.target)
      ) {
        setDeleteScreen(false);
        setDeleteMessageId(null);
      }
    };

    if (deleteScreen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteScreen]);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessage();

    //clean up
    return () => unSubscribeFromMessage();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessage,
    unSubscribeFromMessage,
  ]);

  useEffect(() => {
    // scroll to the latest messages
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Function to close delete screen after deletion
  const handleDeleteSuccess = () => {
    setDeleteScreen(false);
    setDeleteMessageId(null);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div
        className="px-6 overflow-y-auto pt-8 pb-18 flex-1"
        ref={scrollContainerRef}
      >
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6 mb-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat group ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  ref={(el) => {
                    if (el) {
                      menuRefs.current[message._id] = el;
                    }
                  }}
                  className={`chat chat-bubble relative`}
                >
                  {/* Show menu */}
                  {showMenu === message._id && (
                    <div
                      className={`absolute ${
                        message.senderId === authUser._id
                          ? "-top-18 -left-10"
                          : "-top-18 -right-10"
                      } bg-slate-800 flex flex-col gap-1 rounded-sm text-md z-20`}
                    >
                      <button
                        className="hover:bg-slate-400 rounded-t-sm px-1 py-2"
                        onClick={() => {
                          setDeleteScreen(true);
                          setDeleteMessageId(message._id);
                          setShowMenu(null);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="hover:bg-slate-400 rounded-b-sm px-1 py-2"
                        onClick={() => setReplyTo(message)}
                      >
                        Reply
                      </button>
                    </div>
                  )}

                  {/*  Show delete and reply */}
                  <button
                    onClick={() =>
                      setShowMenu(showMenu === message._id ? null : message._id)
                    }
                    className={` absolute-top ${
                      message.senderId === authUser._id ? "-left-5" : "-right-8"
                    } size-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    <EllipsisVertical />
                  </button>

                  {/* Message with reply */}
                  {message.reply && (
                    <div className="mb-2 p-2 border-l-4 border-[#F25C54] bg-[#2a2a2a]/60 rounded">
                      <p className="text-xs text-gray-300 mb-1">
                        Replying to{" "}
                        {message.reply.senderId === authUser._id
                          ? "yourself"
                          : "them"}
                        :
                      </p>
                      {message.reply.text && (
                        <p className="text-sm text-gray-200 truncate max-w-[200px]">
                          {message.reply.text}
                        </p>
                      )}
                      {message.reply.image && (
                        <img
                          src={message.reply.image}
                          alt="Replied image"
                          className="w-20 h-20 rounded mt-1 object-cover border border-gray-700"
                        />
                      )}
                    </div>
                  )}

                  {/* Message without reply */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared"
                      className="rounded-lg object-cover"
                    />
                  )}
                  {message.text && (
                    <span className="mt-2 whitespace-pre-wrap">
                      {message.text}
                    </span>
                  )}
                  <p className="text-xs my-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistory name={selectedUser.fullName} />
        )}
      </div>

      {/* Delete Screen */}
      {deleteScreen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div ref={deleteScreenRef} className="border rounded-md bg-[#1a1a1a]">
            <div className="border-b border-b-[#393939] relative">
              <h1 className="flex justify-center font-bold rounded-t-md p-3">
                Delete The Message
              </h1>
              <button
                className="absolute top-2 right-2 hover:bg-gray-700 rounded p-1"
                onClick={() => {
                  setDeleteScreen(false);
                  setDeleteMessageId(null);
                }}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <DeleteMessage
              messageId={deleteMessageId}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
        </div>
      )}

      <div className="fixed w-full bottom-0 bg-[#121212] z-10">
        <MessageInput />
      </div>
    </div>
  );
};
