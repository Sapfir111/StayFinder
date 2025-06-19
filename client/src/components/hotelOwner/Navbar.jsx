import {Link} from "react-router-dom";
import {assets} from "../../assets/assets.js";
import {UserButton} from "@clerk/clerk-react";

const Navbar = () => {
    return (
        <header>
            <nav className="flex items-center justify-between px-4 md:px-8
            border-b border-gray-300 py-3 bg-white">
                <Link to="/">
                    <img
                        src={assets.logo}
                        alt="logo"
                        className="h-9 invert opacity-80"
                    />
                </Link>
                <UserButton/>
            </nav>
        </header>
    );
};

export default Navbar;