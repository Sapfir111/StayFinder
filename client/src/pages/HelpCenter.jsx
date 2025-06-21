import Title from "../components/Title.jsx";
import {assets} from "../assets/assets.js";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";

const HelpCenter = () => {
    const helpCenterInfo = [
        {
            id: '1',
            value: 'accessibility',
            title: 'Доступність',
            text: 'Ми хочемо, щоб кожен міг легко користуватися StayFinder, незалежно від особливостей сприйняття чи пристрою. Якщо ви помітили щось, що ускладнює навігацію — напишіть нам. Ми відкриті до покращень'
        },
        {
            id: '2',
            value: 'safety-information',
            title: 'Інформація про безпеку',
            text: 'Безпека наших гостей — наш пріоритет. Ми співпрацюємо лише з перевіреними закладами, які відповідають стандартам гігієни, пожежної безпеки та охорони. Усі об\'єкти проходять регулярну перевірку, а персонал отримує необхідну підготовку щодо надзвичайних ситуацій.'
        },
        {
            id: '3',
            value: 'contact-us',
            title: 'Зв\'яжіться з нами',
            text: 'Маєте питання, пропозиції або потрібна допомога? Наша команда підтримки завжди готова допомогти вам.\n Напишіть нам на: support@stayfinder.com. Години роботи: щодня з 9:00 до 21:00 (за Києвом).'
        },
    ];
    const buttonRef = useRef([]);
    const [activeId, setActiveId] = useState(null);
    const { topic } = useParams();

    const handleToggle = (id) => {
        setActiveId(prevId => (prevId === id ? null : id));
    };

    useEffect(() => {
        const foundTopic = helpCenterInfo.find(item => item.value === topic);

        if (foundTopic) {
            setActiveId(foundTopic.id);
        }
    }, [topic]);

    return (
        <section className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="flex flex-col gap-10">
                <Title
                    title="Центр допомоги"
                    subTitle="У нашому Центрі допомоги ви знайдете корисні статті, поради та відповіді на найпоширеніші запитання."
                    align="left"
                />
                {
                    helpCenterInfo.map((item, index) => (
                        <div className="flex flex-col gap-3" key={item.id}>
                            <div className="flex items-center gap-3">
                                <button
                                    className="flex gap-3"
                                    ref={button => buttonRef.current[index] = button}
                                    onClick={() => handleToggle(item.id)}
                                    data-button-id={item.id}
                                >
                                    <img
                                        src={activeId === item.id ? assets.seeLessIcon : assets.seeMoreIcon}
                                        alt="toggle-icon"
                                    />
                                    <h2 className="text-1xl sm:text-[20px]">{item.title}</h2>
                                </button>
                            </div>

                            {activeId === item.id && (
                                <p>
                                    {item.text}
                                </p>
                            )}
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default HelpCenter;