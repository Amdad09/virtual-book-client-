import Lottie from 'lottie-react';
import React, { use } from 'react';
import login from '../../assets/lottie/login.json'
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import GoogleSignIn from '../../shared/GoogleSignIn';
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
                        <GoogleSignIn/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;