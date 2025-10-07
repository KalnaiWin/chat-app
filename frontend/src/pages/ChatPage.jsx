import { ChatList } from "./ChatList";
import { ContactList } from "./ContactList";
import { useChatStore } from "../store/useChatStore";
import { ProfileHeader } from "../components/ProfileHeader";
import { ActiveTabSwitch } from "../components/ActiveTabSwitch";
import { ChatContainer } from "./ChatContainer";
import { NoConversation } from "../components/NoConversation";
import { AllUsersPage } from "../components/AllUsersPage";
import { FriendPage } from "./FriendPage";

export const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-7xl h-screen flex rounded-sm p-5">
      {/* Left side */}
      <div className="bg-[#151515] border border-[#393939] w-1/3 h-full backdrop-blur-sm">
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {
            {
              chats: <ChatList />,
              contacts: <ContactList />,
              friends: <FriendPage />,
            }[activeTab]
          }
        </div>
      </div>
      {/* Right side */}
      <div className="w-2/3 h-full flex-1 bg-black backdrop-blur-sm">
        {activeTab === "friends" ? (
          <AllUsersPage />
        ) : selectedUser ? (
          <ChatContainer />
        ) : (
          <NoConversation />
        )}
      </div>
    </div>
  );
};
