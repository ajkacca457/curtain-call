import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { isoTimeFormat } from "../lib/utils";
import ScreenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";

const SeatLayout = () => {
  const { id, date } = useParams();

  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rowGroups = [
    ["A", "B"],
    ["C", "E"],
    ["D", "F"],
    ["G", "I"],
    ["H", "J"],
  ];

  useEffect(() => {
    const fetchShowTimes = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/admin/show-times/${id}`);
        setShowTimes(data.showTimes || []);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load show times");
      } finally {
        setLoading(false);
      }
    };

    fetchShowTimes();
  }, [id]);

  // filter times by date (YYYY-MM-DD)
  const dayShowTimes = showTimes.filter(st =>
    st.showDateTime.startsWith(date)
  );

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select show time first");

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can select max 5 seats");
    }

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const renderRows = (row, count = 9) => (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-10 w-10 rounded border ${
              selectedSeats.includes(seatId)
                ? "bg-indigo-600 text-white"
                : "border-gray-400"
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  if (loading) return <Loading />;

  return (
    <div className="grid grid-cols-4 gap-6 max-w-[1600px] mx-auto mt-10">
      {/* Time Selector */}
      <div className="col-span-1">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Select Show Timing</h3>

          {dayShowTimes.length === 0 ? (
            <p className="text-sm text-gray-500">
              No shows available for this date
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {dayShowTimes.map(st => (
                <div
                  key={st._id}
                  onClick={() => setSelectedTime(st)}
                  className={`cursor-pointer px-4 py-2 rounded-lg text-sm text-center
                    ${
                      selectedTime?._id === st._id
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {isoTimeFormat(st.showDateTime)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="col-span-3 bg-gray-50 rounded-xl p-6 shadow-inner">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Select your seats</h3>
          <img src={ScreenImage} alt="screen" className="mx-auto" />
          <p className="mt-2 text-sm text-gray-500">Screen</p>
        </div>

        <div className="mt-8">
          {rowGroups[0].map(row => renderRows(row))}
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          {rowGroups.slice(1).map((group, idx) => (
            <div key={idx}>
              {group.map(row => renderRows(row))}
            </div>
          ))}
        </div>

        {selectedTime && selectedSeats.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/my-bookings"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
            >
              Proceed to checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;
