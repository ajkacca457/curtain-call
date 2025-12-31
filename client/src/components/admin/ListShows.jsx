import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { Link } from "react-router-dom";

const AdminShows = () => {
  const { shows, fetchAllShows } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchAllShows();
      setLoading(false);
    };
    load();
  }, []);

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

      {/* Shows Table */}
      {shows.length === 0 ? (
        <p className="text-gray-500 text-center">No shows found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-center">Active</th>
                <th className="px-6 py-3 text-center">Featured</th>
                <th className="px-6 py-3 text-left">Release Date</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((show) => (
                <tr
                  key={show._id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {show.title}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {show.isActive ? "✅" : "❌"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {show.isFeatured ? "⭐" : "-"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(show.release_date).toDateString()}
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
