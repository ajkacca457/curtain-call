import { useAppContext } from "../context/AppContext";
import { SORT_TYPES } from "../lib/utils.js";

const ShowSorting = () => {
  const { sortBy, setSortBy } = useAppContext();

  return (
    <div className="flex justify-end mb-6">
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="appearance-none pl-3 pr-9 py-2 bg-[#111] border border-[#333] rounded text-sm text-[#f5f5f5] cursor-pointer outline-none focus:border-[#d4af37] transition-colors duration-200"
        >
          <option value={SORT_TYPES.NEWEST}>Newest</option>
          <option value={SORT_TYPES.OLDEST}>Oldest</option>
          <option value={SORT_TYPES.TITLE}>Title</option>
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#d4af37] text-[10px]">
          ▼
        </div>
      </div>
    </div>
  );
};

export default ShowSorting;