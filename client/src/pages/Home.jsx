import Hero from "../components/Hero";
import FeaturedShows from "../components/FeaturedShows";
import Trailers from "../components/Trailers";
import NewsAndAnnouncements from "../components/NewsAnnouncement";

const Home = () => {
  return (
    <div>
        <Hero />
        <FeaturedShows />
        <NewsAndAnnouncements />
        <Trailers />
    </div>
  );
};

export default Home;
