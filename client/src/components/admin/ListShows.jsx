import React, { useEffect, useState } from 'react';
import { dummyShowsData } from '../../assets/data';

const ListShows = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchListShows = async () => {
        setShows(dummyShowsData);
        setLoading(false);
    };

    console.log("Fetched Shows:", shows);

    useEffect(() => {
        fetchListShows();
    }, []);

    if (loading) return <div className="p-6 text-gray-500">Loading shows...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">🎭 Show Listings</h1>
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
                        {shows.map((show) => {
                            const totalBookings = show.occupiedSeats ? Object.keys(show.occupiedSeats).length : 0;
                            const earnings = totalBookings * show.showPrice;

                            return (
                                <tr
                                    key={show._id}
                                    className="border-b hover:bg-gray-50 transition-all"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800">{show?.title || "Untitled"}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(show.release_date).toLocaleString(undefined, {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{totalBookings}</td>
                                    <td className="px-6 py-4 text-gray-700">${earnings.toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListShows;
