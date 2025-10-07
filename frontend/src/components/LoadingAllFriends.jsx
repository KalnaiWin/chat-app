export const LoadingAllFriends = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      {[...Array(7)].map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse flex flex-col items-center gap-2"
        >
          <div className="bg-[#F25C54]/30 w-full h-36 rounded-sm" />
          <div className="flex items-center gap-2 w-full">
            <div className="bg-[#F25C54]/30 h-6 w-1/2 rounded-sm" />
            <div className="bg-[#F25C54]/30 h-6 w-1/2 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};
