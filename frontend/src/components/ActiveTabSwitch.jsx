import { useChatStore } from "../store/useChatStore";

export const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="bg-transparent p-2 mb-2 flex justify-between w-full gap-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tabs tabs-box w-1/2 flex justify-center ${
          activeTab === "chats" ? "bg-[#F25C54]/20 text-[#F27059]" : ""
        } `}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tabs tabs-box w-1/2 flex justify-center ${
          activeTab === "contacts" ? "bg-[#F25C54]/20 text-[#F27059]" : ""
        } `}
      >
        Contacts
      </button>
    </div>
  );
};
