import { Search } from "lucide-react";

export const SearchInput = ({ search, onChange }) => {
  return (
    <div className="w-full relative">
      <input
        className="flex-1 bg-[#1e1e1e]/50 border border-[#393939] rounded-lg py-2 px-4 w-full indent-7"
        placeholder={search}
        onChange={onChange}
      />
      <Search className="absolute top-2 left-3" />
    </div>
  );
};
