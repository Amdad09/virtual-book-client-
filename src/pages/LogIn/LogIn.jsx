import Lottie from 'lottie-react';
import React, { use } from 'react';
import login from '../../assets/lottie/login.json'
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
const LogIn = () => {
    const { loginUser } = use(AuthContext);

    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        
        loginUser(email, password)
            .then(result => {
                console.log(result.user);
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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie
                        style={{ width: '500px' }}
                        animationData={login}
                        loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full mr-20 max-w-lg shrink-0 shadow-2xl">
                    <div className="card-body">
                        <div className="flex justify-center items-center">
                            <h2 className="text-xl ">Book Hut</h2>
                        </div>
                        <h1 className="text-xl font-bold">log In </h1>
                        <h3>
                            New here?{' '}
                            <Link to='/register' className="text-amber-500 underline font-semibold">
                                Create a vitalSourse account
                            </Link>
                        </h3>
                        <form onSubmit={handleLogIn} className="fieldset">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name='email'
                                className="input w-full"
                                placeholder="Email"
                            />
                            <label className="label">Password</label>
                            <input
                                type="password"
                                name='password'
                                className="input w-full"
                                placeholder="Password"
                            />
                            <div className="text-right">
                                <a className="link link-hover text-amber-500 underline font-semibold">
                                    Forgot password?
                                </a>
                            </div>
                            <button className="btn drop-shadow-md bg-amber-600 hover:bg-amber-700 btn-neutral mt-4">
                                Login
                            </button>
                        </form>
                        <div>
                            <div className="divider">OR</div>
                            <button className="btn w-full bg-white text-black border-[#e5e5e5]">
                                <svg
                                    aria-label="Google logo"
                                    width="16"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <g>
                                        <path
                                            d="m0 0H512V512H0"
                                            fill="#fff"></path>
                                        <path
                                            fill="#34a853"
                                            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                        <path
                                            fill="#4285f4"
                                            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                        <path
                                            fill="#fbbc02"
                                            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                        <path
                                            fill="#ea4335"
                                            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                    </g>
                                </svg>
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;