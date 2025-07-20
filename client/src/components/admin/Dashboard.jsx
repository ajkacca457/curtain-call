import { useState, useEffect } from "react";
import { IoCalendar, IoCash, IoPeople, IoFilm } from "react-icons/io5";
import { dummyDashboardData } from "../../assets/data";

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

  const fetchDashboardData = async () => {
    const { totalBookings, totalRevenue, totalUser, activeShows } = dummyDashboardData;

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
        value: totalUser,
      },
      activeShows: {
        ...dashboardTemplate.activeShows,
        value: activeShows.length,
        shows: activeShows, // optional: store actual shows for listing
      },
    };

    setData(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(data).map(([key, item]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
            <item.icon className="text-sky-500 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Active Shows List */}
      <div>
        <h2 className="text-xl font-semibold mt-8 mb-4">Active Shows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.activeShows?.shows?.map((show) => (
            <div
              key={show._id}
              className="p-4 bg-white rounded-md shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-gray-800">{show.movie?.title || "Untitled Movie"}</h3>
              <p className="text-gray-600 text-sm">
                Date: {new Date(show.showDateTime).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">Price: ${show.showPrice}</p>
              <p className="text-gray-600 text-sm">
                Booked Seats: {Object.keys(show.occupiedSeats).length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
