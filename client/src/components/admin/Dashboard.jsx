import { useState, useEffect } from "react";
import { IoCalendar, IoCash, IoPeople, IoFilm } from "react-icons/io5";
import { useAuth } from "@clerk/clerk-react";
import api from "../../api/axiosInstance";
import Loading from "../Loading.jsx";

const dashboardTemplate = {
  totalBookings: {
    label: "Total Bookings",
    value: 0,
    icon: IoCalendar,
  },
  totalRevenue: {
    label: "Total Revenue",
    value: "$0.00",
    icon: IoCash,
  },
  activeShows: {
    label: "Active Shows",
    value: 0,
    icon: IoFilm,
  },
  totalUsers: {
    label: "Total Users",
    value: 0,
    icon: IoPeople,
  },
};

const Dashboard = () => {
  const [data, setData] = useState(dashboardTemplate);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchDashboardData = async () => {
    try {
      // 🔹 Get the Clerk token for authentication
      const token = await getToken();

      // 🔹 Call your backend endpoint
      const res = await api.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { totalBookings, totalRevenue, totalUsers, activeShowTimes } =
        res.data.dashboardData;

      const formattedData = {
        ...dashboardTemplate,
        totalBookings: {
          ...dashboardTemplate.totalBookings,
          value: totalBookings,
        },
        totalRevenue: {
          ...dashboardTemplate.totalRevenue,
          value: `$${totalRevenue.toLocaleString()}`,
        },
        totalUsers: {
          ...dashboardTemplate.totalUsers,
          value: totalUsers,
        },
        activeShows: {
          ...dashboardTemplate.activeShows,
          value: activeShowTimes.length,
          shows: activeShowTimes,
        },
      };
      setData(formattedData);
      setLoading(false);
      console.log("📊 Dashboard API response:", res.data); // 👈 Just log it for now
    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(data).map(([key, item]) => (
          <div
            key={key}
            className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 border border-gray-100 hover:shadow-lg transition"
          >
            <item.icon className="text-indigo-500 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                {item.label}
              </h2>
              <p className="text-xl font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Shows */}
      {data.activeShows?.shows?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800 flex items-center gap-2">
            🎭 Active Shows
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.activeShows.shows.map((show) => (
              <div
                key={show._id}
                className="group bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
              >
                {/* Show title */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {show.showId?.title || "Untitled Movie"}
                </h3>

                {/* Showtime Badge */}
                <div className="mt-2 inline-block px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full shadow-sm">
                  {new Date(show.showDateTime).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>

                {/* Details */}
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-800">💰 Price:</span>{" "}
                    ${show.showPrice}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      🎟️ Booked Seats:
                    </span>{" "}
                    {Object.keys(show.occupiedSeats || {}).length}
                  </p>
                </div>

                {/* Footer line */}
                <div className="mt-4 border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-500">
                  <span>ID: {show._id.slice(-6)}</span>
                  <span className="italic">Showtime Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
