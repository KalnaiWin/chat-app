import { MessageCircleIcon } from "lucide-react";

export const NoConversation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-[#F25C54]/20 rounded-full flex items-center justify-center mb-6">
        <MessageCircleIcon className="size-10 text-[#F27059]" />
      </div>
      <h3 className="text-xl font-semibold text-slate-200 mb-2">
        Select a conversation
      </h3>
      <p className="text-slate-400 max-w-md">
        Choose a contact from the sidebar to start chatting or continue a
        previous conversation.
      </p>
    </div>
  );
};
