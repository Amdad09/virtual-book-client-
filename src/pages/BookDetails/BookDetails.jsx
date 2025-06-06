'use client';
import { motion } from 'framer-motion';
import { use, useState } from 'react';
import { Link, Navigate, useLoaderData, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import PrivateRoute from '../../routes/PrivateRoute';

const BookDetails = () => {
    const book = useLoaderData();
    const { book_author, book_title, book_category, book_overview, cover_photo, total_page, reading_status, user_name, user_email } = book;
    
    const { user } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.pathname || '/';

    const [upvotes, setUpvotes] = useState(book.upvotes || 0);

    const handleUpvote = async () => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You must be logged in to upvote a book!',
                confirmButtonText: 'Login Now',
            }).then(() => {
                navigate('/logIn', {state:from})
            })
            return;
        }

        // ower user 
        // if (user === book) {
        //     ''
        // }



        try {
            await axios.patch(
                `http://localhost:3000/books/${_id}/upvote`,
            );
            setUpvotes(prev => prev + 1);
        }

        catch{
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Something went wrong while upvoting. Please try again.',
            });
        }
    };
    

    if (!book) return <p className="text-center py-10">Loading...</p>;

    return (
        <section className="max-w-4xl mx-auto p-6">
            <h3 className="text-center font-bold text-3xl my-12">
                <span className="border-b border-amber-600 capitalize">
                    {book_title}
                </span>{' '}
                book details
            </h3>
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                <img
                    src={cover_photo}
                    alt={book_title}
                    className="w-full object-cover h-full"
                />
                <div className="p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">
                            {book_title}
                        </h2>
                        <p className="text-sm text-gray-600 mb-1">
                            Author:{' '}
                            <span className="font-medium">
                                {book_author}
                            </span>
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            Category: {book_category}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            Pages: {total_page}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            Status: {reading_status}
                        </p>
                        <p className="text-gray-700 mt-4">
                            {book_overview}
                        </p>
                    </div>

                    <Link to="">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleUpvote}
                            className="mt-6 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                            🔼 Upvote ({upvotes})
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* User Info */}
            <div className="mt-6 text-sm text-gray-700">
                <p>
                    Added by: <strong>{user_name} hi </strong> (
                    {user_email})
                </p>
            </div>

            {/* Review Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">💬 Reviews</h3>

                Show all reviews here
                Example:
                <div className="border rounded p-4 mb-3">
                    <p className="text-gray-800">Great book!</p>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>by John Doe</span>
                        <div>
                            <button>Edit</button>
                            <button className="ml-2 text-red-500">Delete</button>
                        </div>
                    </div>
                </div>
               

                Authenticated users can post review
                Example form:
                <form className="mt-4">
                    <textarea className="w-full border rounded p-2" placeholder="Write your review..."></textarea>
                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                        Post Review
                    </button>
                </form>
               
            </div>
        </section>
    );
};

export default BookDetails;
