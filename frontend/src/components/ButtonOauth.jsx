const ButtonAoth = ({ text }) => {
  return (
    <div className="flex w-full items-center p-2 gap-1">
      <p className="w-fit">Or {text === "signup" ? "Sign up" : "Login"} with</p>
      <div className="flex items-center w-fit">
        <div className="flex items-center gap-1 group hover:bg-white rounded-sm p-1 cursor-pointer">
          <img src="/assets/facebook.png" alt="Facebook" className="size-10" />
          <p className="text-blue-600 text-xl max-w-0 overflow-hidden group-hover:max-w-[200px] delay-500 transition-all duration-1000">
            Facebook
          </p>
        </div>

        <div className="flex items-center gap-1 group hover:bg-white rounded-sm p-1 cursor-pointer">
          <img src="/assets/github.png" alt="Github" className="size-10" />
          <p className="text-black text-xl max-w-0 overflow-hidden group-hover:max-w-[200px] delay-500 transition-all duration-1000">
            Github
          </p>
        </div>

        <div className="flex items-center gap-1 group hover:bg-white rounded-sm p-1 cursor-pointer">
          <img src="/assets/google.png" alt="Google" className="size-10" />
          <p className="text-green-600 text-xl max-w-0 overflow-hidden group-hover:max-w-[200px] delay-500 transition-all duration-1000">
            Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonAoth;
