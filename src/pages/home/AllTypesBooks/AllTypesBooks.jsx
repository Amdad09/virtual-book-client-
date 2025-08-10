import React, { use } from 'react';
import BooksSection from './BooksSection';

const AllTypesBooks = ({ booksPromise }) => {
    const books = use(booksPromise);

    const fictionBooks = books.filter(
        (book) => book.book_category === 'Fiction',
    );
    const nonFictionBooks = books.filter(
        (book) => book.book_category === 'Non-Fiction',
    );
    const fantasyBooks = books.filter(
        (book) => book.book_category === 'Fantasy',
    );

    return (
        <div className="space-y-8 w-11/12 mx-auto">
            <BooksSection title="Fiction Books" books={fictionBooks} />
            <BooksSection title="Non-Fiction Books" books={nonFictionBooks} />
            <BooksSection title="Fantasy Books" books={fantasyBooks} />
        </div>
    );
};

export default AllTypesBooks;
