import { ChatList } from "./ChatList";
import { ContactList } from "./ContactList";
import { useChatStore } from "../store/useChatStore";
import { ProfileHeader } from "../components/ProfileHeader";
import { ActiveTabSwitch } from "../components/ActiveTabSwitch";
import { ChatContainer } from "../components/ChatContainer";
import { WaitingSelect } from "../components/WaitingSelect";

export const ChatPage = () => {
  const { activeTab, setSelectedUSer } = useChatStore();

  return (
    <div className="relative w-full max-w-7xl h-screen flex rounded-sm p-5">
      {/* Left side */}
      <div className="bg-[#151515] border border-[#393939] w-1/3 h-full backdrop-blur-sm">
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>
      </div>
      {/* Right side */}
      <div className="w-2/3 h-full flex-1 bg-black backdrop-blur-sm">
        {setSelectedUSer ? <ChatContainer /> : <WaitingSelect />}
      </div>
    </div>
  );
};
