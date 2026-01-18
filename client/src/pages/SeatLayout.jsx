import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import Loading from "../components/Loading";
import { isoTimeFormat } from "../lib/utils";
import ScreenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";

const SeatLayout = () => {
  const { id, date } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); // Clerk hook
  const userId = user?.id;
  const { getToken } = useAuth();

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

  // Fetch show times
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

  // Handle seat click (select/unselect)
  const handleSeatClick = (seatId, isOccupied) => {
    if (!selectedTime) return toast("Please select show time first");
    if (isOccupied) return; // cannot select occupied or held by others
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5) {
      return toast("You can select max 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  // Calculate occupied seats (permanent + temporary by others)
  const occupiedSeats = selectedTime
    ? [
        ...Object.keys(selectedTime.occupiedSeats || {}),
        ...Object.keys(selectedTime.temporaryHolds || {}).filter(
          (seat) => selectedTime.temporaryHolds[seat].userId !== userId
        ),
      ]
    : [];

  // Render a row of seats
  const renderRows = (row, count = 9) => (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isOccupied = occupiedSeats.includes(seatId);

        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId, isOccupied)}
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

  // Proceed to hold seats and go to confirm booking
  const handleProceed = async () => {
    if (!selectedTime || selectedSeats.length === 0) return;

    try {
      const payload = {
        showTimeId: selectedTime._id,
        selectedSeats,
        userId, // send current user ID
      };

      const res = await api.post("/api/booking/hold-seats", payload);
      if (res.data.success) {
        toast.success("Seats temporarily held! Proceeding to checkout...");

        // Optimistically update local temporaryHolds so UI disables these seats
        selectedTime.temporaryHolds = {
          ...selectedTime.temporaryHolds,
          ...selectedSeats.reduce((acc, seat) => {
            acc[seat] = {
              userId,
              expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            }; // 15 min expiry
            return acc;
          }, {}),
        };

        // Navigate to confirm booking page with necessary info
        navigate("/shows/confirm-booking", {
          state: {
            showTimeId: selectedTime._id,
            selectedSeats,
            show,
          },
        });
      } else {
        toast.error(data.message || "Failed to hold seats");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to hold seats");
    }
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
                  onClick={() => {
                    setSelectedTime(st);
                    setSelectedSeats([]); // reset previous selections
                  }}
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
      <div className="col-span-3 bg-gray-50 rounded-xl p-6 shadow-inner min-h-[70vh]">
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
        {selectedSeats.length > 0 && (
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
