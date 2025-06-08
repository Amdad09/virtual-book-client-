import React, { use, useState } from 'react';
import Swal from 'sweetalert2';
import register from '../../assets/lottie/register.json'
import { AuthContext } from '../../contexts/AuthContext';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import GoogleSignIn from '../../shared/GoogleSignIn';

const Register = () => {
    const { createUser, updateUser } = use(AuthContext);
    // console.log(user);
    const [success, setSuccess] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    const [isShow, setIsShow] = useState(false);
    // console.log(createUser)
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

        setSuccess(false);

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
                    })
                    .catch((error) => console.log(error));

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Complete',
                    text: 'Your account has been created successfully!',
                    confirmButtonText: 'Continue',
                });

                setSuccess(true);
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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie
                        style={{ width: '600px' }}
                        animationData={register}
                        loop={true}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <div className="card-body">
                        <div className="flex justify-center items-center">
                            <h2 className="text-xl ">Book Hut</h2>
                        </div>
                        <h1 className="text-xl font-bold">Create Account </h1>
                        <h3>
                            Already have a vitalSource account?{' '}
                            <Link
                                to="/logIn"
                                className="text-amber-500 underline font-semibold">
                                Log In
                            </Link>
                        </h3>
                        <form onSubmit={handleRegister} className="fieldset">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input w-full"
                                placeholder="Name"
                            />

                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input w-full"
                                placeholder="Email"
                            />

                            <label className="label">Photo URL</label>
                            <input
                                type="url"
                                name="photo"
                                className="input w-full"
                                placeholder="Photo URL"
                            />

                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={isShow ? 'text' : 'password'}
                                    name="password"
                                    className="input w-full"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    onClick={() => setIsShow(!isShow)}
                                    className="right-12 top-3 absolute z-30 cursor-pointer">
                                    {isShow ? (
                                        <FaEyeSlash size={18} />
                                    ) : (
                                        <FaEye size={18} />
                                    )}
                                </button>
                            </div>
                            <p>
                                6+ characters, an uppercase letter, a lowercase
                                letter and a digit.
                            </p>
                            <div>
                                <label className="label mt-1">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        className="checkbox text-amber-500"
                                    />
                                    I agree to the Terms of Use and Privacy
                                    Policy
                                </label>
                            </div>
                            <input
                                type="submit"
                                className="btn drop-shadow-md bg-amber-600 hover:bg-amber-700 btn-neutral mt-4"
                                value="Login"
                            />
                        </form>
                        {success && (
                            <p className="text-center text-green-600">
                                Account has created successfully
                            </p>
                        )}
                        <GoogleSignIn/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
