import { motion } from 'framer-motion';
import { Link } from 'react-router';
const FavBook = ({ book }) => {
    const { _id, book_title, book_overview, cover_photo } = book;

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 overflow-hidden"
        >
            <figure className="w-full h-64 overflow-hidden">
                <img
                    src={cover_photo}
                    alt={book_title}
                    className="object-cover w-full h-full"
                />
            </figure>

            <div className="p-5 space-y-3">
                <div className="h-28">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {book_title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {book_overview?.slice(0, 100)}...
                    </p>
                </div>

                <Link
                    to={`/bookDetails/${_id}`}
                    className="flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 rounded-md bg-amber-600 text-white text-sm font-medium shadow hover:bg-amber-700 transition-colors"
                    >
                        Book Details
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

export default FavBook;
