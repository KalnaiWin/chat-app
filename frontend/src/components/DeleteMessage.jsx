import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

export const DeleteMessage = ({ messageId, onDeleteSuccess }) => {
  const { deleteMessage } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteMessage(messageId);
    onDeleteSuccess();
    setIsLoading(false);
  };

  return (
    <div className="rounded-lg shadow-lg w-80 text-center flex flex-col gap-5 mt-5">
      <p className="text-gray-600">
        Are you sure you want to delete this message?
      </p>

      {isLoading ? (
        <button
          className="flex justify-center gap-4 p-2 rounded-b-md text-[#F27059] font-bold bg-[#F25C54]/10 cursor-pointer opacity-45"
          disabled
        >
          Deleting...
        </button>
      ) : (
        <button
          className="flex justify-center gap-4 p-2 rounded-b-md text-[#F27059] font-bold bg-[#F25C54]/10 cursor-pointer hover:text-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};
