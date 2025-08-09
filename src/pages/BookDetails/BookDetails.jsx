import axios from 'axios';
import { motion } from 'framer-motion';
import { use, useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BookDetails = () => {
    const axiosSecure = useAxiosSecure();
    const book = useLoaderData();
    const {
        _id,
        book_author,
        book_title,
        book_category,
        book_overview,
        cover_photo,
        total_page,
        reading_status,
        user_email,
        user_name,
    } = book;
    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [currentStatus, setCurrentStatus] = useState(reading_status);

    const { user } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [upvotes, setUpvotes] = useState(book.upvotes || 0);
    const ownerUser = user?.email === book.user_email;

    const handleUpvote = async () => {
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You must be logged in to upvote a book!',
                confirmButtonText: 'Login Now',
            }).then(() => {
                navigate('/logIn', { state: { from: location.pathname } });
            });
            return;
        }

        try {
            await axiosSecure.patch(
                `http://localhost:3000/books/${_id}/upvote`,
            );
            setUpvotes((prev) => prev + 1);
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Something went wrong while upvoting. Please try again.',
            });
        }
    };

    const handlePostReview = async (e, bookId) => {
        e.preventDefault();
        const reviewText = e.target.review.value;

        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You must be logged in to post a review!',
                confirmButtonText: 'Login Now',
            }).then(() => {
                navigate('/logIn', { state: { from: location.pathname } });
            });
            return;
        }

        try {
            await axiosSecure.post(`/books/${bookId}/reviews`, {
                review_text: reviewText,
            });

            Swal.fire({
                icon: 'success',
                title: 'Review Added!',
                text: 'Thanks for your feedback!',
            });

            // Reload updated reviews
            const updated = await axiosSecure.get(`/books/${bookId}/reviews`);
            setReviews(updated.data);

            e.target.reset();
        } catch (error) {
            console.log(error);
            const msg =
                error?.response?.data?.message ||
                'Could not post review. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: msg,
            });
        }
    };

    // read review
    useEffect(() => {
        axios
            .get(`http://localhost:3000/books/${_id}/reviews`)
            .then((res) => setReviews(res.data))
            .catch((error) => console.log(error));
    }, [_id]);

    // review update
    const handleEdit = async (reviewId, newText) => {
        try {
            await axiosSecure.put(`/reviews/${reviewId}`, {
                review_text: newText,
            });

            Swal.fire({
                icon: 'success',
                title: 'Review Updated!',
            });

            document.getElementById('my_modal_1').close();

            // Refresh list
            const updated = await axiosSecure.get(`/books/${_id}/reviews`);
            setReviews(updated.data);
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error?.response?.data?.message || 'Try again.',
            });
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/reviews/${id}`);

                    Swal.fire(
                        'Deleted!',
                        'Your review has been deleted.',
                        'success',
                    );

                    setReviews((prev) =>
                        prev.filter((review) => review._id !== id),
                    );
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Failed',
                        text: error?.response?.data?.message || 'Try again.',
                    });
                }
            }
        });
    };

    // if (!book)
    //     return (
    //         <p className="text-center py-10">
    //             <Loading />
    //         </p>
    //     );

    const handleStatusUpdate = async () => {
        let nextStatus = '';

        if (currentStatus === 'Want-to-Read') {
            nextStatus = 'Reading';
        } else if (currentStatus === 'Reading') {
            nextStatus = 'Read';
        } else {
            return; // Already read
        }

        const previousStatus = currentStatus;
        setCurrentStatus(nextStatus);

        try {
            const res = await axiosSecure.patch(
                `/books/${_id}/reading-status`,
                { reading_status: nextStatus },
            );

            if (res.data.modifiedCount === 0) {
                setCurrentStatus(previousStatus);
            }
        } catch (err) {
            console.error('Failed to update status', err);
            setCurrentStatus(previousStatus);
        }
    };

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
                    <div className="space-y-2 text-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {book_title}
                        </h2>

                        <p className="text-sm">
                            <span className="font-semibold text-gray-600">
                                Author:
                            </span>{' '}
                            {book_author}
                        </p>

                        <p className="text-sm">
                            <span className="font-semibold text-gray-600">
                                Category:
                            </span>{' '}
                            {book_category}
                        </p>

                        <p className="text-sm">
                            <span className="font-semibold text-gray-600">
                                Pages:
                            </span>{' '}
                            {total_page}
                        </p>

                        <p className="text-sm">
                            <span className="font-semibold text-gray-600">
                                Status:
                            </span>{' '}
                            {currentStatus}
                        </p>

                        <p className="text-sm">
                            <span className="font-semibold text-gray-600">
                                Book Woner:
                            </span>{' '}
                            {user_name} ({user_email})
                        </p>

                        <p className="text-base mt-4 leading-relaxed text-gray-700">
                            {book_overview}
                        </p>

                        {user ? (
                            <div>
                                {user?.email === user_email &&
                                    currentStatus !== 'Read' && (
                                        <button
                                            onClick={handleStatusUpdate}
                                            className="btn btn-primary mt-4"
                                        >
                                            {currentStatus === 'Want-to-Read'
                                                ? 'Start Reading'
                                                : 'Mark as Read'}
                                        </button>
                                    )}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex gap-3 justify-between items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline btn-warning mt-4"
                        >
                            ⬅️ Go Back
                        </button>
                        <div>
                            {user ? (
                                user?.email !== user_email ? (
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleUpvote}
                                        className="mt-6 px-4 py-2 btn btn-ghost btn-md bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                                    >
                                        🔼 Upvote ({upvotes})
                                    </motion.button>
                                ) : (
                                    <div
                                        className="tooltip"
                                        data-tip="You cannot upvote your own book."
                                    >
                                        <button
                                            className="mt-1 btn btn-ghost btn-md px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                                            disabled
                                        >
                                            🔼 Upvote ({upvotes})
                                        </button>
                                    </div>
                                )
                            ) : (
                                <Link to="/logIn">
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className="mt-6 px-4 py-2 btn btn-ghost btn-md bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                                    >
                                        🔼 Upvote ({upvotes})
                                    </motion.button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-400">
                <p>
                    Comment : <strong>{reviews.length} </strong>
                </p>
            </div>

            {/* Review Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">💬 Reviews</h3>

                {/* Show All Reviews */}
                {reviews.length === 0 ? (
                    <p className="text-gray-400 italic">No reviews yet.</p>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded text-white p-4 mb-3 bg-gray-800"
                        >
                            <p>{review.review_text}</p>
                            <div className="flex justify-between text-sm mt-2 text-gray-400">
                                <span>{review.user_email}</span>
                                {user?.email === review.user_email && (
                                    <div>
                                        {/* Edit Button */}
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => {
                                                setEditingReviewId(review._id);
                                                setEditingText(
                                                    review.review_text,
                                                );
                                                document
                                                    .getElementById(
                                                        'my_modal_1',
                                                    )
                                                    .showModal();
                                            }}
                                        >
                                            Edit
                                        </button>

                                        {/* Edit Modal */}
                                        <dialog
                                            id="my_modal_1"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg mb-2">
                                                    ✏️ Edit Review
                                                </h3>
                                                <textarea
                                                    className="w-full border p-2 rounded"
                                                    value={editingText}
                                                    onChange={(e) =>
                                                        setEditingText(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <div className="modal-action flex justify-between">
                                                    <form method="dialog">
                                                        <button className="btn">
                                                            Close
                                                        </button>
                                                    </form>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            handleEdit(
                                                                editingReviewId,
                                                                editingText,
                                                            )
                                                        }
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </dialog>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() =>
                                                handleDelete(review._id)
                                            }
                                            className="ml-2 btn btn-ghost btn-xs text-red-500 border border-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}

                {/* --- Add New Review Section --- */}
                {user ? (
                    reviews.some((rev) => rev.user_email === user.email) ? (
                        <p className="mt-4 text-gray-400 italic">
                            You have already reviewed this book.
                        </p>
                    ) : (
                        <form
                            onSubmit={(e) => handlePostReview(e, _id)}
                            className="mt-4"
                        >
                            <textarea
                                className="w-full border rounded p-2"
                                name="review"
                                placeholder="Write your review..."
                                required
                            ></textarea>
                            {ownerUser ? (
                                <div
                                    className="tooltip"
                                    data-tip="You cannot post review your own book."
                                >
                                    <button
                                        className="mt-1 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                                        disabled
                                    >
                                        Post Review
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Post Review
                                </button>
                            )}
                        </form>
                    )
                ) : (
                    <p className="mt-4 text-red-500 italic">
                        Please{' '}
                        <Link to="/logIn" className="underline">
                            login
                        </Link>{' '}
                        to write a review.
                    </p>
                )}
            </div>
        </section>
    );
};

export default BookDetails;
