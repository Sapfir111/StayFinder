import {useState} from "react";
import Title from "../../components/Title.jsx";
import {assets} from "../../assets/assets.js";
import {useAppContext} from "../../context/AppContext.jsx";
import {toast} from "react-hot-toast";

const AddRoom = () => {
    const { axios, getToken } = useAppContext();

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    });

    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Безкоштовний Wi-Fi': false,
            'Безкоштовний сніданок': false,
            'Догляд за номером': false,
            'Вид на гори': false,
            'Доступ до басейну': false,
        }
    });

    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!inputs.roomType || !inputs.pricePerNight || !inputs.amenities || !Object.values(images).some(image => image)) {
            toast.error('Будь ласка, вкажіть усі деталі');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('roomType', inputs.roomType);
            formData.append('pricePerNight', inputs.pricePerNight);

            // Converting Amenities to Array & keeping only enabled Amenities
            const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
            formData.append('amenities', JSON.stringify(amenities));

            // Adding Images to FormData
            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key]);
            });

            const { data } = await axios.post('/api/rooms', formData, { headers: {
                Authorization: `Bearer ${await getToken()}`
            } });

            if (data.success) {
                toast.success("Номер додано");
                setInputs({
                    roomType: '',
                    pricePerNight: 0,
                    amenities: {
                        'Безкоштовний Wi-Fi': false,
                        'Безкоштовний сніданок': false,
                        'Догляд за номером': false,
                        'Вид на гори': false,
                        'Доступ до басейну': false,
                    }
                });
                setImages({
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Title
                title="Додати номер"
                subTitle="Уважно заповніть усі дані — точна інформація про номер, ціни та зручності допоможе зробити процес бронювання зручнішим для користувачів."
                font="outfit"
                align="left"
            />
            <p className="text-gray-800 mt-10">Зображення</p>
            <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
                {Object.keys(images).map((key) => (
                    <label
                        htmlFor={`roomImage${key}`}
                        key={key}
                    >
                        <img
                            src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
                            alt=""
                            className="max-h-13 cursor-pointer opacity-80"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            id={`roomImage${key}`}
                            hidden
                            onChange={(e) => setImages({...images, [key]: e.target.files[0]})}
                        />
                    </label>
                ))}
            </div>
            <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
                <div className="flex-1 max-w-48">
                    <p className="text-gray-800 mt-4">Тип кімнати</p>
                    <select
                        value={inputs.roomType}
                        onChange={(e) => setInputs({...inputs, roomType: e.target.value})}
                        className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full">
                        <option value="">Виберіть тип номера</option>
                        <option value="Односпальне ліжко">Односпальне ліжко</option>
                        <option value="Двоспальне ліжко">Двоспальне ліжко</option>
                        <option value="Люкс номер">Люкс номер</option>
                        <option value="Сімейний люкс">Сімейний люкс</option>
                    </select>
                </div>
                <div>
                    <p className="mt-4 text-gray-800">
                        Ціна <span className="text-xs">/ за ніч</span>
                    </p>
                    <input
                        type="number"
                        placeholder="0"
                        className="border border-gray-300 mt-1 rounded p-2 w-24"
                        value={inputs.pricePerNight}
                        onChange={(e) => setInputs({...inputs, pricePerNight: e.target.value})}
                    />
                </div>
            </div>
            <p className="text-gray-800 mt-4">Зручності</p>
            <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
                {Object.keys(inputs.amenities).map((amenity, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`amenities-${index + 1}`}
                            checked={inputs.amenities[amenity]}
                            onChange={(e) =>
                                setInputs({...inputs, amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]}})}
                        />
                        <label htmlFor={`amenities-${index + 1}`}> {amenity}</label>
                    </div>
                ))}
            </div>
            <button className="bg-blue-600 text-white px-8 py-2 rounded mt-8
            cursor-pointer" disabled={loading}>
                {loading ? 'Додавання...' : 'Додати номер'}
            </button>
        </form>
    );
};

export default AddRoom;