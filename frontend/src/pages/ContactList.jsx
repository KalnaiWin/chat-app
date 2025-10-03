import { useAuthStore } from "../store/useAuthStore";
import { USerLoadingSkeleton } from "../components/USerLoadingSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

export const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } =
    useChatStore();

  // const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <USerLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* <div
            // className={`avatar ${
            //   onlineUsers.includes(contact._id) ? "online" : "offline"
            // }`}
            > */}
            <div className="size-12 rounded-full">
              <img
                src={contact.profilePic || "/assets/avatar.png"}
                className="size-full"
              />
            </div>
            {/* </div> */}
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
};
