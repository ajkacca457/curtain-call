import { useState } from "react";
import { dummyShowsData } from "../../assets/data";

const AddShows = () => {
    const [selectedShow, setSelectedShow] = useState(null);

    const handleSelect = (show) => {
        setSelectedShow(show);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">🎭 Add a New Showtime</h1>
            <p className="text-sm text-gray-600 mb-4">Select a show to add a new time slot for.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {dummyShowsData.map((show) => (
                    <div
                        key={show._id}
                        onClick={() => handleSelect(show)}
                        className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition ${selectedShow?._id === show._id ? "border-sky-500" : "border-gray-200"
                            }`}
                    >
                        <img
                            src={show.poster_path}
                            alt={show.title}
                            className="w-full h-48 object-cover rounded mb-3"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">{show.title}</h2>
                        <p className="text-sm text-gray-500">{show.tagline}</p>
                    </div>
                ))}
            </div>

            {selectedShow && (
                <div className="mt-6 p-4 border-t text-sky-600 font-medium">
                    Selected Show: <span className="font-semibold">{selectedShow.title}</span>
                </div>
            )}
        </div>
    );
};

export default AddShows;
