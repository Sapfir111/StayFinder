import Hero from "../components/Hero.jsx";
import FeaturedDestination from "../components/FeaturedDestination.jsx";
import RecommendedHotels from "../components/RecommendedHotels.jsx";

const Home = () => {
    return (
        <>
            <Hero />
            <RecommendedHotels />
            <FeaturedDestination />
        </>
    );
};

export default Home;