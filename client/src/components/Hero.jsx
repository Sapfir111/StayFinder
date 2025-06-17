import {assets, cities} from "../assets/assets.js";
import {useState} from "react";
import {useAppContext} from "../context/AppContext.jsx";

const Hero = () => {
    const { navigate, getToken, axios, setSearchedCities } = useAppContext();
    const [destination, setDestination] = useState('');

    const onSearch = async (e) => {
        e.preventDefault();
        navigate(`/rooms?destination=${destination}`);

        // call api to save recent searched city
        await axios.post('api/user/store-recent-search', {
            recentSearchedCity: destination,
        }, { headers: { Authorization: `Bearer ${await getToken()}` } });

        // add destination to searchedCities max 3 recent searched cities
        setSearchedCities((prevSearchedCities) => {
            const updatedSearchedCities = [...prevSearchedCities, destination];

            if (updatedSearchedCities.length > 3) {
                updatedSearchedCities.shift();
            }

            return updatedSearchedCities;
        });
    };

    return (
        <section className="flex flex-col items-start justify-center
        px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/heroImage.png')]
        bg-no-repeat bg-cover bg-center h-screen">
            <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px]
            font-bold md:font-extrabold max-w-xl mt-4">Вирушайте туди, де чекає ваш ідеальний відпочинок</h1>
            <p className="max-w-130 mt-2 text-sm md:text-base">
                Відчуйте розкіш і комфорт у найпрестижніших готелях світу. Ваша подорож починається зараз.
                Обирайте найкраще — елітні готелі та курорти чекають на вас. Почніть свою мандрівку вже сьогодні.
            </p>
            <form
                onSubmit={onSearch}
                className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8
                flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'
            >
                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className="h-4" />
                        <label htmlFor="destinationInput">Куди вирушаєте?</label>
                    </div>
                    <input
                        list='destinations'
                        id="destinationInput"
                        type="text"
                        className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                        placeholder="Виберіть напрямок"
                        required
                        onChange={(e) => setDestination(e.target.value)}
                        value={destination}
                    />
                    <datalist id='destinations'>
                        {cities.map((city, index) => (
                            <option value={city} key={index} />
                        ))}
                    </datalist>
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className="h-4"/>
                        <label htmlFor="checkIn">Дата заїзду</label>
                    </div>
                    <input id="checkIn" type="date"
                           className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"/>
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className="h-4"/>
                        <label htmlFor="checkOut">Дата виїзду</label>
                    </div>
                    <input id="checkOut" type="date"
                           className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"/>
                </div>

                <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                    <label htmlFor="guests">Кількість гостей</label>
                    <input min={1} max={4} id="guests" type="number"
                           className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
                           placeholder="1"/>
                </div>

                <button
                    className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
                    <img src={assets.searchIcon} alt="searchIcon" className="h-7" />
                    <span>Шукати</span>
                </button>
            </form>
        </section>
    );
};

export default Hero;