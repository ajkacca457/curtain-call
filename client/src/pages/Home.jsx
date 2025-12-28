import Hero from "../components/Hero";
import FeaturedShows from "../components/FeaturedShows";
import Trailers from "../components/Trailers";
import NewsAndAnnouncements from "../components/NewsAnnouncement";
import UpcomingShowsCarousel from "../components/UpcomingShowsCarousel";

const Home = () => {
  return (
    <div>
        <Hero />
        <FeaturedShows />
        <UpcomingShowsCarousel />
        <NewsAndAnnouncements />
        <Trailers />
    </div>
  );
};

export default Home;
