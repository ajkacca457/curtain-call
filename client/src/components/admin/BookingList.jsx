import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/data';

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Loading bookings...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">🎟️ All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Show</th>
              <th className="px-6 py-3 text-left">Date & Time</th>
              <th className="px-6 py-3 text-left">Seats</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{booking.user.name}</td>
                <td className="px-6 py-4 text-gray-700">{booking.show.movie.title}</td>
                <td className="px-6 py-4 text-gray-600">
                  {new Date(booking.show.showDateTime).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </td>
                <td className="px-6 py-4 text-gray-700">{booking.bookedSeats.join(', ')}</td>
                <td className="px-6 py-4 text-gray-700">${booking.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${
                      booking.isPaid
                        ? 'text-green-600 bg-green-100'
                        : 'text-yellow-600 bg-yellow-100'
                    }`}
                  >
                    {booking.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBookings;
