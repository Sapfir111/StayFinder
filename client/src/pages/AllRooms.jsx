import {assets, facilityIcons} from "../assets/assets.js";
import StarRating from "../components/StarRating.jsx";
import {useAppContext} from "../context/AppContext.jsx";
import Title from "../components/Title.jsx";

const AllRooms = () => {
    const { rooms, navigate } = useAppContext();

    return (
        <div className="flex flex-col-reverse lg:flex-row items-start
        justify-between mb-8 pt-28 md:pt-35 px-4 md:px-16 lg:px-24
        xl:px-32">
            <div>
                <div className="flex flex-col items-start text-left">
                    <Title
                        title="Готелі"
                        subTitle="Скористайтеся обмеженими пропозиціями та спеціальними пакетами, щоб покращити ваш відпочинок і створити незабутні спогади."
                        align="left"
                    />
                </div>

                {rooms.map((room) => (
                    <div
                        key={room._id}
                        className="flex flex-col md:flex-row items-start py-10 gap-6
                        border-b border-gray-300 last:pb-30 last:border-0">
                        <img
                            src={room.images[0]}
                            alt="hotel-img"
                            title="Деталі номера"
                            className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
                            onClick={() => {
                                navigate(`/rooms/${room._id}`);
                                scrollTo(0, 0)
                            }}
                        />
                        <div className="md:w-1/2 flex flex-col gap-2">
                            <p className="text-gray-500">{room.hotel.city}</p>
                            <p
                                className="text-gray-800 text-3xl cursor-pointer"
                                onClick={() => {
                                    navigate(`/rooms/${room._id}`);
                                    scrollTo(0, 0)
                                }}
                            >{room.hotel.name}</p>
                            <div className="flex items-center">
                                <StarRating />
                                <p className="ml-2">200+ Відгуків</p>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 mt-2
                            text-sm">
                                <img
                                    src={assets.locationIcon}
                                    alt="location-icon"
                                />
                                <span>{room.hotel.address}</span>
                            </div>
                            <div className="flex flex-wrap items-center mt-4 mb-6 gap-4">
                                {room.amenities.map((item, index) => {
                                    const icon = facilityIcons[item];
                                    if (!icon) {
                                        console.warn("No icon for:", item);
                                        return null;
                                    }
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg
                                            bg-[#F5F5FF]/70"
                                        >
                                            <img
                                                src={icon}
                                                alt={item}
                                                className="w-5 h-5"
                                            />
                                            <p className="text-xs">{item}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <p className="text-xl font-medium text-gray-700">${room.pricePerNight} / за ніч</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllRooms;