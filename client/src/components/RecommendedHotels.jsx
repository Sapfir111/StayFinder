import HotelCard from "./HotelCard.jsx";
import Title from "./Title.jsx";
import {useAppContext} from "../context/AppContext.jsx";
import {useEffect, useState} from "react";

const RecommendedHotels = () => {
    const { rooms, searchedCities } = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter((room) => searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels);
    };

    useEffect(() => {
        filterHotels();
    }, [rooms, searchedCities]);

    return recommended.length > 0 && (
        <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
            <Title
                title="Рекомендовані готелі"
                subTitle="Відкрийте нашу добірку виняткових готелів з усього світу — розкіш та незабутні враження вже чекають на вас."
            />
            <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
                {recommended.slice(0, 4).map((room, index) => (
                    <HotelCard
                        key={room._id}
                        room={room}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecommendedHotels;