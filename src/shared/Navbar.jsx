import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import './Navbar.css';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
const Navbar = () => {
    const { user, logOutUser } = use(AuthContext);
    console.log(logOutUser);
    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                console.log('logout successfully')
            // Swal.fire({
            //     title: 'Logged Out',
            //     text: 'You have successfully logged out.',
            //     icon: 'success',
            //     confirmButtonText: 'OK',
            //     confirmButtonColor: '#d97706',
            // })
        })
        .catch(err=>console.log(err))
        
    };
    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/bookShelf">Book Shelf</NavLink>
            </li>
            <li>
                <NavLink to="/addBook">Add Book</NavLink>
            </li>
            <li>
                <NavLink to="/myBooks">My Books</NavLink>
            </li>
            <li>
                <NavLink to="/updateBook">Update Book</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
        </>
    );
    return (
        <div className="navbar bg-base-100 shadow-sm fixed top-0 z-30 w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            {' '}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{' '}
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="flex gap-3">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="logo.png"
                        alt=""
                    />
                    <h2 className="text-2xl font-semibold">Book Hut</h2>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        <span>{user?.email}</span>
                        <button
                            onClick={handleLogOut}
                            className="btn drop-shadow-md bg-amber-600 hover:bg-amber-700 btn-neutral mr-3">
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/register"
                            className="btn drop-shadow-md bg-amber-600 hover:bg-amber-700 btn-neutral mr-3">
                            Register
                        </Link>
                        <Link
                            to="/logIn"
                            className="btn drop-shadow-md bg-amber-600 hover:bg-amber-700 btn-neutral ">
                            Log In
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
