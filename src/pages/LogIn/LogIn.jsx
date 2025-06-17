import Lottie from 'lottie-react';
import React, { use, useState } from 'react';
import login from '../../assets/lottie/login.json'
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import GoogleSignIn from '../../shared/GoogleSignIn';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LogIn = () => {
    const { loginUser } = use(AuthContext);
    const [isShow, setIsShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    console.log(from);

    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        loginUser(email, password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
                Swal.fire({
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                    icon: 'success',
                    confirmButtonText: 'Awesome!',
                    confirmButtonColor: '#d97706',
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Login Failed!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#f59e0b',
                });
                
        })

    }

    return (
        <div className="hero bg-base-200 min-h-screen px-4 py-6">
            <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 max-w-6xl mx-auto w-full">
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <Lottie
                        style={{ width: '100%', maxWidth: '500px' }}
                        animationData={login}
                        loop={true}
                    />
                </div>
                <div className="card bg-base-100 w-full max-w-lg shadow-2xl p-6 sm:p-10">
                    <div className="card-body p-0">
                        <div className="flex justify-center items-center mb-4">
                            <h2 className="text-2xl font-semibold">Book Hut</h2>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Log In</h1>
                        <h3 className="mb-6">
                            New here?{' '}
                            <Link
                                to="/register"
                                className="text-amber-500 underline font-semibold">
                                Create a vitalSource account
                            </Link>
                        </h3>
                        <form onSubmit={handleLogIn} className="space-y-5">
                            <div>
                                <label className="label block mb-1 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label className="label block mb-1 font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={isShow ? 'text' : 'password'}
                                        name="password"
                                        className="input input-bordered w-full pr-10"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsShow(!isShow)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                        aria-label={
                                            isShow
                                                ? 'Hide password'
                                                : 'Show password'
                                        }>
                                        {isShow ? (
                                            <FaEyeSlash size={20} />
                                        ) : (
                                            <FaEye size={20} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <a className="link link-hover text-amber-500 underline font-semibold cursor-pointer">
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="btn drop-shadow-md bg-amber-600 hover:bg-amber-700 btn-neutral w-full mt-4">
                                Login
                            </button>
                        </form>
                        <div className="mt-6">
                            <GoogleSignIn />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;