import { useRef, useState } from "react";
import { useKeyboardSound } from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, ThumbsUp, XIcon } from "lucide-react";

export const MessageInput = () => {
  const { playRandomKeySound } = useKeyboardSound();
  const { isSoundEnabled, sendMessage } = useChatStore();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    if (isSoundEnabled) playRandomKeySound();

    sendMessage({
      text: text.trim() || "",
      image: image || "",
    });

    // reset
    setText("");
    setImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image field");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-2 border-t border-[#393939]/50">
      {/* Show the image selected */}
      {image && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={image}
              alt="Image Preview"
              className="w-20 h-20 rounded-lg border border-[#393939]"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[#717171] hover:bg-[#393939]"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* message */}
      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex space-x-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeySound();
          }}
          className="flex-1 bg-[#1e1e1e]/50 border border-[#393939] rounded-lg py-2 px-4 max-w-2xl"
          placeholder="Aa"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-[#1e1e1e]/50 text-[#525252] hover:text-[#676767] rounded-lg px-4 transition-colors ${
            image ? "text-[#F4845F]" : ""
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        {!text.trim() ? (
          <button
            type="submit"
            onClick={() => setText("👍")}
            className="bg-[#F25C54] text-white rounded-lg p-2 font-medium hover:bg-[#F4845F] transition-all"
          >
            <ThumbsUp className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!text.trim() && !image}
            className="bg-[#F25C54] text-white rounded-lg p-2 font-medium hover:bg-[#F4845F] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  );
};
