import { motion } from 'framer-motion';
import { use, useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../shared/Loading';

const BookDetails = () => {
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
    } = book;
    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editingText, setEditingText] = useState('');

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
                navigate('/logIn', { state: from });
            });
            return;
        }

        // ower user
        // if (user === book) {
        //     ''
        // }

        try {
            await axios.patch(`http://localhost:3000/books/${_id}/upvote`);
            setUpvotes((prev) => prev + 1);
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Something went wrong while upvoting. Please try again.',
            });
        }
    };

    const handlePostReview = async (e, id) => {
        e.preventDefault();
        const reviewText = e.target.review.value;

        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You must be logged in to post a review!',
                confirmButtonText: 'Login Now',
            }).then(() => {
                navigate('/logIn', { state: from });
            });
            return;
        }

        try {
            const reviewPayload = {
                review_text: reviewText,
                user_email: user?.email,
                book_id: id,
                created_at: new Date(),
            };

            await axios.post(
                `http://localhost:3000/books/${id}/reviews`,
                reviewPayload,
            );

            Swal.fire({
                icon: 'success',
                title: 'Review Added!',
                text: 'Thanks for your feedback!',
                confirmButtonColor: '#2563eb',
            });

            const updated = await axios.get(
                `http://localhost:3000/books/${id}/reviews`,
            );
            setReviews(updated.data);

            e.target.reset();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Could not post review. Please try again.',
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
    const handleEdit = async (id, updateText) => {
        try {
            await axios.put(`http://localhost:3000/books/${id}/reviews`, {
                review_text: updateText,
                created_at: new Date(),
            });
            Swal.fire({
                icon: 'success',
                title: 'Review Updated!',
                text: 'Your review has been successfully updated.',
            });

            document.getElementById('my_modal_1').close();

            const res = await axios.get(
                `http://localhost:3000/books/${_id}/reviews`,
            );
            setReviews(res.data);

            setEditingReviewId(null);
            setEditingText('');
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Update',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/reviews/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                        });
                        setReviews((prev) =>
                            prev.filter((review) => review._id !== id),
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to Delete',
                            text: 'Something went wrong!',
                        });
                    });
            }
        });
    };

    if (!book)
        return (
            <p className="text-center py-10">
                <Loading />
            </p>
        );

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
                        <h2 className="text-3xl text-gray-600 font-bold mb-2">
                            {book_title}
                        </h2>
                        <p className="text-sm text-gray-600 mb-1">
                            Author:{' '}
                            <span className="font-medium">{book_author}</span>
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
                        <p className="text-gray-700 mt-4">{book_overview}</p>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline btn-warning mt-4">
                            ⬅️ Go Back
                        </button>
                        <Link to="">
                            {user?.email !== user_email ? (
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleUpvote}
                                    className="mt-6 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                                    🔼 Upvote ({upvotes})
                                </motion.button>
                            ) : (
                                <div
                                    class="tooltip"
                                    data-tip="You cannot upvote your own book.">
                                    <button
                                        className="mt-1 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                                        disabled>
                                        🔼 Upvote ({upvotes})
                                    </button>
                                </div>
                            )}
                        </Link>
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
                Show all reviews here :{/* Review List */}
                {reviews.length === 0 ? (
                    <p className="text-gray-400 italic">No reviews yet.</p>
                ) : (
                    reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="border rounded text-white p-4 mb-3 bg-gray-800">
                            <p>{review.review_text}</p>
                            <div className="flex justify-between text-sm mt-2 text-gray-400">
                                <span>{review.user_email}</span>
                                <div>
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button
                                        className="btn"
                                        onClick={() => {
                                            setEditingReviewId(review._id);
                                            setEditingText(review.review_text);
                                            document
                                                .getElementById('my_modal_1')
                                                .showModal();
                                        }}>
                                        Edit
                                    </button>
                                    <dialog id="my_modal_1" className="modal">
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
                                                    }>
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </dialog>

                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="ml-2 btn text-red-500">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                Authenticated users can post review :
                <form
                    onSubmit={(e) => handlePostReview(e, _id)}
                    className="mt-4">
                    <textarea
                        className="w-full border rounded p-2"
                        name="review"
                        placeholder="Write your review..."></textarea>
                    {/* {
                        user?.email === user_email &&  
                    } */}
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                        Post Review
                    </button>
                </form>
            </div>
        </section>
    );
};

export default BookDetails;
