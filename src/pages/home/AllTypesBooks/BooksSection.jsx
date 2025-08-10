import { motion } from 'framer-motion';
import { Link } from 'react-router';

const BooksSection = ({ title, books }) => {
    return (
        <div className="py-12">
            <h3 className="text-4xl font-extrabold text-center mb-10 font-serif">
                {title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {books.map((book) => (
                    <motion.div
                        key={book._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="perspective-1000" // Required for the 3D effect
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                rotateX: 5,
                                rotateY: 5,
                                y: -10,
                                boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="relative group bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform-gpu"
                        >
                            {/* Glowing Border Effect (Orange) */}
                            <div
                                className="absolute inset-0 rounded-2xl pointer-events-none 
                                transform scale-95 opacity-0 transition-all duration-300
                                "
                            ></div>

                            {/* Book Cover with Category Badge */}
                            <div className="relative">
                                <img
                                    src={book.cover_photo}
                                    alt={book.book_title}
                                    className="h-72 w-full object-cover object-center rounded-t-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                {/* Category Badge (Orange) */}
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                    className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md"
                                >
                                    {book.category}
                                </motion.span>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h4 className="font-bold text-xl text-gray-900 mb-1 font-sans line-clamp-1">
                                    {book.book_title}
                                </h4>
                                <p className="text-sm text-gray-500 italic font-serif mb-3">
                                    by {book.book_author}
                                </p>
                                <p className="text-sm text-gray-700 line-clamp-2 font-serif mb-5">
                                    {book.book_overview}
                                </p>
                                <Link to={`/bookDetails/${book._id}`}>
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
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BooksSection;
