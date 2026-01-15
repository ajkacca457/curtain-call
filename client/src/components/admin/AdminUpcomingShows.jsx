import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { Link } from "react-router-dom";

const ONE_MONTH_MS = 1000 * 60 * 60 * 24 * 30;

const AdminUpcomingShows = () => {
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

  const upcomingShows = useMemo(() => {
    if (!Array.isArray(shows)) return [];

    const now = new Date();
    const oneMonthFromNow = new Date(now.getTime() + ONE_MONTH_MS);

    return shows
      .map((show) => ({
        ...show,
        normalizedDate: new Date(
          show.release_date?.$date || show.release_date
        ),
      }))
      .filter(
        (show) =>
          show.normalizedDate instanceof Date &&
          !isNaN(show.normalizedDate) &&
          show.normalizedDate > oneMonthFromNow
      )
      .sort((a, b) => a.normalizedDate - b.normalizedDate);
  }, [shows]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading upcoming shows...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          ⏳ Upcoming Shows (1+ Month Out)
        </h1>

        <Link
          to="/admin/shows"
          className="text-indigo-600 hover:underline font-medium"
        >
          ← Back to All Shows
        </Link>
      </div>

      {upcomingShows.length === 0 ? (
        <p className="text-gray-500 text-center">
          No upcoming shows beyond one month.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Release Date</th>
                <th className="px-6 py-3 text-center">Months Away</th>
                <th className="px-6 py-3 text-center">Active</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {upcomingShows.map((show) => {
                const monthsAway = Math.ceil(
                  (show.normalizedDate - new Date()) / ONE_MONTH_MS
                );

                return (
                  <tr
                    key={show._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {show.title}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {show.normalizedDate.toDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {monthsAway} month{monthsAway > 1 ? "s" : ""}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {show.isActive ? "✅" : "❌"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <Link
                        to={`/admin/shows/edit/${show._id}`}
                        className="text-yellow-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUpcomingShows;
