import { assets } from "../assets/assets";

const AboutUs = () => {
    return (
        <section className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
            <div className="flex items-center justify-between w-full gap-10">
                <div className="flex flex-col gap-3 md:max-w-1/2">
                    <h1 className="text-4xl text-center md:text-left md:text-[40px] font-playfair">Про нас</h1>
                    <p>
                        Заснована у 2025 році в Києві, Україна, StayFinder — це платформа для бронювання готелів, яка поєднує мандрівників із винятковими варіантами проживання у понад багатьох країнах світу. Від затишних бутик-готелів до п’ятизіркових курортів — StayFinder спрощує процес пошуку, бронювання та насолоди ідеальним відпочинком.
                    </p>
                    <p>
                        Штаб-квартира компанії розташована в Києві, а регіональні офіси — у Нью-Йорку та Сінгапурі. StayFinder поєднує сучасні технології, персоналізовані рекомендації та професійну підтримку клієнтів, щоб забезпечити бездоганний досвід подорожей. Незалежно від того, чи плануєте ви спонтанну втечу на вихідні, чи давно омріяну відпустку — StayFinder допоможе знайти найкраще місце за найкращою ціною.
                    </p>
                </div>
                <div className="max-w-1/2 hidden md:block -mr-4 lg:-mr-24 xl:-mr-32">
                    <img
                        src={assets.aboutUsImage}
                        alt="about-us-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;