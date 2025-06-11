import { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

const categories = [
    {
        id: 'Fiction',
        name: 'Fiction',
        description: 'Explore the world of fiction books.',
        image: 'https://i.ibb.co/FqVPRV8T/fiction.jpg',
    },
    {
        id: 'Non-Fiction',
        name: 'Non-Fiction',
        description: 'Real stories and facts.',
        image: 'https://i.ibb.co/Kzc73YSs/non-ficiton.jpg',
    },
    {
        id: 'Fantasy',
        name: 'Fantasy',
        description: 'Magical and adventurous books.',
        image: 'https://i.ibb.co/B5qPXdKk/fantasy.jpg',
    },
];

const FeaturedCategories = ({ booksPromise }) => {
    const books = use(booksPromise);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredBooks = selectedCategory
        ? books.filter((book) => book?.book_category === selectedCategory)
        : [];

    return (
        <section className="py-12 px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">
                Featured Categories
            </h2>

            {/* Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() =>
                            document
                                .getElementById('category_modal')
                                .showModal(setSelectedCategory(cat.id))
                        }
                        className="cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-2xl font-semibold mb-2">
                                {cat.name}
                            </h3>
                            <p className="text-gray-600">{cat.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* DaisyUI Modal */}
            <dialog
                id="category_modal"
                className="modal modal-bottom sm:modal-middle">
                <div className="modal-box custom-modal-box">
                    <h3 className="font-bold text-2xl text-center mb-4">
                        Books in "{selectedCategory}" Category
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-h-[400px] overflow-y-auto">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className="bg-base-100 shadow-md rounded-lg p-3">
                                    <img
                                        src={book.cover_photo}
                                        alt={book.book_title}
                                        className="h-40 w-full object-cover rounded-md mb-2"
                                    />
                                    <h4 className="text-lg font-semibold">
                                        {book.book_title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {book.book_overview?.slice(0, 80)}...
                                    </p>
                                    <div className='flex items-start mt-2'>
                                        <Link
                                            to={`/bookDetails/${book._id}`}
                                            className="flex justify-center">
                                            <button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-5 py-2 rounded-md bg-amber-600 text-white font-semibold shadow hover:bg-amber-700 transition-colors">
                                                Book Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">
                                No books found in this category.
                            </p>
                        )}
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-error text-white">
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </section>
    );
};

export default FeaturedCategories;
