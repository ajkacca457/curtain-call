import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { dummyShowsData, dummyDateTimeData } from "../assets/data";
import { isoTimeFormat } from "../lib/utils";
import ScreenImage from "../assets/screenImage.svg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SeatLayout = () => {
  const { id, date } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const rowGroups = [
    ["A", "B"],
    ["C", "E"],
    ["D", "F"],
    ["G", "I"],
    ["H", "J"]
  ];

  const OtherRows = rowGroups.slice(1);
  useEffect(() => {
    const showData = dummyShowsData.find((show) => show._id === id);
    setShow({
      showInfo: showData,
      dateTime: dummyDateTimeData,
    });
  }, [id]);

  const handleClick = (seatId) => {
    if (!selectedTime) {
      return toast("please select time to book seat");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("you can not select more than 5 seats");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((item) => item !== seatId)
        : [...prev, seatId]
    );
  };

  const renderRows = (row, count = 9) => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              className={`h-10 w-10 rounded border border-primary/60 cursor-pointer ${
                selectedSeats.includes(seatId) && "bg-primary text-white"
              }`}
              onClick={() => {
                handleClick(seatId);
              }}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    );
  };

  if (!show) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-4 gap-x-6 max-w-[1600px] mx-auto mt-10">
      {/* Time Selector Panel */}
      <div className="col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Select Show Timing
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {show.dateTime[date].map((item) => {
              const isSelected = selectedTime === item.time;
              return (
                <div
                  key={item.time}
                  onClick={() => setSelectedTime(item.time)}
                  className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium text-center transition-all
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
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
      <div className="col-span-3 bg-gray-50 flex flex-col items-center rounded-2xl shadow-inner p-6 border border-gray-100 min-h-[300px]">
        <div className="text-center mt-10">
          <h3 className="mb-4 font-semibold text-xl">Select your seats</h3>
          <img src={ScreenImage} alt="show-stage" />
          <h4 className="mb-2">Screen Position</h4>
        </div>

        <div className="mt-8">
          {rowGroups[0].map((item) => renderRows(item))}
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          {OtherRows.map((group, index) => {
            return <div key={index}>{group.map((row) => renderRows(row))}</div>;
          })}
        </div>

          {selectedTime && selectedSeats.length>0 && <div className="my-10">
              <Link to="/my-bookings" className="btn btn-primary">Proceed to checkout</Link>
            </div>}

      </div>
    </div>
  );
};

export default SeatLayout;
