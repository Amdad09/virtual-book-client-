import Lottie from 'lottie-react';
import React, { use } from 'react';
import register from '../../assets/lottie/register.json'
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
const Register = () => {
    const { createUser } = use(AuthContext);
    console.log(createUser)
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const password = formData.get('password');
        const email = formData.get('email');
        console.log(data, email);


        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    title: 'Account Created!',
                    icon: 'Your registration has been successful.',
                    draggable: true,
                    confirmButtonColor: '#d97706',
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Registration Failed!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#e74c3c',
                });
            });
    }
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
                        <form onSubmit={handleSignUp} className="fieldset">
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
                            <input
                                type="password"
                                name="password"
                                className="input w-full"
                                placeholder="Password"
                            />
                            <p>
                                6+ characters, an uppercase letter, a lowercase
                                letter and a digit.
                            </p>
                            <div>
                                <label className="label mt-1">
                                    <input
                                        type="checkbox"
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

export default Register;