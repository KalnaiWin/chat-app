import { Route, Routes } from "react-router";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, isLoading, login } = useAuthStore();

  console.log("auth user: ", authUser);
  console.log("isLoading: ", isLoading);

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute md:-top-30 md:-left-30 md:size-120 size-70 -top-20 -left-20 bg-[#F7B267] opacity-80 blur-[70px] rounded-full" />
      <div className="absolute md:-bottom-50 md:-right-50 md:size-160 size-100 -bottom-30 -right-20 opacity-70 bg-[#F27059] blur-[100px] rounded-full" />

      <button className="btn btn-active" onClick={login}>
        Login
      </button>

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
