import { dummyShowsData } from "../assets/data";
import ShowCard from "../components/ShowCard";

const Favorite = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-left my-8">
        Your Favorite Shows and Events:
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyShowsData.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
