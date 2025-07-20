import { useState, useEffect } from "react";
import { IoCalendar, IoCash, IoPeople, IoFilm } from "react-icons/io5";

const dashboardData = {
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
  const [data, setData] = useState({
    totalBookings: 0,
    totalRevenue: "$0.00",
    activeShows: [],
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    // Simulate fetching and replacing values
    const updatedData = {
      ...dashboardData,
      totalBookings: {
        ...dashboardData.totalBookings,
        value: 120,
      },
      totalRevenue: {
        ...dashboardData.totalRevenue,
        value: "$3,200.00",
      },
      activeShows: {
        ...dashboardData.activeShows,
        value: 5,
      },
      totalUsers: {
        ...dashboardData.totalUsers,
        value: 78,
      },
    };

    setData(updatedData);
    setLoading(false);
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(data).map(([key, item]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
            <item.icon className="text-indigo-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold">{item.label}</h2>
              <p className="text-xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard