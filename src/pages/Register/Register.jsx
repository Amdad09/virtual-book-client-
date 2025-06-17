import React, { use, useState } from 'react';
import Swal from 'sweetalert2';
import register from '../../assets/lottie/register.json'
import { AuthContext } from '../../contexts/AuthContext';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import GoogleSignIn from '../../shared/GoogleSignIn';
import { setLogLevel } from 'firebase/app';

const Register = () => {
    const { createUser, updateUser, setLoading } = use(AuthContext);
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const formData = new FormData(form);
        const terms = e.target.terms.checked;
        const { email, password } = Object.fromEntries(
            formData.entries(),
        );


        if (password.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Password Required',
                text: 'Please enter a password to continue.',
            });
            return;
        }
        if (/[a-z]/.test(password) === false) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Password',
                text: 'Password must contain at least one lowercase letter (a-z).',
            });

            return;
        }
        if (/[A-Z]/.test(password) === false) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Password',
                text: 'Password must contain at least one uppercase letter (A-Z).',
            });

            return;
        }
        if (/[0-9]/.test(password) === false) {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid Password',
                text: 'Password must contain at least one number (0-9).',
            });

            return;
        }
        if (password.length < 6) {
            Swal.fire({
                icon: 'warning',
                title: 'Password Too Short',
                text: 'Password must be at least 6 characters long.',
            });
            return;
        }

        if (!terms) {
            Swal.fire({
                icon: 'warning',
                title: 'Terms Not Accepted',
                text: 'You must accept the terms and conditions to register.',
            });
            return;
        }

        // console.log(password);
        // create user inthe firebase
        // Firebase Create User
        createUser(email, password)
            .then((result) => {
                console.log(result);
                const profile = {
                    displayName: name,
                    photoURL: photo,
                };

                updateUser(profile)
                    .then(() => {
                        console.log('profile updated');
                        setLoading(false);
                    })
                    .catch((error) => console.log(error));

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Complete',
                    text: 'Your account has been created successfully!',
                    confirmButtonText: 'Continue',
                });

                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                });
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen p-4">
            <div className="hero-content flex flex-col lg:flex-row-reverse items-center justify-center gap-8 max-w-7xl mx-auto">
                {/* Animation Section */}
                <div className="w-full max-w-md lg:max-w-lg">
                    <Lottie
                        style={{ width: '100%', maxWidth: '600px' }}
                        animationData={register}
                        loop={true}
                    />
                </div>

                {/* Form Section */}
                <div className="card bg-base-100 w-full max-w-md lg:max-w-lg shadow-2xl">
                    <div className="card-body px-6 py-8">
                        <div className="flex justify-center items-center mb-4">
                            <h2 className="text-2xl font-semibold">Book Hut</h2>
                        </div>

                        <h1 className="text-3xl font-bold mb-2">
                            Create Account
                        </h1>

                        <h3 className="mb-6 text-sm">
                            Already have a vitalSource account?{' '}
                            <Link
                                to="/logIn"
                                className="text-amber-500 underline font-semibold hover:text-amber-600">
                                Log In
                            </Link>
                        </h3>

                        <form
                            onSubmit={handleRegister}
                            className="fieldset space-y-4">
                            <div>
                                <label className="label block mb-1 font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="input w-full input-bordered"
                                    placeholder="Name"
                                />
                            </div>

                            <div>
                                <label className="label block mb-1 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="input w-full input-bordered"
                                    placeholder="Email"
                                />
                            </div>

                            <div>
                                <label className="label block mb-1 font-medium">
                                    Photo URL
                                </label>
                                <input
                                    type="url"
                                    name="photo"
                                    required
                                    className="input w-full input-bordered"
                                    placeholder="Photo URL"
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
                                        className="input w-full input-bordered pr-10"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsShow(!isShow)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none">
                                        {isShow ? (
                                            <FaEyeSlash size={20} />
                                        ) : (
                                            <FaEye size={20} />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                    6+ characters, an uppercase letter, a
                                    lowercase letter and a digit.
                                </p>
                            </div>

                            <div className="flex items-center space-x-2 mt-2">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    className="checkbox checkbox-amber"
                                    required
                                />
                                <label className="text-sm select-none">
                                    I agree to the Terms of Use and Privacy
                                    Policy
                                </label>
                            </div>

                            <input
                                type="submit"
                                className="btn bg-amber-600 hover:bg-amber-700 text-white mt-6 w-full"
                                value="Create Account"
                            />
                        </form>


                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
