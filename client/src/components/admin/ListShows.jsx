import { useEffect, useState } from "react";
import { useAdmin } from "../../context/AdminContext.jsx";

const ListShows = () => {
  
  const [loading, setLoading] = useState(true);
  const { showTimes, fetchListShows } = useAdmin();

  useEffect(() => {
    const loadShows = async () => {
      setLoading(true);
      await fetchListShows();
      setLoading(false);
    }
    loadShows();
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
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        🎭 Show Listings
      </h1>

      {showTimes.length === 0 ? (
        <p className="text-gray-500 text-center">No active shows found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Show Name</th>
                <th className="px-6 py-3 text-left">Show Time</th>
                <th className="px-6 py-3 text-left">Bookings</th>
                <th className="px-6 py-3 text-left">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {showTimes.map((show) => {
                const totalBookings = show.occupiedSeats
                  ? Object.keys(show.occupiedSeats).length
                  : 0;
                const earnings = totalBookings * (show.showPrice || 0);

                return (
                  <tr
                    key={show._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {show?.showId?.title || "Untitled"}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {new Date(show.showDateTime).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {totalBookings}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">
                      ${earnings.toLocaleString()}
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

export default ListShows;
