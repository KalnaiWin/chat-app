import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

export const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();// browser API to read file contents.
    reader.readAsDataURL(file); // reads the file and converts it into a Base64 encoded string

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="md:p-6 p-2 border-b border-[#393939]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar avatar-online">
            <button
              className="md:size-14 size-10 rounded-full oveflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/assets/avatar.png"}
                alt="User Image"
                className="object-cover rounded-full"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-sm">Change</span>
              </div>
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <div>
            <h3 className="text-slate-200 font-medium text-base truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* button */}
        <div className="flex gap-4 items-center">
          {/* LogOut */}
          <button
            onClick={logout}
            className="text-slate-400 hover:text-slate-200 transform-colors"
          >
            <LogOutIcon className="size-5" />
          </button>
          <button
            className="text-slate-400 hover:text-slate-200 transform-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio failed: ", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
