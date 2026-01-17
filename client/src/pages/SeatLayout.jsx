import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { isoTimeFormat } from "../lib/utils";
import ScreenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";

const SeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
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

  // Fetch show and showTimes
  useEffect(() => {
    const fetchShowTimes = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/admin/show-times/${id}`);
        setShow(data.show);
        setShowTimes(data.showTimes || []);
      } catch (err) {
        toast.error("Failed to load show times");
      } finally {
        setLoading(false);
      }
    };

    fetchShowTimes();
  }, [id]);

  // Filter times by date
  const dayShowTimes = showTimes.filter((st) =>
    st.showDateTime.startsWith(date)
  );

  // Reset selected seats when time changes
  useEffect(() => {
    setSelectedSeats([]);
  }, [selectedTime]);

  // Occupied seats from selectedTime
  const occupiedSeats = selectedTime
    ? Object.keys(selectedTime.occupiedSeats || {})
    : [];

  // Handle seat click
  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast.error("Please select show time first");

    if (occupiedSeats.includes(seatId)) return;

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast.error("You can select max 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  // Render rows of seats
  const renderRows = (row, count = 9) => (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isOccupied = occupiedSeats.includes(seatId);

        return (
          <button
            key={seatId}
            onClick={() => !isOccupied && handleSeatClick(seatId)}
            disabled={isOccupied}
            className={`h-10 w-10 rounded border text-sm
              ${
                isOccupied
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : isSelected
                  ? "bg-indigo-600 text-white"
                  : "border-gray-400 hover:bg-gray-100"
              }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  // Proceed to booking
  const handleProceed = () => {
    if (!selectedTime) return toast.error("Please select a show time first");
    if (selectedSeats.length === 0)
      return toast.error("Please select at least one seat");

    navigate("/confirm-booking", {
      state: {
        showId: id,
        showTimeId: selectedTime._id,
        selectedSeats,
        showTitle: show.title,
        showDate: date,
        showPrice: selectedTime.showPrice,
      },
    });
  };

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
      <div className="col-span-1">
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

        {/* Time Selector */}
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h3 className="text-xl font-semibold mb-4">Select Show Timing</h3>

          {dayShowTimes.length === 0 ? (
            <p className="text-sm text-gray-500">
              No shows available for this date
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {dayShowTimes.map((st) => (
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

        <div className="mt-8">{rowGroups[0].map((row) => renderRows(row))}</div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          {rowGroups.slice(1).map((group, idx) => (
            <div key={idx}>{group.map((row) => renderRows(row))}</div>
          ))}
        </div>

        {/* Proceed button */}
        {selectedTime && selectedSeats.length > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={handleProceed}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
            >
              Proceed to booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatLayout;
