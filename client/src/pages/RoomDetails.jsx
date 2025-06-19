import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {assets, facilityIcons, roomCommonData, amenityTranslations} from "../assets/assets.js";
import StarRating from "../components/StarRating.jsx";
import {useAppContext} from "../context/AppContext.jsx";
import {toast} from "react-hot-toast";

const RoomDetails = () => {
    const { id } = useParams();
    const { rooms, getToken, axios, navigate } = useAppContext();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(1);

    const [isAvailable, setIsAvailable] = useState(false);

    const checkAvailability = async () => {
        try {
            if (checkInDate >= checkOutDate) {
                toast.error('Дата заїзду має бути меншою, ніж дата виїзду');
                return;
            }

            const { data } = await axios.post(`/api/bookings/check-availability`, {
                room: id,
                checkInDate,
                checkOutDate,
            });

            if (data.success) {
                if (data.isAvailable) {
                    setIsAvailable(true);
                    toast.success('Номер вільний');
                } else {
                    setIsAvailable(false);
                    toast.error('Номер зайнятий');
                }
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            if (!isAvailable) {
                return checkAvailability();
            } else {
                const { data } = await axios.post('/api/bookings/book', {
                    room: id,
                    checkInDate,
                    checkOutDate,
                    guests,
                    paymentMethod: 'Pay At Hotel'
                }, {
                    headers: { Authorization: `Bearer ${await getToken()}` }
                });

                if (data.success) {
                    toast.success(data.message);
                    navigate('/my-bookings');
                    scrollTo(0, 0);
                } else {
                    toast.error(data.message);
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const room = rooms.find(room => room._id === id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    }, [rooms]);

    return room && (
        <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
            {/* Room Details */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl md:text-4xl">{room.hotel.name}</h1>
                    <span className="text-sm">({room.roomType})</span>
                </div>
            </div>

            {/* Room Rating */}
            <div className="flex items-center gap-1 mt-2">
                <StarRating/>
                <p className="ml-2">200+ Відгуків</p>
            </div>

            {/* Room Address */}
            <div className="flex items-center gap-1 text-gray-500 mt-2">
                <img
                    src={assets.locationIcon}
                    alt="location-icon"
                />
                <span>{room.hotel.address}</span>
            </div>

            {/* Room Images */}
            <div className="flex flex-col lg:flex-row mt-6 gap-6">
                <div className="lg:w-1/2 w-full">
                    <img
                        src={mainImage}
                        alt="room-image"
                        className="w-full rounded-xl shadow-lg object-cover"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                    {room?.images.length > 1 && room.images.map((image, index) => (
                        <img
                            onClick={() => setMainImage(image)}
                            key={index}
                            src={image}
                            alt="room-image"
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer 
                            ${mainImage === image && "outline-3 outline-orange-500"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Room Highlights */}
            <div className="flex flex-col md:flex-row md:justify-between mt-10">
                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
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
                    <p className="text-2xl font-medium">${room.pricePerNight} / за ніч</p>
                </div>
            </div>

            {/* CheckIn CheckOut Form */}
            <form
                onSubmit={onSubmitHandler}
                className="flex flex-col md:flex-row items-start md:items-center justify-between
            bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl max-auto mt-16 max-w-6xl">
                <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4
            md:gap-10 text-gray-500">
                    <div className="flex flex-col">
                        <label
                            htmlFor="checkInDate"
                            className="font-medium"
                        >Дата заїзду</label>
                        <input
                            type="date"
                            id="checkInDate"
                            placeholder="Дата заїзду"
                            className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                            required
                            onChange={(e) => setCheckInDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="checkOutDate"
                            className="font-medium"
                        >Дата виїзду</label>
                        <input
                            type="date"
                            id="checkOutDate"
                            placeholder="Дата виїзду"
                            className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                            required
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            min={checkInDate}
                            disabled={!checkInDate}
                        />
                    </div>
                    <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="guests"
                            className="font-medium"
                        >Гості</label>
                        <input
                            type="number"
                            id="guests"
                            placeholder="1"
                            className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                            required
                            onChange={(e) => {
                                if (e.target.value < 1) return;
                                setGuests(e.target.value);
                            }}
                            value={guests}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-primary-dull active:scale-95 transition-all
                text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4
                text-base cursor-pointer"
                >
                    {isAvailable ? 'Забронювати' : 'Перевірити доступність'}
                </button>
            </form>

            {/* Common Specifications */}
            <div className="mt-16 space-y-4">
                {roomCommonData.map((spec, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-2"
                    >
                        <img
                            src={spec.icon}
                            alt={`${spec.title}-icon`}
                            className="w-6.5"
                        />
                        <div>
                            <p className="text-base">{spec.title}</p>
                            <p className="text-gray-500">{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hosted By */}
            <div className="flex flex-col items-start gap-4 mt-16">
                <div className="flex gap-4">
                    <img
                        src={room.hotel.owner.image}
                        alt="host"
                        className="h-14 w-14 md:h-18 md:w-18 rounded-full"
                    />
                    <div>
                        <p className="text-lg md:text-xl">Проживання від {room.hotel.name}</p>
                        <div className="flex items-center mt-1">
                            <StarRating />
                            <p className="ml-2">200+ Відгуків</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;