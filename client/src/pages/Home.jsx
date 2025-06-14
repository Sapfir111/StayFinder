import Hero from "../components/Hero.jsx";
import FeaturedDestination from "../components/FeaturedDestination.jsx";
import ExclusiveOffers from "../components/ExclusiveOffers.jsx";
import Testimonial from "../components/Testimonial.jsx";
import NewsLetter from "../components/NewsLetter.jsx";
import RecommendedHotels from "../components/RecommendedHotels.jsx";

const Home = () => {
    return (
        <div>
            <Hero />
            <RecommendedHotels />
            <FeaturedDestination />
            <ExclusiveOffers />
            <Testimonial />
            <NewsLetter />
        </div>
    );
};

export default Home;