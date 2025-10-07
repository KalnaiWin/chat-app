import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useFriendStore = create((set, get) => ({
  allUsers: [],
  isLoadingScreen: false,

  setAllUsers: async () => {
    set({ isLoadingScreen: true });
    try {
      const res = await axiosInstance.get("/friend/user");
      set({ allUsers: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoadingScreen: false });
    }
  },

  sendFriendRequest: async (friendId) => {
    try {
      await axiosInstance.post(`/friend/add/${friendId}`);
      toast.success("Sent request successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  undoFriendRequest: async (friendId) => {
    try {
      await axiosInstance.delete(`/friend/undo/${friendId}`);
      toast.success("Canceled request successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
}));
