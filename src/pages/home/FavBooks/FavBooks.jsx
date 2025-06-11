
import React, { use } from 'react';
import FavBook from './FavBook';

const FavBooks = ({ favBooksPromise }) => {
    const books = use(favBooksPromise);
    console.log(books);

    
    return (
        <div>
            <div className="my-20 text-center">
                <h2 className="text-4xl font-extrabold text-center  mb-4">
                    Top 6 Books You Can't Miss
                </h2>
                <p className="text-center text-gray-300 max-w-xl mx-auto mb-10">
                    Discover the most popular books loved by readers worldwide.
                    These handpicked gems are ranked by upvotes — explore their
                    stories, insights, and adventures!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <FavBook key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavBooks;