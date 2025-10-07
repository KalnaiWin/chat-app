import { useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { LoadingAllFriends } from "./LoadingAllFriends";
import { SearchInput } from "./SearchInput";
import { useAuthStore } from "../store/useAuthStore";

export const AllUsersPage = () => {
  const {
    isLoadingScreen,
    allUsers,
    setAllUsers,
    sendFriendRequest,
    undoFriendRequest,
  } = useFriendStore();

  useEffect(() => {
    setAllUsers();
  }, [setAllUsers]);

  if (isLoadingScreen)
    return (
      <div className="p-4">
        <div className="my-5 flex justify-between">
          <h1 className="w-2/5  text-4xl font-bold underline">
            Add new friends
          </h1>
          <div className="w-3/5 bg-[#F25C54]/30 rounded-md animate-pulse" />
        </div>
        <LoadingAllFriends />
      </div>
    );

  return (
    <div className="p-4">
      <div className="my-5 flex justify-between">
        <h1 className="w-2/5  text-4xl font-bold underline">Add new friends</h1>
        <div className="w-3/5">
          <SearchInput search={"Find your friend"} />
        </div>
      </div>
      <div className="grid grid-cols-4 w-full gap-4">
        {allUsers.map((user) => (
          <div
            key={user._id}
            className="flex flex-col p-2 items-center bg-stone-200 rounded-md"
          >
            <img
              src={user.profilePic || "assets/avatar.png"}
              alt={user.fullName}
              className="object-cover w-full h-full"
            />
            <div className="w-full h-0.5 bg-slate-500 my-2" />
            <p className="text-slate-950 text-xl font-medium">
              {user.fullName}
            </p>
            <button
              className="w-full bg-[#F25C54] py-1 rounded-sm mt-2 cursor-pointer hover:bg-[#F4845F]"
              onClick={() => sendFriendRequest(user._id)}
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
