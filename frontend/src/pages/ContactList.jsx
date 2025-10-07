import { SearchInput } from "../components/SearchInput";
import { UserLoadingSkeleton } from "../components/UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";

export const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  const filterContact = allContacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <SearchInput
          search={"Search your contacts"}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        {filterContact.map((contact) => (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`avatar ${
                  onlineUsers.includes(contact._id)
                    ? "avatar-online"
                    : "avatar-offline"
                }`}
              >
                <div className="size-12 rounded-full">
                  <img
                    src={contact.profilePic || "/assets/avatar.png"}
                    className="size-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-slate-200 font-medium">
                  {contact.fullName}
                </h4>
                <p
                  className={` text-xs ${
                    onlineUsers.includes(contact._id)
                      ? "text-green-500"
                      : "text-slate-200"
                  }`}
                >
                  {onlineUsers.includes(contact._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
