import Title from "../../components/Title.jsx";
import {assets} from "../../assets/assets.js";
import {useEffect, useState} from "react";
import {useAppContext} from "../../context/AppContext.jsx";

const Dashboard = () => {
    const { currency, user, getToken, toast, axios } = useAppContext();

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    });

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel', { headers: {Authorization: `Bearer ${await getToken()}`} });

            if (data.success) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <section>
            <Title
                title="Кабінет власника"
                subTitle="Керуйте своїми оголошеннями, відстежуйте бронювання та аналізуйте дохід — все в одному місці. Отримуйте актуальну інформацію в режимі реального часу для безперебійної роботи."
                align="left"
                font="outfit"
            />
            <div className="flex gap-4 my-8">
                {/* Total Bookings */}
                <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
                    <img
                        src={assets.totalBookingIcon}
                        alt=""
                        className="max-sm:hidden h-10"
                    />
                    <div className="flex flex-col sm:ml-4 font-medium">
                        <p className="text-blue-500 text-lg">Кількість бронювань</p>
                        <p className="text-neutral-400 text-base">{dashboardData.totalBookings}</p>
                    </div>
                </div>
                {/* Total Revenue */}
                <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
                    <img
                        src={assets.totalRevenueIcon}
                        alt=""
                        className="max-sm:hidden h-10"
                    />
                    <div className="flex flex-col sm:ml-4 font-medium">
                        <p className="text-blue-500 text-lg">Загальний дохід</p>
                        <p className="text-neutral-400 text-base">{currency} {dashboardData.totalRevenue}</p>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            <h2 className="text-xl text-blue-950/70 font-medium mb-5">Недавні бронювання</h2>
            <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-gray-800 font-medium">Ім'я замовника</th>
                            <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">Назва номера</th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-center">Загальна сума</th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-center">Статус оплати</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {dashboardData.bookings.map((item, index) => (
                            <tr key={index}>
                                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                                    {item.user.username}
                                </td>
                                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                                    {item.room.roomType}
                                </td>
                                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                                    $ {item.totalPrice}
                                </td>
                                <td className="py-3 px-4 border-t border-gray-300 flex">
                                    <button className={`py-1 px-3 text-xs rounded-full mx-auto 
                                    ${item.isPaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}>
                                        {item.isPaid ? 'Оплачено' : 'В процесі'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Dashboard;