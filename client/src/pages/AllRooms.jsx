import {assets, facilityIcons, amenityTranslations} from "../assets/assets.js";
import {useSearchParams} from "react-router-dom";
import StarRating from "../components/StarRating.jsx";
import {useMemo, useState} from "react";
import {useAppContext} from "../context/AppContext.jsx";
import Title from "../components/Title.jsx";

const CheckBox = ({label, selected = false, onChange = () => {  }}) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
            />
            <span className="font-light select-none">{label}</span>
        </label>
    );
};

const RadioButton = ({label, selected = false, onChange = () => {  }}) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input
                type="radio"
                name="sortOption"
                checked={selected}
                onChange={() => onChange(label)}
            />
            <span className="font-light select-none">{label}</span>
        </label>
    );
};

const AllRooms = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { rooms, navigate, currency } = useAppContext();

    const [openFilters, setOpenFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        roomType: [],
        priceRange: [],
    });
    const [selectedSort, setSelectedSort] = useState('');

    const roomTypes = [
        'Односпальне ліжко',
        'Двоспальне ліжко',
        'Кімната-люкс',
        'Сімейний люкс',
    ];

    const priceRange = [
        '0 до 500',
        '500 до 1000',
        '1000 до 2000',
        '2000 до 3000',
    ];

    const sortOptions = [
        'Ціна від нижчої до вищої',
        'Ціна від вищої до нижчої',
        'Найновіше спершу',
    ];

    // Handle changes for filters and sorting
    const handleFilterChange = (checked, value, type) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };

            if (checked) {
                updatedFilters[type].push(value);
            } else {
                updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
            }

            return updatedFilters;
        });
    };

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
    };

    // Function to check if a room matches the selected room types
    const matchesRoomType = (room) => {
        return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);
    };

    // Function to check if a room matches the selected price ranges
    const matchesPriceRange = (room) => {
        return selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some(range => {
            const [min, max] = range.split(' до ').map(Number);
            return room.pricePerNight > min && room.pricePerNight <= max;
        });
    };

    // Function to sort rooms based on the selected sort options
    const sortRooms = (a, b) => {
        if (selectedSort === 'Ціна від нижчої до вищої') {
            return a.pricePerNight - b.pricePerNight;
        }

        if (selectedSort === 'Ціна від вищої до нижчої') {
            return b.pricePerNight - a.pricePerNight;
        }

        if (selectedSort === 'Найновіше спершу') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        return 0;
    };

    // Filter Destination
    const filterDestination = (room) => {
        const destination = searchParams.get('destination');

        if (!destination) {
            return true;
        }

        return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
    };

    // Filter and sort rooms based on the selected filters and sort option
    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => matchesRoomType(room) && matchesPriceRange(room) && filterDestination(room))
            .sort(sortRooms);
    }, [rooms, selectedFilters, selectedSort, searchParams]);

    // Clear all filters
    const clearFilters = () => {
        setSelectedFilters({
            roomType: [],
            priceRange: [],
        });
        setSelectedSort('');
        setSearchParams({});
    };

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

                {filteredRooms.map((room) => (
                    <div
                        key={room._id}
                        className="flex flex-col md:flex-row items-start py-10 gap-6
                        border-b border-gray-300 last:pb-30 last:border-0">
                        <img
                            src={room.images[0]}
                            alt="hotel-img"
                            title="View Room Details"
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
                            {/* Room Amenities */}
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
                            {/* Room Price per Night */}
                            <p className="text-xl font-medium text-gray-700">${room.pricePerNight} / за ніч</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white w-80 border border-gray-300 text-gray-600
            max-lg:mb-8 min-lg:mt-16">
                <div className={`flex items-center justify-between px-5 py-2.5
                min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
                    <p className="text-base font-medium text-gray-800">ФІЛЬТРУВАННЯ</p>
                    <div className="text-xs cursor-pointer">
                        <span
                            className="lg:hidden"
                            onClick={() => setOpenFilters(!openFilters)}
                        >
                            {openFilters ? 'СХОВАТИ' : 'ПОКАЗАТИ'}
                        </span>
                        <span className="hidden lg:block" onClick={() => clearFilters()}>ОЧИСТИТИ</span>
                    </div>
                </div>

                <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} 
                overflow-hidden transition-all duration-700`}>
                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">Популярні фільтри</p>
                        {roomTypes.map((room, index) => (
                            <CheckBox
                                key={index}
                                label={room}
                                selected={selectedFilters.roomType.includes(room)}
                                onChange={(checked) => handleFilterChange(checked, room, 'roomType')}
                            />
                        ))}
                    </div>
                    <div className="px-5 pt-5">
                        <p className="font-medium text-gray-800 pb-2">Ціновий діапазон</p>
                        {priceRange.map((range, index) => (
                            <CheckBox
                                key={index}
                                label={`${currency} ${range}`}
                                selected={selectedFilters.priceRange.includes(range)}
                                onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}
                            />
                        ))}
                    </div>
                    <div className="px-5 pt-5 pb-7">
                        <p className="font-medium text-gray-800 pb-2">Сортувати за</p>
                        {sortOptions.map((option, index) => (
                            <RadioButton
                                key={index}
                                label={option}
                                selected={selectedSort === option}
                                onChange={() => handleSortChange(option)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllRooms;