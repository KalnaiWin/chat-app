import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "john", _id: 123, age: 23 },
  isLoggedIn: false,
  isLoading: false,
  login: () => {
    console.log("We just logged in");
    set({ isLoggedIn: true, isLoading: true });
  },
}));
