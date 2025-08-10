import { use } from 'react';
import {
    FaBook,
    FaBookmark,
    FaHome,
    FaInfoCircle,
    FaPlusCircle,
    FaSignOutAlt,
    FaUser,
} from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import Swal from 'sweetalert2';
import logo from '../assets/logo.png';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logOutUser } = use(AuthContext);

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    title: 'Logged Out',
                    text: 'You have successfully logged out.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d97706',
                });
            })
            .catch((err) => console.log(err));
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-300 
        ${isActive ? 'bg-amber-600 text-white' : 'hover:text-amber-400'}`;

    const links = (
        <>
            <li>
                <NavLink to="/" className={linkClass}>
                    <FaHome /> Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/bookShelf" className={linkClass}>
                    <FaBook /> Book Shelf
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink to="/addBook" className={linkClass}>
                            <FaPlusCircle /> Add Book
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myBooks" className={linkClass}>
                            <FaBookmark /> My Books
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={linkClass}>
                            <FaUser /> Profile
                        </NavLink>
                    </li>
                </>
            )}

            <li>
                <NavLink to="/aboutUs" className={linkClass}>
                    <FaInfoCircle /> About Us
                </NavLink>
            </li>
        </>
    );

    return (
        <div
            className="navbar fixed top-0 z-30 w-full px-4 lg:px-14 shadow-sm transition-colors duration-300 
    bg-amber-200 text-gray-800 dark:bg-[#0F172A] dark:text-white"
        >
            {/* Navbar Start */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 
                bg-white text-gray-800 dark:bg-[#1E293B] dark:text-white"
                    >
                        {links}
                    </ul>
                </div>

                <Link
                    to="/"
                    className="hidden md:flex gap-3 items-center select-none"
                >
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-10 h-10 rounded-full shadow-md"
                    />
                    <h2
                        className="text-3xl md:text-4xl 
    font-sans 
    font-bold 
    tracking-tight 
    bg-gradient-to-r 
    from-amber-700 
    via-amber-500 
    to-amber-700 
    bg-clip-text 
    text-transparent 
    drop-shadow-sm 
    transition 
    duration-200 
    hover:scale-[1.02] 
    hover:drop-shadow-md 
    cursor-pointer"
                    >
                        Book Hut
                    </h2>
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
            </div>

            {/* Search */}
            {/* <div className="hidden md:flex items-center ml-5">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="border border-gray-300 dark:border-gray-600 w-[250px] pl-10 pr-3 py-1 
                rounded-full bg-white dark:bg-[#1E293B] text-gray-800 dark:text-white 
                focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <FaSearch
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-500 dark:text-gray-400"
                    />
                </div>
            </div> */}

            {/* Navbar End */}
            <div className="navbar-end flex items-center space-x-3">
                {user ? (
                    <>
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            title={user?.displayName}
                            className="w-10 h-10 rounded-full"
                        />
                        <button
                            onClick={handleLogOut}
                            className="btn btn-sm bg-amber-600 hover:bg-amber-700 text-white"
                        >
                            <FaSignOutAlt size={20} />
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/register"
                            className="btn bg-amber-600 hover:bg-amber-700 text-white"
                        >
                            Register
                        </Link>
                        <Link
                            to="/logIn"
                            className="btn bg-amber-600 hover:bg-amber-700 text-white"
                        >
                            Log In
                        </Link>
                    </>
                )}

                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;
