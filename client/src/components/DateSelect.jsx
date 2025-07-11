import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const DateSelect = ({ dateTime, id }) => {
  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-4">Select show date: </h2>
      <div className="flex justify-between items-center">
        <div className="flex mx-auto justify-between items-center">
          <FaArrowCircleLeft size={25} />
          <div>
            {Object.keys(dateTime).map((item) => {
              return (
                <button
                  key={item}
                  className="bg-green-200 px-4 py-6 m-2 border-2 border-amber-200"
                >
                  <span className="text-xl">{new Date(item).getDate()}</span>
                  <span className="ml-2 text-xl">
                    {new Date(item).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              );
            })}
          </div>
          <FaArrowCircleRight size={25} />
        </div>

        <button>Book Show</button>
      </div>
    </div>
  );
};

export default DateSelect;
