import {useEffect, useState} from "react";
import Title from "../../components/Title.jsx";
import {useAppContext} from "../../context/AppContext.jsx";
import {toast} from "react-hot-toast";
import {data} from "react-router-dom";

const ListRoom = () => {
    const [rooms, setRooms] = useState([]);
    const { axios, getToken, user, currency } = useAppContext();

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms/owner', { headers: {Authorization: `Bearer ${await getToken()}`} });

            if (data.success) {
                setRooms(data.rooms);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const togleAvailabilty = async (roomId) => {
        const { data } = await axios.post('/api/rooms/toggle-availability', {roomId}, { headers: {Authorization: `Bearer ${await getToken()}`} });
        if (data.success) {
            toast.success("Виконано");
            fetchRooms();
        } else {
            toast.error("Щось не так");
        }
    };

    useEffect(() => {
        if (user) {
            fetchRooms();
        }
    }, [user]);

    return (
        <div>
            <Title
                title="Управління номерами"
                subTitle="Переглядайте, редагуйте та керуйте всіма розміщеними номерами. Оновлюйте інформацію вчасно, щоб забезпечити найкращий досвід для користувачів."
                align="left"
                font="outfit"
            />
            <p className="text-gray-500 mt-8">Усі номери</p>
            <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll
            mt-3">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-gray-800 font-medium">Тип</th>
                            <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Зручності</th>
                            <th className="py-3 px-4 text-gray-800 font-medium">Ціна / за ніч</th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-center">Дії</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                    {rooms.map((item, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                                {item.roomType}
                            </td>
                            <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                                {item.amenities.join(', ')}
                            </td>
                            <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                                {currency} {item.pricePerNight}
                            </td>
                            <td className="py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center">
                                <label
                                    className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={item.isAvailable}
                                        onChange={() => togleAvailabilty(item._id)}
                                    />
                                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full
                                    transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                </label>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListRoom;