import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimate from "../components/BorderAnimate";
import { LoaderIcon, Lock, MailsIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl">
        <div className="absolute-center w-full flex justify-center">
          <BorderAnimate>
            <div className="w-full flex flex-col md:flex-row">
              {/* Letf */}
              <div className="md:w-1/2 w-full p-8 md:flex flex-col items-center justify-center md:border-r border-slate-600/30 hidden">
                <h1 className="font-bold bg-gradient-to-r from-[#F25C54] via-[#F4845F] to-[#F7B267] bg-clip-text text-transparent text-3xl">
                  CHAT APP
                </h1>
                <div className="flex w-full justify-center gap-10 mt-3 mb-7">
                  <p className="auth-badge">Free</p>
                  <p className="auth-badge">Easy to use</p>
                  <p className="auth-badge">Private</p>
                </div>
                <img
                  src="/assets/background.png"
                  alt="Background"
                  className="w-full object-contain h-auto"
                />
              </div>
              {/* Right */}
              <div className="md:w-1/2 w-full p-5 flex items-center justify-center md:border-r border-slate-600/30">
                <div className="w-full max-w-md">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <img
                      src="/assets/logo.png"
                      alt="Logo"
                      className="size-12"
                    />
                    <h1 className="text-2xl font-bold text-slate-200">
                      Create a new account
                    </h1>
                    <p className="text-slate-400">
                      Become a member in our community, where you can share your
                      stories to everyone.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* name */}
                    <div className="flex flex-col">
                      <label className="auth-input-label">Full Name</label>
                      <div className="relative">
                        <UserIcon className="auth-input-icon" />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          className="input"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                    {/* email */}
                    <div className="flex flex-col">
                      <label className="auth-input-label">Email</label>
                      <div className="relative">
                        <MailsIcon className="auth-input-icon" />
                        <input
                          type="text"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                          className="input"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    {/* password */}
                    <div className="flex flex-col">
                      <label className="auth-input-label">Password</label>
                      <div className="relative">
                        <Lock className="auth-input-icon" />
                        <input
                          type="text"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className="input"
                          placeholder="Your Password"
                        />
                      </div>
                    </div>
                    <button
                      className="auth-btn"
                      type="submit"
                      disabled={isSigningUp}
                    >
                      {isSigningUp ? (
                        <LoaderIcon className="w-full h-5 animate-spin text-center" />
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>
                  <div className="mt-6 text-center">
                    <Link to={"/login"} className="auth-link">
                      Alreay have an account? Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </BorderAnimate>
        </div>
      </div>
    </div>
  );
};
