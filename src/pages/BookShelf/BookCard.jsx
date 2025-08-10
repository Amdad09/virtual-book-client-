
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { BiSolidUpvote } from 'react-icons/bi';
const BookCard = ({ book }) => {
    const {
        _id,
        book_title,
        cover_photo,
        book_overview,
        book_author,
        book_category,
        upvotes,
    } = book;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl shadow-md dark:border dark:border-gray-600 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <figure className="w-full h-64 overflow-hidden">
                <img
                    src={cover_photo}
                    alt={book_title}
                    className="object-cover w-full h-full"
                />
            </figure>

            <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">
                    {book_title}
                </h2>
                <p className=" text-sm">
                    {book_overview?.slice(0, 100)}...
                </p>
                <p className="">
                    <span className="font-semibold">Author: </span>{' '}
                    {book_author}
                </p>
                <p className="">
                    <span className="font-semibold">Category: </span>
                    {book_category}
                </p>
                <p
                    title="Upvoted"
                    className=" flex gap-2 items-center">
                    <span className="font-semibold">
                        <BiSolidUpvote color="orange" />{' '}
                    </span>
                    {upvotes}
                </p>

                <Link
                    to={`/bookDetails/${_id}`}
                    className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-2 rounded-md bg-amber-600 text-white font-semibold shadow hover:bg-amber-700 transition-colors">
                        Book Details
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

export default BookCard;
