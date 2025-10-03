import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

export const NoChatFound = () => {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-[#F4845F]/10 rounded-full flex items-center justify-center">
        <MessageCircleIcon className="w-8 h-8 text-[#F79D65]" />
      </div>
      <div>
        <h4 className="text-slate-200 font-medium mb-1">
          No conversations yet
        </h4>
        <p className="text-slate-400 text-sm px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-sm text-[#F79D65] bg-[#F4845F]/10 rounded-lg hover:bg-[#F4845F]/20 transition-colors"
      >
        Find contacts
      </button>
    </div>
  );
};
