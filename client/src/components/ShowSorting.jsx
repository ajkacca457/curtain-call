import { useAppContext } from "../context/AppContext";
import { SORT_TYPES } from "../lib/utils.js";

const ShowSorting = () => {
  const { sortBy, setSortBy } = useAppContext();

  return (
    <div className="flex justify-end mb-6">
      <label className="relative inline-block w-40">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
            block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded-lg
            shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            hover:border-gray-400
            cursor-pointer
          "
        >
          <option value={SORT_TYPES.NEWEST}>Newest</option>
          <option value={SORT_TYPES.OLDEST}>Oldest</option>
          <option value={SORT_TYPES.TITLE}>Title</option>
        </select>
        {/* Dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </label>
    </div>
  );
};

export default ShowSorting;
