import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { Link } from "react-router-dom";

const AdminShows = () => {
  const { shows, fetchAllShows } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchAllShows();
      setLoading(false);
    };
    load();
  }, []);

  const toggleActive = (showId) => {
    console.log("Toggle active for show:", showId);
  };

  const filteredShows = shows.filter((show) => {
    if (filter === "all") return true;
    if (filter === "active") return show.isActive;
    if (filter === "inactive") return !show.isActive;
    if (filter === "featured") return show.isFeatured;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading shows...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header + Add Show Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">🎬 All Shows</h1>
        <Link
          to="/admin/add-show"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          + Add Show
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 mb-4">
        {["all", "active", "inactive", "featured"].map((f) => (
          <button
            key={f}
            className={`px-3 py-1 rounded ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Shows Table */}
      {filteredShows.length === 0 ? (
        <p className="text-gray-500 text-center">No shows found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Release Date</th>
                <th className="px-6 py-3 text-center">Active</th>
                <th className="px-6 py-3 text-center">Featured</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShows.map((show) => (
                <tr
                  key={show._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {show.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(show.release_date).toDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {show.isActive ? "✅" : "❌"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {show.isFeatured ? "⭐" : "-"}
                  </td>
                  <td className="px-6 py-4 grid grid-cols-2 gap-2 justify-center">
                    <div className="flex flex-col gap-1">
                    <Link
                      to={`/admin/shows/${show._id}`}
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      ShowTimes
                    </Link>
                    <Link
                      to={`/admin/showtimes/add?showId=${show._id}`}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Add Time
                    </Link>
                    <Link
                      to={`/admin/shows/edit/${show._id}`}
                      className="text-yellow-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    </div>
                    <button
                      onClick={() => toggleActive(show._id)}
                      className={`text-sm px-2 py-1 rounded ${
                        show.isActive
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {show.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminShows;
