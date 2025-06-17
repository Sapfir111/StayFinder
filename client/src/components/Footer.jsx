import {assets} from "../assets/assets.js";
import {Link} from "react-router-dom";

const Footer = () => {
    const footerLinks = [
        { id: 'col-1', name: 'Головна', path: '/' },
        { id: 'col-1', name: 'Про нас', path: '/about-us' },
        { id: 'col-1', name: 'Готелі', path: '/rooms' },
        { id: 'col-2', name: 'Центр допомоги', path: '/help-center' },
        { id: 'col-2', name: 'Доступність', path: '/help-center/accessibility' },
        { id: 'col-2', name: 'Інформація про безпеку', path: '/help-center/safety-information' },
        { id: 'col-2', name: 'Зв\`яжіться з нами', path: '/help-center/contact-us' },
    ];

    return (
        <footer className="bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
            <div className="flex flex-col gap-5 md:grid md:grid-cols-[3fr_2fr_2fr]">
                <div className="max-w-80">
                    <Link to="/">
                        <img
                            src={assets.logo}
                            alt="logo"
                            className='mb-4 h-8 md:h-9 invert opacity-80'
                        />
                    </Link>
                    <p className='text-sm'>
                        Відкрийте для себе найунікальніші місця для відпочинку у світі — від бутик-готелів до розкішних
                        вілл і приватних островів.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        <img
                            src={assets.instagramIcon}
                            alt="instagram-icon"
                            className="w-6"
                        />
                        <img
                            src={assets.facebookIcon}
                            alt="facebook-icon"
                            className="w-6"
                        />
                        <img
                            src={assets.twitterIcon}
                            alt="twitter-icon"
                            className="w-6"
                        />
                        <img
                            src={assets.linkendinIcon}
                            alt="linkedin-icon"
                            className="w-6"
                        />
                    </div>
                </div>

                <div>
                    <p className='font-playfair text-lg text-gray-800'>КОМПАНІЯ</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        {footerLinks.map((link, i) => (
                            link.id === 'col-1' && (
                                <li key={i} onClick={() => scrollTo(0, 0)}>
                                    <Link to={link.path}>
                                        {link.name}
                                    </Link>
                                </li>
                            )
                        ))}
                    </ul>
                </div>

                <div>
                    <p className='font-playfair text-lg text-gray-800'>ПІДТРИМКА</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        {footerLinks.map((link, i) => (
                            link.id === 'col-2' && (
                                <li key={i} onClick={() => scrollTo(0, 0)}>
                                    <Link to={link.path}>
                                        {link.name}
                                    </Link>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
            <hr className='border-gray-300 mt-8'/>
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} StayFinder. Всі права захищено.</p>
            </div>
        </footer>
    );
};

export default Footer;