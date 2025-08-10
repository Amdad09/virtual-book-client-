
import { use } from 'react';
import FavBook from './FavBook';

const FavBooks = ({ favBooksPromise }) => {
    const books = use(favBooksPromise);

    
    return (
        <div className='w-11/12 mx-auto'>
            <div className="my-20 text-center">
                <h2 className="text-4xl font-extrabold text-center  mb-4">
                    Tops Books List
                </h2>
                <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
                    Discover the most popular books loved by readers worldwide.
                    These handpicked gems are ranked by upvotes — explore their
                    stories, insights, and adventures!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {books.map((book) => (
                        <FavBook key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavBooks;