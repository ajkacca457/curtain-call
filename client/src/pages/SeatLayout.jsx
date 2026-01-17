import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ScreenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";
import { isoTimeFormat } from "../lib/utils";

const SeatLayout = () => {
  const { id, date } = useParams();

  const [show, setShow] = useState(null);
  const [showTimes, setShowTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowGroups = [
    ["A", "B"],
    ["C", "E"],
    ["D", "F"],
    ["G", "I"],
    ["H", "J"],
  ];

  // ---------------- FETCH SHOW + SHOWTIMES ----------------
  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/admin/show-times/${id}`);

        setShow(data.show);

        // filter by selected date
        const filteredTimes = data.showTimes.filter((st) => {
          const stDate = new Date(st.showDateTime).toISOString().split("T")[0];
          return stDate === date;
        });

        setShowTimes(filteredTimes);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load showtimes");
      } finally {
        setLoading(false);
      }
    };

    fetchShowTimes();
  }, [id, date]);

  // ---------------- SEAT HANDLING ----------------
  const handleClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select show time first");
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can select max 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const renderRows = (row, count = 9) => (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleClick(seatId)}
            className={`h-10 w-10 rounded border ${
              selectedSeats.includes(seatId)
                ? "bg-indigo-600 text-white"
                : "border-indigo-300"
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  if (loading) return <Loading />;

  if (!show || showTimes.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No showtimes available for this date.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-6 max-w-[1600px] mx-auto mt-10">
      {/* LEFT PANEL */}
      <div className="col-span-1 space-y-6">
        {/* SHOW INFO */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex gap-4">
            <img
              src={show.poster_path}
              alt={show.title}
              className="w-20 h-28 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">{show.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(date).toDateString()}
              </p>
              <p className="text-sm text-gray-500">⏱ {show.runtime} min</p>
              <p className="text-sm text-gray-600">⭐ {show.vote_average}</p>
            </div>
          </div>
        </div>

        {/* TIME SELECTOR */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Select Show Time</h3>

          <div className="grid grid-cols-2 gap-3">
            {showTimes.map((st) => {
              const time = new Date(st.showDateTime).toISOString();
              const isActive = selectedTime === st._id;

              return (
                <button
                  key={st._id}
                  onClick={() => setSelectedTime(st._id)}
                  className={`px-3 py-2 rounded text-sm ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {isoTimeFormat(time)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SEAT LAYOUT */}
      <div className="col-span-3 bg-gray-50 rounded-xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold">Select your seats</h3>
          <img src={ScreenImage} alt="screen" className="mx-auto my-4" />
          <p className="text-sm text-gray-500">Screen this way</p>
        </div>

        {rowGroups.map((group, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-6">
            {group.map((row) => renderRows(row))}
          </div>
        ))}

        {selectedTime && selectedSeats.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/my-bookings"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;
