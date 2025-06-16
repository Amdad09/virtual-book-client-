import React from 'react';
import { useLoaderData } from 'react-router';
import BookCard from './BookCard';

const BookShelf = () => {
    const books = useLoaderData();
    console.log(books);
    return (
        <div className="w-11/12 mx-auto">
            <div className='my-12'>
                <h2 className="text-3xl font-bold text-center mb-2">
                    Popular Books
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Check out the most loved books by our readers!
                </p>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book, index) => (
                    <BookCard key={index} book={book}></BookCard>
                ))}
            </div>
        </div>
    );
};

export default BookShelf;