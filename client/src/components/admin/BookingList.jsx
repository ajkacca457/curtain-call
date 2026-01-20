import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const ListBookings = () => {
  const { getToken } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
      });

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/all-bookings?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setBookings(data.bookings);
      setTotalPages(data.pagination.pages);
    } catch (err) {
      console.error("Failed to fetch bookings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  if (loading)
    return <div className="p-6 text-gray-500">Loading bookings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">🎟️ All Bookings</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={() => {
            setPage(1);
            fetchBookings();
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-sm uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Show</th>
              <th className="px-6 py-3 text-left">Show Time</th>
              <th className="px-6 py-3 text-left">Seats</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {booking.user?.name || booking.user?.email}
                </td>

                <td className="px-6 py-4">
                  {booking.showTime?.showId?.title}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(
                    booking.showTime?.showDateTime
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {booking.bookedSeats.join(", ")}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ${booking.amount}
                </td>

                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListBookings;
