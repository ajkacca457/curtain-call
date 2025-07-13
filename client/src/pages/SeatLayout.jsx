import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { dummyShowsData, dummyDateTimeData } from "../assets/data";
import { isoTimeFormat } from "../lib/utils";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const showData = dummyShowsData.find((show) => show._id === id);
    setShow({
      showInfo: showData,
      dateTime: dummyDateTimeData,
    });
  }, [id]);

  if (!show) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-4 gap-x-6 max-w-[1600px] mx-auto mt-10">
      {/* Time Selector Panel */}
      <div className="col-span-1">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Show Timing</h3>
        <div className="grid grid-cols-2 gap-3">
          {show.dateTime[date].map((item) => {
            const isSelected = selectedTime === item.time;
            return (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item.time)}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-center transition-all
                  ${isSelected
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                `}
              >
                {isoTimeFormat(item.time)}
              </div>
            );
          })}
        </div>
      </div>
      </div>

      {/* Seat Layout Panel Placeholder */}
      <div className="col-span-3 bg-gray-50 rounded-2xl shadow-inner p-6 border border-gray-100 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-400 italic">Seat layout coming soon...</p>
      </div>
    </div>
  );
};

export default SeatLayout;
